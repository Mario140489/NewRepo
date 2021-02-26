import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submodulo',
  templateUrl: './submodulo.component.html',
  styleUrls: ['./submodulo.component.scss']
})
export class SubmoduloComponent implements OnInit {
  @Input() submodulo:any;
  constructor() { }

  ngOnInit() {
  }

}
