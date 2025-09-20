import {cookies} from "next/headers";
import {getValid} from "@/lib/AuthController";

async function getUserData(username) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const valid = await getValid(token);
}

export default async function UserTextComponent({username}) {
    const userData = await getUserData(username);
    const text = userData.text;

    return (text ?
            <h1>TEXTO OPCIONAL USUARIO: {text}</h1> : null
    )
}