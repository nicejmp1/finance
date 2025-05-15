import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";

export async function POST(request: Request) {
    try {
        const { field, value } = await request.json();
        const client = await clientPromise;
        const db = client.db('finance-auth');

        const query = { [field]: value};
        const existingUser = await db.collection('users').findOne(query);

        if (existingUser) {
            return NextResponse.json({
                exists: true,
                message: `이미 사용 중인 ${field === 'email' ? '이메일' : '닉네임'} 입니다.`
            });
        } 

        return NextResponse.json({
            exists: false,
            message: `${field === 'email' ? '이메일' : '닉네임'} 사용 가능합니다.`
        });

    } catch {
        return NextResponse.json({
            error: '중복 확인 중 오류가 발생하였습니다.'
        }, { status: 500 });
    }
}
