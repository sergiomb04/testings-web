export async function getValid(token) {
    const res = await fetch("http://localhost:8080/api/auth/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // importante para que siempre valide en cada request
    });

    if (!res.ok) return false;
    const data = await res.json();
    return data.valid;
}