import { Company } from "./Company";

export class User {
    public _id: string = '';
    public FirstName: string= '';
    public LastName: string= '';
    public Email: string= '';
    public Company?: Company= new Company;
    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}
// initUser
// { Id: '', FirstName: '', LastName: '', Email: '' }