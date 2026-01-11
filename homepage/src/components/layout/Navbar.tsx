import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Button } from "../ui/button";

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
      <div className="container flex h-14 max-w-screen-xl items-center mx-auto px-4 justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img src="/react-pdftotext/lib_icon.png" alt="react-pdftotext logo" className="h-8 w-auto" />
          <span className="font-bold text-lg hidden sm:inline-block">
            react-pdftotext
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("demo")}
            className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
          >
            Demo
          </button>
          <button
            onClick={() => scrollToSection("docs")}
            className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
          >
            Documentation
          </button>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Utkarsh212/react-pdftotext"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
