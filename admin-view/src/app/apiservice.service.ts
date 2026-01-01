import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverVal } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }
   apiConstants={
    getUsersLists:serverVal.server+"/admin/get-users-list",
    deleteUser:serverVal.server+"/admin/registered-user",
    getOrdersList:serverVal.server+"/admin/get-orders-list",
    getOrderDetail:serverVal.server+'/order',
    updOrderStage:serverVal.server+'/order/update-order-stage'
   }
  adminUpload(data: any): Observable<any> {
    return this.http.post(serverVal.server+"/admin/upload", data);  // POST request
  }
  getUsersLists=()=>{
    return this.http.get(this.apiConstants.getUsersLists);
  }
  deleteUser=(userId:any)=>{
    const params=new HttpParams();
    return this.http.delete(this.apiConstants.deleteUser,{params:{userId}})
  }
  getOrdersList=()=>{
    return this.http.get(this.apiConstants.getOrdersList);
  }
    getOrderDetail(orderId:any){
    let url=this.apiConstants.getOrderDetail+"/"+orderId;
    return this.http.get(url);
  }
  updOrderStage(orderId:any,trackIndex:number){
    let url=this.apiConstants.updOrderStage;
    return this.http.post(url,{orderId,trackIndex})
  }
}
