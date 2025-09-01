export default async function ItemsComponent() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-4">
            {data.map((item, index) => (
                <div key={index} className="flex flex-col border border-gray-600 p-4 rounded-2xl">
                    <div className="flex justify-center items-center h-32 mb-4">
                        <img
                            src={item.image}
                            alt="img"
                            className="max-h-full w-auto object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold">{item.title}</h1>
                    <p className="text-xl pt-2 line-clamp-2 overflow-hidden">{item.description}</p>
                </div>
            ))}
        </div>
    )
}
