import { ShoppingCardService } from './shopping-card.service';

describe('ShoppingCardService', () => {
  let db;
  let shoppingCardService;
  beforeEach(() => {
    db = jasmine.createSpyObj('db', ['list', 'object']);
  });

  it('should be created', () => {
    // set the value to return when the `getValue` spy is called.
    const stubValue = 1;
    db.object.and.returnValue(stubValue);
    shoppingCardService = new ShoppingCardService(db);
    console.log('shoppingCardService', shoppingCardService);
    expect(shoppingCardService).toBeTruthy();
  });
});
