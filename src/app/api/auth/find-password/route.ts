import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb"
import { sendEmail } from "@/lib/email/email";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const client = await clientPromise;
        const db = client.db('finance-auth');

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return NextResponse.json({
                error: '존재하지 않는 이메일입니다.'
            }, { status: 400 });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1시간 후

        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $set: {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: resetTokenExpiry
                }
            }
        )

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

        await sendEmail({
            to: email,
            subject: '비밀번호 찾기 이메일 인증',
            html: `
                <p>비밀번호 찾기 이메일 인증</p>
                <p>안녕하세요, ${user.name}님</p>
                <p>아래 링크를 클릭하여 비밀번호를 재설정해주세요.</p>
                <a href="${resetLink}">비밀번호 재설정</a>
                <p>만약 비밀번호 찾기를 요청하지 않았다면 이 이메일을 무시해주세요.</p>
                <p>이 링크는 1시간 후에 만료됩니다.</p>
            `
        })

        return NextResponse.json(
            { message: '비밀번호 재설정 이메일이 전송되었습니다.' },
            { status: 200 }
        )
    } catch (error) {
        console.error('비밀번호 찾기 오류:', error);
        return NextResponse.json({
            error: '비밀번호 찾기 중 오류가 발생했습니다.'
        }, { status: 500 });
    }
}