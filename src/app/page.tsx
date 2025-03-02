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
    <LandingPage></LandingPage>
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
