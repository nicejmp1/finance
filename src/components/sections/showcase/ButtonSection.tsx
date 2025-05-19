import { Button, Card } from "@/components/ui";

export function ButtonSection() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">버튼</h2>
            <Card hover className="bg-gray-50/50 backdrop-blur-sm">
                <div className="space-y-8">
                    {/* 기본 버튼들 */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">기본 스타일</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button className="shadow-sm hover:shadow-md transition-all">
                                기본 버튼
                            </Button>
                            <Button variant="secondary" className="shadow-sm hover:shadow-md transition-all">
                                보조 버튼
                            </Button>
                            <Button variant="outline" className="hover:bg-purple-50 transition-all">
                                테두리 버튼
                            </Button>
                        </div>
                    </div>
                    {/* 크기 변형 */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">크기 변형</h3>
                        <div className="flex items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button>Medium</Button>
                            <Button size="lg">Large</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    )
}
