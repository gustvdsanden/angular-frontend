import { User } from "./User";

export class Company {
    public _id: string = '';
    public Address: string= '';
    public Description: string= '';
    public constructor(init?:Partial<Company>) {
        Object.assign(this, init);
    }
}