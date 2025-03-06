import ContactForm from "@/components/Sections/ContactUs";
import Section2 from "@/components/Sections/Section2";
import ShopNowAt from "@/components/Sections/ShopNowAt";
import WhoWeAre from "@/components/Sections/WhoWeAre";
import Testimonials from "@/components/Sections/Testimonials";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/Sections/LandingPage";
import Footer from "@/components/Footer";
import NewArrivals from "@/components/Sections/NewArrivals";
import BestSellers from "@/components/Sections/bestSellers";


export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="px-2 pt-2">
        <LandingPage/>
      </div>
      <Navbar/>
      <Section2/>
      <NewArrivals/>
      <BestSellers/>
      <WhoWeAre/>
      <ShopNowAt/>
      <Testimonials/>
      <ContactForm/>
      <Footer/>
    </div>
  );
}
