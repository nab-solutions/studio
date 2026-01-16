'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function AboutDetailsPage() {
    const commitmentImage = PlaceHolderImages.find(p => p.id === 'about-commitment');

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="w-full bg-card border-b">
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-5xl font-headline text-card-foreground">Our Commitment</h1>
                     <Link href="/about" passHref>
                        <Button variant="link" className="mt-2 pl-0 text-primary hover:text-primary/80">Back to About Us</Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold mb-6">Quality & Craftsmanship</h2>
                    <p className="text-lg mb-6">
                        At Stone Emporium, our commitment goes beyond just selling stone. We believe in the art of craftsmanship and the importance of sustainability. We work closely with our quarry partners to ensure ethical sourcing and environmentally responsible practices.
                    </p>
                    <p className="text-lg mb-8">
                        Our state-of-the-art facility is equipped with the latest technology, allowing our skilled artisans to cut, shape, and finish each piece to perfection. From grand commercial projects to intimate residential spaces, we bring a level of dedication and expertise that is unmatched in the industry.
                    </p>
                    
                    <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl my-12">
                         {commitmentImage && (
                            <Image
                                src={commitmentImage.imageUrl}
                                alt="Craftsmanship"
                                fill
                                className="object-cover"
                                data-ai-hint={commitmentImage.imageHint}
                            />
                        )}
                    </div>

                    <h2 className="text-3xl font-headline font-bold mb-6">Our Vision for the Future</h2>
                    <p className="text-lg mb-8">
                        As we look to the future, we are excited to continue exploring new materials, innovating our processes, and inspiring our clients. We are dedicated to being at the forefront of the natural stone industry, setting new standards for quality, design, and customer service.
                    </p>

                    <div className="text-center">
                        <Link href="/" passHref>
                            <Button size="lg">Explore Our Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
