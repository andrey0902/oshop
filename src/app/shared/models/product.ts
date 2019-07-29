export class Product {
  title: string;
  price: string;
  category: string;
  imageUrl: string;
  key: string;
  $key: string;

  constructor(data) {
    this.title = data.title;
    this.price = data.price;
    this.category = data.category;
    this.imageUrl = data.imageUrl;
    this.key = data.key;
    this.$key = data.$key ? data.$key : null;
  }
}
