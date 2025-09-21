export async function getValid(token) {
    const res = await fetch("http://192.168.0.12:8080/api/auth/verify", {
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