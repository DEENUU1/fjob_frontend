import Hero from '@/components/home/Hero';
import SectionTitle from '@/components/home/SectionTitle';
import Benefits from '@/components/home/Benefits';
import Faq from '@/components/home/Faq';
import {benefitOne, benefitTwo} from "@/components/home/Data";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'FJob | Home',
}

export default function Page() {
  return (
    <>
      <Hero/>
      <SectionTitle
        pretitle="FJob Benefits"
        title=" Why should you use FJob?">
        FJob is an open source platform that allows you to quickly find a job, save interesting job offers, apply and
        discover new opportunities every day
      </SectionTitle>
      <Benefits data={benefitOne}/>
      <Benefits imgPos="right" data={benefitTwo}/>
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Faq/>
    </>
  )
}
