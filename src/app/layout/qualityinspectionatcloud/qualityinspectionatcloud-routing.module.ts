import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityinspectionatcloudComponent } from './qualityinspectionatcloud.component';

const routes: Routes = [
  {
    path: '',
    component: QualityinspectionatcloudComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityinspectionatcloudRoutingModule { }
