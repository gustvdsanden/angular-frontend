export class Role {
    public _id: string = '';
    public Name: string= '';
    public constructor(init?:Partial<Role>) {
        Object.assign(this, init);
    }
}