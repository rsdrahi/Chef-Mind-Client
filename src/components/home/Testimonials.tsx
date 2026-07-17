import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Cook",
    image: "https://i.pravatar.cc/150?img=44",
    content: "ChefMind completely changed how I organize my weekly meals. The smart suggestions are spot on, and I've tried so many new delicious recipes!"
  },
  {
    name: "Michael Chen",
    role: "Fitness Enthusiast",
    image: "https://i.pravatar.cc/150?img=11",
    content: "As someone who tracks macros, the detailed nutritional info for every recipe is a game changer. Plus, the UI is absolutely stunning."
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Mom",
    image: "https://i.pravatar.cc/150?img=9",
    content: "The 30-minute meals section saves my life during busy weekdays. My kids love the food, and I spend less time in the kitchen."
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <Container>
        <SectionTitle 
          title="Loved by Home Chefs" 
          subtitle="Don't just take our word for it. Here's what our community has to say about ChefMind."
          alignment="center"
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div 
              key={testimonial.name}
              className={`relative bg-surface p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all duration-300 ${i === 1 ? 'md:-translate-y-4' : ''}`}
            >
              <Quote className="absolute top-6 right-6 text-primary/20 w-12 h-12" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-background shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-foreground/80 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
