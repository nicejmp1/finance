import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { token, newPassword } = await request.json();
        const client = await clientPromise;
        const db = client.db('finance-auth');

        const user = await db.collection('users').findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            return NextResponse.json({
                error: '유효하지 않은 토큰이거나 만료되었습니다.'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $set: { password: hashedPassword },
                $unset: { resetPasswordToken: "", resetPasswordExpires: "" }
            }
        );

        return NextResponse.json({
            message: '비밀번호가 성공적으로 재설정되었습니다.'
        }, { status: 200 });
    } catch (error) {
        console.error('비밀번호 재설정 오류:', error);
        return NextResponse.json({
            error: '비밀번호 재설정 중 오류가 발생했습니다.'
        }, { status: 500 });
    }
}