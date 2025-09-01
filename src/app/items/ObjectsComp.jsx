import Image from "next/image";

export default async function ItemsComponent() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    const imageStyle = {
        width: '100px',
        height: 'auto',
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
                <div key={index}
                className={"border-1 border-gray-600 p-4 rounded-2xl"}>
                    <div className={"flex m-auto min-w-max justify-center pb-4"}>
                        <Image src={item.image} alt={"img"} width={100} height={100} style={imageStyle}/>
                    </div>
                    <h1 className="text-2xl font-semibold">{item.title}</h1>
                    <p className={"text-xl pt-2 line-clamp-2 overflow-hidden"}>{item.description}</p>
                </div>
            ))}
        </div>
    )
}