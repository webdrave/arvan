import ContactForm from "@/components/Sections/ContactUs";
import Section2 from "@/components/Sections/Section2";
import ShopNowAt from "@/components/Sections/ShopNowAt";
import WhoWeAre from "@/components/Sections/WhoWeAre";
import Testimonials from "@/components/Sections/Testimonials";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/Sections/LandingPage";
import Footer from "@/components/Footer";
import Landing_overlay from "@/components/Sections/landing_overlay";
import NewArrivals from "@/components/Sections/NewArrivals";
import BestSellers from "@/components/Sections/bestSellers";

export default function Home() {
  return (
    <div className={`overflow-x-hidden `}>
      <Landing_overlay></Landing_overlay>
      <div className="px-1 pt-1 md:px-2 md:pt-2">
        <LandingPage></LandingPage>
      </div>
      <Navbar></Navbar>
      <Section2></Section2>
      <NewArrivals />
      <BestSellers />
      <section className="mt-10 md:mt-20">
        <WhoWeAre></WhoWeAre>
      </section>
      <ShopNowAt></ShopNowAt>
      <Testimonials></Testimonials>
      <ContactForm></ContactForm>
      <Footer></Footer>
    </div>
  );
}
