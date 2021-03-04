import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  accountForm: FormGroup;
  user: User;

  constructor(private httpUser: HttpUserService, private auth: AuthService, private router: Router) {
    this.accountForm = this.createNewFormGroup();
    auth.dataFromObservable.subscribe(data => {
      if (!data) {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.httpUser.getUserWithToken(this.auth.authToken).subscribe((data: User) => {
      this.user = data;
      this.accountForm.patchValue({
        genre: this.user.genre,
        lastName: this.user.lastName,
        firstName: this.user.firstName,
        password: this.user.password,
        email: this.user.email,
        adress: this.user.adress,
        zipCode: this.user.zipCode,
        city: this.user.city,
        phone: this.user.phone,
        mobile: this.user.mobile
      });
    });
  }

  createNewFormGroup() {
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
    return this.accountForm.value;
  }

  onSubmit() {
    const payload = {
      genre: this.f.genre,
      lastName: this.f.lastName,
      firstName: this.f.firstName,
      password: this.f.password,
      email: this.f.email,
      adress: this.f.adress,
      zipCode: this.f.zipCode,
      city: this.f.city,
      phone: this.f.phone,
      mobile: this.f.mobile
    };
    this.httpUser.updateUser(this.user._id, payload).subscribe((data) => {
    });
  }

  onDeleteAccount() {
    this.httpUser.deleteUser(this.user._id).subscribe(data => {
    });
  }
}
