import bcrypt from "bcryptjs";

// 비밀번호 해쉬
export function saltAndHashPassword(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

// 비밀번호 확인
export function comparePassword(
    password: string,
    hashedPassword: string
): boolean {
    return bcrypt.compareSync(password, hashedPassword);
}
