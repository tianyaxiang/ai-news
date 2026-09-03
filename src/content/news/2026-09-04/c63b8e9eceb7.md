---
title: "Tables in PDFs for RAG: Don’t Flatten the Grid"
originalUrl: "https://towardsdatascience.com/tables-in-pdfs-for-rag-dont-flatten-the-grid/"
date: "2026-09-03T23:31:15.787Z"
---

# Tables in PDFs for RAG: Don’t Flatten the Grid
# RAG 中的 PDF 表格：别把网格“拍扁”

The number you need sits in a table, at the intersection of a row and a column. Flatten the PDF to text and that intersection is gone: the label lands in one place, the value in another, and the model is left guessing which number belongs to which row. Tables are where naive parsing quietly loses the answer.
你需要的数据位于表格中，处于行与列的交汇处。如果你将 PDF 拍扁为纯文本，这种交汇关系就会消失：标签落在了一处，数值落在了另一处，模型只能猜测哪个数字属于哪一行。表格正是简单粗暴的解析方式悄无声息地丢失答案的地方。

This article is a bonus in Enterprise Document Intelligence, a series that builds an enterprise RAG system from four bricks. Tables in PDFs: a diagnostic and five composable operations that keep the grid, instead of a decision tree.
本文是《企业文档智能》（Enterprise Document Intelligence）系列的番外篇，该系列旨在通过四个基础模块构建企业级 RAG 系统。关于 PDF 中的表格：本文提供了一种诊断方法和五种可组合的操作，旨在保留表格的网格结构，而不是将其变成决策树。

The standard RAG pipeline reads a PDF, chunks it into text, embeds the chunks, and retrieves the closest match. The pipeline handles bullet points and paragraphs fine. The moment the answer to a question lives inside a table cell, the standard pipeline starts hallucinating numbers, and often nobody notices until an auditor opens the source document.
标准的 RAG 流水线读取 PDF，将其分块为文本，对分块进行向量化，并检索最匹配的内容。这种流水线处理项目符号和段落效果很好。但一旦问题的答案位于表格单元格内，标准流水线就开始产生数字幻觉，而且通常在审计员打开源文档之前，没人会注意到这一点。

This article is about why tables break enterprise RAG, and what to do instead. It is positioned as a bonus because tables touch all four bricks (document parsing, question parsing, retrieval, generation) and none of the main articles owns the topic alone.
本文旨在探讨为什么表格会破坏企业级 RAG，以及该如何应对。之所以将其作为番外篇，是因为表格涉及所有四个基础模块（文档解析、问题解析、检索、生成），而主系列文章中没有哪一篇能单独涵盖这一主题。

### 1. Why tables break the pipeline
### 1. 为什么表格会破坏流水线

A table in a PDF is not a table in the data sense. It is a set of rectangles drawn on a page, with text positioned in cells, often without explicit row or column markers. The parser has to reconstruct the grid from spatial geometry. Sometimes it succeeds and you get a clean DataFrame. Often it does not.
PDF 中的表格在数据层面并非真正的表格。它只是一组绘制在页面上的矩形，文本被放置在单元格中，通常没有明确的行或列标记。解析器必须根据空间几何结构来重建网格。有时它能成功，你会得到一个干净的 DataFrame；但更多时候，它会失败。

When it does not, three things go wrong at once. First, the row and column structure is lost, so the LLM downstream sees a stream of values with no relational meaning. Second, the header is often only on the first page of a multi-page table, so pages two onward become numerical noise. Third, the line-level citation discipline of Article 8 breaks down because there is no way to point at “row 47” when row 47 was never reconstructed as a row.
当解析失败时，会同时出现三个问题。首先，行和列的结构丢失，导致下游的 LLM 看到的是一串没有关系意义的数值。其次，多页表格的表头通常只出现在第一页，因此从第二页开始的内容就变成了数字噪音。第三，第 8 篇文章中提到的行级引用规范失效了，因为当第 47 行从未被重建为“行”时，就无法指向“第 47 行”。

### 2. Four ways to represent a table
### 2. 表示表格的四种方式

The same table can live in the pipeline at four different levels of structure. Picking the right level for each table is the first design decision, before any operation runs.
同一个表格在流水线中可以以四种不同的结构层级存在。在执行任何操作之前，为每个表格选择合适的层级是首要的设计决策。

**A. Row-as-line in line_df is the default.** It is what the parser produces naturally, and it is enough for any question whose answer reads from the table the same way it reads from prose. Each row of the table becomes one row of line_df with _type="table" and the text rendered as a Markdown pipe row (| col1 | col2 | col3 |).
**A. line_df 中的“行即文本”是默认方式。** 这是解析器自然产生的结果，对于那些答案读取方式与阅读普通段落相同的表格问题来说，这已经足够了。表格的每一行都成为 line_df 中的一行，其 _type="table"，文本渲染为 Markdown 的管道行格式（| col1 | col2 | col3 |）。

**B. Separate table_df.** When you need to operate on the 2D shape, you lift the table out of line_df into its own DataFrame, with column headers preserved as DataFrame columns and rows as DataFrame rows. The line_df keeps a placeholder line pointing at the table by id.
**B. 独立的 table_df。** 当你需要对二维结构进行操作时，可以将表格从 line_df 中提取出来，放入其独立的 DataFrame 中，保留列标题作为 DataFrame 的列，行作为 DataFrame 的行。line_df 则保留一个占位行，通过 ID 指向该表格。

**C. Columnar extraction with named, typed columns.** Some tables recur across documents in a stable shape: an insurance contract’s premium table, a financial statement’s income summary, a regulatory schedule with fixed fields. These are not “tables in a PDF” anymore. They are data that the producer happened to provide as PDF because PDF was the distribution format. The right move is to restore that original form. Lift the tables into a columnar store at ingestion time, indexed by document id and table id.
**C. 带有命名和类型化列的列式提取。** 有些表格在不同文档中以稳定的形式反复出现：保险合同的保费表、财务报表的收入摘要、带有固定字段的监管时间表。这些不再是“PDF 中的表格”，而是生产者恰好以 PDF 格式提供的原始数据，因为 PDF 只是分发格式。正确的做法是恢复其原始形式。在摄入时将这些表格提取到列式存储中，并按文档 ID 和表格 ID 进行索引。