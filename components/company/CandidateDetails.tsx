import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"




export default function CandidateDetailsDialog({message}: {message: string}) {
    return (
        <Dialog>
            <DialogTrigger className="bg-blue-400 p-2 font-bold rounded-xl hover:bg-blue-500">Details</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Message</DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
             </DialogContent>
        </Dialog>
    )
}