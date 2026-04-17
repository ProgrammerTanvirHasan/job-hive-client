import { CommonLayoutClient } from "@/components/common-layout-client";
import { HeroSection } from "@/components/hero45";
import { Hero47 } from "@/components/hero47";
import { Navbar1 } from "@/components/navbar1";
import CategoriesJob from "@/components/ui/categoriesJob";
import CallToAction from "@/components/ui/conversition";
import Footer from "@/components/ui/footer";
import HowToApply from "@/components/ui/howtoApply";
import Premium from "@/components/ui/premium";
import Statistics from "@/components/ui/statistics";
import TopCompanies from "@/components/ui/topCompanies";
import UrgentHiring from "@/components/ui/urgentHiring";
import WhyChooseUs from "@/components/ui/whyChoose";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommonLayoutClient>
      <div>
        <Navbar1 />
        <Hero47 />
        <HeroSection />
        <Premium />
        <CategoriesJob />
        <UrgentHiring />
        <TopCompanies />
        <HowToApply />
        <WhyChooseUs />
        <Statistics />
        <CallToAction />

        {children}
        <Footer />
      </div>
    </CommonLayoutClient>
  );
}
