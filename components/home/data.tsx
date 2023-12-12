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
  title: "Everything in one place",
  desc: "Change this",
  image: benefitOneImg,
  bullets: [
    {
      title: "Change this",
      desc: "Change this",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Change this",
      desc: "Change this",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Change this",
      desc: "Change this",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Change this",
  desc: "Change this",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Change this",
      desc: "Change this",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Change this",
      desc: "Change this",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Change this",
      desc: "Change this",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
