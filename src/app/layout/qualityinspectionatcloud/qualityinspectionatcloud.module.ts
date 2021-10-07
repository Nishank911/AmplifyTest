import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualityinspectionatcloudRoutingModule } from './qualityinspectionatcloud-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QualityinspectionatcloudComponent } from './qualityinspectionatcloud.component';


@NgModule({
  declarations: [QualityinspectionatcloudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QualityinspectionatcloudRoutingModule
    
  ]
})
export class QualityinspectionatcloudModule { }
