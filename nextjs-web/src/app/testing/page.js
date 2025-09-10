import InitialDataComponentTest from "@/app/testing/InitialDataComponentTest";
import SetTextComponent from "@/app/testing/SetTextComponent";
import TestingPanel from "@/app/testing/TestingPanel";

export default function TestingPage() {
    return (
        <div>
            <h1 className={"font-bold pb-8"}>Testing</h1>
            <InitialDataComponentTest />

            <TestingPanel />
        </div>
    )
}