
export type Product = {
    name: string;
    id: string;
    application: string;
    description?: string;
    category: string;
};

const productData: { [key: string]: Omit<Product, 'category' | 'description'>[] & {description?: string}[] } = {
    sandstone: [
        { name: 'Dholpur Beige', id: 'variant-dholpur-beige', application: 'Floor/Wall' },
        { name: 'Jodhpur', id: 'variant-jodhpur', application: 'Walls', description: 'Jodhpur Sandstone is a beautiful pink-hued stone sourced from the historic city of Jodhpur. Its unique color and texture make it a popular choice for wall cladding and architectural features, lending a touch of heritage and elegance to any space.' },
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
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
        { name: 'Mandana Red', id: 'variant-mandana-red', application: 'Floor/Wall' },
        { name: 'Kota Stone Brown', id: 'variant-kota-brown', application: 'Floor' },
        { name: 'Kota Stone Grey', id: 'variant-kota-grey', application: 'Floor' },
        { name: 'Kota Stone Yellow', id: 'variant-kota-yellow', application: 'Floor' },
        { name: 'Basalt', id: 'variant-basalt', application: 'Floor/Wall' },
    ],
    'rockface-stone': [
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
        { name: 'Mandana Red', id: 'variant-mandana-red', application: 'Floor/Wall' },
        { name: 'Kota Stone Brown', id: 'variant-kota-brown', application: 'Floor' },
        { name: 'Kota Stone Grey', id: 'variant-kota-grey', application: 'Floor' },
        { name: 'Kota Stone Yellow', id: 'variant-kota-yellow', application: 'Floor' },
        { name: 'Basalt', id: 'variant-basalt', application: 'Floor/Wall' },
    ],
    'stepping-stone': [
        { name: 'Autumn Brown', id: 'variant-autumn-brown', application: 'Floor/Wall' },
        { name: 'Kandla Grey', id: 'variant-kandla-grey', application: 'Floor/Wall' },
        { name: 'Mandana Red', id: 'variant-mandana-red', application: 'Floor/Wall' },
        { name: 'Kota Stone Brown', id: 'variant-kota-brown', application: 'Floor' },
        { name: 'Kota Stone Grey', id: 'variant-kota-grey', application: 'Floor' },
        { name: 'Kota Stone Yellow', id: 'variant-kota-yellow', application: 'Floor' },
        { name: 'Basalt', id: 'variant-basalt', application: 'Floor/Wall' },
    ]
};

// Add category to each product and flatten the structure
export const products: Product[] = Object.entries(productData).flatMap(([category, variants]) => 
    variants.map(variant => ({
        ...variant,
        category: category
    }))
);

export const productsByCategory = productData;
