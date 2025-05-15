import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, nickname, birthYear } = body;

        const client = await clientPromise;
        const db = client.db('finance-auth');

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                error: '이미 존재하는 이메일입니다.'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            nickname,
            birthYear,
            createdAt: new Date()
        });

        return NextResponse.json({
            message: '회원가입이 완료되었습니다.'
        }, { status: 201 });
    } catch (error) {
        console.error('회원가입 오류:', error);
        return NextResponse.json({
            error: '회원가입에 실패했습니다.'
        }, { status: 500 });
    }
}
