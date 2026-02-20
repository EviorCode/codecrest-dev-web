import ContactHero from "@/src/components/sections/contact/ContactHero";
import ContactForm from "@/src/components/sections/contact/ContactForm";
// import ContactMap from "@/src/components/sections/contact/ContactMap";

export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-white">
      <ContactHero />
      <ContactForm />
      {/* <ContactMap /> */}
    </main>
  );
}
