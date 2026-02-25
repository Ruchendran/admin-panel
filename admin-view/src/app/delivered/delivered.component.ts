import { Component } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { GenericAccordianComponent } from '../generic-accordian/generic-accordian.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delivered',
  imports: [GenericAccordianComponent,CommonModule],
  templateUrl: './delivered.component.html',
  styleUrl: './delivered.component.scss'
})
export class DeliveredComponent {
  constructor(private shareData:SharedataService,private apiService:ApiserviceService,private route:Router){

  }
  orderList:Array<any>=[];
  getOrders=()=>{
    this.shareData.loader.set(true);
    this.apiService.getDeliveredOrdersList().subscribe((data:any)=>{
      this.orderList=data;
      console.log(this.orderList)
      this.shareData.loader.set(false);
        },er=>{
          this.shareData.loader.set(false)
        })
  }
  ngOnInit(): void {
      this.getOrders();
  }
  clickToviewOrder=(order:any)=>{
    this.route.navigate([`order-view`],{queryParams:{userId:order.userId,orderId:order._id}})
  }
  returnProductsName=(products:any)=>{
    let productsName:any=[];
    products.forEach((product:any)=>{
      productsName.push(product?.productName)
    })
    return productsName.join(",")
  }
  receiveOrderId=(orderId:any)=>{
    const order=this.orderList.find((order)=>{
      return order._id == orderId
    });
    this.clickToviewOrder(order);
  }
}
