import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };
  postError: boolean = false;
  postErrorMessage: string | undefined;
  subscriptionTypes: Observable<string[]>;
  singleModel: string = "On";
  startDate: Date;
  startTime: Date;
  userRating: number = 0;
  maxRating: number = 10;

  userSettings: UserSettings = {
    ...this.originalUserSettings,
  }

  constructor(private dataService: DataService) {
    this.startDate = new Date();
    this.startTime = new Date();
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }
  ngOnInit(): void {

  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    console.log('in onSubmit: ', form.valid);
    this.dataService.postUserSettingsForm(this.userSettings).subscribe(
      result => console.log('success: ', result),
      error => this.onHttpError(error),
    );
  }

}
