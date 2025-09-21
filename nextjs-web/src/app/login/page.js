import LoginComponent from "@/app/login/LoginComponent";
import {getValid} from "@/lib/AuthController";
import {cookies} from "next/headers";

export default async function LoginPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const valid = await getValid(token);

    return !valid ? (
            <LoginComponent/>)
        : (
            <div>
                <h1>Ya has iniciado sesión!!!</h1>
            </div>
        );
}