export class Document {
    constructor(
      //public _id: object, // MongoDB ObjectId
      public id: string,
      public name: string,
      public description: string,
      public url: string,
      public children: object[],
      //public group: Document[]
    ) {}
}