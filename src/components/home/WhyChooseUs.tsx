'use client'
import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { Zap, Heart, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 }
  },
};

const features = [
  {
    title: "Smart Suggestions",
    description: "Our AI-powered engine suggests recipes based on what you have in your fridge and your dietary preferences.",
    icon: Zap,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    title: "Healthy Choices",
    description: "Detailed nutritional information for every recipe helps you maintain a balanced and healthy lifestyle.",
    icon: Heart,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  },
  {
    title: "Huge Collection",
    description: "Access thousands of premium recipes from top chefs around the world, updated weekly.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    title: "Save Time",
    description: "Quick and easy recipes that take less than 30 minutes, perfect for busy weeknights.",
    icon: Clock,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-surface">
      <Container>
        <SectionTitle
          title="Why Choose ChefMind"
          subtitle="We make cooking easier, healthier, and more fun with our smart tools and premium content."
          alignment="center"
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} className="flex flex-col items-center text-center p-6 bg-background rounded-3xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
