import { CardProductModule } from './card-product.module';

describe('CardProductModule', () => {
  let cardProductModule: CardProductModule;

  beforeEach(() => {
    cardProductModule = new CardProductModule();
  });

  it('should create an instance', () => {
    expect(cardProductModule).toBeTruthy();
  });
});
