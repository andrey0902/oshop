import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pattern-email-error',
  templateUrl: './pattern-email-error.component.html',
  styleUrls: ['./pattern-email-error.component.css']
})
export class PatternEmailErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
