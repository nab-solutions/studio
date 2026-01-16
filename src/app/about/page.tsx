'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-page');

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="w-full bg-card border-b">
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-5xl font-headline text-card-foreground">About Us</h1>
                    <Link href="/" passHref>
                        <Button variant="link" className="mt-2 pl-0 text-primary hover:text-primary/80">Back to Home</Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-headline font-bold mb-4">Our Story</h2>
                        <p className="text-lg mb-6">
                            Founded in 1998, Stone Emporium began as a small family business with a big vision: to provide the highest quality natural stones to our community. Over the years, our passion for geology and design has helped us grow into a leading supplier for architects, designers, and homeowners alike.
                        </p>
                        <p className="text-lg mb-8">
                            We travel the world to source the most exquisite and durable materials, ensuring that every slab we offer meets our rigorous standards of quality and beauty.
                        </p>
                        <Link href="/about/details" passHref>
                            <Button size="lg">Discover Our Journey</Button>
                        </Link>
                    </div>
                    <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                        {aboutImage && (
                            <Image
                                src={aboutImage.imageUrl}
                                alt="Our Team"
                                fill
                                className="object-cover"
                                data-ai-hint={aboutImage.imageHint}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
