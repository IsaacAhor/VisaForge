
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "VisaForge helped me understand my options for moving to Canada when I was completely lost in the immigration process.",
      author: "Sarah K.",
      location: "UK to Canada",
    },
    {
      quote:
        "I saved thousands on legal fees by using VisaForge to plan my move to Australia. The document checklist was especially helpful.",
      author: "Miguel R.",
      location: "Brazil to Australia",
    },
    {
      quote:
        "The fallback plan feature gave me peace of mind. When my first visa application hit a snag, I already knew my Plan B.",
      author: "Aisha M.",
      location: "Egypt to Germany",
    },
  ];

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Success Stories
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Hear from people who found their path with VisaForge
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <p className="text-lg italic text-foreground">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
