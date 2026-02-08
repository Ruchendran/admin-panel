import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import("./admin-home/admin-home.component").then((m=>m.AdminHomeComponent))
    },
    {
        path:'upload',
        loadComponent:()=>import("./admin-upload/admin-upload.component").then(m=>m.AdminUploadComponent)
    },
    {
        path:'registered-users',
        loadComponent:()=>import("./registered-users/registered-users.component").then(s=>s.RegisteredUsersComponent)
    },
    {
        path:'orders-list',
        loadComponent:()=>import("./orders-list/orders-list.component").then(s=>s.OrdersListComponent)
    },
    {
        path:'order-view',
        loadComponent:()=>import("./order-view/order-view.component").then(s=>s.OrderViewComponent)
    },
    {
        path:'track-order',
        loadComponent:()=>import("./track-order/track-order.component").then(s=>s.TrackOrderComponent)
    }
];
