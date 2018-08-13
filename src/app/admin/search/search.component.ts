import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  control: FormControl;
  onDestroy$ = new Subject();
  changeValue$ = new Subject();
  @Output() changeSearch = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.createControl();
    this.valueChange();
    this.listenSetValue();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  listenSetValue() {
    this.changeValue$
      .pipe(
        takeUntil(this.onDestroy$),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(val => {
        this.changeSearch.emit(val);
      });
  }

  valueChange() {
    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.changeValue$.next(value);
      });
  }

  createControl() {
    this.control = new FormControl(null);
  }

}
