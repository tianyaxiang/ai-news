---
title: "Setting Up Nginx Ingress Controller with SSL on Kubernetes"
originalUrl: "https://dev.to/vultr/setting-up-nginx-ingress-controller-with-ssl-on-kubernetes-50go"
date: "2026-09-09T23:28:03.258Z"
---

# Setting Up Nginx Ingress Controller with SSL on Kubernetes
# 在 Kubernetes 上配置带有 SSL 的 Nginx Ingress Controller

The Nginx Ingress Controller is a popular Kubernetes Ingress controller that uses Nginx as a reverse proxy and load balancer to route external traffic into a cluster, acting as a single entry point with SSL/TLS termination, load balancing, session handling, and path-based routing.
Nginx Ingress Controller 是一款流行的 Kubernetes Ingress 控制器，它使用 Nginx 作为反向代理和负载均衡器，将外部流量路由到集群中。它充当单一入口点，提供 SSL/TLS 终止、负载均衡、会话处理和基于路径的路由功能。

This guide sets up the Nginx Ingress Controller on a Kubernetes cluster, deploys two sample applications behind it, and issues Let's Encrypt certificates with cert-manager to secure them, plus covers importing commercial SSL certificates instead. By the end, you'll have two applications reachable over HTTPS through a shared Ingress controller.
本指南将介绍如何在 Kubernetes 集群上设置 Nginx Ingress Controller，在其后端部署两个示例应用程序，并使用 cert-manager 签发 Let's Encrypt 证书以保护它们，同时还会涵盖如何导入商业 SSL 证书。完成后，你将拥有两个可以通过共享 Ingress 控制器以 HTTPS 方式访问的应用程序。

Before you begin, you'll need a Kubernetes cluster with at least 2 nodes, kubectl installed and configured to access it, the Helm package manager installed on your computer, and a domain name (for example, example.com).
在开始之前，你需要一个至少包含 2 个节点的 Kubernetes 集群、已安装并配置好访问权限的 kubectl、安装在电脑上的 Helm 包管理器，以及一个域名（例如 example.com）。

### 1. Install the Nginx Ingress Controller
### 1. 安装 Nginx Ingress Controller

1. Add the Nginx Ingress Helm repository:
   `$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
1. 添加 Nginx Ingress Helm 仓库：
   `$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`

2. Update Helm:
   `$ helm repo update`
2. 更新 Helm：
   `$ helm repo update`

3. Install the Nginx Ingress Controller:
   `$ helm install ingress-nginx ingress-nginx/ingress-nginx`
3. 安装 Nginx Ingress Controller：
   `$ helm install ingress-nginx ingress-nginx/ingress-nginx`

4. Check the load balancer that's automatically provisioned:
   `$ kubectl get services ingress-nginx-controller`
4. 检查自动配置的负载均衡器：
   `$ kubectl get services ingress-nginx-controller`

Output:
输出：
```text
NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller   LoadBalancer   10.101.22.249   <pending>     80:31915/TCP,443:30217/TCP   106s
```

It may take a few minutes for the service to get an EXTERNAL-IP, depending on your cloud provider. Some cloud providers also require a provider-specific annotation on the LoadBalancer service to configure things like health checks — check your provider's Kubernetes documentation if the external IP doesn't provision as expected.
根据云服务商的不同，服务获取 EXTERNAL-IP 可能需要几分钟时间。某些云服务商还要求在 LoadBalancer 服务上添加特定于提供商的注解（annotation）来配置健康检查等功能——如果外部 IP 未按预期配置，请查阅你所用云服务商的 Kubernetes 文档。

### 2. Install cert-manager
### 2. 安装 cert-manager

1. Install the latest cert-manager release:
   `$ kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.17.2/cert-manager.yaml`
   Check the official cert-manager releases page for the latest version.
1. 安装最新版本的 cert-manager：
   `$ kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.17.2/cert-manager.yaml`
   请查看 cert-manager 官方发布页面以获取最新版本。

2. Inspect the cert-manager resources:
   `$ kubectl get all -n cert-manager`
   You should see pods, services, replicasets, and deployments related to cert-manager.
2. 检查 cert-manager 资源：
   `$ kubectl get all -n cert-manager`
   你应该能看到与 cert-manager 相关的 pods、services、replicasets 和 deployments。

### 3. Deploy Backend Applications
### 3. 部署后端应用程序

Deploy two sample applications, app1 and app2, using the http-echo image, which returns its command-line argument on an HTML page.
使用 http-echo 镜像部署两个示例应用程序 app1 和 app2，该镜像会在 HTML 页面上返回其命令行参数。

*(Steps 1-10 omitted for brevity, follow standard Kubernetes deployment procedures for app1/app2 and their services.)*
*(为简洁起见，省略了第 1-10 步，请按照标准的 Kubernetes 部署流程创建 app1/app2 及其服务。)*

### 4. Set Up DNS Records
### 4. 设置 DNS 记录

1. Log in to your DNS provider's account and access your domain.
1. 登录你的 DNS 服务商账户并访问你的域名管理页面。

2. Create a new A subdomain record `app1` pointing to your load balancer's external IP address.
2. 创建一个新的 A 类子域名记录 `app1`，指向你负载均衡器的外部 IP 地址。

3. Create another A subdomain record `app2` pointing to the same IP address.
3. 创建另一个 A 类子域名记录 `app2`，指向相同的 IP 地址。

### 5. Configure the Nginx Ingress Controller to Expose the Backend Applications
### 5. 配置 Nginx Ingress Controller 以暴露后端应用程序

1. Create a manifest for an Ingress resource for the app1 Deployment:
   `$ sudo nano app1-ingress.yaml`
1. 为 app1 Deployment 创建一个 Ingress 资源清单：
   `$ sudo nano app1-ingress.yaml`

*(Add the provided YAML configuration with your domain name.)*
*(添加提供的 YAML 配置，并替换为你的域名。)*

2. Create a manifest for an Ingress resource for the app2 Deployment:
   `$ sudo nano app2-ingress.yaml`
2. 为 app2 Deployment 创建一个 Ingress 资源清单：
   `$ sudo nano app2-ingress.yaml`

3. Apply the ingress-app1 and ingress-app2 resources:
   `$ kubectl apply -f app1-ingress.yaml`
   `$ kubectl apply -f app2-ingress.yaml`
3. 应用 ingress-app1 和 ingress-app2 资源：
   `$ kubectl apply -f app1-ingress.yaml`
   `$ kubectl apply -f app2-ingress.yaml`

4. Verify the Ingress resources are available:
   `$ kubectl get ingress`
   Wait for the ADDRESS column to populate with your load balancer's IP address.
4. 验证 Ingress 资源是否可用：
   `$ kubectl get ingress`
   等待 ADDRESS 列显示你的负载均衡器 IP 地址。

### 6. Set Up Production-Ready SSL Certificates
### 6. 设置生产环境就绪的 SSL 证书

cert-manager creates Custom Resource Definitions (CRDs) to handle certificate issuance from a CA such as Let's Encrypt:
cert-manager 创建自定义资源定义 (CRD) 来处理来自 CA（如 Let's Encrypt）的证书签发：

*   **Issuer**: Defines an issuer configuration (e.g., ACME), the challenge method (DNS01 or HTTP01), and credentials, scoped to a single namespace.
*   **Issuer**: 定义签发者配置（例如 ACME）、验证方式（DNS01 或 HTTP01）以及凭据，作用域仅限于单个命名空间。

*   **Cluster Issuer**: Works like Issuer but can issue certificates to any namespace in the cluster.
*   **Cluster Issuer**: 功能与 Issuer 类似，但可以为集群中的任何命名空间签发证书。