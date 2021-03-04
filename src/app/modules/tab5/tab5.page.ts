import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  loginForm: FormGroup;
  creationForm: FormGroup;
  onOpen: boolean = false;

  constructor(private toastController: ToastController, private auth: AuthService, private httpUser: HttpUserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.createNewFormGroupLogIn();
    this.creationForm = this.createNewAccount();
    if (this.auth.authToken)
      this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
        this.auth.notifyUserObservable(user);
      });
  }

  createNewFormGroupLogIn() {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    const payload = {
      username: this.loginForm.value.login,
      password: this.loginForm.value.password
    }
    this.httpUser.userLogin(payload).subscribe((e: any) => {
      this.auth.notifyObservable(e.accessToken);
      this.auth.dataFromObservable.subscribe((authToken: string) => {
        this.auth.authToken = authToken;
        localStorage.setItem('token', authToken);
        this.auth.notifyUserObservable(payload.username);
        this.httpUser.getSingleUser(this.loginForm.value.login).subscribe((userId: string) => {
          localStorage.setItem('userId', userId);
          this.loginForm.reset();
          this.creationForm.reset();
          this.presentToastSignInSuccess();
          this.router.navigate(['/tabs']);
        });
      });

    }, err => {
      this.presentToastSignInUnsuccess();
    });
  }

  createNewAccount() {
    return new FormGroup({
      genre: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl(''),
      zipCode: new FormControl(''),
      city: new FormControl(''),
      phone: new FormControl(''),
      mobile: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.creationForm.value;
  }

  onCreate() {
    console.log(this.f)
    if (this.f.password === this.f.confirm && this.f.password && this.f.confirm) {
      const userToCreate: User = {
        genre: this.f.genre,
        lastName: this.f.lastName,
        firstName: this.f.firstName,
        email: this.f.email,
        mobile: this.f.mobile,
        phone: this.f.phone,
        adress: this.f.adress,
        zipCode: this.f.zipCode,
        city: this.f.city,
        password: this.f.password,
        adminLevel: 'citoyen',
      }
      this.httpUser.createUser(userToCreate).subscribe((account: any) => {
        const payload = {
          username: account.email,
          password: this.creationForm.value.password
        };
        this.presentToastSignUpSuccess();
        this.httpUser.userLogin(payload).subscribe((data: any) => {
          this.auth.notifyObservable(data.accessToken);
          this.auth.dataFromObservable.subscribe((authToken: string) => {
            this.auth.authToken = authToken;
            localStorage.setItem('token', authToken);
            this.auth.notifyUserObservable(payload.username);
            this.httpUser.getSingleUser(payload.username).subscribe((userId: string) => {
              localStorage.setItem('userId', userId);
              this.onOpen = false;
              this.loginForm.reset();
              this.creationForm.reset();
              this.router.navigate(['/tabs']);
            });
          });
        })
      }, (err: any) => {
        console.error(err);
        if (err.error === 'Email déjà utilisé') {

          this.creationForm.get('email').reset();
          this.creationForm.get('email').invalid;
        }
      });
    } else {

    }

  }

  async presentToastSignUpSuccess() {
    const toast = await this.toastController.create({
      message: 'Votre compte a bien été créé',
      position: 'top',
      duration: 3000,
      color: 'success',
      cssClass: 'toast'
    });
    toast.present();
  }

  async presentToastSignInSuccess() {
    const toast = await this.toastController.create({
      message: 'Vous avez bien été identifié',
      position: 'top',
      duration: 3000,
      color: 'success',
      cssClass: 'toast'
    });
    toast.present();
  }

  async presentToastSignInUnsuccess() {
    const toast = await this.toastController.create({
      message: 'Identifiant ou mot de passe incorrect',
      position: 'top',
      duration: 3000,
      color: 'danger',
      cssClass: 'toast'
    });
    toast.present();
  }

}
