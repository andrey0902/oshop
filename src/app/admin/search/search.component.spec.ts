import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be return set value', async(() => {
    const str = 'test';
    component.valueChange();
    component.changeSearch.subscribe((val: any) => {
      expect(val).toBe(str);
    });
    component.control.setValue(str);
  }));
});
