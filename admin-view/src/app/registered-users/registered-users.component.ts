import { Component, OnInit } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { ApiserviceService } from '../apiservice.service';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { CommonModule } from '@angular/common';
import { GenericAccordianComponent } from '../generic-accordian/generic-accordian.component';

@Component({
  selector: 'app-registered-users',
  imports: [EventModalComponent,CommonModule,GenericAccordianComponent],
  templateUrl: './registered-users.component.html',
  styleUrl: './registered-users.component.scss'
})
export class RegisteredUsersComponent implements OnInit {

  constructor(private shareData:SharedataService,private apiService:ApiserviceService){

  }
  modalMsg:string='';
  usersList:any;
  deleteModal:boolean=false;
  userData:any;
  getUsersListFun=()=>{
      this.shareData.loader.set(true);
      this.apiService.getUsersLists().subscribe((res:any)=>{
        this.usersList=res?.usersList
        // console.log(this.usersList,"sss")
        this.shareData.loader.set(false);
      },er=>{
        this.shareData.loader.set(false);
      })
  }
  ngOnInit(): void {
    this.getUsersListFun()
  }
  deleteFromUser=(user:any)=>{
    // console.log(user)
    this.userData=user;
    this.openDeleteModal('Are you sure want to delete from registries!');
  }
  openDeleteModal=(msg:string)=>{
    this.deleteModal=true;
    this.modalMsg=msg;
  }
  closeDeleteModal=()=>{
    this.deleteModal=false;
  }
    receiveEvent=(eventValEmit:any)=>{
    if(eventValEmit){
      // this.deleteProductFromCart(this.cartData); 
      this.shareData.loader.set(true);
      this.apiService.deleteUser(this.userData?._id).subscribe((res:any)=>{
        this.shareData.loader.set(false);
        this.shareData.setModalMsg(res.message);
        this.getUsersListFun()
      },er=>{
         this.shareData.loader.set(false);
      })
      this.closeDeleteModal();
      return;
    }else{
      this.closeDeleteModal();
    }
  }
  receiveUserId=(userId:any)=>{
    // console.log(userId,"ssss")
    const findUser=this.usersList.find((user:any)=>{
      return user._id == userId
    });
    this.deleteFromUser(findUser);
  }
}
