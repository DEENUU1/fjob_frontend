'use client'

import React, {useState} from "react";
import {toast} from "react-toastify";
import GetExperiences from "@/components/offer/Experience";
import GetWorkType from "@/components/offer/WorkType";
import GetEmploymentTypes from "@/components/offer/EmploymentType";
import {useRouter} from 'next/navigation';
import {RiEditFill, RiEditLine} from "react-icons/ri";
import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox
} from "@nextui-org/react";


// @ts-ignore
export default function EditOfferModal({offer}) {
  const router = useRouter();

  const [title, setTitle] = useState(offer.title || "")
  const [description, setDescription] = useState(offer.description || "")
  const [addresses, setAddresses] = useState(1)
  const [isRemote, setIsRemote] = useState(offer.is_remote || false)
  const [isHybrid, setIsHybrid] = useState(offer.is_hybrid || false)
  const [applyForm, setApplyForm] = useState(offer.apply_form || "")
  const [skills, setSkills] = useState(offer.skills || "")
  const [experience, setExperience] = useState(offer.experience || [])
  const [workType, setWorkType] = useState(offer.work_type || [])
  const [employmentType, setEmploymentType] = useState(offer.employment_type || [])
  const [status, setStatus] = useState(offer.status || "")
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);


  const experiences = GetExperiences();
  const workTypes = GetWorkType();
  const employmentTypes = GetEmploymentTypes();


  const experienceMultiSelect = () => {
    return (
      <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required multiple name="experience[]" onChange={(e) => setExperience(e.target.value)}>
        {experiences && experiences.length > 0 && experiences.map((experience: any) => (
          <option key={experience.id} value={experience.id}>{experience.name}</option>
        ))}
      </select>
    );
  };

  const workTypeMultiSelect = () => {
    return (
      <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required multiple name="experience[]" onChange={(e) => setWorkType(e.target.value)}>
        {workTypes && workTypes.length > 0 && workTypes.map((workType: any) => (
          <option key={workType.id} value={workType.id}>{workType.name}</option>
        ))}
      </select>
    );
  };

  const employmentTypeMultiSelect = () => {
    return (
      <select className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required multiple name="experience[]" onChange={(e) => setEmploymentType(e.target.value)}>
        {employmentTypes && employmentTypes.length > 0 && employmentTypes.map((employmentType: any) => (
          <option key={employmentType.id} value={employmentType.id}>{employmentType.name}</option>
        ))}
      </select>
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // @ts-ignore
    formData.append("addresses", addresses);
    // @ts-ignore
    formData.append("is_remote", isRemote);
    // @ts-ignore
    formData.append("is_hybrid", isHybrid);
    formData.append("apply_form", applyForm);
    // @ts-ignore
    formData.append("skills", skills);
    // @ts-ignore
    formData.append("experience", experience);
    // @ts-ignore
    formData.append("work_type", workType);
    // @ts-ignore
    formData.append("employment_type", employmentType);
    formData.append("status", status);
    // @ts-ignore
    formData.append("company_id", 2);
    // @ts-ignore
    formData.append("company", 2);

    setIsLoading(true);

    try {
      const response = await fetch(process.env.API_URL + `api/offer/company/${offer.id}/`, {
        method: "PUT",
        headers: {
          accept: "application/json",
        },
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        toast.success("Offer updated successfully")
        router.push('/company/offer')
      } else {
        toast.error("Offer update failed")
      }
    } catch (error) {
      toast.error("Offer update failed")
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
      <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
              onClick={(e) => onOpen()}>
        {isHover ? (
          <RiEditFill/>
        ) : (
          <RiEditLine/>

        )}
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input type="text" isRequired={true} label="Title" value={title}
                         onChange={(e) => setTitle(e.target.value)}
                  />

                  <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>

                  <div className="grid gap-6 mb-6 md:grid-cols-2 mt-2">
                    <div className="flex items-center">
                      <Checkbox value={isRemote} onChange={() => setIsRemote(!isRemote)}>Remote</Checkbox>

                    </div>

                    <div className="flex items-center">
                      <Checkbox value={isHybrid} onChange={() => setIsHybrid(!isHybrid)}>Hybrid</Checkbox>
                    </div>
                  </div>

                  <Input type="text" placeholder="apply form" label="Apply Form"/>

                  <Input type="text" label="Skills" autoComplete="false"/>

                  {experienceMultiSelect()}

                  {workTypeMultiSelect()}

                  {employmentTypeMultiSelect()}

                  <Select label="Status" onChange={(e) => setStatus(e.target.value)}
                  >
                    <SelectItem key="DRAFT" value="DRAFT">Draft</SelectItem>
                    <SelectItem key="DRAFT" value="ACTIVE">Published</SelectItem>
                  </Select>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="warning"
                          isLoading={isLoading}>{isLoading ? "Loading..." : "Update"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>


    </>
  )


}