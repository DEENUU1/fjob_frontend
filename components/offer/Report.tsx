'use client'

import {useState} from "react";
import {toast} from 'react-toastify';
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {useAppSelector} from "@/redux/hooks";
import {IoFlagOutline, IoFlagSharp} from "react-icons/io5";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";

const ReportModal = ({offerId}: {offerId: number}) => {
    const {isLoading, isAuthenticated} = useAppSelector(state => state.auth);
    const [description, setDescription] = useState('')
    const {data: user} = useRetrieveUserQuery()
    const [loading, setLoading] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [isHover, setIsHover] = useState(false);
    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        try {

            if (!isAuthenticated) {
                toast.info("You need to be logged in to report an offer")
                return
            }

            const response = await fetch(process.env.API_URL + "/api/support/report/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({"offer": offerId, "user": user?.id, "description": description})
            })

            if (response.ok) {
                toast.success("Report sent!")
            } else {
                toast.error("Something went wrong!")
            }
        } catch (error) {
            toast.error("Error!")
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <button className="cursor-pointer ml-auto text-xl" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                    type="button" onClick={() => onOpen()}>
                {isHover ? (
                    <IoFlagSharp/>
                ) : (
                    <IoFlagOutline/>

                )}
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Report job offer</ModalHeader>
                        <form onSubmit={handleSubmit}>

                            <ModalBody>
                                <Input
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                onClick={() => false}
                                isLoading={loading}
                            >
                                {loading ? "Loading..." : "Send"}
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

export default ReportModal;
