import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  constructor(private route:Router,private apiService:ApiserviceService,private shareData:SharedataService){

  }
  ngOnInit(): void {
  }
  navToUpload=()=>{
    this.route.navigate(['upload']);
  }
  navToRegisteredUsers=()=>{
    this.route.navigate(['registered-users']);
  }
  navToOrders=()=>{
    this.route.navigate(['orders-list'])
  }
}
