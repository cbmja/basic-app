"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";

export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold">signIn</h1>
            <p className="text-gray-700">welcome back.</p>

            <Separator style={{ width: "50%" }} />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 min-w-[300px]"
            >
                <Label htmlFor="email">email</Label>
                <Input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       placeholder="example@domain.com"/>

                <Label htmlFor="password">password</Label>
                <Input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       name="password"
                       placeholder="password"/>

                <Button variant="outline"
                        type="submit"
                        >signIn</Button>

                <Button asChild >
                    <Link href="/signup">signUp</Link>
                </Button>
            </form>
        </div>
    );
}