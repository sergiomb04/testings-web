export default function ItemPage({ params }) {
    const { itemId } = params;

    return (
        <div>
            <p>Item ID: {itemId}</p>
            <p>Ya está. Hasta aquí he llegado.</p>
        </div>
    );
}
