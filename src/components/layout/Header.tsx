import React from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: (isOpen?: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const closeMenu = () => toggleMobileMenu(false);

  const NavItem: React.FC<{ link: typeof navLinks[0], onClick?: () => void }> = ({ link, onClick }) => {
    const className = "text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-md text-sm cursor-pointer";
  
    if (link.href.includes('#')) {
      return <HashLink smooth to={link.href} className={className} onClick={onClick}>{link.label}</HashLink>;
    }
    return <RouterNavLink to={link.href} className={({ isActive }) => `${className} ${isActive ? '!text-blue-400' : ''}`} onClick={onClick}>{link.label}</RouterNavLink>;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-black/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer">
            Phy Vathanak
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => <NavItem key={link.href} link={link} />)}
          </nav>
          <div className="flex items-center">
            {/* Dark Mode Toggle Button has been REMOVED */}
            <div className="md:hidden ml-2">
              <button onClick={() => toggleMobileMenu()} className="p-2 rounded-full text-gray-400 hover:bg-gray-800" aria-label="Toggle mobile menu">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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