import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post, User } from '../models/index';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  postingForm = this.formBuilder.group({
    postContent: '',
  })
  posts: Post[] = [new Post];
  constructor(private authService: AuthService,private postService: PostService, private formBuilder: FormBuilder,) { }
  user: User = new User;
  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(result =>{
      this.user = {...result}
    })
    this.postService.getPosts().subscribe(result => {
      this.posts = [...result];
    });
  }
  submitPost(){
    this.postService.createPost(this.postingForm.value.postContent,this.user).subscribe(result=> console.log(result));
  }

}
