'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiHome, FiBookmark, FiEdit3, FiSearch, FiSettings, FiHelpCircle, FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (pathname === '/' || pathname === '/choose-plan') {
    return null;
  }

  const menuItems = [
    { icon: FiHome, label: 'For you', href: '/for-you', active: true },
    { icon: FiBookmark, label: 'My Library', href: '/library', active: true },
    { icon: FiEdit3, label: 'Highlights', href: '#', active: false },
    { icon: FiSearch, label: 'Search', href: '#', active: false },
    { icon: FiSettings, label: 'Settings', href: '/settings', active: true },
    { icon: FiHelpCircle, label: 'Help & Support', href: '#', active: false },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
{/* Logo */}
<div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
  <figure
    style={{ cursor: 'pointer', margin: 0 }}
    onClick={() => {
      router.push('/for-you');
      setIsMobileOpen(false);
    }}
  >
    <img
      src="/assets/logo.png"
      alt="logo"
      style={{ width: '200px', height: '40px', objectFit: 'contain' }}
    />
  </figure>
</div>

      <nav style={{ flex: 1, padding: '16px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.label} style={{ marginBottom: '8px' }}>
              {item.active ? (
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: pathname === item.href ? '#eff6ff' : 'transparent',
                    color: pathname === item.href ? '#2563eb' : '#374151',
                    fontWeight: pathname === item.href ? '600' : '400',
                    transition: 'background-color 0.2s',
                    textDecoration: 'none',
                  }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: '#9ca3af',
                    cursor: 'not-allowed',
                  }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
        {user ? (
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              width: '100%',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#374151',
              transition: 'background-color 0.2s',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={() => router.push('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              width: '100%',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#374151',
              transition: 'background-color 0.2s',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <FiLogIn size={20} />
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="mobile-menu-btn"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 50,
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: 'none',
          cursor: 'pointer',
          display: 'none',
        }}
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        />
      )}

      <aside className="sidebar-wrapper">
        <SidebarContent />
      </aside>

      <aside
        className={`sidebar-mobile ${isMobileOpen ? 'active' : ''}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '256px',
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          zIndex: 50,
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <SidebarContent />
      </aside>

      <style jsx>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .sidebar-wrapper {
            display: none;
          }
        }
        @media (min-width: 1024px) {
          .sidebar-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
