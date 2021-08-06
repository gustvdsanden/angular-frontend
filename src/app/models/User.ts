export class User {
    public _id: string = '';
    public FirstName: string= '';
    public LastName: string= '';
    public Email: string= '';
    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}
// initUser
// { Id: '', FirstName: '', LastName: '', Email: '' }