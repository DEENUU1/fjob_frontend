import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "For users",
  desc: "",
  image: benefitOneImg,
  bullets: [
    {
      title: "Less search",
      desc: "FJob collects job offers from many different job boards to save your time and focus on your expectations",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Only new once",
      desc: "FJob constantly collects new data to provide the most up-to-date data possible",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Easy and transparent",
      desc: "We try to provide as much information as possible about each job offer, we also allow you to filter offers through advanced forms that will help you find your dream job",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "For companies",
  desc: "",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Low prices",
      desc: "Only with us you can post your first ad for free, and subsequent ads have a very competitive price compared to other sites",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Additional promotion",
      desc: "If you post an offer on our website, it will be promoted, making it stand out from other job offers",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Clarity",
      desc: "We know that the recruitment process is not simple, so we provide many interesting functionalities that will make the recruitment process much simpler. You can post ads using our form or provide a link to your own form.",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
