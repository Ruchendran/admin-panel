import { Component, OnInit } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  imports: [],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit{
  constructor(private shareData:SharedataService,private apiService:ApiserviceService,private route:Router){

  }
  orderList:Array<any>=[];
  getOrders=()=>{
    this.shareData.loader.set(true);
    this.apiService.getOrdersList().subscribe((data:any)=>{
      this.orderList=data;
      this.shareData.loader.set(false);
        },er=>{
          this.shareData.loader.set(false)
        })
  }
  ngOnInit(): void {
      this.getOrders();
  }
  clickToviewOrder=(order:any)=>{
    this.route.navigate([`order-view/${order._id}`])
  }
}
