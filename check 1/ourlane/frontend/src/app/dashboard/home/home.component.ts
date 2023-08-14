import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output, ElementRef } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthServices } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {
  Router
} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { configImage } from 'src/app/_config/config';
import { TranslateService } from '@ngx-translate/core';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {

  };
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  public userDefault = configImage.userDefault;
  public eyeActiveIcon = configImage.eyeActiveIcon;
  public iconError = configImage.iconError;
  public iconSuccess = configImage.iconSuccess;
  public webcamErr = false;
  [x: string]: any;
  public files: File[] = [];
  public profileImgname: any;

  public prevProfileImgname: any;
  public profileImgnameTemp: any;
  public profileImageName = 'Document Name';
  public profilePicArrayHere: any = [];
  public imgUrl: any;
  public imagePathtype: any;
  public name: string;
  modalRef: BsModalRef;
  public fieldTextType = false;
  public ccode = 'ae';
  public errorMessage: string;
  public successMessage: string;
  public profileSuccessMessage: string;
  public profileErrorMessage: string;
  // public userDetails: IUserInformation;
  public userDetails: any = {
    fullName: '',
    mobileNumber: '',
    loginId: '',
    role: '',
  };
  public mobileOptions = {
    initialCountry: this.ccode,
    autoPlaceholder: 'polite',
    nationalMode: true,
  };
  @ViewChild('mobileNo')
  mobileNo: ElementRef;
  // tslint:disable-next-line: max-line-length
  constructor(public toastrService: ToastrService, private router: Router, private formBuilder: FormBuilder, private authService: AuthServices,
    private modalService: BsModalService, private translate: TranslateService, private s3Service: S3Service) { }


  ngOnInit(): void {
    this.getUserData();
    this.resetPassword = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: [null,
        [Validators.required, Validators.compose([Validators.minLength(8), Validators.maxLength(15)])]
      ],
      cpassword: ['', Validators.required],
    });
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }
  onSelect(event, type = 'profile') {
    const f = event.addedFiles[0];
    if (
      f &&
      f &&
      (f.type === 'image/png' ||
        f.type === 'image/jpg' ||
        f.type === 'image/jpeg')
    ) {
      const FileSize = f.size / 1024;
      if (FileSize > configImage.profilePicSize) {
        this.translate.get('errors.fileSizeError').subscribe(msg => {
          this.toastrService.error(msg,
            '');
        });

        return false;
      } else {
        this.files[0] = event.addedFiles[0];
        this.imagePath = f;
        this.imagePathtype = f.type;
        if (type === 'profile') {
          this.imgUrl = this.imagePath;
          const split = f.name.split('.');
          let filename = split[0];
          const extension = split[split.length - 1];
          if (filename.length > configImage.fileNameLength) {
            filename = filename.substring(0, configImage.fileNameLength) + '....';
          }
          this.profileImageName = filename + '.' + extension;
          const image = new Image();
          image.crossOrigin = 'Anonymous';
          image.name = this.profileImageName;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let dataURL;
            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            ctx.drawImage(image, 0, 0);
            dataURL = canvas.toDataURL('image/jpg');

          };

          this.getBase64(f).then(data => {
            image.src = data + '';
            this.profileImgnameTemp = image.src;
          });
        }

      }
    }
    else {
      this.translate.get('errors.fileTypeError').subscribe(msg => {
        this.toastrService.error(msg,
          '');
      });
    }

  }

  onRemove(event) {
    this.profileImgnameTemp = '';
    this.imgUrl = '';
    this.profileImageName = 'Document Name';
    this.files.splice(this.files.indexOf(event), 1);
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  public triggerSnapshot(): void {
    this.showWebcam = !this.showWebcam;
    this.trigger.next();
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  public handleInitError(error: WebcamInitError): void {
    this.webcamErr = true;
    this.toastrService.error(this.translate.instant('profile.webcamError'), '');

    this.showWebcam = false;
    this.errors.push(error);
  }
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }
  public handleImage(webcamImage: WebcamImage): void {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.name = 'Webcam-image.jpg';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      dataURL = canvas.toDataURL('image/jpg');
    };
    image.src = webcamImage.imageAsDataUrl;
    const iFile = this.dataURItoBlob(webcamImage.imageAsDataUrl);
    const file = new File([iFile], 'Webcam-image.jpeg', { type: '\'image/jpeg\'' });
    this.imagePath = file;
    this.profileImageName = image.name;

    this.profileImgnameTemp = image.src;

    this.imgUrl = this.imagePath;

    this.pictureTaken.emit(webcamImage);
  }
  dataURItoBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  public open() {
    this.lightBox.open(this.profilePicArrayHere, 0);
  }

  public fileChangeEvent(event: any, type: any): void {
    if (
      event.target.files &&
      event.target.files[0] &&
      (event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg' ||
        event.target.files[0].type === 'image/jpeg')
    ) {
      const FileSize = event.target.files[0].size / 1024;
      if (FileSize > 500) {
        this.toastrService.error('Image size should not be greater than 500KB');
      } else {
        this.imagePath = event.target.files[0];
        this.imagePathtype = event.target.files[0].type;
        if (type === 'profile') {
          this.imgUrl = this.imagePath;
          this.profileImageName = event.target.files[0].name;
        }
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = e => {
          if (type === 'profile') {
            this.profileImgnameTemp = reader.result;
          }
        };
      }
    }
    else {
      this.toastrService.error('Only jpg / jpeg / png formats are allowed ');
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  saveProfilePic() {
    this.profileImageName = 'Document Name';
    this.profileImgname = this.profileImgnameTemp;
    this.files.length = 0;
    this.editProfileFormSubmit();
  }
  removePic(event) {
    if (!this.profileImgname) {
      return false;
    }
    this.imgUrl = null;
    this.profileImageName = 'Document Name';
    this.profileImgname = '';
    this.files.length = 0;
    this.imgUrl = '';

  }
  keyPress1(event: any) {
    if (
      // tslint:disable-next-line: triple-equals
      event.keyCode == 32 &&
      event.target.value &&
      event.target.value.trim().length === 0
    ) {
      event.preventDefault();
    }

    const pattern = /[a-zA-Z \-\']/;

    const inputChar = String.fromCharCode(event.charCode);
    // tslint:disable-next-line: triple-equals
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  getUserData() {
    this.authService.getUserDetails().subscribe((response) => {
      if (response && response.code === 200) {
        if (response.result.profileImage) {
          response.result.profileImage = this.s3Service.getSignedUrl(response.result.profileImage);
        }
        this.userDetails = response.result;
        this.userDetails.mobileNumber = response.result.mobileNumber;
        this.userDetails.role = (this.userDetails.role === 'ADMIN') ? this.translate.instant('label.webAdmin') : this.translate.instant('label.superAdmin');
        if (response.result.profileImage) {
          this.profileImgname = response.result.profileImage;
          this.prevProfileImgname = response.result.profileImage;
        }
        this.authService.setProfileImageData(this.userDetails);
      }
    }, error => {
      setTimeout(() => {
        if (!error.error.message) {
          this.toastrService.error(this.translate.instant('errors.connectionError'),
            '');
        } else {
          this.toastrService.error(error.error.message,
            '');
        }
      }, 1000);
    });

  }
  editProfileFormSubmit() {
    let mNumber = '';
    if (this.userDetails.mobileNumber.number.length > 10) {
      mNumber = this.userDetails.mobileNumber.dialCode + this.userDetails.mobileNumber.nationalNumber;
    } else {
      mNumber = this.userDetails.mobileNumber.e164Number;
    }

    const data = {
      fullName: this.userDetails.fullName ? this.userDetails.fullName : '',
      mobileNumber: this.userDetails.mobileNumber ? mNumber : '',

    };
    if (this.imgUrl) {
      // tslint:disable-next-line: no-string-literal
      data['profileImage'] = this.imgUrl;
    } else {
      // tslint:disable-next-line: no-string-literal
      data['profileImage'] = '';
    }
    const profileData = new FormData();
    Object.keys(data).forEach(k => {
      profileData.append(k, data[k]);
    });
    this.authService.updateUser(profileData).subscribe((response) => {
      if (response && response.code === 200) {
        this.profileSuccessMessage = this.translate.instant('alert.profileSuccessMessage');
      }

    }, error => {
      if (!error.error.message) {
        this.profileErrorMessage = this.translate.instant('errors.connectionError');
      } else {
        this.profileErrorMessage = error.error.message;
      }
    });
  }
  public resetPasswordSubmit(params) {
    const Object = {
      oldPassword: params.currentPassword,
      password: params.password
    };
    this.authService.changePassword(Object).subscribe((response) => {
      if (response && response.code === 200) {
        // this.resetPassword.reset()
        this.successMessage = this.translate.instant('errors.passwordChangedSuccessfully');
        localStorage.clear();
        this.router.navigate(['/webadmin']);
      }
    }, error => {
      if (!error.error.message) {
        this.errorMessage = this.translate.instant('errors.connectionError');
      } else {
        this.errorMessage = this.translate.instant('errors.currentPasswordMatch');
      }
    });
  }
  passwordCheck(password: string) {
    this.numberExists = false;
    this.LetterExists = false;
    this.capitalLetterExists = false;
    this.lengthCheck = false;
    this.specialCharExists = false;
    this.invalidPassword = false;
    if (password.length < 8 || password.length > 15) {
      this.numberExists = false;
      this.LetterExists = false;
      this.capitalLetterExists = false;
      this.lengthCheck = false;
      this.specialCharExists = false;
      this.invalidPassword = false;
      return false;
    }
    if (!password.match(/[0-9]/g)) {
      this.numberExists = true;
      return false;
    }

    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      this.specialCharExists = true;
      return false;
    }


    if (!password.match(/[a-z]/)) {
      this.LetterExists = true;
      return false;
    }

    if (!password.match(/[A-Z]/)) {
      this.capitalLetterExists = true;
      return false;
    }
    if (this.numberExists && this.LetterExists && this.capitalLetterExists
      && this.specialCharExists) {
      this.invalidPassword = false;
    } else {
      this.invalidPassword = true;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'alert-modal' })
    );
  }
  onCountryChange(event) {
    this.ccode = event.iso2;
  }
  checkNumber(event) {

    let str = event.target.value;
    if (!isNaN(str)) {
      str = str.slice(0, 10);
    } else {
      str = str.slice(0, -1);
    }

    event.target.value = str;
  }

}
