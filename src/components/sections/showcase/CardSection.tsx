import { Card, Button } from "@/components/ui";

export function CardSection() {
    return (
        <section>
        <h2 className="text-2xl font-bold mb-8 text-gray-800">카드</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {/* 기본 카드 */}
            <Card 
                title="기본 카드" 
                hover
                className="bg-gradient-to-br from-white to-gray-50/80"
            >
                <p className="text-gray-600 leading-relaxed">
                    깔끔하고 모던한 디자인의 기본 카드 컴포넌트입니다.
                    다양한 콘텐츠를 담을 수 있습니다.
                </p>
            </Card>

            {/* 액션 카드 */}
            <Card 
                title="액션 카드" 
                hover
                className="bg-gradient-to-br from-white to-gray-50/80"
            >
                <p className="text-gray-600 mb-6 leading-relaxed">
                    버튼이나 다른 인터랙션 요소를 포함할 수 있는
                    다용도 카드입니다.
                </p>
                <div className="flex gap-3">
                    <Button size="sm">확인</Button>
                    <Button variant="outline" size="sm">취소</Button>
                </div>
            </Card>

            {/* 이미지 카드 */}
            <Card hover className="overflow-hidden">
                <img 
                    src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13262118&filePath=L2Rpc2sxL25ld2RhdGEvMjAyMC8yMS9DTFMxMDAwNi82MmZhMWExMy03ZjRmLTQ1NWMtYTZlNy02ZTk2YjhjMjBkYTk=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006"
                    alt="예시 이미지" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        이미지 카드
                    </h3>
                    <p className="text-gray-600">
                        이미지와 텍스트가 조화롭게 어우러진 카드입니다.
                    </p>
                </div>
            </Card>

            {/* 리스트 카드 */}
            <Card 
                title="리스트 카드"
                hover 
                className="bg-gradient-to-br from-white to-gray-50/80"
            >
                <ul className="divide-y divide-gray-100">
                    <li className="py-3 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        첫 번째 항목
                    </li>
                    <li className="py-3 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        두 번째 항목
                    </li>
                    <li className="py-3 text-gray-700 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        세 번째 항목
                    </li>
                </ul>
            </Card>
        </div>
    </section>
    )
}