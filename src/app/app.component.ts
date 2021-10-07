import { Component, NgZone } from '@angular/core';
import { QualityInspectionDataService } from './services/quality-inspection-data.service';
import awsconfig from '../aws-exports';
import { QualityInspectionParameters } from './models/quality-inspection-parameters';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import * as AWS from 'aws-sdk';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quality-inspection-cv-app';
  imageData:any
  tokenID:any
  username:any
  user: CognitoUserInterface | undefined;
  authState!: AuthState;

  constructor(private dt:QualityInspectionDataService,private router:Router,private zone: NgZone){}
  ngOnInit() {
    //get tokenID
    this.username=localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+".LastAuthUser")
    //console.log("username:",this.username)
    this.tokenID=(localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+"."+this.username+".idToken"))
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;//use auth state at different routes to check for login access
      console.log(this.authState)
      this.user = authData as CognitoUserInterface;
      if (this.authState == AuthState.SignedIn) {
          this.zone.run(() => {
          this.router.navigate(['/dashboard']);
      });
    }
    // else if (this.authState == AuthState.SignIn){
    //   this.zone.run(() => {
    //     this.router.navigate(['/login']);
    // });
    // }
      //console.log("Auth:")
    })
    // // this.dt.get(this.tokenID).subscribe((data)=>{
    // //   console.log("data:",data)
    // // })
    // // ////////////////POST data//////////////////
    // // this.dt.post(this.tokenID,this.params).subscribe(()=>{
    // //   console.log("Succesfull")
    // // })
    // //GET Image
    // this.dt.getImage(this.tokenID,this.imageKey).subscribe((data:any)=>{
    //   console.log("url:",data)
    //   this.getImg=data.url
    // })



  }







  //ImageUpload code
  // fileToUpload: any;
  // imageUrl: any;
  // handleFileInput(event: Event) {
  //   //console.log("hi")
  //   const target= event.target as HTMLInputElement;
  //   const file = (target.files as FileList);
  //   this.fileToUpload = file.item(0);
  //   console.log(this.fileToUpload.name)
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     //console.log(event.target.result)
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }
  // //Post Image
  // uploadImage(){
  //   this.imageData={
  //     "img-url":this.imageUrl,
  //     "Defect_Type":this.imageKey.Defect_Type,
  //     "Defect_ID":this.imageKey.Defect_ID,
  //     "Timestamp":this.imageKey.Timestamp
  //   }
  //   console.log(this.tokenID)
  //   this.dt.postImage(this.tokenID,this.imageData).subscribe(data=>{
  //     console.log("success",data)
  //   },error=>{
  //     console.log("Error:",error)
  //   })
  // }





}
