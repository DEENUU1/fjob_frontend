'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useEffect, useState} from "react";


function getCandidateDetails(id: number){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [candidate, setCandidate] = useState<UserAppliedOffer>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch(process.env.API_URL + `api/candidate/candidate/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then(response => response.json())
            .then(data => setCandidate(data))
    }, [id]);

    return candidate;
}



export default function CandidateDetails({id}:{id: number} ) {
    const data = getCandidateDetails(id)

    return (
        <Dialog>
            <DialogTrigger className="bg-blue-400 p-2 font-bold rounded-xl hover:bg-blue-500">Details</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Message</DialogTitle>
                    <DialogDescription>
                        {data?.message}
                    </DialogDescription>
                </DialogHeader>
             </DialogContent>
        </Dialog>
    )
}