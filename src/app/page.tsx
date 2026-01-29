'use client';

import { useState, useEffect, ReactNode } from 'react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Factory, CircleDollarSign, ShieldCheck, Ship } from 'lucide-react';

const videoPoster = PlaceHolderImages.find(p => p.id === 'video-poster');
const videoBackground = PlaceHolderImages.find(p => p.id === 'video-background');
const imageSrc = PlaceHolderImages.find(p => p.id === 'image-src');
const imageBackground = PlaceHolderImages.find(p => p.id === 'image-background');

interface MediaContentData {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
}

interface MediaContentCollection {
  [key: string]: MediaContentData;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://videos.pexels.com/video-files/4434246/4434246-hd_1920_1080_25fps.mp4',
    poster: videoPoster?.imageUrl,
    background: videoBackground?.imageUrl || '',
    title: 'Stone Emporium',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand',
  },
  image: {
    src: imageSrc?.imageUrl || '',
    background: imageBackground?.imageUrl || '',
    title: 'Natural Sandstone',
    date: 'Timeless Beauty',
    scrollToExpand: 'Scroll to Expand',
  },
};

const productCategories = [
    {
        name: 'Sandstone',
        id: 'category-sandstone',
    },
    {
        name: 'Granite',
        id: 'category-granite',
    },
    {
        name: 'Quartzite',
        id: 'category-quartzite',
    },
];

const applicationAreas = [
    {
        name: 'Building Facade',
        id: 'application-facade',
        category: 'sandstone'
    },
    {
        name: 'Landscape',
        id: 'application-landscape',
        category: 'sandstone'
    },
    {
        name: 'Flooring',
        id: 'application-floor',
        category: 'sandstone'
    },
    {
        name: 'Kitchens',
        id: 'application-kitchen',
        category: 'granite'
    },
    {
        name: 'Walls',
        id: 'application-wall',
        category: 'sandstone'
    },
];

const advantages = [
    {
      icon: Factory,
      title: 'Mass Production',
      description: 'The factory covers an area of 40000m² & can produce up to 2000m of board per day. We have 50+ advanced devices.',
      id: 'advantage-mass-production',
      imageHint: 'stone cutting'
    },
    {
      icon: CircleDollarSign,
      title: 'Rich Export Experience',
      description: 'Providing various stone products to customers around the world & enjoying a good reputation in overseas markets.',
      id: 'advantage-rich-export',
      imageHint: 'marble slabs'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      description: 'Implement inspection processes that comply with international standards to ensure that products maintain a high level of quality.',
      id: 'advantage-quality-assurance',
      imageHint: 'stone inspection'
    },
    {
      icon: Ship,
      title: 'Logistics & Services',
      description: 'Mature foreign trade team, proficient in international transportation customs declaration, one-stop efficient export service.',
      id: 'advantage-logistics',
      imageHint: 'cargo ship'
    },
];


const Content = () => {
  const aboutUsImage = PlaceHolderImages.find(p => p.id === 'about-us-home');

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <h2 className="font-headline text-3xl font-bold mb-10 text-center text-foreground">
          Product Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category) => {
                const placeholder = PlaceHolderImages.find(p => p.id === category.id);
                return (
                    <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                        <Card className="overflow-hidden bg-card cursor-pointer hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    {placeholder && <Image 
                                        src={placeholder.imageUrl} 
                                        alt={category.name} 
                                        fill 
                                        style={{ objectFit: 'cover' }}
                                        data-ai-hint={placeholder.imageHint}
                                    />}
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-xl font-headline text-card-foreground">{category.name}</CardTitle>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
      </div>

      <div className="mt-24 py-16">
        <h2 className="font-headline text-3xl font-bold mb-10 text-center text-foreground">
          About Our Emporium
        </h2>
        <Card className="bg-card overflow-hidden">
            <CardContent className="p-0 relative h-80 md:h-96">
                {aboutUsImage && (
                    <Image 
                        src={aboutUsImage.imageUrl} 
                        alt="About Stone Emporium" 
                        fill 
                        className="object-cover"
                        data-ai-hint={aboutUsImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-end justify-center text-right p-8 md:py-16 md:pr-16 md:pl-32">
                    <p className="font-body text-lg text-white max-w-xl mb-6">
                        Stone Emporium has been a trusted name in the natural stone industry for over two decades. We are passionate about bringing the timeless beauty of the earth into your homes and projects.
                    </p>
                    <Link href="/about" passHref>
                        <Button>Learn More About Us</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="mt-24 py-16">
            <h2 className="font-headline text-3xl font-bold mb-10 text-center text-foreground">
                Our Advantage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {advantages.map((advantage) => {
                    const placeholder = PlaceHolderImages.find(p => p.id === advantage.id);
                    const Icon = advantage.icon;
                    return (
                        <div key={advantage.title} className="group relative overflow-hidden rounded-lg shadow-xl aspect-[3/4]">
                            {placeholder && (
                                <Image
                                    src={placeholder.imageUrl}
                                    alt={advantage.title}
                                    fill
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    data-ai-hint={placeholder.imageHint}
                                />
                            )}
                            <div className="absolute inset-0 bg-black/60"></div>
                            <div className="relative flex flex-col items-center justify-center text-center h-full p-4 md:p-6 text-white">
                                <Icon className="w-10 h-10 md:w-12 md:h-12 mb-4" />
                                <h3 className="text-lg md:text-xl font-headline font-bold mb-2">{advantage.title}</h3>
                                <p className="text-xs md:text-sm font-body">{advantage.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      <div className="mt-24 py-16">
        <h2 className="font-headline text-3xl font-bold mb-10 text-center text-foreground">
          Application Areas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {applicationAreas.map((area) => {
                const placeholder = PlaceHolderImages.find(p => p.id === area.id);
                return (
                    <Link key={area.name} href={`/category/${area.category}`} passHref>
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[3/4] cursor-pointer">
                            {placeholder && (
                                <Image
                                    src={placeholder.imageUrl}
                                    alt={area.name}
                                    fill
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    data-ai-hint={placeholder.imageHint}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <h3 className="text-xl font-headline text-white text-center">
                                    {area.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('image');
  const [currentMedia, setCurrentMedia] = useState(sampleMediaContent[mediaType]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentMedia(sampleMediaContent[mediaType]);
  }, [mediaType]);
  
  if (!isMounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => setMediaType('video')}
          variant={mediaType === 'video' ? 'secondary' : 'outline'}
          className={mediaType !== 'video' ? 'text-white border-white/30 hover:bg-white/20 hover:text-white' : ''}
        >
          Video
        </Button>

        <Button
          onClick={() => setMediaType('image')}
          variant={mediaType === 'image' ? 'secondary' : 'outline'}
          className={mediaType !== 'image' ? 'text-white border-white/30 hover:bg-white/20 hover:text-white' : ''}
        >
          Image
        </Button>
      </div>

      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <Content />
      </ScrollExpandMedia>
    </div>
  );
}
