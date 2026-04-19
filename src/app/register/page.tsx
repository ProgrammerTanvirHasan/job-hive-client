import { SignupForm } from "@/components/ui/signup-form";
import Link from "next/link";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-muted/30 px-4 ">
      <div className="w-full max-w-xl mt-16">
        <p className="flex  gap-2 font-bold text-3xl italic pl-2">
          Welcome To<span className="text-[#EDB713]">JobHive</span>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
