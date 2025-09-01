import GetStartedButton from "@/app/components/landing/GetStartedButton";

export default function LandingHome() {
    return (
        <div className="flex justify-center align-middle items-center my-55">
            <div className="flex flex-col justify-center text-center w-1/2 gap-8">
                <h1 className="font-extrabold">Modern Landing Page</h1>
                <h2 className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </h2>

                <GetStartedButton />
            </div>
        </div>
    )
}