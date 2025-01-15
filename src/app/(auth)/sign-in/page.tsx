import { getCurrent } from "@/features/auth/actions";
import { LoginForm } from "@/features/auth/components/sign-in-form";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrent();
  if (user) {
    redirect("/");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            title="Prysm Documentation"
            className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center">
              <Image
                src={"/favicon/favicon-prysm.ico"}
                alt="Logo Prysm"
                width={48}
                height={48}
              />
            </div>
            Prysm Documentation
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block m-4 rounded-2xl overflow-hidden">
        <Image
          src="/placeholder.jpg"
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
