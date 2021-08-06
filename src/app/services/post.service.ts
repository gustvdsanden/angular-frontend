import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User} from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>("http://localhost:8080/api/Post");
  }
  createPost(Content: string, Author: User): Observable<Post>{
    return this.http.post<Post>("http://localhost:8080/api/Post",{Content: Content,UserId:Author._id});
  }
  deletePost(_id:string):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/Post/${_id}`);
  }
  likePost(_id:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/Post/${_id}/like`);
  }
}
