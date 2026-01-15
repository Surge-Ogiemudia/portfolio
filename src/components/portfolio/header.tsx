'use client';

import Link from 'next/link';
import { navLinks, personalInfo } from '@/lib/data';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-sm'
          : 'bg-background'
      )}
    >
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">{personalInfo.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">{navItems}</nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="flex items-center gap-2 mb-8">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">{personalInfo.name}</span>
              </Link>
              <nav className="flex flex-col gap-6">{navItems}</nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
