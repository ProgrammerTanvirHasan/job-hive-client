"use client";
import { FcGoogle } from "react-icons/fc";
import React from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const zodSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum length is 8"),
  role: z.enum(["USER"]),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });
    } catch {
      toast.error("Google login failed");
    }
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
    validators: {
      onSubmit: zodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your JobHive account...");

      try {
        const { error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Welcome to JobHive 🎉", { id: toastId });

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch {
        toast.error("Something went wrong. Try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="mt-12">Join JobHive</CardTitle>
        <CardDescription>
          Create your JobHive account to get started.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
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

      <CardFooter className="flex flex-col gap-5">
        <Button
          form="register-form"
          type="submit"
          className="w-full bg-[#22426A]"
        >
          Create Account
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
