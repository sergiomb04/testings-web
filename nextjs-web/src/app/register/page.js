import {cookies} from "next/headers";
import RegisterComponent from "@/app/register/RegisterComponent";
import {getValid} from "@/lib/AuthController";

export default async function RegisterPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const valid = await getValid(token);

    return !valid ? (
            <RegisterComponent/>)
        : (
            <div>
                <h1>Ya has iniciado sesión!!!</h1>
            </div>
        );
}