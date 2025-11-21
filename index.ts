import { pdfjs } from "react-pdf";
import calculateStartLine from "./aux-funcitons";

// Path to the pdf.worker.js file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

/**
 * Extracts text content from a PDF file.
 * @param {File | Blob | MediaSource} file - The PDF file to extract text from.
 * @returns {Promise<string>} A promise that resolves with the extracted text content.
 */
const pdfToText = async (file: File | Blob | MediaSource): Promise<string> => {
  // Create a blob URL for the PDF file
  const blobUrl = URL.createObjectURL(file);

  // Load the PDF file
  const loadingTask = pdfjs.getDocument(blobUrl);

  let extractedText = "";
  try {
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Iterate through each page and extract text
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
      extractedText += pageText;
    }
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error}`);
  } finally {
    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);

    // Free memory from loading task
    loadingTask.destroy();
  }

  return extractedText;
};

/**
 * Extracts text content from a PDF file.
 * @param {File | Blob | MediaSource} file - The PDF file to extract text from.
 * @param lineSpacing - is space inter line an line standart
 * @returns {Promise<string>} A promise that resolves with the extracted text content.
 */
const pdfToTextLikePDF = async (file: File | Blob | MediaSource, lineSpacing: number = 1): Promise<string> => {
  // Create a blob URL for the PDF file
  const blobUrl = URL.createObjectURL(file);

  // Load the PDF file
  const loadingTask = pdfjs.getDocument(blobUrl);

  let extractedText = "";
  try {
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Iterate through each page and extract text
    let lastPage = 1

    let sizeFontProm = 10;
    let totalFontSize = 0;
    let totalTokens = 0;

    let controlPosX: {[key: string]: number} = {}
    for (let pageNumber = 1; pageNumber <= numPages && pageNumber <= 5; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      textContent.items.map((item) => {
        if("height" in item){
          if(item.height > 3 && item.str){
            totalFontSize = totalFontSize + item.height;
            totalTokens++
          }

          const name: string =(((item.transform[4]).toString()).split ('.'))[0]
          controlPosX[name] = (controlPosX[name] || 0) + 1 
        }
      })
    }
    sizeFontProm = totalFontSize/totalTokens;

    const startLine = calculateStartLine(controlPosX);

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
             
      let lastToken = ''
      let lastLastPositionY = 0
      let lastPositionY = 0

      const pageText = textContent.items
        .map((item, index) => {
          if("str" in item){
            lastToken = ''

            lastLastPositionY = lastPositionY
            lastPositionY = item.transform[5]

            //Encabezado
            if(lastLastPositionY >= 790){
              lastToken = '\n'
            }
            //Is end of Page?
            if(lastPage < pageNumber && pageNumber !== 1){
              lastToken = '\n',
              lastPage++
            }

            //Is end of line
            if(index > 1 && (lastLastPositionY-(sizeFontProm*1.6*lineSpacing) > item.transform[5])){
              lastToken = '\n'
            }

            //Is new parrafo
            if(lastLastPositionY-(sizeFontProm*lineSpacing) > item.transform[5] 
              && item.transform[4] > startLine
            ){
              lastToken = '\n'
            }

            //Is a foot of page
            if((index > 0 && lastLastPositionY < item.transform[5] )){
              lastToken = '\n'
            }

            //Is a jump
            if(lastPositionY === 0){
              lastToken = '\n'
            }

            return lastToken + (item.str === ''? ' ': '') + item.str
          }})
        .join('');
      extractedText += pageText;
    }
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error}`);
  } finally {
    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);

    // Free memory from loading task
    loadingTask.destroy();
  }
  return extractedText;
};

const selectModeToExtract = async (file: File | Blob | MediaSource, mode: 'simple' | 'advanced', lineSpacing: number = 1): Promise<string> => {
  if (mode === 'simple') {
    return pdfToText(file);
  } else {
    return pdfToTextLikePDF(file,lineSpacing);
  }
}

export default selectModeToExtract;
