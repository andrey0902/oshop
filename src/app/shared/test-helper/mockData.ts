import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
// tslint:disable
var jasmine;

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

export const fbChanget = {
  payload: {
    exists() {
      return true;
    },
    val() {
      return {
        uid: 'test2'
      };
    },
    key: '-ttt'
  }
};

export const mockShoppingCart = new ShoppingCart({
  key: '-ttt', items: {
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
