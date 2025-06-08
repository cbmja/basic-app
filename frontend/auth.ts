import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "./lib/password-utils";
import {SignJWT, jwtVerify, JWTPayload} from 'jose';
import { JWT } from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
    useSecureCookies: process.env.NODE_ENV === "production",
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    debug: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "이메일",
                    type: "email",
                    placeholder: "이메일을 입력하세요",
                },
                password: {
                    label: "비밀번호",
                    type: "password",
                    placeholder: "비밀번호를 입력하세요",
                },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("이메일과 비밀번호를 모두 입력해주세요.");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user) {
                    throw new Error("존재하지 않는 이메일입니다.");
                }

                const passwordMatch = comparePassword(
                    credentials.password as string,
                    user.hashedPassword as string
                );

                if (!passwordMatch) {
                    throw new Error("비밀번호가 일치하지 않습니다.");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        encode: async ({ token, secret }) => {
            const encodedSecret = new TextEncoder().encode(secret as string);
            return await new SignJWT(token as JWTPayload)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1h')
                .sign(encodedSecret);
        },
        decode: async ({ token, secret }) => {
            const encodedSecret = new TextEncoder().encode(secret as string);
            const { payload } = await jwtVerify(token!, encodedSecret);
            return payload as JWT;
        },
    },
    pages: {},
    callbacks: {},
});
