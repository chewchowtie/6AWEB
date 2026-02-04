import { AsyncPipe, CommonModule } from '@angular/common';
import { Dataservice, PostsState } from '../dataservice';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';


@Component({
  selector: 'app-services',
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  searchControl = new FormControl('');


  filteredState$;


  constructor(private httpClient: Dataservice) {


    this.filteredState$ = combineLatest([
      this.httpClient.getPostsRemotely(),
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([state, search]) => {
        const term = (search ?? '').toLowerCase();
        const data = state.data ?? [];
        return {
          ...state,
          data: data.filter(
          post =>
            post.title.toLowerCase().includes(term) ||
            post.body.toLowerCase().includes(term)
          )
          } as PostsState;
      })
    );
  }
}



