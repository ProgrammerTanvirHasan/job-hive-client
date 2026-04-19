"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { useSession } from "@/lib/session-context";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum length is 8"),
});

function isSafeRedirect(path: string | null): path is string {
  if (!path || typeof path !== "string") return false;
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  return true;
}

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { setUser, refreshSession } = useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        if (data?.user) {
          setUser(data.user);
          await refreshSession();
        }

        toast.success("User logged in successfully", { id: toastId });

        const target = isSafeRedirect(redirect) ? redirect : "/";
        router.push(target);
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your information below to log in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="login-form" type="submit" className="w-full bg-[#22426A]">
          Login
        </Button>
        <Button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 
             bg-white hover:bg-gray-100 text-gray-700 font-medium 
             border border-gray-300 rounded-xl py-3 
             shadow-sm hover:shadow-md transition-all duration-300"
        >
          <FcGoogle size={22} />
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
