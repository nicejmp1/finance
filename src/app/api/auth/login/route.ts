import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password: inputPassword } = await request.json();
        const client = await clientPromise;
        const db = client.db('finance-auth');

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: '존재하지 않는 계정입니다.' },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(inputPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: '패스워드가 맞지 않습니다. 다시 시도해주세요.' },
                { status: 401 }
            )
        }

        const { ...userWithoutPassword } = user;
        return NextResponse.json({
            user: userWithoutPassword,
            message: '로그인 성공'
        }, { status: 200 });

    } catch (error) {
        console.error('로그인 오류:', error);
        return NextResponse.json(
            { error: '로그인에 실패했습니다.' },
            { status: 500 }
        )
    }
}