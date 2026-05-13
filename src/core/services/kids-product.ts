import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChildProduct } from '../models/child-product';

@Injectable({ providedIn: 'root' })
export class KidsProductService {
  // constructor(private http: HttpClient) { }


  private readonly http = inject(HttpClient);

  // Mock data for kids products
  private mockKidsProducts: ChildProduct[] = [
    {
      id: '1',
      name: '🌸 Floral Princess Dress 🌸',
      description: 'Beautiful floral dress with sparkly details perfect for little princesses',
      price: 29.99,
      category: 'toddler-girl',
      ageRange: '2-3 years',
      size: ['2T', '3T', '4T'],
      color: ['Pink', 'Purple', 'White'],
      material: 'Cotton Blend',
      brand: 'TinyTrends',
      images: ['assets/products/dress1.jpg'],
      stock: [
        { size: '2T', color: 'Pink', quantity: 10 },
        { size: '3T', color: 'Pink', quantity: 15 }
      ],
      season: 'spring',
      occasion: ['Party', 'Casual'],
      ratings: [],
      averageRating: 4.8,
      sellerId: 'seller1',
      isFeatured: true,
      discount: 20,
      createdAt: new Date()
    },
    {
      id: '2',
      name: '🦸 Superhero Graphic T-Shirt 🦸',
      description: 'Cool superhero themed t-shirt for little heroes',
      price: 19.99,
      category: 'toddler-boy',
      ageRange: '3-4 years',
      size: ['3T', '4T', '5T'],
      color: ['Blue', 'Red', 'Green'],
      material: '100% Cotton',
      brand: 'TinyTrends',
      images: ['assets/products/tshirt1.jpg'],
      stock: [{ size: '3T', color: 'Blue', quantity: 20 }],
      season: 'summer',
      occasion: ['Casual', 'School'],
      ratings: [],
      averageRating: 4.5,
      sellerId: 'seller1',
      isFeatured: false,
      discount: 0,
      createdAt: new Date()
    },
    {
      id: '3',
      name: '🐻 Cozy Bear Hoodie 🐻',
      description: 'Warm and cozy hoodie with cute bear ears',
      price: 34.99,
      category: 'unisex',
      ageRange: '1-2 years',
      size: ['12M', '18M', '24M'],
      color: ['Brown', 'Gray', 'Blue'],
      material: 'Fleece',
      brand: 'TinyTrends',
      images: ['assets/products/hoodie1.jpg'],
      stock: [{ size: '12M', color: 'Brown', quantity: 12 }],
      season: 'winter',
      occasion: ['Casual', 'Sleepwear'],
      ratings: [],
      averageRating: 4.9,
      sellerId: 'seller1',
      isFeatured: true,
      discount: 15,
      createdAt: new Date()
    },
    {
      id: '4',
      name: '👖 Stretchable Denim Jeans 👖',
      description: 'Comfortable stretchable jeans for active kids',
      price: 24.99,
      category: 'unisex',
      ageRange: '4-5 years',
      size: ['4T', '5T', '6T'],
      color: ['Blue', 'Black'],
      material: 'Denim with Spandex',
      brand: 'TinyTrends',
      images: ['assets/products/jeans1.jpg'],
      stock: [{ size: '4T', color: 'Blue', quantity: 25 }],
      season: 'all',
      occasion: ['Casual', 'School'],
      ratings: [],
      averageRating: 4.6,
      sellerId: 'seller1',
      isFeatured: false,
      discount: 10,
      createdAt: new Date()
    }
  ];

  getProducts(): Observable<ChildProduct[]> {
    // Replace with actual API call
    // return this.http.get<ChildProduct[]>('/api/kids/products');
    return of(this.mockKidsProducts);
  }

  getProductById(id: string): Observable<ChildProduct> {
    return this.http.get<ChildProduct>(`/api/kids/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<ChildProduct[]> {
    return this.http.get<ChildProduct[]>(`/api/kids/products/category/${category}`);
  }

  getFeaturedProducts(): Observable<ChildProduct[]> {
    return this.http.get<ChildProduct[]>('/api/kids/products/featured');
  }

  searchProducts(query: string): Observable<ChildProduct[]> {
    return this.http.get<ChildProduct[]>(`/api/kids/products/search?q=${query}`);
  }

  createProduct(product: ChildProduct): Observable<ChildProduct> {
    return this.http.post<ChildProduct>('/api/kids/products', product);
  }

  updateProduct(id: string, product: Partial<ChildProduct>): Observable<ChildProduct> {
    return this.http.put<ChildProduct>(`/api/kids/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`/api/kids/products/${id}`);
  }
}