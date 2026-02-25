import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { SharedataService } from '../sharedata.service';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule,EventModalComponent],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {
 constructor(private activatedRoute:ActivatedRoute,private sharedData:SharedataService,private apiService:ApiserviceService){

  }
  modalMsg:string='';
  updateModal=false;
  activeTrackingIndex=0;
  trackingMapList=[];
  orderId:any='';
  btnName='Update';
  orderDetailsData:any;
  getTotalPrice=(orders:any)=>{
    let total=0;
    orders.forEach((order:any)=>{
      total+=order.productPrice
    });
    return total;
  }
  orderDetails=()=>{
      this.sharedData.loader.set(true);
      this.apiService.getOrderDetail(this.orderId).subscribe((res:any)=>{
      this.sharedData.loader.set(false);
      this.orderDetailsData=res.orderDetails;
      this.trackingMapList=res?.orderDetails?.trackerMap;
      this.activeTrackingIndex=res?.orderDetails?.activeTrackingIndex+1;
    },er=>{
      this.sharedData.loader.set(false)
    })
  }
  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((val:any)=>{
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
