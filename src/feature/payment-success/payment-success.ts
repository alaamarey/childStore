import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  templateUrl: './payment-success.html'
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.queryParamMap.get('orderId'));
    const sessionId = this.route.snapshot.queryParamMap.get('sessionId') || '';

    this.paymentService.paymentSuccess(orderId, sessionId).subscribe({
      next: (res) => {
        console.log('payment success', res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}