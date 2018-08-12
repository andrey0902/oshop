export class User {
  name: string;
  email: string;
  isAdmin: boolean;

  constructor(data) {
    this.email = data.email;
    this.name = data.name;
    this.isAdmin = data.isAdmin;
  }
}
