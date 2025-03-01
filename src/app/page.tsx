import ContactForm from "@/components/Sections/ContactUs";
import Section2 from "@/components/Sections/Section2";
import ShopNowAt from "@/components/Sections/ShopNowAt";
import WhoWeAre from "@/components/Sections/WhoWeAre";
import Testimonials from "@/components/Sections/Testimonials";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/Sections/LandingPage";


export default function Home() {
  return (
    
    <>
    <LandingPage></LandingPage>
    <Navbar></Navbar>
    <Section2></Section2>
    <WhoWeAre></WhoWeAre>
    <ShopNowAt></ShopNowAt>
    <Testimonials></Testimonials>
    <ContactForm></ContactForm>
    </>
  );
}
