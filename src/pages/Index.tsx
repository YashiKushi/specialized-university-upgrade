import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseGrid from "@/components/CourseGrid";
import TestSelector from "@/components/TestSelector";
import TestSection from "@/components/TestSection";
import ProgressDashboard from "@/components/ProgressDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CourseGrid />
      <TestSelector />
      <TestSection />
      <ProgressDashboard />
    </div>
  );
};

export default Index;
