import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cad-grupousuario',
  templateUrl: './cad-grupousuario.component.html',
  styleUrls: ['./cad-grupousuario.component.scss']
})
export class CadGrupousuarioComponent implements OnInit {
  loaduser:boolean = false;
  createForm :FormGroup;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(f:NgForm){

  }

}
