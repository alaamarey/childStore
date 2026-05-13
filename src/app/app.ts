import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KidsProductList } from '../feature/child-product/child-product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KidsProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ChildShop');
}
