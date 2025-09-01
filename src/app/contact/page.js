import SubPageTitle from "@/app/components/pages/SubPageTitle";
import InfoCard from "@/app/components/cards/InfoCard";
import {Mail, MapPin, MessageCircle, Phone} from "lucide-react";

const contactOptions = [
    {
        icon: <MessageCircle />,
        title: "Chat to sales",
        description: "Speak to our friendly team.",
        href: "mailto:sales@gmail.com",
        hrefText: "sales@gmail.com",
    },
    {
        icon: <Mail />,
        title: "Chat to support",
        description: "We're here to help.",
        href: "mailto:support@gmail.com",
        hrefText: "support@gmail.com",
    },
    {
        icon: <MapPin />,
        title: "Visit us",
        description: "Visit our office HQ.",
        href: "https://maps.app.goo.gl/UuhsKaMN3b1n3YAaA",
        hrefText: "View on Google Maps",
    },
    {
        icon: <Phone />,
        title: "Call us",
        description: "Mon-Fri from 8am to 5pm.",
        href: "tel:+417675638485",
        hrefText: "+41 76 756 384 85",
    },
];

export default function TestPage() {
    return (
        <div>
            <SubPageTitle
                title={"Contact our friendly team"}
                description={"Let us know how we can help."}>

                <div className="flex flex-wrap gap-6 mt-6 justify-center">
                    {contactOptions.map((item, i) => (
                        <InfoCard
                            key={i}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            hrefText={item.hrefText}
                        />
                    ))}
                </div>


            </SubPageTitle>
        </div>
    )
}