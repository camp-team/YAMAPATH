import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PostWithUser } from 'src/app/interfaces/post';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  categoryControl: FormControl = new FormControl('');
  posts: PostWithUser[] = [];
  searchQuery: string;
  category: string;
  sort: string;
  isLoading: boolean;

  private requestOptions: {
    page: number;
    hitsPerPage: number;
  };

  readonly categoryOptions: {
    label: string;
    value: string;
  }[] = [
    {
      label: '危険箇所',
      value: 'danger',
    },
    {
      label: '絶景ポイント',
      value: 'view',
    },
    {
      label: 'お手洗い',
      value: 'toilet',
    },
    {
      label: '水場',
      value: 'water',
    },
    {
      label: '休憩ポイント',
      value: 'rest',
    },
    {
      label: 'その他',
      value: 'other',
    },
  ];

  readonly sortOptions: {
    label: string;
    value: string;
  }[] = [
    {
      label: '最新順',
      value: 'latest',
    },
    {
      label: '古い順',
      value: 'oldest',
    },
  ];

  constructor(
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.posts = [];
      this.requestOptions = {
        page: 0,
        hitsPerPage: 6,
      };
      this.searchQuery = param.get('searchQuery') || '';
      this.category = param.get('category') || '';
      this.sort = param.get('sort') || 'posts';
      this.search();
    });
  }

  search(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      const searchOptions = {
        page: this.requestOptions.page,
        hitsPerPage: this.requestOptions.hitsPerPage,
        facetFilters: [`category:${this.category}`],
      };

      this.searchService
        .getPostWithUser(this.searchQuery, searchOptions, this.sort)
        .then(async (result) => {
          const items = await result.pipe(take(1)).toPromise();
          this.posts.push(...items);
        })
        .finally(() => (this.isLoading = false));
    }
  }

  buildQueryParameterBySentence(searchQuery: string): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        searchQuery,
      },
    });
  }

  buildQueryParameterByCategories(event: MatOptionSelectionChange): void {
    const category = event.source.value;
    this.router.navigate(['search'], {
      queryParams: {
        category,
      },
      queryParamsHandling: 'merge',
    });
  }

  buildQueryParameterBySort(event: MatOptionSelectionChange): void {
    const option = event.source.value;
    this.router.navigate(['search'], {
      queryParams: {
        sort: option,
      },
      queryParamsHandling: 'merge',
    });
  }

  searchReset(): void {
    this.router.navigateByUrl('/search').then(() => {
      this.searchControl.patchValue('');
      this.category = '';
      this.requestOptions.page = 0;
    });
  }

  addSearch(): void {
    console.log('run');
    if (!this.isLoading) {
      console.log('run2');
      this.requestOptions.page++;
      this.search();
      console.log(this.requestOptions.page);
    }
  }
}
