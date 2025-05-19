import { Input , Card } from "@/components/ui";

export function InputSections() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">입력 필드</h2>
            <Card hover>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">기본 스타일</h3>
                        <div className="grid gap-4">
                            <Input
                                label="기본 입력"
                                placeholder="기본 스타일 입력창입니다."
                            />
                            <Input
                                variant="filled"
                                label="채워진 스타일"
                                placeholder="배경이 채워진 입력창입니다."
                            />
                            <Input
                                variant="outline"
                                label="테두리 스타일"
                                placeholder="테두리 스타일 입력창입니다."
                            />
                            <Input
                                variant="underline"
                                label="언더라인 스타일"
                                placeholder="언더라인 스타일 입력창입니다."
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">상태 표시</h3>
                        <div className="grid gap-4">
                            <Input
                                status="success"
                                label="성공 상태"
                                placeholder="성공 상태 입력창입니다."
                                helperText="성공 메시지를 표시합니다."
                            />
                            <Input
                                status="warning"
                                label="경고 상태"
                                placeholder="경고 상태 입력창입니다."
                                helperText="경고 메시지를 표시합니다."
                            />
                            <Input
                                status="error"
                                label="오류 상태"
                                placeholder="잘못된 입력값"
                                helperText="오류 메시지를 표시합니다."
                            />                            
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">크기 변형</h3>
                        <div className="grid gap-4">
                            <Input
                                size="sm"
                                label="작은 크기"
                                placeholder="작은 크기 입력창입니다."
                            />
                            <Input
                                size="md"
                                label="기본 크기"
                                placeholder="기본 크기 입력창입니다."
                            />
                            <Input
                                size="lg"
                                label="큰 크기"
                                placeholder="큰 크기 입력창입니다."
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    )

}