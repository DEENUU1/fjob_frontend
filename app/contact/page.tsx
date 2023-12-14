import ContactForm from '@/components/contact/ContactForm';

export default function Contact() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <h1 className="text-center font-bold text-3xl">Contact form</h1>
            <ContactForm/>
        </main>
    )
}
