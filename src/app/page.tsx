import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturedTreks from "@/components/FeaturedTreks/FeaturedTreks";
import TrekList from "@/components/TrekList/TrekList"; // ✅ Redux-based, keeping it
import TrekDetails from "@/components/TrekDetails/TrekDetails"; // ✅ Keeping it
import BookingForm from "@/components/BookingForm/BookingForm"; // ✅ Keeping it
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTreks />
      {/* <TrekList />  */}
      <TrekDetails 
        name="Everest Base Camp" 
        description="A challenging trek to the Everest Base Camp in Nepal." 
        price={1200} 
      />
      <BookingForm />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      {/* <Footer /> */}
    </>
  );
}
