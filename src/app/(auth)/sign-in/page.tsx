import { getCurrent } from "@/features/auth/actions";
import { LoginForm } from "@/features/auth/components/sign-in-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrent();
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
