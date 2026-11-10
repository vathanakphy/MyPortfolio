"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from "../utility/GlobalStyles";

const SiteShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300 font-sans overflow-x-hidden">
      <GlobalStyles />
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={(isOpen) =>
          setIsMobileMenuOpen((previous) => isOpen ?? !previous)
        }
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteShell;
