import { User, UserComment } from "./index";
export class Post {
    public _id?: string = '';
    public Content: string= '';
    public Author: User = new User;
    public Comments?: UserComment[] = [new UserComment];
    public Likes?: User[] = [new User];
    public createdAt?: Date= new Date;
    public constructor(init?:Partial<Post>) {
        Object.assign(this, init);
    }
}
// initPost
// { Id: '', Content: '', Author: initUser, Comments: [initComment], Likes: [initUser] }