export default async function ItemPage({ params }) {
    const { itemId } = await params;

    const res = await fetch(`https://fakestoreapi.com/products/${itemId}`);
    if (!res.ok) {
        return <p>Error al cargar el item.</p>;
    }
    const data = await res.json();

    return (
        <div>
            <p>Item ID: {itemId}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}
