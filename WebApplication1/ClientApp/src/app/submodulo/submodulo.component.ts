import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submodulo',
  templateUrl: './submodulo.component.html',
  styleUrls: ['./submodulo.component.css']
})
export class SubmoduloComponent implements OnInit {
  @Input() submodulo:any;
  constructor() { }

  ngOnInit() {
  }

}
