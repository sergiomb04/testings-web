import GetStartedButton from "@/app/components/landing/GetStartedButton";

export default function LandingHome() {
    return (
        <div className="flex justify-center align-middle items-center my-30">
            <div className="flex flex-col justify-center text-center w-1/2 gap-8">
                <h1>Modern Landing Page</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <GetStartedButton />
            </div>
        </div>
    )
}