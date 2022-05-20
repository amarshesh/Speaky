import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  spinner = false;

  constructor(
    private router: Router,
    private mc: ModalController,
    public anAuth: AngularFireAuth,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  async dismiss() {
    await this.mc.dismiss();
  }

  async register() {
    const { email, password, confirmPassword } = this;
    if (password !== confirmPassword) {
      this.spinner = true;
      this.presentAlert(
        'Incorrect password',
        ' Password and confirm are not same!'
      );
      this.spinner = false;
      return;
    }
    try {
      const user = await this.anAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.spinner = true;
      this.router.navigate(['/details']);
    } catch (err) {
      if ((err = 'auth/invalid-email')) {
        this.presentAlert('Invalid email', 'Enter a valid email');
        return;
      }
      if ((err = 'auth/network-request-failed')) {
        this.presentAlert('No internet', 'Please connect to network');
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
}
