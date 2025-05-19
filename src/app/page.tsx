// src/app/page.tsx
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text mb-6">
          모던한 UI 컴포넌트
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          아름답고 재사용 가능한 UI 컴포넌트 컬렉션
        </p>
        <Link href="/showcase">
          <Button size="lg">
            컴포넌트 구경하기
          </Button>
        </Link>
      </section>
    </div>
  );
}