export class Company {
    public _id: string = '';
    public Name: string= '';
    public Address: string= '';
    public Description: string= '';
    public constructor(init?:Partial<Company>) {
        Object.assign(this, init);
    }
}