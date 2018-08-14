import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  @Input() categories$;
  @Input() selectCategory;

  // TODO: after fixed router need apply router satate for selected chosen category
  constructor(private router: Router) { }

  ngOnInit() {
  }

  selected(selectCategory) {
    this.selectCategory = !this.selectCategory
      ? selectCategory
      : this.selectCategory === selectCategory
        ? null
        : selectCategory;
    this.setQueryParams();
  }

  setQueryParams() {
    this.router.navigate([], {queryParams: {category: this.selectCategory}});
  }

}
