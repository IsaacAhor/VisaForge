export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24 bg-white"> {/* Added id="about" */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-visa-dark">
            About VisaForge
          </h2>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl text-visa-dark/60">
            VisaForge leverages cutting-edge AI to simplify the complex world of global migration. 
            Our mission is to empower individuals by providing clear, actionable insights into their visa options, 
            helping them navigate the path to living and working abroad with confidence.
          </p>
          {/* Add more content about the company/product here if needed */}
        </div>
        {/* Optionally add more structured content like team, values, etc. */}
      </div>
    </section>
  );
}
