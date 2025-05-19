import { ButtonSection, CardSection, BadgeSections, InputSections } from "@/components/sections";

export default function Showcase() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* 헤더 섹션 */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                        UI 컴포넌트 쇼케이스
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        모던하고 세련된 UI 컴포넌트 컬렉션을 살펴보세요
                    </p>
                </div>

                <div className="grid gap-16">
                    {/* 버튼 섹션 */}
                    <ButtonSection />

                    {/* 카드 섹션 */}
                    <CardSection />

                    {/* 배지 섹션 */}
                    <BadgeSections />

                    {/* 입력 필드 섹션 */}
                    <InputSections />
                </div>
            </div>
        </div>
    );
}