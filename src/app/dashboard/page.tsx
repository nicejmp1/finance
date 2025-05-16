import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('dashboard');

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-500 text-sm">총 자산</h2>
          <p className="text-2xl font-semibold">₩1,000,000</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-500 text-sm">이번 달 수입</h2>
          <p className="text-2xl font-semibold text-green-600">₩500,000</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-500 text-sm">이번 달 지출</h2>
          <p className="text-2xl font-semibold text-red-600">₩300,000</p>
        </div>
      </div>
    </div>
  )
}