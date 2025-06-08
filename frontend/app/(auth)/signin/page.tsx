"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Label } from "@/components/shadcn/label"
import { Separator } from "@/components/shadcn/separator"
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
        <div className="flex flex-col items-center justify-center h-screen gap-4"
             style={{
                 backgroundImage: `url("https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80")`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
             }}>
            <h1 className="text-3xl font-bold">로그인</h1>
            <p className="text-gray-700">환영합니다.</p>

            <Separator style={{ width: "50%" }} />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 min-w-[400px]"
                style={{backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "8px"}}
            >
                <Label htmlFor="email">이메일</Label>
                <Input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       placeholder="이메일 형식에 맞게 입력해주세요."/>

                <Label htmlFor="password">비밀번호</Label>
                <Input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       name="password"
                       placeholder="비밀번호"/>

                <Button variant="blue"
                        type="submit"
                        style={{cursor: "pointer"}}
                        >로그인</Button>

                <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px"}}>
                    <Link href="/signup">회원가입</Link>
                    <Link href="/#">비밀번호 찾기</Link>
                </div>

            </form>
        </div>
    );
}