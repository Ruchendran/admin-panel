import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
 loader=signal(false);
  constructor() { }
  inputMsg=signal('');
    setModalMsg=(msg:string)=>{
    this.inputMsg.set(msg);
  }
}
