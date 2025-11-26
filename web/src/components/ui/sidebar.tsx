import Link from "next/link"
import { LayoutDashboard, Users, ClipboardCheck, Settings } from "lucide-react"

const navItems = [
    { name: "대시보드", href: "/dashboard", icon: LayoutDashboard },
    { name: "업체 관리", href: "/clients", icon: Users },
    { name: "평가 관리", href: "/assessments", icon: ClipboardCheck },
    { name: "설정", href: "/settings", icon: Settings },
]

export function Sidebar() {
    return (
        <aside className="hidden w-64 flex-col border-r bg-background md:flex h-[calc(100vh-3.5rem)] sticky top-14">
            <nav className="grid items-start gap-2 p-4 text-sm font-medium">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
