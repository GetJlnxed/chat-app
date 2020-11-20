export default class User {
  constructor(id, name, src) {
    this.id = id;
    this.name = name;
    this.imgSrc = src;
    this.friends = [
      {
        id: this.id,
        name: this.name
      }
    ]
    this.messages = [
      { from: this.id, to: this.id, message: "First message from me to me" }
    ]
  }
}