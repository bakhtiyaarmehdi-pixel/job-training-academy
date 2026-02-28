import { Link } from '@tanstack/react-router';
import { GraduationCap, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'skillup-academy';

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-7 h-7 text-sky-accent" />
              <span className="font-display font-bold text-xl">SkillUp Academy</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Empowering professionals with industry-relevant skills and job-ready training programs.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-accent transition-colors">
                <SiFacebook className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-accent transition-colors">
                <SiX className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-accent transition-colors">
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-accent transition-colors">
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'All Courses', path: '/courses' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Admin Dashboard', path: '/admin' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+911234567890" className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-sky-accent flex-shrink-0" />
                  +91 12345 67890
                </a>
              </li>
              <li>
                <a href="mailto:info@skillupacademy.in" className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-sky-accent flex-shrink-0" />
                  info@skillupacademy.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-sky-accent flex-shrink-0 mt-0.5" />
                123 Training Street, Tech Park, Bangalore - 560001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {year} SkillUp Academy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-accent hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
