import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../sharedata.service';
import { CommonModule } from '@angular/common';
import { ParentChildAccordianComponent } from '../parent-child-accordian/parent-child-accordian.component';

@Component({
  selector: 'app-order-view',
  imports: [CommonModule,ParentChildAccordianComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss'
})
export class OrderViewComponent implements OnInit{
  userId: any;
  orderDetails: any;
  orderId: any;
   mobileAccordianDetails:any=[];
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
        const specifOrder=[];
        specifOrder.push(res?.specificUserOrder);
        specifOrder.forEach((order:any,index:any)=>{
        let mobileOrderData:any={};
        mobileOrderData['parentHeading']=`Order ${index+1}`;
        mobileOrderData['parentWidth']='90vw';
        mobileOrderData['btnText']='Track Order';
        mobileOrderData['btnShow']=true;
        mobileOrderData['orderId']=order._id;
        mobileOrderData['contentColor']='#f2b50c';
        let mobileProductList:any=[];
        let totalPrice=0;
        order.orderedProducts.forEach((product:any)=>{
          let productObject:any={};
          productObject['accordianWidth']='95%';
          productObject['heading']=product.productName;
          productObject['description']=product.productDes;
          productObject['content']='';
          productObject['img']=product.productImg;
          productObject['accordianShow']=false;
          productObject['notInitial']=false;
          productObject['quantity']=product.quantity;
          productObject['price']=product.productPrice;
          totalPrice+=product.productPrice;
          mobileProductList.push(productObject);
        });
        mobileOrderData['totalPrice']=totalPrice;
        mobileOrderData['childProps']=mobileProductList;
        this.mobileAccordianDetails.push(mobileOrderData);
      })
    })
      });
  }
   trackOrder=(order:any)=>{
     this.route.navigate([`/track-order`],{queryParams:{orderId:order._id}});
  }
  getOrderTrack=(orderId:any)=>{
    this.route.navigate([`/track-order`],{queryParams:{orderId:orderId}});
  }
}
