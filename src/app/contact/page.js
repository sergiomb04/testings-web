import SubPageTitle from "@/app/components/pages/SubPageTitle";
import InfoCard from "@/app/components/cards/InfoCard";
import {MessageCircle, Phone} from "lucide-react";

export default function TestPage() {
    return (
        <div>
            <SubPageTitle
                title={"Contact our friendly team"}
                description={"Let us know how we can help."}>

                <div className={"flex gap-6 pl-24"}>
                    <InfoCard
                        icon={<MessageCircle />}
                        title={"Chat to sales"}
                        description={"Speak to our friendly team."}
                        href={"https://www.google.com/"}
                        hrefText={"Link super cool"}/>

                    <InfoCard
                        icon={<Phone />}
                        title={"Call us"}
                        description={"We're here to help."}
                        href={"+41 76 756 384 85"}
                        hrefText={"+41 76 756 384 85"}/>
                </div>

            </SubPageTitle>
        </div>
    )
}