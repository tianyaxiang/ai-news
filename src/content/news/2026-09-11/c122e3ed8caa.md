---
title: "Deep Dive into @JCurlCommand: The Annotation and Its Variable Substitution Grammar"
originalUrl: "https://dev.to/paohaijiao/deep-dive-into-jcurlcommand-the-annotation-and-its-variable-substitution-grammar-59e8"
date: "2026-09-10T23:25:23.751Z"
---

# Deep Dive into @JCurlCommand: The Annotation and Its Variable Substitution Grammar
# 深入解析 @JCurlCommand：注解及其变量替换语法

@JCurlCommand is the heart of JQuickCurl's annotation mode. One annotation turns a static curl string into a dynamic, typed HTTP method. This post covers the annotation's full surface and — more importantly — the ${...} variable grammar that makes one command reusable across thousands of runtime states.
@JCurlCommand 是 JQuickCurl 注解模式的核心。通过一个注解，即可将静态的 curl 字符串转换为动态的、类型化的 HTTP 方法。本文将涵盖该注解的完整功能，更重要的是，将介绍使单个命令能够在数千种运行时状态下重复使用的 ${...} 变量语法。

### The Annotation, Decoded
### 注解解码

@JCurlCommand targets methods and is retained at runtime so the proxy layer can read it on every invocation: In practice you will use value() on every method; the other attributes give you a declarative place to document the response contract for a command. The empty constructor proxy flow rejects methods annotated with execute = false, so treat execute as "this annotation is a real executable command".
@JCurlCommand 作用于方法，并在运行时保留，以便代理层在每次调用时读取它。在实践中，你会在每个方法上使用 `value()`；其他属性则为你提供了一个声明式的地方，用于记录命令的响应契约。空构造函数的代理流程会拒绝标注了 `execute = false` 的方法，因此请将 `execute` 视为“此注解是一个可执行的真实命令”。

```java
public interface HealthApi {
    @JCurlCommand(
        value = "curl -X GET https://httpbin.org/status/200"
    )
    String ping(JQuickCurlReq request);
}
```

### The ${name} Variable Grammar
### ${name} 变量语法

JQuickCurl embeds variables inside the curl string using ${name}. At execution time the proxy:
1. Collects the keys you put into JQuickCurlReq.
2. Copies them into the request context (JContext).
3. Replaces every ${name} occurrence with the corresponding runtime value.
Because substitution happens before the HTTP call, you can place placeholders anywhere syntax allows — URL path, query string, header value, auth pair, or request body.
JQuickCurl 使用 ${name} 在 curl 字符串中嵌入变量。在执行时，代理会：
1. 收集你放入 JQuickCurlReq 中的键。
2. 将它们复制到请求上下文 (JContext) 中。
3. 将每一个 ${name} 替换为相应的运行时值。
由于替换发生在 HTTP 调用之前，你可以在语法允许的任何地方放置占位符——无论是 URL 路径、查询字符串、请求头值、认证对还是请求体。

#### URLs and Paths
#### URL 与路径

```java
public interface GithubLikeApi {
    @JCurlCommand("curl -X GET 'https://api.example.com/repos/${owner}/${repo}/issues/${issueId}'")
    String getIssue(JQuickCurlReq request);
}

// Usage
JQuickCurlReq req = new JQuickCurlReq();
req.put("owner", "dromara");
req.put("repo", "jquick-curl");
req.put("issueId", 42);
String issue = proxy.getIssue(req); // GET /repos/dromara/jquick-curl/issues/42
```

#### Query Strings
#### 查询字符串

```java
@JCurlCommand("curl -X GET 'https://api.example.com/search?q=${query}&page=${page}&size=${size}'")
String search(JQuickCurlReq request);

JQuickCurlReq req = new JQuickCurlReq();
req.put("query", "http client");
req.put("page", 2);
req.put("size", 20);
```

#### Headers and Authentication Pairs
#### 请求头与认证对

Variables are not limited to URLs — credentials belong there too, so secrets never sit in source code:
变量不仅限于 URL，凭据也可以放在这里，这样密钥就不会出现在源代码中：

```java
public interface AuthApi {
    @JCurlCommand("curl -X GET 'https://api.example.com/me' " +
                  "-H 'Authorization: Bearer ${token}'")
    String currentUser(JQuickCurlReq request);

    @JCurlCommand("curl -u '${user}:${password}' https://api.example.com/account")
    String account(JQuickCurlReq request);
}

JQuickCurlReq req = new JQuickCurlReq();
req.put("token", System.getenv("API_TOKEN")); // never hard-code secrets
req.put("user", "demo");
req.put("password", System.getenv("API_PASSWORD"));
```

#### Request Bodies
#### 请求体

When the JSON body must change per call, build it in Java and substitute it:
当 JSON 请求体需要随每次调用而改变时，可以在 Java 中构建它并进行替换：

```java
@JCurlCommand("curl -X POST 'https://api.example.com/orders' " +
              "-H 'Content-Type: application/json' " +
              "-d '${payload}'")
String createOrder(JQuickCurlReq request);

String payload = "{\"customer\":\"Ada\",\"amount\":99.5,\"items\":[1,2,3]}";
JQuickCurlReq req = new JQuickCurlReq();
req.put("payload", payload);
```
*Careful: the body is inserted verbatim, so the JSON must already be valid (quotes, braces, commas) before substitution.*
*注意：请求体是逐字插入的，因此在替换之前，JSON 必须已经是有效的（引号、大括号、逗号必须正确）。*

### Method Parameters as Variables (Alternative Style)
### 作为变量的方法参数（替代风格）

Besides the JQuickCurlReq map, JQuickCurl can substitute ${name} from method parameter names when a method declares extra parameters — the placeholder must equal the Java parameter's name. This gives you compiler-visible signatures for static call sites:
除了 JQuickCurlReq 映射外，当方法声明了额外参数时，JQuickCurl 还可以从方法参数名中替换 ${name} —— 占位符必须与 Java 参数名一致。这为静态调用点提供了编译器可见的签名：

```java
public interface OrderApi {
    @JCurlCommand("curl -X GET 'https://api.example.com/orders/${orderId}'")
    String getOrder(JQuickCurlReq request);
}
```
For dynamic multi-value cases the map style is far more flexible, which is why the rest of this series standardizes on JQuickCurlReq.
对于动态多值的情况，Map 风格要灵活得多，这也是本系列后续内容统一使用 JQuickCurlReq 的原因。

### Quoting Rules and Escaping Cheat-Sheet
### 引号规则与转义速查表

| What you write | Meaning |
| :--- | :--- |
| 'https://…/${id}' | Single-quoted value with a variable — preferred style |
| "Authorization: Bearer ${token}" | Double-quoted value; you must escape as \" inside a Java annotation |
| -d '{"a":1}' | Body with double quotes → escape them in Java: "{\"a\":1}" |
| ${key} with a missing key | Left unresolved — the request context simply has no such entry |

| 你编写的内容 | 含义 |
| :--- | :--- |
| 'https://…/${id}' | 带变量的单引号值 —— 推荐风格 |
| "Authorization: Bearer ${token}" | 双引号值；在 Java 注解内必须转义为 \" |
| -d '{"a":1}' | 带双引号的请求体 → 在 Java 中转义为 "{\"a\":1}" |
| ${key} 缺失键 | 保持未解析状态 —— 请求上下文中只是没有该条目 |

*If a response surprises you, first check whether the placeholder key actually made it into JQuickCurlReq before the call (see Post 17's troubleshooting checklist).*
*如果响应结果令你意外，请首先检查占位符键在调用前是否确实已放入 JQuickCurlReq 中（请参阅第 17 篇的故障排除清单）。*

### Runnable Demo
### 可运行的演示

```java
import com.github.paohaijiao.anno.JCurlCommand;
import com.github.paohaijiao.domain.req.JQuickCurlReq;
import com.github.paohaijiao.executor.JCurlInvoker;

public interface EchoApi {
    @JCurlCommand("curl -X GET 'https://httpbin.org/anything/${channel}?trace=${traceId}' " +
                  "-H 'X-Scope: ${scope}'")
    String call(JQuickCurlReq request);
}

class VariableDemo {
    public static void main(String[] args) {
        EchoApi api = JCurlInvoker.createProxy(EchoApi.class);
        JQuickCurlReq req = new JQuickCurlReq();
        req.put("channel", "mobile");
        req.put("traceId", "trc-9911");
        req.put("scope", "readonly");
        System.out.println(api.call(req)); // httpbin echoes url, headers, args — showing every variable resolved.
    }
}
```

### Summary
### 总结

@JCurlCommand provides the executable surface (the curl string) and a small set of contract attributes, while ${name} placeholders supply the dynamism. Variables work anywhere in the command — path, query, headers, auth, and bodies — and their values come from the same JQuickCurlReq map that every method in this series already uses. Combined with the proxy pattern, one annotated command now serves an unlimited number of runtime requests.
@JCurlCommand 提供了可执行的表面（curl 字符串）和一组契约属性，而 ${name} 占位符则提供了动态性。变量可以在命令的任何地方使用——路径、查询、请求头、认证和请求体——它们的值来自本系列中每个方法都在使用的同一个 JQuickCurlReq 映射。结合代理模式，一个注解命令现在可以服务于无限数量的运行时请求。

Repository: [dromara/jquick-curl](https://github.com/dromara/jquick-curl). Post 6 applies this knowledge to the full REST alphabet — JSON GET, POST, PUT, and DELETE in annotation mode.
仓库地址：[dromara/jquick-curl](https://github.com/dromara/jquick-curl)。第 6 篇将这些知识应用于完整的 REST 操作——在注解模式下实现 JSON 的 GET、POST、PUT 和 DELETE。