import { User } from "./index";
export class UserComment {
    public Id: string='';
    public Content: string='';
    public Author: User= new User;
    public Like: User[]= [new User];
    public constructor(init?:Partial<UserComment>) {
        Object.assign(this, init);
    }
}
// initComment
// { Id: '', Content: '', Author: initUser, Like: [initUser] }