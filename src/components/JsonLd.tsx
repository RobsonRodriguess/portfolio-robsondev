export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robson Rodrigues",
    url: "https://robsondev.vercel.app",
    jobTitle: "Software Engineer",
    description: "Software Engineer specialized in Next.js, React, TypeScript, and fullstack development. Based in Brasília, DF.",
    address: {
      "@type": "Place",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    sameAs: [
      "https://github.com/RobsonRodriguess",
      "https://www.linkedin.com/in/robson-rodrigues-dev/",
    ],
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Python", "Docker"],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
