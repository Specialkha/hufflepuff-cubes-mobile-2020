import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public auth: AuthService, private httpUser: HttpUserService, private router:Router) { }

  onLogout() {
    let userCredential: any = {};
    this.auth.dataFromUserObservable.subscribe((user: any) => {
      userCredential.user = user;
    });
    userCredential.token = localStorage.getItem('token');
    this.httpUser.userLogout(userCredential).subscribe((data: string) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.auth.dataFromObservable.subscribe(() => {
        this.auth.authToken = null;
        this.router.navigate(['/tabs']);
      });
    });
  }

}
