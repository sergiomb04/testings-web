import Image from "next/image";

export default function NavLogoComp() {
    const imageStyle = {
        width: '40px',
        height: 'auto',
    }

    return (
        <a className={"flex gap-2 justify-center align-middle items-center font-sans font-bold w-max text-xl cursor-pointer"}
        href="/">
            <Image src="/logo.svg" alt="Logo" width={10} height={10} style={imageStyle}/>
            <p>Empresa Moderna</p>
        </a>
    )
}