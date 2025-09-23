export async function getValid(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) return false;
    const data = await res.json();
    return data.valid;
}