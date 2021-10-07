import { Component, NgZone, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: CognitoUserInterface | undefined;
  authState?: AuthState;
  constructor(private router:Router,private zone: NgZone) { }

  ngOnInit(){
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;//use auth state at different routes to check for login access
      console.log(this.authState)
      this.user = authData as CognitoUserInterface;
      if (this.authState == AuthState.SignedIn) {
          this.router.navigateByUrl('dashboard').then(()=>{
            window.location.reload()
          })
    }
      //console.log("Auth:")
    })

  }

}
