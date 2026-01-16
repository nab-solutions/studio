'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

const products = {
    sandstone: [
        { name: 'Rainbow', id: 'variant-rainbow' },
        { name: 'Teakwood', id: 'variant-teakwood' },
        { name: 'Mint', id: 'variant-mint' },
    ],
    granite: [
        { name: 'Black Pearl', id: 'variant-black-pearl' },
        { name: 'Ubatuba', id: 'variant-ubatuba' },
        { name: 'Kashmir White', id: 'variant-kashmir-white' },
    ],
    quartzite: [
        { name: 'Taj Mahal', id: 'variant-taj-mahal' },
        { name: 'Super White', id: 'variant-super-white' },
        { name: 'Sea Pearl', id: 'variant-sea-pearl' },
    ],
};

export default function CategoryPage() {
    const params = useParams();
    const category = params.slug as string;
    const variants = products[category as keyof typeof products] || [];
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="w-full bg-card py-20 text-center border-b">
                <h1 className="text-5xl font-headline capitalize text-card-foreground">{category}</h1>
                <Link href="/" passHref>
                    <Button variant="link" className="mt-4 text-primary hover:text-primary/80">Back to Home</Button>
                </Link>
            </div>
            
            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {variants.map((variant) => {
                        const placeholder = PlaceHolderImages.find(p => p.id === variant.id);
                        return (
                            <div key={variant.name} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                <div className="aspect-[3/4] relative">
                                    {placeholder && (
                                        <Image
                                            src={placeholder.imageUrl}
                                            alt={variant.name}
                                            fill
                                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            data-ai-hint={placeholder.imageHint}
                                        />
                                    )}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                    <h3 className="text-xl font-headline text-white transform-gpu translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                                        {variant.name}
                                    </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
