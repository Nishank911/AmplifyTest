import { Component, NgZone, OnInit } from '@angular/core';
import { QualityInspectionParameters } from 'src/app/models/quality-inspection-parameters';
import { QualityInspectionDataService } from 'src/app/services/quality-inspection-data.service';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import awsconfig from '../../../aws-exports';
import * as AWS from 'aws-sdk';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-qualityinspectionatcloud',
  templateUrl: './qualityinspectionatcloud.component.html',
  styleUrls: ['./qualityinspectionatcloud.component.css']
})
export class QualityinspectionatcloudComponent implements OnInit {
  username:any
  tokenID:any
  currentdate:any
  datainput:QualityInspectionParameters = new QualityInspectionParameters()
  fileToUpload: any;
  imageUrl: any;
  imageData:any;
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  handleFileInput(event: Event) {
  //console.log("hi")
  const target= event.target as HTMLInputElement;
  const file = (target.files as FileList);
  this.fileToUpload = file.item(0);
  console.log(this.fileToUpload.name)
  let reader = new FileReader();
  reader.onload = (event: any) => {
    //console.log(event.target.result)
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);
}
constructor(private dataservice:QualityInspectionDataService,private router:Router,private zone: NgZone) { }

submit(datainput:QualityInspectionParameters)
{
  console.log("datataa:",datainput)
 this.datainput.Timestamp = Number(new Date(this.datainput.Timestamp))
 console.log(this.datainput)
   this.imageData={
    "img-url":this.imageUrl,
    "Defect_Type":this.datainput.Defect_Type,
    "Defect_ID":this.datainput.Defect_ID,
    "Timestamp":this.datainput.Timestamp,
    "Surface_Name":this.datainput.Surface_Name
  }

  this.dataservice.postImage(this.tokenID,this.imageData).subscribe(data=>{
    console.log("image uploaded")
  });


 this.dataservice.post(this.tokenID,datainput).subscribe(data=>{
   console.log("succesfull")
 });
}

  //Generate Defect_ID
  id:any
  uniqueID():string{
    return UUID.UUID()
  }


ngOnInit(): void {
  this.datainput.Defect_ID=this.uniqueID()
  console.log("UUID:",UUID.UUID())
  //get tokenID 
  this.username=localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+".LastAuthUser")
  //console.log("username:",this.username)
  this.tokenID=(localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+"."+this.username+".idToken"))
  
  if(this.tokenID==null||this.tokenID==""){
    this.zone.run(() => {
      window.location.href="/login"
    });
  }

  onAuthUIStateChange((authState, authData) => {
    
    this.authState = authState;//use auth state at different routes to check for login access
    console.log(this.authState)
    this.user = authData as CognitoUserInterface;
    if (this.authState != AuthState.SignedIn) {
        this.zone.run(() => {
          window.location.href="/login"
    });
  }
    //console.log("Auth:")
  })
}

}
