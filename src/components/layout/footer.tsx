'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

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

const StoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M85.3,82.9L50,17.1L14.7,82.9H85.3z M50,25.9l27.8,51.1H22.2L50,25.9z"/>
        <path d="M50,43.2l-12.5,23h25L50,43.2z"/>
    </svg>
);


export default function Footer() {
    const footerBg = PlaceHolderImages.find(p => p.id === 'footer-background');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-card text-foreground pt-16 pb-8 border-t mt-auto">
            {footerBg && (
                 <Image
                    src={footerBg.imageUrl}
                    alt="Footer background"
                    fill
                    objectFit="cover"
                    className="opacity-20"
                    data-ai-hint={footerBg.imageHint}
                />
            )}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {/* Contact Us */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-headline font-bold mb-4 border-b-2 border-primary inline-block pb-1">CONTACT US</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                                <span>
                                    Phone: 0086-15063007107 Mr.Zhang<br/>
                                    0086-13606397020 Mr.Zhang
                                </span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                                <span>Email: info@stoneemporium.com</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0"/>
                                <span>
                                    Dazeshan Town, Pingdu City,<br/>
                                    Qingdao City, Shandong Province, China
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-headline font-bold mb-4 border-b-2 border-primary inline-block pb-1">PRODUCTS</h3>
                        <ul className="space-y-2 text-sm">
                           {productLinks.map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Online Message */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h3 className="text-xl font-headline font-bold mb-4 border-b-2 border-primary inline-block pb-1">ONLINE MESSAGE</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input type="text" placeholder="Name*" required className="bg-background/50 border-border"/>
                                <Input type="tel" placeholder="Phone" className="bg-background/50 border-border"/>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <Input type="email" placeholder="E-mail*" required className="bg-background/50 border-border"/>
                                <Input type="text" placeholder="Country" className="bg-background/50 border-border"/>
                            </div>
                            <Textarea placeholder="Message*" required rows={4} className="bg-background/50 border-border"/>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-foreground/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                         <div className="flex items-center gap-3 text-primary">
                            <StoneIcon className="w-12 h-12 text-foreground" />
                            <span className="text-2xl font-headline text-foreground">Stone Emporium</span>
                        </div>
                        <nav className="flex items-center gap-6">
                           {navLinks.map(link => (
                                <Link key={link.name} href={link.href} className="text-sm hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                             <Link href="/category/sandstone" className="text-sm hover:text-primary transition-colors">
                                Products
                            </Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            {socialLinks.map(social => (
                                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                                    <social.icon className="w-5 h-5"/>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-8">
                        Copyright &copy; {currentYear} Stone Emporium. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
