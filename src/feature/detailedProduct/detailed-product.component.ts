import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/iproduct';
import { ProductService } from '../../core/services/ProductService';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {

  private cdr = inject(ChangeDetectorRef);

  private productService = inject(ProductService);

  private activatedRoute = inject(ActivatedRoute);

  product: Product | null = null;

  productId!: number;

  ngOnInit(): void {

    this.getId();

  }


  getId(): void {

    this.activatedRoute.paramMap.subscribe({

      next: (params) => {

        this.productId = Number(
          params.get('id')
        );

        console.log(this.productId);

        this.getProductDetails();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
  getProductDetails() {

    this.productService.getProductById(this.productId)
      .subscribe({

        next: (response) => {

          console.log(response);

          this.product = response;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}