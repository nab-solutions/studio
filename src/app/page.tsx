'use client';

import { useState, useEffect, ReactNode } from 'react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const videoPoster = PlaceHolderImages.find(p => p.id === 'video-poster');
const videoBackground = PlaceHolderImages.find(p => p.id === 'video-background');
const imageSrc = PlaceHolderImages.find(p => p.id === 'image-src');
const imageBackground = PlaceHolderImages.find(p => p.id === 'image-background');

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContentData {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
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
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.',
      conclusion:
        'The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.',
    },
  },
  image: {
    src: imageSrc?.imageUrl || '',
    background: imageBackground?.imageUrl || '',
    title: 'Dynamic Image Showcase',
    date: 'Aqueous Adventure',
    scrollToExpand: 'Scroll to Expand',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.',
      conclusion:
        'The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.',
    },
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

const Content = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];
  const aboutUsImage = PlaceHolderImages.find(p => p.id === 'about-us-home');

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='font-headline text-3xl font-bold mb-6 text-foreground'>
        About This Component
      </h2>
      <p className='font-body text-lg mb-8 text-foreground'>
        {currentMedia.about.overview}
      </p>

      <p className='font-body text-lg mb-8 text-foreground'>
        {currentMedia.about.conclusion}
      </p>

      <div className="mt-16">
        <h2 className='font-headline text-3xl font-bold mb-10 text-center text-foreground'>
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
        <h2 className='font-headline text-3xl font-bold mb-10 text-center text-foreground'>
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
    </div>
  );
};

export default function Home() {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
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
    <div className='min-h-screen bg-background'>
      <div className='fixed top-4 right-4 z-50 flex gap-2'>
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
        <Content mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
}
