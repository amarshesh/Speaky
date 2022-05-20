import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email: string;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  forgot(email) {
    try {
      this.afAuth.sendPasswordResetEmail(email).then((e) => {
        this.presentAlert('link send', `${email}`);
      });
    } catch (err) {
      this.presentAlert('Invalid User', 'inffkl');
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
