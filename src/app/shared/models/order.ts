export class Order {
  public datePlaced = new Date().getTime();
  public shopping;
  public items;
  public userUid: string;
  constructor(data) {
    this.shopping = data.shopping;
    this.items = data.items;
    this.userUid = data.userUid;
  }
}
