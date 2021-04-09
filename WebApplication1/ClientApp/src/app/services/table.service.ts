import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {

datatable:any=[];

constructor() { }



GetNewData(): Observable<any> {
  return of(this.datatable).pipe();
}

SetNewdata(data: any): void {
  this.datatable = data;
}

}
