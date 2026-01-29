'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const applicationData: { [key: string]: { name: string, imageId: string, hint: string } } = {
    'building-facades': { name: 'Building Facades', imageId: 'application-building-facade', hint: 'modern building facade' },
    'garden-landscape': { name: 'Garden Landscape', imageId: 'application-garden-landscape', hint: 'stone garden path' },
    'outdoor-floors': { name: 'Outdoor Floors', imageId: 'application-outdoor-floor', hint: 'stone patio flooring' },
    'indoor-wall': { name: 'Indoor Wall', imageId: 'application-indoor-wall', hint: 'interior stone wall' },
    'indoor-floor': { name: 'Indoor Floor', imageId: 'application-indoor-floor', hint: 'marble floor' },
    'stairs': { name: 'Stairs', imageId: 'application-stairs', hint: 'stone staircase' },
};

const galleryImageData: { [key: string]: { [key: string]: string[] } } = {
    'building-facades': {
        sandstone: ['gallery-facade-sandstone-1', 'gallery-facade-sandstone-2'],
        granite: ['gallery-facade-granite-1', 'gallery-facade-granite-2'],
        marble: ['gallery-facade-marble-1', 'gallery-facade-marble-2'],
    },
    'garden-landscape': {
        sandstone: ['gallery-garden-sandstone-1', 'gallery-garden-sandstone-2'],
        slate: ['gallery-garden-slate-1', 'gallery-garden-slate-2'],
    },
    'outdoor-floors': {
        sandstone: ['gallery-outdoor-sandstone-1', 'gallery-outdoor-sandstone-2'],
        granite: ['gallery-outdoor-granite-1', 'gallery-outdoor-granite-2'],
    },
    'indoor-wall': {
        marble: ['gallery-indoor-wall-marble-1', 'gallery-indoor-wall-marble-2'],
        quartzite: ['gallery-indoor-wall-quartzite-1', 'gallery-indoor-wall-quartzite-2'],
    },
    'indoor-floor': {
        marble: ['gallery-indoor-floor-marble-1', 'gallery-indoor-floor-marble-2'],
        granite: ['gallery-indoor-floor-granite-1', 'gallery-indoor-floor-granite-2'],
    },
    'stairs': {
        granite: ['gallery-stairs-granite-1', 'gallery-stairs-granite-2'],
        marble: ['gallery-stairs-marble-1', 'gallery-stairs-marble-2'],
    },
};

export default function ApplicationPage() {
    const params = useParams();
    const slug = params.slug as string;
    const area = applicationData[slug];
    const image = PlaceHolderImages.find(p => p.id === area?.imageId);

    const stoneTypesForArea = galleryImageData[slug] ? Object.keys(galleryImageData[slug]) : [];
    const [selectedStone, setSelectedStone] = useState(stoneTypesForArea[0] || '');

    const galleryImages = (galleryImageData[slug]?.[selectedStone] ?? [])
        .map(id => PlaceHolderImages.find(p => p.id === id))
        .filter((p): p is NonNullable<typeof p> => p !== undefined);


    if (!area) {
        return (
             <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Application Area Not Found</h1>
                <Link href="/" passHref>
                    <Button variant="link" className="mt-4 text-primary">Go back home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
             <div className="relative w-full h-80">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={area.name}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
                    <h1 className="text-5xl font-headline text-white capitalize">{area.name}</h1>
                     <Link href="/" passHref>
                        <Button variant="link" className="mt-2 pl-0 text-white hover:text-white/80">Back to Home</Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold mb-6">The Beauty of {area.name}</h2>
                    <p className="text-lg mb-6">
                        Discover the versatility and elegance of natural stone for {area.name.toLowerCase()}. Our collection offers a wide range of materials to bring your vision to life, combining durability with timeless style.
                    </p>
                    <p className="text-lg mb-8">
                        Whether you're designing a contemporary commercial space or a classic residential project, our stones provide the perfect foundation. Explore our products to find the ideal match for your {area.name.toLowerCase()} application.
                    </p>

                    <div className="my-16">
                        <h2 className="text-3xl font-headline font-bold mb-8 text-center">Stone Options for {area.name}</h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {stoneTypesForArea.map(stone => (
                                <Button
                                    key={stone}
                                    variant={selectedStone === stone ? 'default' : 'outline'}
                                    onClick={() => setSelectedStone(stone)}
                                    className="capitalize"
                                >
                                    {stone}
                                </Button>
                            ))}
                        </div>

                        {galleryImages.length > 0 ? (
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {galleryImages.map((img, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <div className="relative aspect-square">
                                                    {img && <Image
                                                        src={img.imageUrl}
                                                        alt={`${selectedStone} used for ${area.name}`}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                        data-ai-hint={img.imageHint}
                                                    />}
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4 sm:-left-12" />
                                <CarouselNext className="right-4 sm:-right-12" />
                            </Carousel>
                        ) : (
                            <p className="text-center text-muted-foreground">Select a stone type to see examples.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
