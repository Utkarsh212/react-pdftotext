# react-pdftotext-advanced

This is a library based on "react-pdftotext" that aims to format text for readability without requiring extensive coding.

This version separates paragraph and page endings, taking into account expected spacing and page breaks.

## Installing

Using npm:

```js
npm install react-pdftotext-advanced
```

## Example

**Local File Input**

Now add a input tag with type="file" to take file input.

```html
<input type="file" accept="application/pdf" onChange={extractText} />
```

Import the pdf2text function from package

```ts
//simple mode
//input Base text
//Good morning everyone.
//
//How are you all?
//
//I hope you're well.
import pdfToText from "react-pdftotext-advanced";

function extractText(event) {
  const file = event.target.files[0];
  selectModeToExtract(file, 'simple')
    .then((text) => console.log(text))
    .catch((error) => console.error("Failed to extract text from pdf"));
}
//output Base text
// Good morning everyone.How are you all?I hope you're well.
```

```ts
//Advanced mode
//input text
//Good morning everyone.
//
//How are you all?
//
//I hope you're well.
import pdfToText from "react-pdftotext-advanced";

function extractText(event) {
  const file = event.target.files[0];
  selectModeToExtract(file, 'simple')
    .then((text) => console.log(text))
    .catch((error) => console.error("Failed to extract text from pdf"));
}
//output text
//Good morning everyone.
//
//How are you all?
//
//I hope you're well.
```

## Contributing

This project welcomes contributions and suggestions.
