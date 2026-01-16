'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

const products = {
    marble: [
        { name: 'Carrara', id: 'variant-carrara' },
        { name: 'Calacatta', id: 'variant-calacatta' },
        { name: 'Statuario', id: 'variant-statuario' },
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
            <div className="container mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-headline capitalize">{category}</h1>
                    <Link href="/" passHref>
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {variants.map((variant) => {
                        const placeholder = PlaceHolderImages.find(p => p.id === variant.id);
                        return (
                            <Card key={variant.name} className="overflow-hidden bg-card">
                                <CardHeader className="p-0">
                                    <div className="relative h-64 w-full">
                                        {placeholder && (
                                            <Image
                                                src={placeholder.imageUrl}
                                                alt={variant.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                data-ai-hint={placeholder.imageHint}
                                            />
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-xl font-headline text-card-foreground">{variant.name}</CardTitle>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
