import Hero from "@/components/Hero";
import WorkExperience, { ExperienceItem } from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

const experiences: ExperienceItem[] = [
  {
    role: "Principal Software Engineer",
    company: "VML",
    period: "Feb 2024 — Present",
    description:
      "Architecting high-performance web experiences with Next.js, TypeScript, and Tailwind CSS; leading front-end strategy, 3D/GSAP animations, and AI-assisted dev workflows. Focused on scalability, DX, and design precision across Sitecore Headless and experimentation stacks.",
  },
  {
    role: "Senior Software Engineer",
    company: "Wunderman Thompson (now VML)",
    period: "Oct 2023 — Jan 2024",
    description:
      "Implemented front-end solutions in TypeScript/Next.js, optimized build and release flows, and contributed to design systems and experimentation.",
  },
  {
    role: "Mid‑Senior Software Engineer",
    company: "Mirum Agency (now VML)",
    period: "Oct 2022 — Sep 2023",
    description:
      "Built modern, responsive interfaces, introduced animation best practices with GSAP/Three.js, and streamlined team workflows with tooling and testing improvements.",
  },
];

export default function Home() {
  return (
    <main className="min-h-svh bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Hero />
      <WorkExperience items={experiences} />
      <Projects />
      <Skills />
    </main>
  );
}
