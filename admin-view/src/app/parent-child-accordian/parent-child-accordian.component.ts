import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-parent-child-accordian',
  imports: [CommonModule],
  templateUrl: './parent-child-accordian.component.html',
  styleUrl: './parent-child-accordian.component.scss'
})
export class ParentChildAccordianComponent implements OnInit {
  @Input('parentProps') reqProps!:any;
  @Output('emitOrderTrack') emitOrderTrack=new EventEmitter<any>;
  parentAccordianShow=false;
  parentNotInitial=false;
  ngOnInit(): void {
      // console.log(this.reqProps,"pros")
  }
  accordianEvent=(accordian:any)=>{
    accordian.accordianShow=!accordian.accordianShow,
    accordian.notInitial=true
  }
  emitOrder=(orderId:any)=>{
    this.emitOrderTrack.emit(orderId);
  }
   parentAccordianEvent=()=>{
    this.parentAccordianShow=!this.parentAccordianShow;
    this.parentNotInitial=true;
  }
}
