import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cad-planodecontas',
  templateUrl: './cad-planodecontas.component.html',
  styleUrls: ['./cad-planodecontas.component.scss']
})
class mask{
 nv:number;
 digitos:number = 1;
 type:string;
}
export class CadPlanodecontasComponent implements OnInit {
  mask = new mask();
  loader:boolean=false;
  Jsonmask={mask:[]};
  niveis:any = [1];
  createForm :FormGroup;
  constructor() { }

  ngOnInit() {
   this.mask.nv = this.Jsonmask.mask.length + 1
  }

  onSubmit(parans:NgForm){
    debugger
  }
}
