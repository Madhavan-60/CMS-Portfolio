import Link from 'next/link';
import { useRouter } from 'next/router';

const nav = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/experience', label: 'Experience' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/services', label: 'Services' },
  { href: '/media', label: 'Media Upload' },
  { href: '/messages', label: 'Contact Messages' },
];

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow h-screen sticky top-0 p-4 space-y-3">
          <div className="text-xl font-bold">CMS Admin</div>
          <nav className="space-y-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`block rounded px-3 py-2 text-sm font-medium ${router.pathname === item.href ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                  {item.label}
                </div>
              </Link>
            ))}
            <button
              className="mt-4 w-full rounded px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                router.push('/login');
              }}
            >
              Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
