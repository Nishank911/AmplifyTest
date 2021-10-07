import { Component, NgZone, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';
import awsconfig from '../../../../aws-exports';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tokenID:any
  username:any
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  constructor(private router:Router,private zone: NgZone) { }

  ngOnInit(){
    //get tokenID 
    this.username=localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+".LastAuthUser")
    //console.log("username:",this.username)
    this.tokenID=(localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+"."+this.username+".idToken"))
    
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;//use auth state at different routes to check for login access
      console.log("Header:",authData)
      this.user = authData as CognitoUserInterface;
      //console.log("Auth:")
    })
  }
  signOut(){
    localStorage.clear();
  }

}
