import Image from "next/image";
import Container from "./container";
import heroImg from "../../public/img/hero.png";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-black lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Find your dream job
            </h1>
            <p className="py-5 text-xl leading-normal text-black lg:text-xl xl:text-2xl">
              Here you will find job advertisements from all job advertisement websites in one place.
              We also offer employers the opportunity to submit their own offer.
            </p>


            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                href="/"
                className="px-8 py-4 text-lg font-bold text-center text-black bg-blue-400 rounded-md hover:bg-blue-500">
                Find job
              </Link>
              <Link
                  href="/"
                  className="px-8 py-4 text-lg font-normal text-center text-black bg-blue-100 rounded-md hover:bg-blue-200">
                Add your own ad
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Hero;