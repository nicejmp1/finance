import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { token, newPassword } = await req.json();
        const client = await clientPromise;
        const db = client.db('finance-auth');

        const user = await db.collection('users').findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date()},
        })

        if (!user) {
            return NextResponse.json({
                error: '유효하지 않거나 만료된 토큰입니다.'
            }, { status: 400 });
        }

        const isPasswordMatch = await bcrypt.compare(newPassword, user.password);
        if (isPasswordMatch) {
            return NextResponse.json({
                error: 'SAME_PASSWORD',
                message: '이전 비밀번호와 동일합니다.'
            }, { status: 401 });
        }

        if (newPassword.length < 6 || newPassword.length > 16) {
            return NextResponse.json({
                error: 'INVALID_PASSWORD',
                message: '비밀번호는 6~16자 사이로 입력해주세요.'
            }, { status: 400 });
        }

        if (!/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword) || !/[@$!%*?&]/.test(newPassword)) {
            return NextResponse.json({
                error: 'INVALID_PASSWORD',
                message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
            }, { status: 400 });
        }

        

        return NextResponse.json({
            success: true,
            message: '사용 가능한 비밀번호 입니다.'
        }, { status: 200 });
        
    } catch (error) {
        console.error('비밀번호 검증 오류:', error);
        return NextResponse.json({
            error: '비밀번호 검증 중 오류가 발생했습니다.'
        }, { status: 500 });
    }
}