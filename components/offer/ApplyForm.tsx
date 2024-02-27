'use client';


import {useState} from "react";
import {toast} from 'react-toastify';
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import Confetti from "@/components/Confetti";
import Spinner from "@/components/common/Spinner";
import {Button} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILE_TYPES = ["application/pdf"];

export default function ApplyForm({offerId}: { offerId: string }) {
  const {data: user} = useRetrieveUserQuery()

  const [first_name, setFirstName] = useState<string | undefined>(user?.first_name);
  const [last_name, setLastName] = useState<string | undefined>(user?.last_name);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [phone, setPhone] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [futureRecruitment, setFutureRecruitment] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = user?.id || null;

  const validateFile = (file: File) => {
    const allowedTypes = ALLOWED_FILE_TYPES;
    const maxFileSize = MAX_FILE_SIZE

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF files are allowed.");
      return false;
    }

    if (file.size > maxFileSize) {
      toast.error("File size exceeds the limit (5 MB).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // @ts-ignore
    if (!validateFile(resume)) {
      return;
    }

    setIsLoadingFile(true);
    setIsLoading(true);

    const formData = new FormData();
    // @ts-ignore
    formData.append("first_name", first_name);
    // @ts-ignore
    formData.append("last_name", last_name);
    // @ts-ignore
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("cv", resume);
    formData.append("job_offer", offerId);
    // @ts-ignore
    formData.append("future_recruitment", futureRecruitment);

    if (userId) {
      // @ts-ignore
      formData.append("user", userId);
    }

    try {
      const response = await fetch(process.env.API_URL + "api/candidate/candidate/", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Application sent");
        setIsFormSubmitted(true);
      } else {
        toast.error("Error while sending your application, please try again");
      }
    } catch (error) {
      toast.error("Failed to sent your application");
    } finally {
      setIsLoadingFile(false);
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    setResume(e.target.files[0]);
  }

  return (
    <>
      {isFormSubmitted ? (
        <>
          <Confetti/>
        </>
      ) : null}

      <div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="first_name">First name</label>
              <input
                type="text" id="first_name" autoComplete="true" required placeholder="First name"
                name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)}
                className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="last_name">Last name</label>
              <input
                type="text" id="first_name" autoComplete="true" required placeholder="Last name"
                name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)}
                className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="email">Email</label>
              <input type="email" id="email" autoComplete="true" required placeholder="Email address"
                     name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                     className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"

              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="phone">Phone number</label>
              <input type="text" id="phone" autoComplete="true" required placeholder="Phone number"
                     name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                     className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                 htmlFor="resume">Resume</label>
          {isLoadingFile ? (
            <input
              type="file"
              id="resume"
              name="phone"
              disabled
              className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          ) : (
            <input
              type="file"
              id="resume"
              required
              name="phone"
              onChange={(e) => handleFileChange(e)}
              className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          )}

          {isLoadingFile && (
            <div className="mb-2">
              <Spinner/>
            </div>
          )}


          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                 htmlFor="message">Message to the recruiter</label>
          <textarea id="message" placeholder="Message" name="message" value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="appearance-none block w-full border-2 border-gray-200 hover:shadow-md  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />

          <div className="items-top flex space-x-2 mt-2 mb-2">
            <Checkbox id="terms" required={true}/>
            <div className="terms">
              <label
                htmlFor="futureRecruitment"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          <div className="items-top flex space-x-2 mb-2">
            <Checkbox type="checkbox" id="future-recruitment" onChange={(e) => setFutureRecruitment(e.target.checked)}/>
            <div className="terms">
              <label
                htmlFor="future-recruitment"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I consent to the processing of my personal data for future recruitment purposes.
              </label>
            </div>
          </div>
          <Button color="success" type="submit" isLoading={isLoading}>
            {isLoading ? 'Loading' : 'Send'}
          </Button>

        </form>
      </div>
    </>
  )
}