import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">대시보드</h1>
            <p className="text-gray-600 dark:text-gray-400">
                환영합니다, {session.user.name || session.user.email}님!
            </p>
            <p className="mt-2 text-sm text-gray-500">
                권한: {session.user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
            </p>
        </div>
    )
}
