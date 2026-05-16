import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../core/models/category';
import { CategoryService } from '../../core/services/category-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoriesComponent implements OnInit {

  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];

  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {

    this.categoryService.getCategories()
      .subscribe({
        next: (res) => {

          this.categories = res;

          this.cdr.detectChanges(); // 👈 هنا المهم

        },
        error: (err) => {
          console.log(err);
        }
      });

  }



}