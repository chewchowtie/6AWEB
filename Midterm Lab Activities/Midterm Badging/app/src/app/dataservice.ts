import { Post } from './posts.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, map, startWith,catchError } from 'rxjs';


export interface PostsState {
  data: Post[];
  loading: boolean;
  error?: string;
}


@Injectable({
  providedIn: 'root',
})
export class Dataservice {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private http: HttpClient){}


  getPostsRemotely(): Observable<PostsState> {
    const cachedPosts = localStorage.getItem('posts');


    if (cachedPosts) {
      const posts = JSON.parse(cachedPosts) as Post[];
      return of({ data: posts, loading: false });
    }


    return this.http.get<Post[]>(this.postsUrl).pipe(
      tap(posts => localStorage.setItem('posts', JSON.stringify(posts))),
      map(posts => ({ data: posts, loading: false })),
      startWith({ data: [], loading: true }),
      catchError(() =>
        of({ data: [], loading: false, error: 'Failed to load posts.' })
      )
    );
  }
}
