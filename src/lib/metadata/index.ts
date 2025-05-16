import { Metadata } from "next";

export const defaultMetadata: Metadata = {
    title: {
        template: 'Finance App | %s',
        default: 'Finance App',
    },
    description: 'Finance App',
}

export const pageMetadata: Record<string, Metadata> = {
    login: {
        title: '로그인',
        description: '로그인 페이지입니다.',
    },
    signup: {
        title: '회원가입',
        description: '회원가입 페이지입니다.',
    },
    dashboard: {
        title: '대시보드',
        description: '대시보드 페이지입니다.',
    },
    transaction: {
        title: '거래내역',
        description: '거래내역 페이지입니다.',
    },
};

export function getPageMetadata(page: keyof typeof pageMetadata): Metadata {
    return {
        ...defaultMetadata,
        ...pageMetadata[page],
    }
}