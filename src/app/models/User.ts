
import { Company } from "./Company";
import { Role } from "./Role";

export class User {
    public _id: string = '';
    public FirstName: string= '';
    public LastName: string= '';
    public Email: string= '';
    public Role: Role= new Role;
    public Company?: Company= new Company;
    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}
// initUser
// { Id: '', FirstName: '', LastName: '', Email: '' }