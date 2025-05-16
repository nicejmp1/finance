import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        
        cookieStore.delete('session');
        
        return NextResponse.json(
            { message: '로그아웃 성공' },
            {
                status: 200,
                headers: {
                    'Set-Cookie': 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                }
            }
        )
    } catch {
        return NextResponse.json(
            { error: '로그아웃 오류' },
            { status: 500 }
        )
    }
}
