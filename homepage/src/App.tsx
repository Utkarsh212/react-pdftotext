import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { Demo } from "./components/sections/Demo";
import { Docs } from "./components/sections/Docs";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/20">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Demo />
        <Docs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
