import { ViewOrderModule } from './view-order.module';

describe('ViewOrderModule', () => {
  let viewOrderModule: ViewOrderModule;

  beforeEach(() => {
    viewOrderModule = new ViewOrderModule();
  });

  it('should create an instance', () => {
    expect(viewOrderModule).toBeTruthy();
  });
});
