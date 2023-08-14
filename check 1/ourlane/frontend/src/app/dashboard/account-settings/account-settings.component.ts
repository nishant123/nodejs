import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public toastrService: ToastrService,
    private authService: AuthServices,
    public translate: TranslateService
  ) {

  }
  public location: string = '1';
  public language: string = 'en';
  public languages;
  public show = false;

  selectLang = '';
  TransLang = [];
  public language1;
  public language2;
  public language3;
  public language4;
  public cityList = [];
  ngOnInit(): void {
    this.getLanguageList();
    this.getCityList();
    this.getUserData();   
  }
  getLanguageList(){
    this.authService.getLanguageList().subscribe(
      (response) => {
        this.languages = response.result;
        this.language1 = response.result[0].language;
        this.language2 = response.result[1].language;
        this.language3 = response.result[2].language;
        this.language4 = response.result[3].language;
      },
      (error) => {
      }
    );
  }
  getCityList(){
    this.authService.getCityList().subscribe(
      (response) => {
        this.cityList = response.result;
      },
      (error) => {
        setTimeout(() => {

        }, 1000);
      }
    );
  }
  getUserData() {
    this.authService.getUserDetails().subscribe(
      (response) => {
        if (response.result.city) {
          this.location = response.result.city;
        }
        if (response.result.language) {
          this.language = response.result.language;

        }
      },
      (error) => {
        setTimeout(() => {
          if (!error.error.message) {
            this.toastrService.error(this.translate.instant('errors.connectionError'),
            '');
          } else {
            this.toastrService.error(error.error.message,
              '');
          }
        }, 1000);
      }
    );
  }
  updateProfile() {

    this.location = this.location;
    this.language =  this.language;

    if (this.location && this.language) {
      const object = {
        city: this.location ? this.location : '',
        language: this.language ? this.language : '',
      };
      this.authService.updateUser(object).subscribe(
        (response) => {
          if (response && response.code === 200) {
            setTimeout(() => {
              this.toastrService.success(this.translate.instant('accountsettingsManage.UserDetailsAlert'),
              '');
            }, 1000);

          }
        },
        (error) => {
          setTimeout(() => {
            if (!error.error.message) {
              this.toastrService.error(this.translate.instant('errors.connectionError'),
              '');
            } else {
              this.toastrService.error(error.error.message,
                '');
            }
          }, 1000);
        }
      );
    } else {
      setTimeout(() => {
        this.toastrService.error(this.translate.instant('accountsettingsManage.LocationLanguage'),
        '');
      }, 1000);
    }
  }
}
