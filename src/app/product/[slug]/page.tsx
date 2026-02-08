
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { products } from '@/lib/products';
import { ArrowLeft } from 'lucide-react';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const product = products.find(p => p.id === slug);
    const placeholder = product ? PlaceHolderImages.find(p => p.id === product.id) : undefined;

    if (!product) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Product Not Found</h1>
                <Link href="/" passHref>
                    <Button variant="link" className="mt-4 text-primary">Go back home</Button>
                </Link>
            </div>
        );
    }
    
    const categoryTitle = product.category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto py-16 px-4">
                <div className="mb-8">
                     <Button variant="link" onClick={() => router.back()} className="text-primary pl-0 hover:text-primary/80">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to {categoryTitle}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                    <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl">
                        {placeholder && (
                            <Image
                                src={placeholder.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                data-ai-hint={placeholder.imageHint}
                            />
                        )}
                    </div>

                    <div className="sticky top-28">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{product.name}</h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category:</span>
                            <Link href={`/category/${product.category}`} className="text-primary hover:underline">
                                {categoryTitle}
                            </Link>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-8">
                             <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Application:</span>
                             <span className="text-lg">{product.application}</span>
                        </div>

                        {product.description && (
                            <>
                                <h2 className="text-2xl font-headline font-bold mb-3">Description</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
