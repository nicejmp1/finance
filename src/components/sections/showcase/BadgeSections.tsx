import { Badge } from "@/components/ui";

export function BadgeSections() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">배지</h2>
            <div className="flex flex-wrap gap-4">
                <Badge variant="default">기본 배지</Badge>
                <Badge variant="primary">중요한 배지</Badge>
                <Badge variant="secondary">보조 배지</Badge>
                <Badge variant="success">성공 배지</Badge>
                <Badge variant="warning">경고 배지</Badge>
                <Badge variant="error">오류 배지</Badge>
            </div>
        </section>
    )
}
