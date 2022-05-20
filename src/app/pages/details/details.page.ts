import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { PromiseType } from 'protractor/built/plugins';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  matches: string[];
  isRecording = false;
  items = '';
  constructor(
    private speechRecognition: SpeechRecognition,
    private ptf: Platform,
    private router: Router,
    private authAf: AngularFireAuth,
    private nvc: NavController,
    private cd: ChangeDetectorRef,
    private tts: TextToSpeech
  ) {}

  ngOnInit() {}
  getPermission() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
        hasPermission = !hasPermission;
      }
    });
  }
  startListning() {
    const options = {
      language: 'en-US',
    };
    this.speechRecognition.startListening().subscribe((matches) => {
      this.matches = matches;
    });
    this.isRecording = true;
  }
  stopListning() {
    console.log('this.matches');
    this.isRecording = false;
    this.speechRecognition.stopListening().then(() => {});
  }
  logout() {
    this.authAf.signOut().then(() => {
      this.router.navigateByUrl('/welcome');
    });
  }
  speak(text) {
    console.log(text);
    this.tts
      .speak(text)
      .then(() => console.log('Success'))
      .catch((reason: any   ) => console.log(reason));
  }
  supplimentry() {}
}
