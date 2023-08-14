import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { CarServices } from '../../_services/car.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config, configImage, driverStatus, listStatus } from 'src/app/_config/config';
import { ExcelService } from '../../_services/excel.service';
import { TranslateService } from '@ngx-translate/core';
import * as AWS from 'aws-sdk';
import { S3Service } from 'src/app/_services/s3.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-administration',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {

  public carTypeStatus = false;
  public carStatus = true;

  @ViewChild('successPopup') successPopup: TemplateRef<any>;
  @ViewChild('updatePopup') updatePopup: TemplateRef<any>;
  @ViewChild('successCarTypePopup') successCarTypePopup: TemplateRef<any>;
  @ViewChild('updateCarTypePopup') updateCarTypePopup: TemplateRef<any>;
  @ViewChild('deletePopup') deletePopup: TemplateRef<any>;
  public selectedCarTypeName: any;
  public selectedUpdateCarTypeName: any;
  public alreadyExistMsg: string;

  constructor(
    private modal: NgbModal,
    private carService: CarServices,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private excelService: ExcelService,
    private translate: TranslateService,
    private s3Service: S3Service,
    private modalService: BsModalService
  ) {
    this.onResize();
    // tslint:disable-next-line: no-string-literal
    this.status = this.listStatus[0]['value'];
  }
  public modalRef: BsModalRef;
  get carNumber() {
    return this.carForm.get('carNumber');
  }
  get carModel() {
    return this.carForm.get('carModel');
  }
  get carCapacity() {
    return this.carForm.get('carCapacity');
  }
  get driver() {
    return this.carForm.get('driver');
  }

  get carFactor() {
    return this.carForm.get('carFactor');
  }
  get carOdometer() {
    return this.carForm.get('carOdometer');
  }

  get pricePerKilometer() {
    return this.carForm.get('pricePerKilometer');
  }
  get bookingFees() {
    return this.carForm.get('bookingFees');
  }
  get pricePerminute() {
    return this.carForm.get('pricePerminute');
  }
  get addDescription() {
    return this.carForm.get('addDescription');
  }

  get carTypeNamet() {
    return this.carTypeForm.get('carTypeName');
  }
  get bookingFeest() {
    return this.carTypeForm.get('bookingFee');
  }
  get pricePerHourt() {
    return this.carTypeForm.get('pricePerHour');
  }
  get pricePerKilometert() {
    return this.carTypeForm.get('pricePerHourKM');
  }
  get pricePerminutet() {
    return this.carTypeForm.get('pricePerMin');
  }
  get waitingChargePerMint() {
    return this.carTypeForm.get('waitingChargePerMin');
  }
  get addDescriptiont() {
    return this.carTypeForm.get('addDescription');
  }
  get carImage() {
    return this.carTypeForm.get('carImage');
  }



  get carNumber1() {
    return this.carUpdateForm.get('carNumber');
  }
  get carModel1() {
    return this.carUpdateForm.get('carModel');
  }
  get carCapacity1() {
    return this.carUpdateForm.get('carCapacity');
  }
  get carFactor1() {
    return this.carUpdateForm.get('carFactor');
  }
  get carOdometer1() {
    return this.carUpdateForm.get('carOdometer');
  }
  get carImage1() {
    return this.carUpdateForm.get('carImage');
  }
  get priceperkilometer1() {
    return this.carUpdateForm.get('pricePerKilometer');
  }
  get bookingFees1() {
    return this.carUpdateForm.get('bookingFees');
  }
  get pricePerMinute1() {
    return this.carUpdateForm.get('pricePerminute');
  }
  get waitingChargePerMin1() {
    return this.carUpdateForm.get('waitingChargePerMin');
  }
  get addDescription1() {
    return this.carForm.get('addDescription');
  }
  get carImage3d1() {
    return this.carUpdateForm.get('car3dImage');
  }
  searchIcon = configImage.searchIcon;
  editIcon = configImage.editIcon;
  deleteIcon = configImage.deleteIcon;
  uploadIcon = configImage.uploadIcon;
  closeIcon = configImage.closeIcon;
  check = configImage.check;
  checkCircle = configImage.checkCircle
  deletepopupIcon = configImage.deletepopupIcon;
  public downloadCSV = configImage.downloadCSV;
  public declineIcon = configImage.declineIcon;

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  // rows = [];
  public max = config.max;
  public display = 'none'; // default Variable
  public loadingIndicator = true;
  public carForm: FormGroup;
  public carTypeForm: FormGroup;
  public carTypeUpdateForm: FormGroup;
  public carUpdateForm: FormGroup;
  public reorderable = true;
  public screenWidth: number;
  public datatableResponsive = false;
  public selected = [];
  public SelectionType = SelectionType;
  public selectedDriverID = '';
  public uploadfile3d: string;
  public uploadfile3d1: string;
  public uploadfile: string;
  public edituuid: any;
  public editCarTypeuuid: any;
  public uploadfile1: string;
  public driverStatus = driverStatus;
  public listStatus = listStatus;
  public searchText = '';
  public rows = [];
  public ColumnMode = ColumnMode;
  public status: string;
  public car: any = [];
  public carType: any = [];
  public carExcel: any = [];
  public deleteCarId = '';
  public deleteMsg = '';
  public perPage = 10;
  public pageNumber = 1;
  public driverData = [];
  public totalCars = 0;
  public totalCarsCarType = 0;

  closeResult: string;
  public img642: any;
  public img64: any;
  public img641: any;
  public img643: any;
  public img3d: any;
  public totalPages = 0;
  public totalPagesCarType = 0;
  public totalpageArrayCarType = [];
  public totalpageArray = [];
  inActiveAdminsCount = 0;
  requestedAdminsCount = 0;
  filterObj: any = {};
  public carList = [];
  public order;
  public carTypesdummy: [
    { id: '1', name: 'Bentley - Bentayga' },
    { id: '2', name: 'Bentley - Flying Spur' },
    { id: '3', name: 'Bentley - Bentayga' }
  ];
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 991) {
      this.datatableResponsive = true;
    } else {
      this.datatableResponsive = true;
    }
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result; // .substr(reader.result.indexOf(',') + 1);
    this.img64 = base64result;
  }

  _handleReaderLoadeds(e) {
    const reader = e.target;
    const base64result = reader.result; // .substr(reader.result.indexOf(',') + 1);
    this.img641 = base64result;
    this.carForm.value.carImage = this.img641;
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    this.uploadfile = file.name;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleInputChanges(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    this.uploadfile1 = file.name;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoadeds.bind(this);
    reader.readAsDataURL(file);
  }

  public picked1(event) {
    const sizeByte = $('#fileupload')[0].files[0].size;
    const sizeKb = sizeByte / 1024;

    const extension: string = $('#fileupload')
      .val()
      .replace(/^.*\./, '');
    const ext: string = extension.toUpperCase();

    if (ext !== 'JPG' && ext !== 'JPEG' && ext !== 'PNG') {
      $('#file_detail').html('File format should be (JPG/JPEG and PNG)');
    } else if (sizeKb > 5000) {
      $('#file_detail').html('File size maximum 5 Mb');
    } else {
      $('#file_detail').html('');

      const fileList: FileList = event.target.files;

      if (fileList.length > 0) {
        const file: File = fileList[0];
        this.img64 = file;
        // this.uploadfile = file.name;
        // this.uploadfile1 = file.name;
        this.handleInputChange(file);
      } else {
        alert('No file selected');
      }
    }
  }

  public picked2(event) {
    const sizeByte = $('#fileupload1')[0].files[0].size;
    const sizeKb = sizeByte / 1024;
    const extension: string = $('#fileupload1')
      .val()
      .replace(/^.*\./, '');
    const ext: string = extension.toUpperCase();

    if (ext !== 'JPG' && ext !== 'JPEG' && ext !== 'PNG') {
      $('#file_detail1').html('File format should be (JPG/JPEG and PNG)');
    } else if (sizeKb > 5000) {
      $('#file_detail1').html('File size maximum 5 Mb');
    } else {
      $('#file_detail1').html('');

      const fileList: FileList = event.target.files;

      if (fileList.length > 0) {
        const file: File = fileList[0];
        this.img641 = file;
        this.handleInputChanges(file);
      } else {
        alert('No file selected');
      }
    }
  }

  public image3dpicked1(event) {
    // tslint:disable-next-line: prefer-const
    let sizeByte = $('#fileupload3d')[0].files[0].size;
    let sizeKb = sizeByte / 1024;

    // tslint:disable-next-line: prefer-const
    var extension: String = $('#fileupload3d')
      .val()
      .replace(/^.*\./, '');
    let ext: String = extension.toUpperCase();

    if (ext != 'ZIP') {
      $('#file_detail_3d').html('File format should be ZIP 3D Modal');
    } else if (sizeKb > 2000000) {
      $('#file_detail_3d').html('File size maximum 2mb');
    } else {
      $('#file_detail_3d').html('');

      const file3dList: FileList = event.target.files;

      if (file3dList.length > 0) {
        const file3D: File = file3dList[0];
        this.img642 = file3D;
        this.carForm.value.car3dImage = file3D;
        this.uploadfile3d = file3D.name;
      } else {
        alert('No file selected');
      }
    }
  }
  public image3dpicked2(event) {
    // tslint:disable-next-line: prefer-const
    var sizeByte = $('#fileupload3d1')[0].files[0].size;
    let sizeKb = sizeByte / 1024;

    var extension: String = $('#fileupload3d1')
      .val()
      .replace(/^.*\./, '');
    let ext: String = extension.toUpperCase();

    if (ext != 'ZIP') {
      $('#file_detail_3d1').html('File format should be ZIP 3D modal');
    } else if (sizeKb > 2000000) {
      $('#file_detail_3d1').html('File size maximum 2 mb');
    } else {
      $('#file_detail_3d').html('');

      const file3dList: FileList = event.target.files;

      if (file3dList.length > 0) {
        const file3D: File = file3dList[0];
        this.img643 = file3D;
        this.uploadfile3d1 = file3D.name;
      } else {
        alert('No file selected');
      }
    }
  }


  ngOnInit(): void {
    this.getCarDetails();
    this.getCarTypeDetails();
    // post data
    this.createCar();
    this.createCarType();
    this.updateCar();
    this.getDriver();

  }

  carTypeOpen() {
    this.carTypeStatus = true;
    this.carStatus = false;
  }
  carsOpen() {
    this.carTypeStatus = false;
    this.carStatus = true;
  }

  addCar(carModal) {
    this.open(carModal);
    this.uploadfile = '';
    this.img64 = null;
  }
  addTypeCar(carTypeModal) {
    this.carTypeForm.reset();
    this.open(carTypeModal);
    this.uploadfile = '';
    this.img64 = null;
  }

  open(content) {
    this.modal
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'dark-modal',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getCarDetails() {
    this.carService
      .getCar(this.searchText, this.perPage, this.pageNumber)
      .subscribe((res) => {
        this.car = res.result.result;
        this.car.map(ele => {
          if (ele.carImage) {
            ele.carImage = this.s3Service.getSignedUrl(ele.carImage);
          }
        });
        this.totalCars = res.result.totalCount;
        this.totalPages = Math.ceil(this.totalCars / this.perPage);
        this.totalpageArray = new Array(this.totalPages);
      });
  }

  getCarTypeDetails() {
    this.carService
      .getCarType(this.searchText, this.perPage, this.pageNumber)
      .subscribe((res) => {
        // console.log('cartypeList', res);
        this.carType = res.result.rows;
        this.carType.map(ele => {
          if (ele.carImage) {
            ele.carImage = this.s3Service.getSignedUrl(ele.carImage);
          }
        });
        this.totalCarsCarType = res.result.count;
        this.totalPagesCarType = Math.ceil(this.totalCarsCarType / this.perPage);
        this.totalpageArrayCarType = new Array(this.totalPagesCarType);
      });
  }

  getCarDetailsExcel() {
    this.carService
      .getCar(this.searchText, this.totalCars, 1)
      .subscribe((res) => {
        this.carList = res.result.result;
        this.carExcel = this.carList.map((obj) => {
          return {
            'car Model': obj.carModel,
            'car Number': obj.carNumber,
            'car Odometer': obj.carOdometer,
            'car Factor': obj.carFactor,
            'car Capacity': obj.carCapacity,
            'Chauffeur Name': obj.driverName,
            status: obj.status,
            'car Image': obj.carImage,
          };
        });
        this.excelService.exportAsExcelFile(this.carExcel, 'CarList');
      });

  }
  onCheckboxChangeFn(event) {
    console.log(event);
  }
  updateCar() {
    this.carUpdateForm = this.formBuilder.group({
      carNumber: ['', [Validators.required]],
      carModel: ['', [Validators.required]],
      carCapacity: ['', [Validators.required]],
      carTypeId: ['', [Validators.required]],
      driverStatus: [
        '',
        [
          // Validators.required,
        ],
      ],
      carFactor: [''],
      carOdometer: [''],
      driverId: [
        '',
        [
          // Validators.required,
        ],
      ],
      addDescription: ['', [Validators.required]],
    });
  }
  onSelect({ selected }) {
    const item = selected.filter(data => data.driverStatus !== 'Driving').map(res => res.uuid);
    const selectedOrder1 = {
      selectedOrder: item.join(),
    };
    this.order = item.join();
  }

  multiDelete(deleteAll) {
    this.modal.open(deleteAll, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'delete-modal',
      centered: true
    });
  }

  deleteAllCarType() {

    const deleteCarType = this.order.split(',');

    this.carService.multideleteCarType({ deleteCarType }).subscribe((response) => {
      if (response.code === 200) {
        this.modalRef = this.modalService.show(this.deletePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
        this.getCarTypeDetails();
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
        this.modal.dismissAll();
      }
    });

  }

  onActivate(event) { }

  createCar() {
    this.carForm = this.formBuilder.group({
      carNumber: ['', [Validators.required]],
      carModel: ['', [Validators.required]],
      carCapacity: ['', [Validators.required]],
      driverStatus: [
        '',
        [
          // Validators.required,
        ],
      ],
      carFactor: [''],
      carOdometer: [''],
      carTypeId: ['', [Validators.required]],
      driverId: [
        '',
        [
          // Validators.required,
        ],
      ],
      addDescription: ['', [Validators.required]],
    });
  }

  createCarType() {
    this.carTypeForm = this.formBuilder.group({
      carTypeName: ['', [Validators.required]],
      bookingFee: ['', [Validators.required]],
      pricePerHour: ['', [Validators.required]],
      pricePerHourKM: ['', [Validators.required]],
      pricePerMin: ['', [Validators.required]],
      waitingChargePerMin: ['', [Validators.required]],
      carImage: ['', [Validators.required]],
      addDescription: ['', [Validators.required]],
      car3dImage: ['']
    });
  }

  carTypeSubmit() {
    const payload = {
      carTypeName: this.carTypeForm.value.carTypeName,
      bookingFee: this.carTypeForm.value.bookingFee,
      pricePerHour: this.carTypeForm.value.pricePerHour,
      pricePerHourKM: this.carTypeForm.value.pricePerHourKM,
      pricePerMin: this.carTypeForm.value.pricePerMin,
      waitingChargePerMin: this.carTypeForm.value.waitingChargePerMin,
      carImage: this.img64,
      addDescription: this.carTypeForm.value.addDescription,
      car3dImage: this.carTypeForm.value.car3dImage,
    };
    // console.log(payload);
    const formData = new FormData();
    // tslint:disable-next-line: forin
    for (const value in payload) {
      formData.append(value, payload[value]);
    }
    this.carService.createCarType(formData).subscribe((res) => {
      if (res.code === 200) {
        this.getCarTypeDetails();
        this.carForm = this.formBuilder.group({
          carTypeName: ['', [Validators.required]],
          bookingFee: ['', [Validators.required]],
          pricePerHour: ['', [Validators.required]],
          pricePerHourKM: ['', [Validators.required]],
          pricePerMin: ['', [Validators.required]],
          waitingChargePerMin: ['', [Validators.required]],
          carImage: ['', [Validators.required]],
          addDescription: ['', [Validators.required]],
          car3dImage: ['']
        });
      }

      this.modalRef = this.modalService.show(this.successCarTypePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
      setTimeout(() => {
        this.modalService.hide();
      }, 3000);
      this.modal.dismissAll();

    }, error => {
      if (error.error.code === 400) {
        this.alreadyExistMsg = error.error.message;
      }
    });
  }



  carSubmit() {

    const payload = {
      carNumber: this.carForm.value.carNumber,
      carModel: this.carForm.value.carModel,
      carCapacity: this.carForm.value.carCapacity,
      driverStatus: this.carForm.value.driverStatus,
      carFactor: this.carForm.value.carFactor,
      carTypeId: this.carForm.value.carTypeId,
      carTypeName: this.selectedCarTypeName,
      carOdometer: this.carForm.value.carOdometer,
      driverId: this.carForm.value.driverId,
      // carImage: this.img64,
      // pricePerKilometer: this.carForm.value.pricePerKilometer,
      // bookingFees: this.carForm.value.bookingFees,
      // pricePerminute: this.carForm.value.pricePerminute,
      addDescription: this.carForm.value.addDescription,
      // car3dImage: this.carForm.value.car3dImage,
    };
    const formData = new FormData();
    // tslint:disable-next-line: forin
    for (const value in payload) {
      formData.append(value, payload[value]);
    }
    if (this.carForm.value.driverStatus === '') {
      this.carForm.value.driverStatus = 'Unavailable';
    }



    this.carService.createCar(formData).subscribe((res) => {
      if (res.code === 200) {
        this.getCarDetails();
        this.carForm = this.formBuilder.group({
          carNumber: ['', [Validators.required]],
          carModel: ['', [Validators.required]],
          carCapacity: ['', [Validators.required]],
          driverStatus: [
            '',
            [
              // Validators.required,
            ],
          ],
          carFactor: [''],
          carOdometer: [''],
          carTypeId: [''],
          driverId: [
            '',
            [
              // Validators.required,
            ],
          ],
          // carImage: ['', [Validators.required]],
          // pricePerKilometer: ['', [Validators.required]],
          // bookingFees: ['', [Validators.required]],
          // pricePerminute: ['', [Validators.required]],
          addDescription: ['', [Validators.required]],
          carTypes: ['', [Validators.required]],
        });
      }
      // this.toastr.success('You have added a car successfully', 'Success!', { closeButton: true });      
      // $('#carModal').css('display', 'none');
      // $('.modal-backdrop').remove();
      this.modal.dismissAll();
      this.modalRef = this.modalService.show(this.successPopup, { class: 'custom-success-car-modal modal-dialog-centered' });
      setTimeout(() => {
        this.modalService.hide();
      }, 3000);
    });
  }
  carTypeUpdateSubmit() {
    // tslint:disable-next-line: triple-equals
    if (this.img641 && this.img641 != undefined) {
      this.carTypeUpdateForm.value.carImage = this.img641;
    } else {
      this.img641 = '';
      this.carTypeUpdateForm.removeControl('carImage');
    }

    const payload = {
      uuid: this.editCarTypeuuid,
      carTypeName: this.carTypeUpdateForm.value.carTypeName,
      bookingFee: this.carTypeUpdateForm.value.bookingFee,
      pricePerHour: this.carTypeUpdateForm.value.pricePerHour,
      pricePerMin: this.carTypeUpdateForm.value.pricePerMin,
      pricePerHourKM: this.carTypeUpdateForm.value.pricePerHourKM,
      waitingChargePerMin: this.carTypeUpdateForm.value.waitingChargePerMin,
      carImage: this.img641,
      addDescription: this.carTypeUpdateForm.value.addDescription,
      car3dImage: this.img643,
      id: this.carTypeUpdateForm.value.carTypeId
    };
    const formData = new FormData();
    // tslint:disable-next-line: forin
    for (const value in payload) {
      formData.append(value, payload[value]);
    }



    this.carService.updateCarType(formData).subscribe((res) => {
      if (res.code === 200) {
        this.getCarTypeDetails();
        this.modal.dismissAll();
        this.modalRef = this.modalService.show(this.updateCarTypePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
      }
    });
  }

  carUpdateSubmit() {
    if (this.carUpdateForm.value.carStatus === '') {
      this.carUpdateForm.value.carStatus = 'Unavailable';
    }

    // tslint:disable-next-line: triple-equals
    // if (this.img641 && this.img641 != undefined) {
    //   this.carUpdateForm.value.carImage = this.img641;
    // } else {
    //   this.img641 = '';
    //   this.carUpdateForm.removeControl('carImage');
    // }

    const payload = {
      uuid: this.edituuid,
      carNumber: this.carUpdateForm.value.carNumber,
      carModel: this.carUpdateForm.value.carModel,
      carCapacity: this.carUpdateForm.value.carCapacity,
      driverStatus: this.carUpdateForm.value.driverStatus,
      carFactor: this.carUpdateForm.value.carFactor,
      carOdometer: this.carUpdateForm.value.carOdometer,
      driverId: this.carUpdateForm.value.driverId,
      driverName: this.carUpdateForm.value.driverName =
        this.carUpdateForm.value.driverId !== ''
          ? $('#ddldriver option:selected').text()
          : '',
      // carImage: this.img641,
      // pricePerKilometer: this.carUpdateForm.value.pricePerKilometer,
      // bookingFees: this.carUpdateForm.value.bookingFees,
      // pricePerminute: this.carUpdateForm.value.pricePerminute,
      addDescription: this.carUpdateForm.value.addDescription,
      carTypeId: this.carUpdateForm.value.carTypeId,
      carTypeName: this.selectedUpdateCarTypeName,
      // car3dImage: this.img643,
    };

    const formData = new FormData();
    // tslint:disable-next-line: forin
    for (const value in payload) {
      formData.append(value, payload[value]);
    }



    this.carService.updateCar(formData).subscribe((res) => {
      if (res.code === 200) {
        this.getCarDetails();
        // this.toastr.success('Car Updated successfully !', 'Updated!', { closeButton: true });
        this.modal.dismissAll();
        this.modalRef = this.modalService.show(this.updatePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
      }
    });
  }
  updateCarTypeEvent(event, uuid, content) {
    this.editCarTypeuuid = uuid;
    if (!event.detail || event.detail == 1) {
      let obj;
      this.carType.forEach((c) => {
        if (c.uuid === uuid) {
          obj = c;
        }
      });


      const splitImg: string = obj.carImage.toString().split('/');
      const imgName = splitImg
        .toString()
        .split('?')[0]
        .toString()
        .split(',');

      this.uploadfile1 = imgName[3];
      this.carTypeUpdateForm = this.formBuilder.group({
        uuid: [obj.uuid],
        carTypeName: [obj.carTypeName, [Validators.required]],
        bookingFee: [obj.bookingFee, [Validators.required]],
        pricePerHour: [obj.pricePerHour, [Validators.required]],
        pricePerHourKM: [obj.pricePerHourKM, [Validators.required]],
        pricePerMin: [obj.pricePerMin, [Validators.required]],
        waitingChargePerMin: [obj.waitingChargePerMin, [Validators.required]],
        carImage: [obj.carImage, [Validators.required]],
        addDescription: [obj.addDescription, [Validators.required]],
        carTypeId: [obj.id, []],
        car3dImage: [''],
      });
      this.open(content);
    } else {
      this.closeModalDialog();
    }

  }

  updateCarEvent(event, uuid, content) {

    this.edituuid = uuid;
    // this.editdriverName = 
    // tslint:disable-next-line: triple-equals
    if (!event.detail || event.detail == 1) {
      let obj;
      this.car.forEach((c) => {
        if (c.uuid === uuid) {
          obj = c;
        }
      });

      // const splitImg: string = obj.carImage.toString().split('/');
      // const imgName = splitImg
      //   .toString()
      //   .split('?')[0]
      //   .toString()
      //   .split(',');

      // this.uploadfile1 = imgName[3];

      this.carUpdateForm = this.formBuilder.group({
        uuid: [obj.uuid],
        carNumber: [obj.carNumber, [Validators.required]],
        carModel: [obj.carModel, [Validators.required]],
        carCapacity: [obj.carCapacity, [Validators.required]],
        carFactor: [obj.carFactor],
        carOdometer: [obj.carOdometer],
        driverId: [
          obj.driverId,
          [
            // Validators.required,
          ],
        ],
        driverName: [
          obj.driverName ? obj.driverName : '',
          [
            // Validators.required,
          ],
        ],
        // carImage: [obj.carImage, [Validators.required]],
        // pricePerKilometer: [obj.pricePerKilometer, [Validators.required]],
        // bookingFees: [obj.bookingFees, [Validators.required]],
        // pricePerminute: [obj.pricePerminute, [Validators.required]],
        driverStatus: [
          obj.driverStatus ? obj.driverStatus : '',
          [
            // Validators.required,
          ],
        ],
        addDescription: [obj.addDescription, [Validators.required]],
        // car3dImage: [obj.car3dImage, []],
        carTypeId: [obj.carTypeId, [Validators.required]]
      });

      this.open(content);
    } else {
      this.closeModalDialog();
    }
  }

  deleteCar(event, uuid) {
    const data = {
      uuid: this.deleteCarId,
    };
    this.carService.deleteCar(data).subscribe((res) => {
      if (res.code === 200) {
        this.getCarDetails();
        this.modalRef = this.modalService.show(this.deletePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
        this.modal.dismissAll();
      }
    });
  }
  deleteCarType(event, uuid) {
    const data = {
      uuid: this.deleteCarId,
    };
    this.carService.deleteCarType(data).subscribe((res) => {
      if (res.code === 200) {
        this.getCarTypeDetails();
        this.modalRef = this.modalService.show(this.deletePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
        this.modal.dismissAll();
      }
    });
  }

  changeLab(data, type) {
    if (data.value === '') {
      if (type === 'edit') {
        this.carUpdateForm.patchValue({ driverStatus: '' });
        this.carUpdateForm.patchValue({ driverId: '' });
      } else {
        this.carForm.patchValue({ driverStatus: '' });
        this.carForm.patchValue({ driverId: '' });
      }
    }
    this.carForm.controls.driverStatus.patchValue('Available');
  }

  selectCarType() {
    let carId = this.carForm.value.carTypeId;
    let selectedCar = this.carType.find(c => c.id == carId);
    this.selectedCarTypeName = selectedCar.carTypeName;
  }
  selectUpdateCarType() {
    const updatecarId = this.carUpdateForm.value.carTypeId;
    const selectedUpdateCar = this.carType.find(c => c.id == updatecarId);
    this.selectedUpdateCarTypeName = selectedUpdateCar.carTypeName;

  }

  deleteEvent(exampleModal) {
    this.modal.open(exampleModal, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'delete-modal',
      centered: true
    });
  }
  deleteCarTypeEvent(deleteCarTypeModal) {
    this.modal.open(deleteCarTypeModal, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'delete-modal',
      centered: true
    });
  }

  deleteEventDriving() {
    this.toastr.error(
      this.translate.instant('driver.deleteErrorOnDriving'),
      ''
    );
    return false;
  }
  carSearch(event) {
    this.searchText = event.target.value;
    this.pageNumber = 1;
    this.carService
      .getCar(this.searchText, this.perPage, this.pageNumber)
      .subscribe((res) => {
        this.car = res.result.result;
        this.car.map(ele => {
          if (ele.carImage) {
            ele.carImage = this.s3Service.getSignedUrl(ele.carImage);
          }
        });
        this.totalCars = res.result.totalCount;
      });
  }
  carTypeSearch(event) {
    this.searchText = event.target.value;
    this.pageNumber = 1;
    this.carService
      .getCarType(this.searchText, this.perPage, this.pageNumber)
      .subscribe((res) => {
        this.carType = res.result.rows;
        this.carType.map(ele => {
          if (ele.carImage) {
            ele.carImage = this.s3Service.getSignedUrl(ele.carImage);
          }
        });
        this.totalCarsCarType = res.result.totalCount;
      });
  }


  closeModalDialog() {
    this.display = 'none';
  }

  getDriver() {
    this.carService.getDriver().subscribe((res) => {
      this.driverData = res.result;
    });
  }

  public loadPage(page) {
    this.perPage = this.perPage;
    this.pageNumber = page;
    this.getCarDetails();
    this.car.slice(
      (this.pageNumber - 1) * this.perPage,
      (this.pageNumber - 1) * this.perPage + this.perPage
    );
  }
  public onPageNumber(page) {
    if (
      !isNaN(parseInt(page.target.value, 10)) &&
      parseInt(page.target.value, 10) !== 0
    ) {
      if (parseInt(page.target.value, 10) <= this.totalPages) {
        this.loadPage(parseInt(page.target.value, 10));
        this.pageNumber = page.target.value;
      }
    }
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.carExcel, 'CarList');
  }
}
