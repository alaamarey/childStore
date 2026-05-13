export interface Rating {
    userId: string;
    rating: number;
    comment?: string;
    date?: Date;
}





export interface ChildProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'newborn' | 'baby-boy' | 'baby-girl' | 'toddler-boy' | 'toddler-girl' | 'unisex';
    ageRange: string;
    size: string[];
    color: string[];
    material: string;
    brand: string;
    images: string[];
    stock: {
        size: string;
        color: string;
        quantity: number;
    }[];
    season: 'summer' | 'winter' | 'spring' | 'autumn' | 'all';
    occasion: string[];
    ratings: Rating[];
    averageRating: number;
    sellerId: string;
    isFeatured: boolean;
    discount: number;
    createdAt: Date;
}