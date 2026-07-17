import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedRecipes } from "@/components/home/FeaturedRecipes";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { GoogleLoginModal } from "@/components/auth/GoogleLoginModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedRecipes />
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <GoogleLoginModal />
    </>
  );
}
