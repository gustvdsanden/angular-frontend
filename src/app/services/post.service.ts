import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User, UserComment} from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>("Post");
  }
  createPost(Content: string, Author: User): Observable<Post>{
    return this.http.post<Post>("Post",{Content: Content,UserId:Author._id});
  }
  deletePost(_id:string):Observable<any>{
    return this.http.delete(`Post/${_id}`);
  }
  likePost(_id:string):Observable<any>{
    return this.http.get(`Post/${_id}/like`);
  }
  addComment(postId:string,Comment:UserComment):Observable<Post>{
    return this.http.post<Post>(`Post/${postId}/Comment`,Comment);
  }
}
