import { TestBed } from '@angular/core/testing';

import { KidsProduct } from './kids-product';

describe('KidsProduct', () => {
  let service: KidsProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KidsProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
