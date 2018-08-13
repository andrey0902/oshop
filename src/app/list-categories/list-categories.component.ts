import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  @Input() categories$;
  @Input() isChoose;

  // TODO: after fixed router need apply router satate for selected chosen category

  isSelect = null;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  selected(select) {
    this.isSelect = !this.isSelect
      ? select
      : this.isSelect === select
        ? null
        : select;
    this.setQueryParams();
  }

  setQueryParams() {
    this.router.navigate([], {queryParams: {category: this.isSelect}});
  }

}
