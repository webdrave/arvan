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
import Landing_overlay from "@/components/Sections/landing_overlay";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Landing_overlay></Landing_overlay>
      <div className="px-2 pt-2">
        <LandingPage></LandingPage>
      </div>
      <Navbar></Navbar>
      <Section2></Section2>
      <NewArrivals></NewArrivals>
      <BestSellers></BestSellers>
      <WhoWeAre></WhoWeAre>
      <ShopNowAt></ShopNowAt>
      <Testimonials></Testimonials>
      <ContactForm></ContactForm>
      <Footer></Footer>
    </div>
  );
}