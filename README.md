# react-pdftotext-advanced

A browser-based PDF text extraction library that preserves the original reading experience by reconstructing paragraphs and page breaks.

Unlike the original `react-pdftotext`, which returns a continuous stream of text, **react-pdftotext-advanced** analyzes the extracted content to preserve paragraph separation and page spacing, producing text that is much closer to the original document.

## Why?

Most browser PDF extraction libraries prioritize extracting text, not readability.

For example, a document like this:

```text
Good morning everyone.

How are you all?

I hope you're well.
```

may become:

```text
Good morning everyone.How are you all?I hope you're well.
```

With **react-pdftotext-advanced**, the output becomes:

```text
Good morning everyone.

How are you all?

I hope you're well.
```

This makes the extracted text much easier to:

- Read
- Display
- Process with AI models (LLMs)
- Index
- Summarize
- Search

---

# Features

- Preserves paragraph separation.
- Detects page endings.
- Produces human-readable output.
- Runs entirely in the browser.
- No backend required.
- Promise-based API.
- Easy integration with React applications.

---

# Installation

```bash
npm install react-pdftotext-advanced
```

---

# Basic Usage

```tsx
import pdfToText from "react-pdftotext-advanced";

function extractText(event) {
    const file = event.target.files[0];

    pdfToText(file, "advanced")
        .then((text) => console.log(text))
        .catch((error) => console.error(error));
}
```

```html
<input
    type="file"
    accept="application/pdf"
    onChange={extractText}
/>
```

---

# Extraction Modes

## Simple

Returns the text using the original extraction behavior.

```ts
pdfToText(file, "simple");
```

Output

```text
Good morning everyone.How are you all?I hope you're well.
```

---

## Advanced

Reconstructs paragraph breaks and page spacing for improved readability.

```ts
pdfToText(file, "advanced");
```

Output

```text
Good morning everyone.

How are you all?

I hope you're well.
```

---

# Use Cases

This library is particularly useful for:

- Reading letters and documents
- AI preprocessing (LLMs)
- Retrieval-Augmented Generation (RAG)
- Search indexing
- Document summarization
- PDF viewers
- Educational platforms

---

# How It Works

After extracting the raw text from the PDF, the library analyzes spacing and page transitions to reconstruct the document's logical reading order.

Instead of returning a continuous stream of text, it attempts to preserve the visual structure that a reader expects.

---

# Browser Support

Supports modern browsers that are compatible with PDF.js.

---

# Credits

This project is based on the excellent work of **react-pdftotext** and extends its functionality by improving the readability of the extracted text.

---

# Contributing

Contributions, bug reports and feature requests are always welcome.

If you have ideas for improving text reconstruction or supporting additional document layouts, feel free to open an issue or submit a pull request.

---

# License

MIT