import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public alertController: AlertController,
    private mc: ModalController
  ) {}

  ngOnInit() {}

  async login() {
    const { email, password } = this;
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/details']);
    } catch (err) {
      if ((err = 'auth/invalid-email')) {
        this.presentAlert('Login error', 'Invalid email or password');
      }
    }
  }

  async presentAlert(h: string, m: string) {
    const alert = await this.alertController.create({
      header: h,
      message: m,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async dismiss() {
    await this.mc.dismiss();
  }
}
