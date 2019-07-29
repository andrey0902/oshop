import { ProductQuantityModule } from './product-quantity.module';

describe('ProductQuantityModule', () => {
  let productQuantityModule: ProductQuantityModule;

  beforeEach(() => {
    productQuantityModule = new ProductQuantityModule();
  });

  it('should create an instance', () => {
    expect(productQuantityModule).toBeTruthy();
  });
});
