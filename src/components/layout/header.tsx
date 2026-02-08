'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const StoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M85.3,82.9L50,17.1L14.7,82.9H85.3z M50,25.9l27.8,51.1H22.2L50,25.9z"/>
        <path d="M50,43.2l-12.5,23h25L50,43.2z"/>
    </svg>
);


const productLinks = [
    { name: 'Sandstone', href: '/category/sandstone' },
    { name: 'Crazy Stone', href: '/category/crazy-stone' },
    { name: 'Rockface Stone', href: '/category/rockface-stone' },
    { name: 'Stepping Stone', href: '/category/stepping-stone' },
];

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
];


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const NavLinks = ({ isMobile = false }) => (
    <nav className={cn('flex items-center gap-6', isMobile && 'flex-col items-start gap-4')}>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => isMobile && setIsOpen(false)}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-foreground'
          )}
        >
          {link.name}
        </Link>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn(
            'flex items-center gap-1 text-sm font-medium p-0 h-auto hover:bg-transparent',
            pathname.startsWith('/category') ? 'text-primary' : 'text-foreground',
            'hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0'
            )}>
            Products <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {productLinks.map((link) => (
            <DropdownMenuItem key={link.name} asChild>
              <Link href={link.href} onClick={() => isMobile && setIsOpen(false)}>{link.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <StoneIcon className="w-8 h-8 text-foreground" />
            <span className="text-xl font-headline font-bold text-foreground">Stone Emporium</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>
        <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-8 pt-8">
                        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <StoneIcon className="w-8 h-8 text-foreground" />
                            <span className="text-xl font-headline font-bold text-foreground">Stone Emporium</span>
                        </Link>
                        <NavLinks isMobile />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
