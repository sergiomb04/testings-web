import Image from "next/image";

export default function SubPageTitle({title, description, children}) {
    return (
        <div className="flex flex-col py-16">
            <div className={"flex flex-col justify-center align-middle items-center gap-6"}>
                <div className={"flex flex-col m-auto justify-center align-middle items-center text-center"}>
                    <div className={"p-6"}>
                        <Image src="/logo.svg" alt="Logo" width={60} height={20} color="white"/>
                    </div>
                    <h1 className={"font-bold text-6xl"}>{title}</h1>
                    <h2 className={"text-2xl pt-4"}>{description}</h2>
                </div>

                {children}
            </div>
        </div>
    )
}