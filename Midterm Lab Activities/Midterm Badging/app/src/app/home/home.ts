import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Post } from '../posts.model';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-home',
  imports: [SlicePipe, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  httpposts: Post[] = [];

  constructor(private httpClient: Dataservice) {}

  ngOnInit() {
    this.httpClient.getPostsRemotely().subscribe(({data}) => {
        this.httpposts = data;
    });
  }
}
