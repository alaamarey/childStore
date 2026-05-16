import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../core/services/category-service';
import { Category } from '../../core/models/category';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.html',
  styleUrl: './category-details.css'
})
export class CategoryDetailsComponent implements OnInit {

  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  category: Category | null = null;
  categoryId!: number;

  ngOnInit(): void {
    this.getCategoryId();
  }



  getCategoryId() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.categoryId = Number(params.get('id'));
        console.log(this.categoryId);

        this.getCategory();
      }
    });
  }



  getCategory() {

    this.categoryService.getCategoryById(this.categoryId)
      .subscribe({
        next: (res) => {

          this.category = res;

          this.cdr.detectChanges();

        },
        error: (err) => {
          console.log(err);
        }
      });

  }

}