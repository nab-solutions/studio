'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const products = {
    sandstone: [
        { name: 'Dholpur Beige', id: 'variant-dholpur-beige', application: 'Floor/Wall' },
        { name: 'Jodhpur', id: 'variant-jodhpur', application: 'Walls' },
        { name: 'Basalt', id: 'variant-basalt', application: 'Floor/Wall' },
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Teakwood Yellow', id: 'variant-teakwood-yellow', application: 'Wall' },
        { name: 'Teakwood Beige', id: 'variant-teakwood-beige', application: 'Wall' },
        { name: 'Indian Mocha', id: 'variant-indian-mocha', application: 'Wall' },
        { name: 'Gwalior Mint', id: 'variant-gwalior-mint', application: 'Wall' },
        { name: 'Sagar Black', id: 'variant-sagar-black', application: 'Wall/Floor' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
    ],
    'crazy-stone': [
        { name: 'Black Pearl', id: 'variant-black-pearl', application: 'Paving' },
        { name: 'Ubatuba', id: 'variant-ubatuba', application: 'Paving' },
        { name: 'Kashmir White', id: 'variant-kashmir-white', application: 'Paving' },
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
        { name: 'Mandana Red', id: 'variant-mandana-red', application: 'Floor/Wall' },
        { name: 'Kota Stone Brown', id: 'variant-kota-brown', application: 'Floor' },
        { name: 'Kota Stone Grey', id: 'variant-kota-grey', application: 'Floor' },
        { name: 'Kota Stone Yellow', id: 'variant-kota-yellow', application: 'Floor' },
        { name: 'Basalt Stone', id: 'variant-basalt', application: 'Floor/Wall' },
    ],
    'rockface-stone': [
        { name: 'Taj Mahal', id: 'variant-taj-mahal', application: 'Walls' },
        { name: 'Super White', id: 'variant-super-white', application: 'Walls' },
        { name: 'Sea Pearl', id: 'variant-sea-pearl', application: 'Walls' },
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
        { name: 'Mandana Red', id: 'variant-mandana-red', application: 'Floor/Wall' },
        { name: 'Kota Stone Brown', id: 'variant-kota-brown', application: 'Floor' },
        { name: 'Kota Stone Grey', id: 'variant-kota-grey', application: 'Floor' },
        { name: 'Kota Stone Yellow', id: 'variant-kota-yellow', application: 'Floor' },
        { name: 'Basalt Stone', id: 'variant-basalt', application: 'Floor/Wall' },
    ],
    'stepping-stone': [
        { name: 'Round Stepping Stone', id: 'variant-stepping-round', application: 'Garden' },
        { name: 'Square Stepping Stone', id: 'variant-stepping-square', application: 'Garden' },
        { name: 'Irregular Stepping Stone', id: 'variant-stepping-irregular', application: 'Garden' },
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
        { name: 'Mandana Red', id: 'variant-mandana-red', application: 'Floor/Wall' },
        { name: 'Kota Stone Brown', id: 'variant-kota-brown', application: 'Floor' },
        { name: 'Kota Stone Grey', id: 'variant-kota-grey', application: 'Floor' },
        { name: 'Kota Stone Yellow', id: 'variant-kota-yellow', application: 'Floor' },
        { name: 'Basalt Stone', id: 'variant-basalt', application: 'Floor/Wall' },
    ]
};

export default function CategoryPage() {
    const params = useParams();
    const category = params.slug as string;
    const categoryTitle = category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const variants = products[category as keyof typeof products] || [];
    const categoryImage = PlaceHolderImages.find(p => p.id === `category-${category}`);

    const [selectedApplication, setSelectedApplication] = useState('All');

    const allApplications = variants.flatMap(v => v.application.split('/'));
    const uniqueApplications = ['All', ...Array.from(new Set(allApplications))];

    const filteredVariants = variants.filter(variant => {
        if (selectedApplication === 'All') return true;
        return variant.application.split('/').includes(selectedApplication);
    });
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="w-full bg-card border-b">
                <div className="container mx-auto py-12 px-4">
                    <div className="flex justify-between items-center gap-8">
                        <div>
                            <h1 className="text-5xl font-headline text-card-foreground">{categoryTitle}</h1>
                            <Link href="/" passHref>
                                <Button variant="link" className="mt-2 pl-0 text-primary hover:text-primary/80">Back to Home</Button>
                            </Link>
                        </div>
                        {categoryImage && (
                             <div className="w-48 h-32 relative rounded-lg overflow-hidden shadow-md hidden md:block">
                                <Image
                                    src={categoryImage.imageUrl}
                                    alt={categoryTitle}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={categoryImage.imageHint}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto py-16 px-4">
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {uniqueApplications.map(app => (
                        <Button 
                            key={app} 
                            variant={selectedApplication === app ? 'default' : 'outline'}
                            onClick={() => setSelectedApplication(app)}
                            className="capitalize"
                        >
                            {app}
                        </Button>
                    ))}
                </div>

                {filteredVariants.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredVariants.map((variant) => {
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
                                        {variant.application && (
                                            <p className="text-sm text-gray-200 transform-gpu translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out delay-100">
                                                {variant.application}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground">No products found for this application.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
