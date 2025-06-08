"use client";

import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/app/actions/auth-actions";
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Label } from "@/components/shadcn/label"
import { Separator } from "@/components/shadcn/separator"
import { AspectRatio } from "@/components/shadcn/aspect-ratio"
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
            <h1 className="text-3xl font-bold">회원가입</h1>
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

                <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                <Input value={passwordConfirm}
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       type="password"
                       name="passwordConfirm"
                       placeholder="비밀번호 확인"/>

                <Button variant="blue"
                        type="submit"
                        style={{cursor: "pointer"}}
                >회원가입</Button>

                <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px"}}>
                    <Link href="/signin">로그인</Link>
                    <Link href="/#">비밀번호 찾기</Link>
                </div>
            </form>
        </div>
    );
}