import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentRequest {
  orderId: number;
  paymentMethod: string;
  successUrl: string;
  cancelUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://ecommercepro.runasp.net/api/Payment';

  constructor(private http: HttpClient) {}

  createPaymentIntent(data: PaymentRequest): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/create-payment-intent`,
      data
    );
  }

  paymentSuccess(orderId: number, sessionId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/success?orderId=${orderId}&sessionId=${sessionId}`
    );
  }
}