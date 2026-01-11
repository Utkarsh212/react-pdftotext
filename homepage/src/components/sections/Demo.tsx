import { useState, type ChangeEvent } from "react";
import pdfToText from "react-pdftotext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faSpinner,
  faCopy,
  faCheck,
  faFilePdf,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";

export function Demo() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = "";

    processFile(file);
  };

  const resetFile = () => {
    setFileName(null);
    setText("");
    setLoading(false);
  };

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFileName(file.name);
    setLoading(true);
    setText("");

    try {
      const extractedText = await pdfToText(file);
      setText(extractedText);
    } catch (error) {
      console.error(error);
      setText("Error extracting text. Please checks the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="demo"
      className="container mx-auto px-4 py-24 scroll-mt-16 max-w-screen-xl relative"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10 animate-pulse-slow"></div>

      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          See it in action
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Experience the magic of client-side extraction speed. Upload a PDF
          below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start h-full animate-fade-in-up delay-100">
        <Card className="h-full min-h-[500px] flex flex-col overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 bg-slate-50 border-b border-slate-100 h-[88px]">
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-white border shadow-sm">
                <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
              </div>
              Upload PDF
            </CardTitle>
            {fileName && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFile}
                className="text-slate-500 hover:text-red-600 hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                Reset
              </Button>
            )}
          </CardHeader>
          <CardContent
            className="flex-1 flex flex-col items-center justify-center p-8 m-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-all duration-300 relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div
              className={`transition-transform duration-300 ${
                isHovering ? "scale-110" : "scale-100"
              }`}
            >
              <div className="p-6 rounded-full bg-white shadow-lg text-blue-600 mb-6 mx-auto w-fit">
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="h-10 w-10"
                />
              </div>
            </div>

            <div className="text-center z-0">
              <p className="font-semibold text-xl text-slate-700">
                {fileName ? fileName : "Click or Drag PDF here"}
              </p>
              <p className="text-slate-500 mt-2">
                {fileName ? "Ready to extract again" : "Supports .pdf files"}
              </p>
            </div>

            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl transition-all">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="h-12 w-12 text-blue-600 mb-4"
                />
                <span className="font-medium text-lg text-slate-700 animate-pulse">
                  Extracting text...
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-full min-h-[500px] flex flex-col overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 bg-slate-50 border-b border-slate-100 h-[88px]">
            <CardTitle>Extracted Text</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!text}
              className={
                copied ? "border-green-500 text-green-600 bg-green-50" : ""
              }
            >
              {copied ? (
                <>
                  <FontAwesomeIcon icon={faCheck} />{" "}
                  <span className="ml-2">Copied</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCopy} />{" "}
                  <span className="ml-2">Copy</span>
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative bg-slate-50/50">
            <div className="absolute inset-0 p-4">
              <textarea
                className="w-full h-full p-4 resize-none bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm font-mono leading-relaxed text-slate-700 custom-scrollbar focus:outline-none shadow-sm"
                placeholder="Text output will appear here..."
                value={text}
                readOnly
              />
            </div>
            {!text && !loading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-slate-400 bg-white/80 px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  Waiting for input...
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
