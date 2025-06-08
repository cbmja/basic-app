"use client";

import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/app/actions/auth-actions";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const result = await signUp({
            email,
            password,
        });
        if (result?.status === "ok") {
            alert('회원가입 성공');
        }

        if (result?.message) {
            alert(result.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4"
             style={{
                 backgroundImage: `url("https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80")`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
             }}>
            <h1 className="text-3xl font-bold">signUp</h1>
            <p className="text-gray-700">welcome.</p>

            <Separator style={{ width: "50%" }} />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 min-w-[400px]"
                style={{backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "8px"}}
            >
                <Label htmlFor="email">email</Label>
                <Input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       placeholder="email@domain.com"/>

                <Label htmlFor="password">password</Label>
                <Input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       name="password"
                       placeholder="password"/>

                <Label htmlFor="passwordConfirm">password</Label>
                <Input value={passwordConfirm}
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       type="password"
                       name="passwordConfirm"
                       placeholder="password confirm"/>

                <Button variant="blue"
                        type="submit"
                        style={{cursor: "pointer"}}
                >signUp</Button>

                <Button asChild >
                    <Link href="/signin">signIn</Link>
                </Button>
            </form>
        </div>
    );
}