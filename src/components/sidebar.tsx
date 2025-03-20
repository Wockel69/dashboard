"use client";

import {
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Target,
  Ticket,
  Instagram
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarLink({ href, icon, label, isActive = false }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/20 ${isActive ? 'bg-muted/20 border-l-2 border-primary' : ''}`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <span className="sidebar-label transition-opacity duration-200">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Logo />

      <div className="mt-6">
        <p className="px-4 py-2 text-xs text-muted-foreground sidebar-label">MENÜ</p>
        <SidebarLink
          href="/"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          isActive={pathname === '/'}
        />
        <SidebarLink
          href="/zielgruppe"
          icon={<Target size={18} />}
          label="Zielgruppe"
          isActive={pathname === '/zielgruppe'}
        />
        <SidebarLink
          href="/plaene"
          icon={<Ticket size={18} />}
          label="Pläne"
          isActive={pathname === '/plaene'}
        />
        <SidebarLink
          href="/hilfe"
          icon={<HelpCircle size={18} />}
          label="Hilfe"
          isActive={pathname === '/hilfe'}
        />
      </div>

      <div className="absolute bottom-4 w-full">
        <SidebarLink
          href="/logout"
          icon={<LogOut size={18} />}
          label="Abmelden"
        />
      </div>
    </aside>
  );
}
