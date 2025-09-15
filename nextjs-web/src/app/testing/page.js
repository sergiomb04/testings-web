import InitialDataComponentTest from "@/app/testing/InitialDataComponentTest";
import TestingPanel from "@/app/testing/TestingPanel";

export default function TestingPage() {
    return (
        <div>
            <h1 className={"font-bold pb-8"}>Testing</h1>
            <div className={"flex flex-col gap-8"}>
                <InitialDataComponentTest />

                <TestingPanel />
            </div>
        </div>
    )
}