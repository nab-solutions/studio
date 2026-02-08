'use client';

import { useState, useEffect, ReactNode } from 'react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Factory, CircleDollarSign, ShieldCheck, Ship, Building2, Trees, Square, PanelTop, LayoutGrid, ArrowRight, Mountain, Search, Package, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const facts = [
    { value: '2001', label: 'Establishment time' },
    { value: '40,000+', label: 'Factory Area (m²)' },
    { value: '50+', label: 'The amount of the transaction' },
    { value: '2000+', label: 'Daily Production (m²)' },
];

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
        name: 'Crazy Stone',
        id: 'category-crazy-stone',
    },
    {
        name: 'Rockface Stone',
        id: 'category-rockface-stone',
    },
    {
        name: 'Stepping Stone',
        id: 'category-stepping-stone',
    }
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

const applicationAreasData = [
  {
    id: 'indoor-floor',
    name: 'Indoor Floor',
    description: 'Our materials are commonly used for indoor floors in living spaces, lobbies, and hallways, offering comfort, surface durability, and modern style.',
    icon: LayoutGrid,
    imagePlaceholderId: 'application-indoor-floor',
    slug: 'indoor-floor'
  },
  {
    id: 'building-facades',
    name: 'Building Facades',
    description: 'Create stunning and durable exteriors with our wide range of natural stone options, perfect for any architectural style.',
    icon: Building2,
    imagePlaceholderId: 'application-building-facade',
    slug: 'building-facades'
  },
  {
    id: 'garden-landscape-stone',
    name: 'Garden Landscape Stone',
    description: 'Enhance your outdoor spaces with natural stone for pathways, patios, and decorative features that blend seamlessly with nature.',
    icon: Trees,
    imagePlaceholderId: 'application-garden-landscape',
    slug: 'garden-landscape'
  },
   {
    id: 'outdoor-floors',
    name: 'Outdoor Floors',
    description: 'Durable and weather-resistant, our outdoor flooring stones provide a safe and beautiful surface for patios, pool decks, and walkways.',
    icon: Square,
    imagePlaceholderId: 'application-outdoor-floor',
    slug: 'outdoor-floors'
  },
  {
    id: 'indoor-wall',
    name: 'Indoor Wall',
    description: 'Transform interior spaces with feature walls made from our exquisite natural stones, adding texture, depth, and character.',
    icon: PanelTop,
    imagePlaceholderId: 'application-indoor-wall',
    slug: 'indoor-wall'
  },
  {
    id: 'boulders',
    name: 'Boulders',
    description: 'Add a natural, rugged focal point to your landscape with our selection of unique boulders, perfect for gardens and outdoor features.',
    icon: Mountain,
    imagePlaceholderId: 'application-boulders',
    slug: 'boulders'
  },
];


const Content = () => {
  const aboutUsImage = PlaceHolderImages.find(p => p.id === 'about-us-home');
  const [selectedApplication, setSelectedApplication] = useState(applicationAreasData[0]);
  const selectedImage = PlaceHolderImages.find(p => p.id === selectedApplication.imagePlaceholderId);
  const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const qualitySteps = [
    {
      id: 'sourcing',
      title: 'Sourcing',
      description: "We meticulously source our natural stones from the world's most reputable quarries, selecting only the finest blocks.",
      icon: Search,
      imageId: 'quality-sourcing',
      imageHint: 'raw stone quarry'
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      description: "Our state-of-the-art facility uses precision machinery to cut, shape, and finish each piece to perfection.",
      icon: Factory,
      imageId: 'quality-manufacturing',
      imageHint: 'stone factory cutting'
    },
    {
      id: 'quality-control',
      title: 'Quality Control',
      description: "Every slab undergoes a rigorous inspection process to check for color consistency, integrity, and finish quality.",
      icon: ShieldCheck,
      imageId: 'quality-control',
      imageHint: 'stone inspection'
    },
    {
      id: 'packaging-shipping',
      title: 'Packaging & Shipping',
      description: "Robust packaging and careful loading ensure your stone is protected during transit to destinations worldwide.",
      icon: Package,
      imageId: 'quality-packaging',
      imageHint: 'stone shipping container'
    },
    {
      id: 'delivery-after-sales',
      title: 'Delivery & After Sales',
      description: "We ensure timely delivery and provide comprehensive after-sales support to guarantee your complete satisfaction.",
      icon: ThumbsUp,
      imageId: 'quality-delivery',
      imageHint: 'delivery truck'
    },
  ];
  
  const [activeQualityStep, setActiveQualityStep] = useState(qualitySteps[0]);

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <h2 className="font-headline text-3xl font-bold mb-10 text-center text-foreground">
          Product Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCategories.map((category) => {
                const placeholder = PlaceHolderImages.find(p => p.id === category.id);
                return (
                    <Link key={category.name} href={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}>
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
        <div className="mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center">
                {facts.map((fact) => (
                    <div key={fact.label}>
                        <h3 className="text-5xl font-headline text-foreground">{fact.value}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{fact.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="mt-24 py-16">
        <h2 className="font-headline text-3xl font-bold mb-10 text-center text-foreground">
            Our Advantage
        </h2>
        {isMobile ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {advantages.map((advantage) => {
                    const placeholder = PlaceHolderImages.find(p => p.id === advantage.id);
                    const Icon = advantage.icon;
                    return (
                        <Card key={advantage.title} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <CardHeader className="p-0">
                                <div className="relative aspect-video">
                                    {placeholder && (
                                        <Image
                                            src={placeholder.imageUrl}
                                            alt={advantage.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={placeholder.imageHint}
                                        />
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-center">
                                <Icon className="w-12 h-12 mb-4 mx-auto text-primary" />
                                <h3 className="text-xl font-headline font-bold text-card-foreground">{advantage.title}</h3>
                                <p className="text-sm font-body mt-2 text-muted-foreground">
                                    {advantage.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        ) : (
            <div 
              className="flex w-full h-[500px]"
              onMouseLeave={() => setHoveredAdvantage(null)}
            >
              {advantages.map((advantage, index) => {
                const placeholder = PlaceHolderImages.find(p => p.id === advantage.id);
                const Icon = advantage.icon;
                return (
                    <motion.div 
                        key={advantage.title}
                        onMouseEnter={() => setHoveredAdvantage(index)}
                        className="relative h-full overflow-hidden cursor-pointer"
                        animate={{ flex: hoveredAdvantage === index ? 4 : 1 }}
                        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                        style={{ flex: 1 }}
                    >
                        {placeholder && (
                            <Image
                                src={placeholder.imageUrl}
                                alt={advantage.title}
                                fill
                                className="object-cover"
                                data-ai-hint={placeholder.imageHint}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end items-center h-full text-center">
                            <div className="w-full">
                                <Icon className="w-10 h-10 mb-4 mx-auto" />
                                <h3 className="text-2xl font-headline font-bold">{advantage.title}</h3>
                                <motion.div
                                    initial={false}
                                    animate={{ 
                                        opacity: hoveredAdvantage === index ? 1 : 0,
                                        height: hoveredAdvantage === index ? 'auto' : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-sm font-body mt-2">
                                        {advantage.description}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                );
              })}
            </div>
        )}
    </div>

      <div className="mt-24 py-16">
        <div className="relative h-[80vh] md:h-[600px] w-full text-white rounded-lg overflow-hidden shadow-xl">
            {selectedImage && (
                <Image
                    src={selectedImage.imageUrl}
                    alt={selectedApplication.name}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out"
                    key={selectedApplication.id}
                    data-ai-hint={selectedImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between">
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-headline font-bold text-white relative inline-block">
                        APPLICATION AREA
                        <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-white"></span>
                    </h2>
                    <div className="mt-8 max-w-md">
                        <h3 className="text-4xl font-headline">{selectedApplication.name}</h3>
                        <p className="mt-4 text-base font-body">{selectedApplication.description}</p>
                        <Link href={`/application/${selectedApplication.slug}`} passHref>
                            <Button variant="link" className="text-white pl-0 mt-4 group hover:text-white/90">
                                View More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm">
                    <div className="grid grid-cols-3 md:grid-cols-6">
                        {applicationAreasData.map((area) => {
                            const Icon = area.icon;
                            return (
                                <button
                                    key={area.id}
                                    onClick={() => setSelectedApplication(area)}
                                    className={cn(
                                        "p-4 text-center cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center gap-2 h-28 border-t-2",
                                        selectedApplication.id === area.id ? 'bg-white/20 border-primary' : 'hover:bg-white/10 border-transparent'
                                    )}
                                >
                                    <Icon className="w-8 h-8" />
                                    <span className="text-xs font-body">{area.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-24 py-16">
        <h2 className="font-headline text-3xl font-bold mb-4 text-center text-foreground">
          How We Ensure Quality Stone In 5 Steps
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Learn how we process stone in 5 clear steps. Understand what we do to ensure quality at every stage.
        </p>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-4">
                {qualitySteps.map((step) => {
                const Icon = step.icon;
                const isActive = activeQualityStep.id === step.id;
                return (
                    <button
                    key={step.id}
                    onClick={() => setActiveQualityStep(step)}
                    className={cn(
                        "group relative p-6 rounded-lg text-left transition-all duration-300 w-full",
                        isActive ? "bg-card shadow-xl" : "hover:bg-card/80"
                    )}
                    >
                    <div className="flex items-center gap-6">
                        <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                        <Icon className="w-8 h-8" />
                        </div>
                        <div>
                        <h3 className="font-headline text-xl font-bold">{step.title}</h3>
                        <AnimatePresence>
                        {isActive && (
                            <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '0.5rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-muted-foreground"
                            >
                            {step.description}
                            </motion.p>
                        )}
                        </AnimatePresence>
                        </div>
                    </div>
                    </button>
                );
                })}
            </div>
            <div className="relative sticky top-28 h-[500px]">
                <AnimatePresence>
                    <motion.div
                        key={activeQualityStep.id}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        {(() => {
                            const placeholder = PlaceHolderImages.find(p => p.id === activeQualityStep.imageId);
                            return placeholder ? (
                                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={placeholder.imageUrl}
                                        alt={activeQualityStep.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={placeholder.imageHint}
                                    />
                                </div>
                            ) : null;
                        })()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>


        {/* Mobile View: Accordion */}
        <div className="md:hidden w-full">
            <Accordion type="single" collapsible defaultValue={qualitySteps[0].id} className="w-full space-y-4">
                {qualitySteps.map((step) => {
                    const Icon = step.icon;
                    const placeholder = PlaceHolderImages.find(p => p.id === step.imageId);
                    return (
                        <AccordionItem value={step.id} key={step.id} className="bg-card border rounded-lg">
                            <AccordionTrigger className="p-4 text-left hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <Icon className="w-8 h-8 text-primary flex-shrink-0"/>
                                    <span className="font-headline text-xl">{step.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className="flex flex-col gap-4">
                                    {placeholder && (
                                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                                            <Image
                                                src={placeholder.imageUrl}
                                                alt={step.title}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={placeholder.imageHint}
                                            />
                                        </div>
                                    )}
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
      </div>

    </div>
  );
};

export default function Home() {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
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
