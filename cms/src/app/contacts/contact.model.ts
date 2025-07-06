export class Contact {
    constructor(
      //public _id: object, // MongoDB ID if using MongoDB, otherwise can be omitted
      public id: string,
      public name: string,
      public email: string,
      public phone: string,
      public imageUrl: string,
      public group: Contact[]
    ) {}
}
  