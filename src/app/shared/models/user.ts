export class User {
  uid: string;
  name: string;
  email: string;
  isAdmin: boolean;

  constructor(data) {
    this.uid = data.uid;
    this.email = data.email;
    this.name = data.name;
    this.isAdmin = data.isAdmin;
  }
}
