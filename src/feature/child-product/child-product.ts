import { Component, OnInit, inject } from '@angular/core';
import { ChildProduct } from '../../core/models/child-product';
import { KidsProductService } from '../../core/services/kids-product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kids-product-list',
  templateUrl: './child-product.html',
  styleUrls: ['./child-product.css'],
  imports: [FormsModule]
})
export class KidsProductList implements OnInit {

  private readonly productService = inject(KidsProductService);

  products: ChildProduct[] = [];
  filteredProducts: ChildProduct[] = [];





  // Filters specific to kids clothing
  categories = [
    { value: 'newborn', label: '👶 Newborn (0-3 months)' },
    { value: 'baby-boy', label: '👦 Baby Boy (3-24 months)' },
    { value: 'baby-girl', label: '👧 Baby Girl (3-24 months)' },
    { value: 'toddler-boy', label: '🧒 Toddler Boy (2-4 years)' },
    { value: 'toddler-girl', label: '🎀 Toddler Girl (2-4 years)' },
    { value: 'unisex', label: '🌈 Unisex' }
  ];

  ageRanges = [
    '0-3 months',
    '3-6 months',
    '6-12 months',
    '12-24 months',
    '2-3 years',
    '3-4 years',
    '4-5 years',
    '5-6 years'
  ];

  seasons = ['summer', 'winter', 'spring', 'autumn'];

  occasions = [
    'Casual',
    'Party',
    'School',
    'Sleepwear',
    'Beach',
    'Sports'
  ];

  colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Pink',
    'Purple',
    'White',
    'Black',
    'Gray',
    'Orange'
  ];

  selectedCategory: string = '';
  selectedAgeRange: string = '';
  selectedSeason: string = '';
  selectedOccasion: string = '';
  selectedColor: string = '';

  priceRange: { min: number; max: number } = {
    min: 0,
    max: 100
  };

  searchQuery: string = '';
  sortBy: string = 'newest';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: ChildProduct[]) => {
        this.products = products;
        this.applyAllFilters();
      },

      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  applyAllFilters(): void {

    let filtered: ChildProduct[] = [...this.products];

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(
        p => p.category === this.selectedCategory
      );
    }

    // Age range filter
    if (this.selectedAgeRange) {
      filtered = filtered.filter(
        p => p.ageRange === this.selectedAgeRange
      );
    }

    // Season filter
    if (this.selectedSeason) {
      filtered = filtered.filter(
        p => p.season === this.selectedSeason
      );
    }

    // Occasion filter
    if (this.selectedOccasion) {
      filtered = filtered.filter(
        p =>
          p.occasion &&
          p.occasion.includes(this.selectedOccasion)
      );
    }

    // Color filter
    if (this.selectedColor) {
      filtered = filtered.filter(
        p =>
          p.color &&
          p.color.includes(this.selectedColor)
      );
    }

    // Price filter
    filtered = filtered.filter(
      p =>
        p.price >= this.priceRange.min &&
        p.price <= this.priceRange.max
    );

    // Search filter
    if (this.searchQuery.trim()) {

      const query = this.searchQuery.toLowerCase();

      filtered = filtered.filter(
        p =>
          (p.name?.toLowerCase().includes(query) || false) ||
          (p.description?.toLowerCase().includes(query) || false)
      );
    }

    // Sorting
    this.filteredProducts = this.sortProducts(filtered);
  }

  sortProducts(products: ChildProduct[]): ChildProduct[] {

    switch (this.sortBy) {

      case 'price-low':
        return [...products].sort(
          (a, b) => a.price - b.price
        );

      case 'price-high':
        return [...products].sort(
          (a, b) => b.price - a.price
        );

      case 'rating':
        return [...products].sort(
          (a, b) =>
            (b.averageRating || 0) -
            (a.averageRating || 0)
        );

      case 'newest':
        return [...products].sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime()
        );

      default:
        return products;
    }
  }

  resetFilters(): void {

    this.selectedCategory = '';
    this.selectedAgeRange = '';
    this.selectedSeason = '';
    this.selectedOccasion = '';
    this.selectedColor = '';

    this.priceRange = {
      min: 0,
      max: 100
    };

    this.searchQuery = '';
    this.sortBy = 'newest';

    this.applyAllFilters();
  }

  getDiscountedPrice(product: ChildProduct): number {

    if (!product.discount || product.discount <= 0) {
      return product.price;
    }

    return product.price * (1 - product.discount / 100);
  }



}