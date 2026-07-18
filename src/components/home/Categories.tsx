'use client'
import Link from "next/link";
import { Pizza, Coffee, Beef, Fish, Salad, IceCream } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

const categories = [
  { name: "Breakfast", icon: Coffee, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  { name: "Healthy", icon: Salad, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { name: "Meat", icon: Beef, color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  { name: "Seafood", icon: Fish, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { name: "Fast Food", icon: Pizza, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { name: "Desserts", icon: IceCream, color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
];

export function Categories() {
  return (
    <section className="py-20 bg-surface">
      <Container>
        <SectionTitle
          title="Explore Categories"
          subtitle="Find exactly what you're craving with our perfectly organized recipe collections."
          alignment="center"
          className="mb-12"
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link
                href={`/categories/${category.name.toLowerCase().replace(" ", "-")}`}
                className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-foreground">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
