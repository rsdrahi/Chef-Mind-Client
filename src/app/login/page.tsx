import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 min-h-screen relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
