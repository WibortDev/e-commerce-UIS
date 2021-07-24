import { TestBed } from '@angular/core/testing';

import { PostProductService } from './post-product.service';

describe('PostProductService', () => {
  let service: PostProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
