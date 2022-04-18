import { TestBed } from '@angular/core/testing';

import { ProdutofirebaseService } from './produtofirebase.service';

describe('ProdutofirebaseService', () => {
  let service: ProdutofirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutofirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
