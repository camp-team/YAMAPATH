import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post, PostWithUser } from '../interfaces/post';
import { UserData } from '../interfaces/user-data';
import { UserService } from './user.service';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  index = {
    posts: searchClient.initIndex('posts'),
    latest: searchClient.initIndex('latest'),
    oldest: searchClient.initIndex('oldest'),
  };

  constructor(private userService: UserService) {}

  async getPostWithUser(
    searchQuery: string,
    searchoptions: {
      page: number;
      hitsPerPage: number;
      facetFilters: string[];
    },
    sortKey: string
  ): Promise<Observable<PostWithUser[]>> {
    const result = await this.index[sortKey].search(searchQuery, searchoptions);
    const posts = result.hits as Post[];
    if (posts.length) {
      const uids: string[] = posts.map((item: Post) => item.authorUid);
      const uniquedUserIds: string[] = Array.from(new Set(uids));

      const userObservables$: Observable<
        UserData
      >[] = uniquedUserIds.map((uid) =>
        this.userService.getUserByUid(uid).pipe(filter((user) => Boolean(user)))
      );
      const users$: Observable<UserData[]> = combineLatest(userObservables$);

      return combineLatest([of(posts), users$]).pipe(
        map(([items, users]) => {
          return items.map((item) => {
            return {
              ...item,
              user: users.find((user) => item.authorUid === user.uid),
            };
          });
        })
      );
    } else {
      return of([]);
    }
  }
}
