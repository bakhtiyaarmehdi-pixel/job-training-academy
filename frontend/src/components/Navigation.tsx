import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin', path: '/admin' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-display font-bold text-xl hover:opacity-90 transition-opacity">
            <GraduationCap className="w-7 h-7 text-sky-accent" />
            <span>SkillUp Academy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive(link.path)
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/courses"
              className="ml-3 bg-sky-accent text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/courses"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-sky-accent text-white px-5 py-3 rounded-md text-sm font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Enroll Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
