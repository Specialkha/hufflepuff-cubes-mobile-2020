import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public auth: AuthService, private httpUser: HttpUserService, private router: Router, private toastController: ToastController) {
    if (this.auth.authToken)
      this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
        this.auth.notifyUserObservable(user);
        this.auth.notifyObservable(this.auth.authToken);
      }, err => {
        if (err) {
          this.httpUser.userLogout('').subscribe((data) => {
            if (data) {
              this.auth.authToken = undefined;
              console.log('Vous avez été déconnecté');
            }
          });
        }
      });
  }

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
        this.presentToastLogOutSuccess();
        this.router.navigate(['/tabs']);
      });
    });
  }

  async presentToastLogOutSuccess() {
    const toast = await this.toastController.create({
      message: 'Vous avez bien été déconnecté',
      position: 'top',
      duration: 3000,
      cssClass: 'toast',
      color: 'danger'
    });
    toast.present();
  }

}
