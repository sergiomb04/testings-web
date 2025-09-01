import Image from "next/image";

export default function NavLogoComp() {
    return (
        <div className={"flex gap-2 justify-center align-middle items-center font-sans font-bold w-max text-xl"}>
            <Image src="/logo.svg" alt="Logo" width={40} height={10} color="white"/>
            <p>Empresa Moderna</p>
        </div>
    )
}