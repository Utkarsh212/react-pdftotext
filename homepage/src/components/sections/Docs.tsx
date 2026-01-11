import { useState } from "react";

import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

function CodeSnippet({
  code,
  children,
}: {
  code: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden transition-all hover:shadow-lg duration-300">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          onClick={handleCopy}
        >
          <FontAwesomeIcon
            icon={copied ? faCheck : faCopy}
            className={copied ? "text-green-500" : "h-3.5 w-3.5"}
          />
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <div className="p-5 font-mono text-sm overflow-x-auto whitespace-pre bg-white">
        {children || code}
      </div>
    </div>
  );
}

export function Docs() {
  return (
    <section
      id="docs"
      className="container mx-auto px-4 py-16 scroll-mt-16 max-w-screen-xl"
    >
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Documentation
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to integrate react-pdftotext in your project.
        </p>
      </div>

      <div className="space-y-16 mx-auto">
        <div className="space-y-6 animate-fade-in-up delay-100">
          <h3 className="text-2xl font-semibold border-b pb-2">Installation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium mb-3 text-slate-600">
                Using npm
              </p>
              <CodeSnippet code="npm install react-pdftotext">
                <pre className="bg-transparent p-0 m-0">
                  <span className="text-purple-700">npm</span> install{" "}
                  <span className="text-green-600">react-pdftotext</span>
                </pre>
              </CodeSnippet>
            </div>
            <div>
              <p className="text-sm font-medium mb-3 text-slate-600">
                Using yarn
              </p>
              <CodeSnippet code="yarn add react-pdftotext">
                <pre className="bg-transparent p-0 m-0">
                  <span className="text-purple-700">yarn</span> add{" "}
                  <span className="text-green-600">react-pdftotext</span>
                </pre>
              </CodeSnippet>
            </div>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in-up delay-200">
          <h3 className="text-2xl font-semibold border-b pb-2">
            Usage: Local File
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Extract text from a file uploaded by the user via an input element.
          </p>
          <CodeSnippet
            code={`import pdfToText from 'react-pdftotext'

function FileUploadComponent() {
    const handleFile = async (event) => {
        const file = event.target.files[0]
        try {
            const text = await pdfToText(file)
            console.log(text)
        } catch (error) {
            console.error("Failed to extract text", error)
        }
    }

    return (
        <input type="file" accept="application/pdf" onChange={handleFile} />
    )
}`}
          >
            <pre className="bg-transparent p-0 m-0 font-mono text-sm leading-relaxed text-slate-700">
              <span className="text-purple-700">import</span>{" "}
              <span className="text-blue-600">pdfToText</span>{" "}
              <span className="text-purple-700">from</span>{" "}
              <span className="text-green-600">'react-pdftotext'</span>
              {"\n\n"}
              <span className="text-purple-700">function</span>{" "}
              <span className="text-blue-600">FileUploadComponent</span>() {"{"}
              {"\n    "}
              <span className="text-purple-700">const</span>{" "}
              <span className="text-blue-600">handleFile</span> ={" "}
              <span className="text-purple-700">async</span> (event) ={">"}{" "}
              {"{"}
              {"\n        "}
              <span className="text-purple-700">const</span> file =
              event.target.files[0]
              {"\n        "}
              <span className="text-purple-700">try</span> {"{"}
              {"\n            "}
              <span className="text-purple-700">const</span> text ={" "}
              <span className="text-purple-700">await</span>{" "}
              <span className="text-blue-600">pdfToText</span>(file)
              {"\n            "}console.
              <span className="text-blue-600">log</span>(text)
              {"\n        "}
              {"}"} <span className="text-purple-700">catch</span> (error) {"{"}
              {"\n            "}console.
              <span className="text-blue-600">error</span>(
              <span className="text-green-600">"Failed to extract text"</span>,
              error)
              {"\n        "}
              {"}"}
              {"\n    "}
              {"}"}
              {"\n\n"}
              {"    "}
              <span className="text-purple-700">return</span> ({"\n        "}
              &lt;
              <span className="text-amber-700">input</span>{" "}
              <span className="text-cyan-700">type</span>=
              <span className="text-green-600">"file"</span>{" "}
              <span className="text-cyan-700">accept</span>=
              <span className="text-green-600">"application/pdf"</span>{" "}
              <span className="text-cyan-700">onChange</span>={"{"}
              <span className="text-blue-600">handleFile</span>
              {"}"} /&gt;
              {"\n    "}
              {")\n"}
              {"}"}
            </pre>
          </CodeSnippet>
        </div>

        <div className="space-y-6 animate-fade-in-up delay-300">
          <h3 className="text-2xl font-semibold border-b pb-2">
            Usage: Remote URL
          </h3>
          <p className="text-slate-600 leading-relaxed">
            To extract text from a remote PDF URL, you must first fetch the file
            and convert it to a Blob.
          </p>
          <CodeSnippet
            code={`import pdfToText from 'react-pdftotext'

async function extractFromUrl(url) {
    try {
        const response = await fetch(url)
        const blob = await response.blob()
        const text = await pdfToText(blob)
        console.log(text)
    } catch (error) {
        console.error("Failed to extract text from URL", error)
    }
}

// Example usage
// extractFromUrl('https://example.com/sample.pdf')`}
          >
            <pre className="bg-transparent p-0 m-0 font-mono text-sm leading-relaxed text-slate-700">
              <span className="text-purple-700">import</span>{" "}
              <span className="text-blue-600">pdfToText</span>{" "}
              <span className="text-purple-700">from</span>{" "}
              <span className="text-green-600">'react-pdftotext'</span>
              {"\n\n"}
              <span className="text-purple-700">async function</span>{" "}
              <span className="text-blue-600">extractFromUrl</span>(url) {"{"}
              {"\n    "}
              <span className="text-purple-700">try</span> {"{"}
              {"\n        "}
              <span className="text-purple-700">const</span> response ={" "}
              <span className="text-purple-700">await</span>{" "}
              <span className="text-blue-600">fetch</span>(url)
              {"\n        "}
              <span className="text-purple-700">const</span> blob ={" "}
              <span className="text-purple-700">await</span> response.blob()
              {"\n        "}
              <span className="text-purple-700">const</span> text ={" "}
              <span className="text-purple-700">await</span>{" "}
              <span className="text-blue-600">pdfToText</span>(blob)
              {"\n        "}console.<span className="text-blue-600">log</span>
              (text)
              {"\n    "}
              {"}"} <span className="text-purple-700">catch</span> (error) {"{"}
              {"\n        "}console.
              <span className="text-blue-600">error</span>(
              <span className="text-green-600">
                "Failed to extract text from URL"
              </span>
              , error)
              {"\n    "}
              {"}"}
              {"\n"}
              {"}"}
              {"\n\n"}
              <span className="text-slate-500">// Example usage</span>
              {"\n"}
              <span className="text-slate-500">
                // extractFromUrl('https://example.com/sample.pdf')
              </span>
            </pre>
          </CodeSnippet>
        </div>

        <div className="space-y-6 animate-fade-in-up delay-300">
          <h3 className="text-2xl font-semibold border-b pb-2">
            API Reference
          </h3>
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 font-semibold text-slate-700">
                <tr>
                  <th className="p-4 border-b border-slate-100">Function</th>
                  <th className="p-4 border-b border-slate-100">Argument</th>
                  <th className="p-4 border-b border-slate-100">Return Type</th>
                  <th className="p-4 border-b border-slate-100">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono text-blue-600">pdfToText</td>
                  <td className="p-4 font-mono text-purple-600">
                    file: File | Blob
                  </td>
                  <td className="p-4 font-mono text-slate-600">
                    Promise&lt;string&gt;
                  </td>
                  <td className="p-4 text-slate-600">
                    Asynchronously parses PDF content and returns extracted
                    text.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
