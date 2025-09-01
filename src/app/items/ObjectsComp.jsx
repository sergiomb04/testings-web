export default async function ItemsComponent() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-4">
            {data.map((item, index) => (
                <a key={index} className="flex flex-col border border-gray-600 p-4 rounded-2xl bg-gray-800 hover:bg-gray-700" href={`items/${index}`}>
                    <div className="flex justify-center items-center h-40 mb-4">
                        <img
                            src={item.image}
                            alt="img"
                            className="max-h-full w-auto object-contain"
                        />
                    </div>

                    <p className="text-lg mt-auto text-green-500">${item.price}</p>

                    <h1 className="text-xl font-semibold truncate">{item.title}</h1>

                    <div className={"flex gap-1"}>
                        <StarRating rating={item.rating.rate}/>
                        <p className={"text-base"}>{item.rating.count}</p>
                    </div>

                </a>
            ))}
        </div>
    )
}

const StarRating = ({rating}) => {
    // rating es un número como 4.7
    const stars = Array.from({length: 5}, (_, i) => {
        if (i + 1 <= Math.floor(rating)) return "full";
        if (i < rating) return "half";
        return "empty";
    });

    return (
        <div className="flex space-x-1">
            {stars.map((type, index) => (
                <span key={index}>
          {type === "full" && <span className="text-yellow-500">★</span>}
                    {type === "half" && <span className="text-yellow-500">☆</span>}
                    {type === "empty" && <span className="text-gray-400">★</span>}
        </span>
            ))}
        </div>
    );
};
