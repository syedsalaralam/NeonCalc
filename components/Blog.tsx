import React from 'react';

const Blog: React.FC = () => {
  const articles = [
    {
      title: "Understanding Trigonometry in Modern Engineering",
      date: "Oct 24, 2023",
      category: "Mathematics",
      content: "Trigonometry is a branch of mathematics that studies relationships between side lengths and angles of triangles. In the modern era, functions like Sine, Cosine, and Tangent are used to model periodic phenomena—from the waves in the ocean to the alternating current that powers our homes. When you use the 'sin' button on our scientific calculator, you're tapping into a mathematical lineage that dates back to ancient Greece and India. Modern engineers use these calculations to design bridges, analyze structural integrity, and even program the physics engines for your favorite video games."
    },
    {
      title: "The Evolution of Digital Data Measurement",
      date: "Oct 22, 2023",
      category: "Technology",
      content: "As we move into the era of big data, understanding the scale of digital storage is paramount. A byte, consisting of 8 bits, was once a significant amount of data. Today, we measure consumer hard drives in Terabytes (TB) and data centers in Petabytes (PB). Our data converter helps bridge the gap between these scales, allowing developers to calculate bandwidth requirements and storage limits with precision. Understanding the difference between a Megabit and a Megabyte is the first step in mastering network administration and software development."
    },
    {
      title: "Why Precision Matters in Scientific Computing",
      date: "Oct 20, 2023",
      category: "Science",
      content: "In computing, floating-point arithmetic is a system for representing real numbers as an approximation to support a trade-off between range and precision. For most daily tasks, a few decimal places suffice. However, in orbital mechanics or quantum physics, even a tiny rounding error can lead to catastrophic failures. NeonCalc uses high-precision math libraries to ensure that your calculations remain reliable across all scientific domains. We implement standard IEEE 754 floating-point behavior to provide consistent results that match professional laboratory equipment."
    },
    {
      title: "The History of the Golden Ratio and Human Perception",
      date: "Oct 18, 2023",
      category: "Philosophy & Math",
      content: "The Golden Ratio, approximately 1.618, is a mathematical constant found in nature, art, and architecture. From the spiral of galaxies to the proportions of the Parthenon, this ratio has fascinated mathematicians and artists for centuries. It represents a balance between order and chaos. By using our mathematical tools to explore these ratios, students can begin to see the hidden patterns that govern the natural world. Mathematics isn't just about solving for X; it's about uncovering the fundamental aesthetic laws of our universe."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">The Knowledge Base</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Deep dives into the history, science, and practical applications of the tools we use every day. 
          Learn more about the mathematics that powers our modern world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {articles.map((art, idx) => (
          <article key={idx} className="glass-panel p-10 rounded-3xl border-slate-800 hover:border-neon-blue/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-neon-blue/10 text-neon-blue text-xs font-bold rounded-full uppercase tracking-widest border border-neon-blue/20">
                {art.category}
              </span>
              <span className="text-slate-500 text-sm font-mono">{art.date}</span>
            </div>
            <h2 className="text-3xl font-display text-white mb-6 group-hover:text-neon-blue transition-colors leading-tight">
              {art.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                {art.content}
              </p>
            </div>
            <div className="h-px bg-gradient-to-r from-neon-blue/30 via-slate-800 to-transparent mb-8"></div>
            <button className="flex items-center gap-2 text-neon-blue font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all group-hover:underline">
              Continue Exploration
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;