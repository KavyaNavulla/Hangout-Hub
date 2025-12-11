import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
    const cookieStore = await cookies();

    // ❌ Remove token cookie
    cookieStore.delete("token");

    // Redirect to login page
    redirect("/");
}
