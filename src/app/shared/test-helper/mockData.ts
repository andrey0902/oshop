import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
// tslint:disable
declare let jasmine;

export   const mockUser = {
  email: 'test@gmail.com',
  exist: true,
  isAdmin: true,
  name: 'test'
};

export const mockProduct = new Product({
  $key: null,
  category: 'fruits',
  imageUrl: 'https://pbs.twimg.com/profile_images/689609039605460992/mva6YmZ-_400x400.jpg',
  key: '-KrvrXbV3rqnFEru_ojw',
  price: 1.75,
  title: 'Avacado'
});

export const mockInvalidProduct = new Product({
  $key: null,
  category: '',
  imageUrl: 'pbs.twimg.com/profile_images/689609039605460992/mva6YmZ-_400x400.jpg',
  key: '',
  price: 0,
  title: ''
});

export const formData = {
  email: 'test@gmil.com',
  password: '12345678'
};

export const successPromise = new Promise((resolve, reject) => {
  resolve(true);
});

export const fbUser = {
  displayName: 'testName',
  isAnonymous: true,
  email: 'test@gmil.com',
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};

export const mockSessionService = {
  setReturnUrl: jasmine.createSpy(),
  getReturnUrl: jasmine.createSpy(),
};

export class mockSession2 {
  id;
  constructor(data) {
    this.id = data;
  }

  getCartId() {
    return this.id;
  }
  setCartId(key) {
  }
}

export const fbChanget = {
  payload: {
    exists() {
      return true;
    },
    val() {
      return {
        uid: 'test2',
        quantity: 1
      };
    },
    key: '-ttt'
  }
};

export const mockShoppingCart = new ShoppingCart({
  key: 'ttt', items: {
    '-KrqgOLs07ZkbapP4EGi': {
      product: {
        category: 'vegetables',
        imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
        key: '-KrqgOLs07ZkbapP4EGi',
        price: 2.5,
        title: 'Spinach'
      }, quantity: 3
    }
  }
});

export const mockCheckOutForm = {
  name: 'test',
  address: 'test',
  address2: 'test',
  city: 'test'
};

export const searchStyle = (selector) => {
  let exist;
  // Get all elements that have a style attribute
  const elms = document.querySelectorAll('*[style]');

  Array.prototype.forEach.call(elms, function(elm) {
    // Get the color value
    exist = elm.style[selector] || null;
   });
  return exist;
};

export const getStyle = (elm, selector) => {
  return elm.style[selector] || null;
};

export const mockOrder = {
  'datePlaced': 1534398284765,
  'items': [{
    'product': {
      'title': 'Spinach',
      'price': 2.5,
      'category': 'vegetables',
      'imageUrl': 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
      '$key': null
    }, 'quantity': 1
  }, {
    'product': {
      'title': 'Freshly Baked Bread',
      'price': 3,
      'category': 'bread',
      'imageUrl': 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
      '$key': null
    }, 'quantity': 6
  }, {
    'product': {
      'title': 'Avacado',
      'price': 1.75,
      'category': 'fruits',
      'imageUrl': 'https://pbs.twimg.com/profile_images/689609039605460992/mva6YmZ-_400x400.jpg',
      '$key': null
    }, 'quantity': 1
  }],
  'shopping': {'address': 'adfsfasdf', 'address2': 'sdr3rsdf3', 'city': 'qwqwe', 'name': 'тестовый сайт'},
  'userUid': 'o7PkxFb6iyNeo8Xyg3XAwRwWg5d2'
};
