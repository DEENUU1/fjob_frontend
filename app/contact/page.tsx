import ContactForm from '@/components/contact/ContactForm';
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'FJob | Contact us',
}

export default function Contact() {
    return (
        <>
            <div>
                <h1 className="text-center font-bold text-3xl">Contact form</h1>
                <ContactForm/>
            </div>
        </>
    )
}
