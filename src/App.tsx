import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Nav } from "./components/Nav";
import { Closing } from "./sections/Closing";
import { Grading } from "./sections/Grading";
import { Hero } from "./sections/Hero";
import { Spectrum } from "./sections/Spectrum";
import { Tools } from "./sections/Tools";
import { Workflow } from "./sections/Workflow";

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("meta.title");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t("meta.description"));
  }, [t, i18n.language]);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <Nav />
      <main>
        <Hero />
        <Tools />
        <Spectrum />
        <Grading />
        <Workflow />
        <Closing />
      </main>
    </div>
  );
}
