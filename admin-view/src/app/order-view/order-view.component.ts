import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedataService } from '../sharedata.service';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-order-view',
  imports: [CommonModule,EventModalComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss'
})
export class OrderViewComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute,private sharedData:SharedataService,private apiService:ApiserviceService){

  }
  modalMsg:string='';
  updateModal=false;
  activeTrackingIndex=0;
  trackingMapList=[];
  orderId:any='';
  btnName='Update'
  orderDetails=()=>{
      this.sharedData.loader.set(true);
      this.apiService.getOrderDetail(this.orderId).subscribe((res:any)=>{
      this.sharedData.loader.set(false)
      this.trackingMapList=res?.orderDetails?.trackerMap;
      this.activeTrackingIndex=res?.orderDetails?.activeTrackingIndex+1;
    },er=>{
      this.sharedData.loader.set(false)
    })
  }
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((val:any)=>{
        this.orderId=val.orderId;
      });
      this.orderDetails();
  }
  updateStage=(trackIndex:number)=>{
    this.activeTrackingIndex=trackIndex;
    this.openDeleteModal('Are you sure want to delete from registries!');
  }
  openDeleteModal=(msg:string)=>{
    this.updateModal=true;
    this.modalMsg=msg;
  }
  receiveEvent=(eventValEmit:any)=>{
    if(eventValEmit){
      // this.deleteProductFromCart(this.cartData); 
      this.sharedData.loader.set(true);
      this.apiService.updOrderStage(this.orderId,this.activeTrackingIndex).subscribe((res:any)=>{
        this.sharedData.loader.set(false);
        this.sharedData.setModalMsg(res.message);
        this.orderDetails();
      },er=>{
         this.sharedData.loader.set(false);
      })
      this.closeDeleteModal();
      return;
    }else{
      this.closeDeleteModal();
    }
  }
  closeDeleteModal=()=>{
    this.updateModal=false;
  }
}
