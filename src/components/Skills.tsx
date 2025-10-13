"use client";
import React from "react";
import { LogoLoop } from "@/components/LogoLoop";
import SparklesTitle from "@/components/ui/SparklesTitle";

const logosRow1 = [
  {
    src: "/logos/html5.svg",
    alt: "HTML5",
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    src: "/logos/css3.svg",
    alt: "CSS3",
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    src: "/logos/javascript.svg",
    alt: "JavaScript",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    src: "/logos/typescript.svg",
    alt: "TypeScript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  {
    src: "/logos/csharp.svg",
    alt: "C#",
    title: "C#",
    href: "https://dotnet.microsoft.com/en-us/languages/csharp",
  },
  {
    src: "/logos/mysql.svg",
    alt: "MySQL",
    title: "MySQL",
    href: "https://www.mysql.com/",
  },
  {
    src: "/logos/php.svg",
    alt: "PHP",
    title: "PHP",
    href: "https://www.php.net/",
  },
  {
    src: "/logos/bash.svg",
    alt: "Bash",
    title: "Bash",
    href: "https://www.gnu.org/software/bash/",
  },
  {
    src: "/logos/java.svg",
    alt: "Java",
    title: "Java",
    href: "https://www.java.com/",
  },
  {
    src: "/logos/sass.svg",
    alt: "SASS",
    title: "SASS",
    href: "https://sass-lang.com/",
  },
  {
    src: "/logos/react.svg",
    alt: "React",
    title: "React",
    href: "https://react.dev/",
  },
  {
    src: "/logos/nextjs.svg",
    alt: "Next.js",
    title: "Next.js",
    href: "https://nextjs.org/",
  },
  {
    src: "/logos/materialui.svg",
    alt: "Material-UI",
    title: "Material-UI",
    href: "https://mui.com/",
  },
  {
    src: "/logos/angular.svg",
    alt: "Angular",
    title: "Angular",
    href: "https://angular.dev/",
  },
  {
    src: "/logos/git.svg",
    alt: "Git",
    title: "Git",
    href: "https://git-scm.com/",
  },
  {
    src: "/logos/github.svg",
    alt: "GitHub",
    title: "GitHub",
    href: "https://github.com/",
  },
  {
    src: "/logos/nodejs.svg",
    alt: "Node.js",
    title: "Node.js",
    href: "https://nodejs.org/",
  },
  {
    src: "/logos/dotnetcore.svg",
    alt: "ASP.NET",
    title: "ASP.NET",
    href: "https://dotnet.microsoft.com/en-us/apps/aspnet",
  },
  {
    src: "/logos/jira.svg",
    alt: "Jira",
    title: "Jira",
    href: "https://www.atlassian.com/software/jira",
  },
  {
    src: "/logos/graphql.svg",
    alt: "GraphQL",
    title: "GraphQL",
    href: "https://graphql.org/",
  },
  {
    src: "/logos/docker.svg",
    alt: "Docker",
    title: "Docker",
    href: "https://www.docker.com/",
  },
  {
    src: "/logos/aws.svg",
    alt: "AWS",
    title: "AWS",
    href: "https://aws.amazon.com/",
  },
  {
    src: "/logos/digitalocean.svg",
    alt: "DigitalOcean",
    title: "DigitalOcean",
    href: "https://www.digitalocean.com/",
  },
  {
    src: "/logos/figma.svg",
    alt: "Figma",
    title: "Figma",
    href: "https://www.figma.com/",
  },
];

const logosRow2 = [
  {
    src: "/logos/typescript.svg",
    alt: "TypeScript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  {
    src: "/logos/react.svg",
    alt: "React",
    title: "React",
    href: "https://react.dev/",
  },
  {
    src: "/logos/nextjs.svg",
    alt: "Next.js",
    title: "Next.js",
    href: "https://nextjs.org/",
  },
  {
    src: "/logos/nodejs.svg",
    alt: "Node.js",
    title: "Node.js",
    href: "https://nodejs.org/",
  },
  {
    src: "/logos/docker.svg",
    alt: "Docker",
    title: "Docker",
    href: "https://www.docker.com/",
  },
  {
    src: "/logos/aws.svg",
    alt: "AWS",
    title: "AWS",
    href: "https://aws.amazon.com/",
  },
  {
    src: "/logos/git.svg",
    alt: "Git",
    title: "Git",
    href: "https://git-scm.com/",
  },
  {
    src: "/logos/github.svg",
    alt: "GitHub",
    title: "GitHub",
    href: "https://github.com/",
  },
  {
    src: "/logos/angular.svg",
    alt: "Angular",
    title: "Angular",
    href: "https://angular.dev/",
  },
  {
    src: "/logos/materialui.svg",
    alt: "Material-UI",
    title: "Material-UI",
    href: "https://mui.com/",
  },
  {
    src: "/logos/sass.svg",
    alt: "SASS",
    title: "SASS",
    href: "https://sass-lang.com/",
  },
  {
    src: "/logos/css3.svg",
    alt: "CSS3",
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    src: "/logos/html5.svg",
    alt: "HTML5",
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    src: "/logos/javascript.svg",
    alt: "JavaScript",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    src: "/logos/php.svg",
    alt: "PHP",
    title: "PHP",
    href: "https://www.php.net/",
  },
  {
    src: "/logos/java.svg",
    alt: "Java",
    title: "Java",
    href: "https://www.java.com/",
  },
  {
    src: "/logos/mysql.svg",
    alt: "MySQL",
    title: "MySQL",
    href: "https://www.mysql.com/",
  },
  {
    src: "/logos/csharp.svg",
    alt: "C#",
    title: "C#",
    href: "https://dotnet.microsoft.com/en-us/languages/csharp",
  },
  {
    src: "/logos/dotnetcore.svg",
    alt: "ASP.NET",
    title: "ASP.NET",
    href: "https://dotnet.microsoft.com/en-us/apps/aspnet",
  },
  {
    src: "/logos/jira.svg",
    alt: "Jira",
    title: "Jira",
    href: "https://www.atlassian.com/software/jira",
  },
  {
    src: "/logos/graphql.svg",
    alt: "GraphQL",
    title: "GraphQL",
    href: "https://graphql.org/",
  },
  {
    src: "/logos/digitalocean.svg",
    alt: "DigitalOcean",
    title: "DigitalOcean",
    href: "https://www.digitalocean.com/",
  },
  {
    src: "/logos/figma.svg",
    alt: "Figma",
    title: "Figma",
    href: "https://www.figma.com/",
  },
];

export default function Skills() {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center text-3xl font-semibold text-gray-900 dark:text-white">
          <SparklesTitle>Skills</SparklesTitle>
        </h2>
        <div className="space-y-10">
          <div className="h-20">
            <LogoLoop
              logos={logosRow1}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#f9fafb"
              ariaLabel="Technology skills"
            />
          </div>
          <div className="h-20">
            <LogoLoop
              logos={logosRow2}
              speed={120}
              direction="right"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#f9fafb"
              ariaLabel="Technology skills"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
