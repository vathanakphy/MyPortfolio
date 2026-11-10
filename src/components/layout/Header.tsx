import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: (isOpen?: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const pathname = usePathname();
  const closeMenu = () => toggleMobileMenu(false);

  const NavItem: React.FC<{ link: typeof navLinks[0], onClick?: () => void }> = ({ link, onClick }) => {
    const className = "text-black hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-md text-sm cursor-pointer";

    const isActive = link.isPageLink === true && pathname === link.href;

    return (
      <Link
        href={link.href}
        className={`${className} ${isActive ? '!text-blue-400' : ''}`}
        onClick={onClick}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="bg-white text-black border-b border-gray-300 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => <NavItem key={link.href} link={link} />)}
            </nav>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => toggleMobileMenu()} className="p-2 rounded-full text-blue-400 hover:bg-gray-800" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/80 backdrop-blur-lg py-4 absolute top-full left-0 w-full">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => <NavItem key={link.href} link={link} onClick={closeMenu} />)}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
