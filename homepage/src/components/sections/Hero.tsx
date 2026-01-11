import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { usePackageMetadata } from "../../hooks/usePackageMetadata";

export function Hero() {
  const { version, loading } = usePackageMetadata();
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="container grid items-center gap-12 pb-8 pt-6 md:py-10 mx-auto px-4 max-w-screen-xl lg:grid-cols-2 lg:py-24 animate-fade-in"
    >
      <div className="flex flex-col items-start gap-6 animate-fade-in-up">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-slate-50 transition-colors hover:bg-slate-100">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
          {loading ? (
            <span className="w-16 h-4 bg-slate-200 rounded animate-pulse"></span>
          ) : (
            `v${version ?? "..."} Available Now`
          )}
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:leading-[1.1]">
          Extract text from PDFs <br className="hidden sm:inline" />
          in{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            React
          </span>
          .
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
          A lightweight, client-side library to extract text from PDF files
          accurately and efficiently. No backend required.
        </p>
        <div className="flex gap-4 mt-2">
          <Button
            size="lg"
            onClick={scrollToDemo}
            className="group gap-2 text-base font-semibold px-8 h-12 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Try the Demo{" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              document
                .getElementById("docs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-base font-medium h-12 px-8"
          >
            Read Docs
          </Button>
        </div>
      </div>

      <div className="hidden lg:flex justify-center animate-fade-in-up delay-200">
        <div className="relative rounded-2xl border bg-white p-8 shadow-2xl transition-transform hover:scale-[1.02] duration-500 w-full max-w-lg rotate-1">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse-slow"></div>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          <pre className="text-sm font-mono text-slate-800 leading-7 overflow-x-auto">
            <code className="text-blue-600">import</code>{" "}
            <span className="text-purple-600">pdfToText</span>{" "}
            <code className="text-blue-600">from</code>{" "}
            <span className="text-green-600">'react-pdftotext'</span>
            <br />
            <br />
            <code className="text-purple-600">function</code>{" "}
            <span className="text-yellow-600">extract</span>(file) {"{"} <br />
            &nbsp;&nbsp;<span className="text-purple-600">pdfToText</span>(file)
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-600">then</span>
            (text ={">"} console.<span className="text-yellow-600">log</span>
            (text))
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;.
            <span className="text-blue-600">catch</span>(error ={">"} console.
            <span className="text-yellow-600">error</span>(error))
            <br />
            {"}"}
          </pre>
        </div>
      </div>
    </section>
  );
}
