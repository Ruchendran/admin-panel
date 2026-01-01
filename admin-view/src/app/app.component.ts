import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { SharedataService } from './sharedata.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,LoaderComponent,MessageModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-view';
  constructor(private route:Router,public shareData:SharedataService){

  }
  onClickPanel=()=>{
    this.route.navigate(['/']);
  }
}
