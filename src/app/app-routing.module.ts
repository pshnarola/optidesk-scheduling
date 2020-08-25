import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { SchedulingComponent } from './scheduling/scheduling.component';


const routes: Routes = [
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'scheduling',
    component: SchedulingComponent
  },
  {
    path: '',
    redirectTo: 'scheduling',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
