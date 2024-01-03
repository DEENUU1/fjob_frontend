import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


export default function BuyButton() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-green-600">Buy</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>We apologize 😥</AlertDialogTitle>
                    <AlertDialogDescription>
                        This feature is only implemented on the backend side and you can test it via API.
                        Remember to run the webhook with the command `stripe listen --forward-to localhost:8000/api/payment/new_company/webhook
                        `
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}