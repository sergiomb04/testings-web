import PanelButton from "@/app/components/button/PanelButton";
import PanelSecondaryButton from "@/app/components/button/PanelSecondaryButton";

export default function TestingPage() {

    return (
        <div>
            <h1 className={"font-bold pb-8"}>Testing</h1>

            <PanelButton displayText={"test button"}/>
            <PanelSecondaryButton displayText={"test button 2"}/>
        </div>
    )
}