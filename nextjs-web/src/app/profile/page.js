import {getValid} from "@/lib/AuthController";
import {cookies} from "next/headers";
import ChangePassword from "@/app/components/profile/ChangePasswordComponent";

export default async function ProfilePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const valid = await getValid(token);

    return valid ? (
            <div>
                <ChangePassword />
            </div>
        )
        : (
            <p>Bro?</p>
        );
}