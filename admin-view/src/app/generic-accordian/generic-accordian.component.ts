import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// export interface Props{
//   contentColor:string,
//   accordianWidth:string,
//   heading:string,
//   description:string,
//   price:any,
//   img:string,
//   quantity:number,
//   data:any
// }

@Component({
  selector: 'app-generic-accordian',
  imports: [CommonModule],
  templateUrl: './generic-accordian.component.html',
  styleUrl: './generic-accordian.component.scss'
})

export class GenericAccordianComponent implements OnInit {
  @Input('reqProps') reqProps!:any;
  @Output('sendUserId') sendUserValue=new EventEmitter();
  @Output('sendOrderId') sendOrderId=new EventEmitter();
  accordianShow=false;
  notInitial=false;
  ngOnInit(): void {
      // console.log(this.reqProps,"req")
  }
  accordianEvent=()=>{
    this.accordianShow=!this.accordianShow;
    this.notInitial=true;
  }
  deleteFromUser=(userId:any)=>{
    this.sendUserValue.emit(userId);
  }
  viewOrderEmit=(orderId:any)=>{
    this.sendOrderId.emit(orderId)
  }
}

