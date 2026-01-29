'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const applicationData: { [key: string]: { name: string, imageId: string, hint: string } } = {
    'building-facades': { name: 'Building Facades', imageId: 'application-building-facade', hint: 'modern building facade' },
    'garden-landscape': { name: 'Garden Landscape', imageId: 'application-garden-landscape', hint: 'stone garden path' },
    'outdoor-floors': { name: 'Outdoor Floors', imageId: 'application-outdoor-floor', hint: 'stone patio flooring' },
    'indoor-wall': { name: 'Indoor Wall', imageId: 'application-indoor-wall', hint: 'interior stone wall' },
    'indoor-floor': { name: 'Indoor Floor', imageId: 'application-indoor-floor', hint: 'marble floor' },
    'stairs': { name: 'Stairs', imageId: 'application-stairs', hint: 'stone staircase' },
};

export default function ApplicationPage() {
    const params = useParams();
    const slug = params.slug as string;
    const area = applicationData[slug];
    const image = PlaceHolderImages.find(p => p.id === area?.imageId);

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
            <div className="w-full bg-card border-b">
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-5xl font-headline text-card-foreground capitalize">{area.name}</h1>
                    <Link href="/" passHref>
                        <Button variant="link" className="mt-2 pl-0 text-primary hover:text-primary/80">Back to Home</Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {image && (
                         <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl my-12">
                            <Image
                                src={image.imageUrl}
                                alt={area.name}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <h2 className="text-3xl font-headline font-bold mb-6">The Beauty of {area.name}</h2>
                    <p className="text-lg mb-6">
                        Discover the versatility and elegance of natural stone for {area.name.toLowerCase()}. Our collection offers a wide range of materials to bring your vision to life, combining durability with timeless style.
                    </p>
                    <p className="text-lg mb-8">
                        Whether you're designing a contemporary commercial space or a classic residential project, our stones provide the perfect foundation. Explore our products to find the ideal match for your {area.name.toLowerCase()} application.
                    </p>
                </div>
            </div>
        </div>
    );
}
