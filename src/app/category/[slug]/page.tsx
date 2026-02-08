
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { productsByCategory } from '@/lib/products';

export default function CategoryPage() {
    const params = useParams();
    const category = params.slug as string;
    const categoryTitle = category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const variants = productsByCategory[category as keyof typeof productsByCategory] || [];
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
                                <Link key={variant.id} href={`/product/${variant.id}`} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
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
                                </Link>
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
