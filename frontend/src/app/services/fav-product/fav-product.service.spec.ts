import { TestBed } from '@angular/core/testing';

import { FavProductService } from './fav-product.service';

describe('FavProductService', () => {
  let service: FavProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
