import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../sharedata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-view',
  imports: [CommonModule],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss'
})
export class OrderViewComponent implements OnInit{
  userId: any;
  orderDetails: any;
  orderId: any;
  constructor(
    private apiService:ApiserviceService,
    private activatedRoute:ActivatedRoute,
    private sharedData:SharedataService,
    private route:Router
  ){

  }
  ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe((val:any)=>{
        this.userId=val.userId;
        this.orderId=val.orderId;
        // this.sharedData.loader.set(true);
        this.apiService.getUserOrderDetail(this.userId,this.orderId).subscribe((res:any)=>{
         this.sharedData.loader.set(false);
        this.orderDetails=res?.specificUserOrder;
    })
      });
  }
   trackOrder=(order:any)=>{
     this.route.navigate([`/track-order`],{queryParams:{orderId:order._id}});
  }
}
