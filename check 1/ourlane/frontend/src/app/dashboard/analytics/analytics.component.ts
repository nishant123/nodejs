import { Component, OnInit, TemplateRef } from '@angular/core';
import { configImage } from 'src/app/_config/config';
import * as Highcharts from 'highcharts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AnalyticsServices } from 'src/app/_services/analytics.service';
import { ExcelService } from '../../_services/excel.service';
import { publish } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { GlobalServices } from '../../_services/global.service';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  providers: [DatePipe]
})
export class AnalyticsComponent implements OnInit {
  constructor(private modalService: BsModalService, private analyticsServices: AnalyticsServices,
              private excelService: ExcelService, public datePipe: DatePipe, private globalServices:GlobalServices,
              private s3Service: S3Service) {
    this.chartCallback = (chart: any) => {
      this.chart = chart;
    };
    this.chartCallback1 = (chart: any) => {
      this.chart1 = chart;
    };
    this.chartCallback2 = (chart: any) => {
      this.chart2 = chart;
    };
    this.chartCallback3 = (chart: any) => {
      this.chart3 = chart;
    };
    this.chartCallback4 = (chart: any) => {
      this.chart4 = chart;
    };
    this.chartCallback5 = (chart: any) => {
      this.chart5 = chart;
    };
    this.chartCallback6 = (chart: any) => {
      this.chart6 = chart;
    };
  }
  currentMonthTrip: any;
  currentYearTrip: any;
  currentTrip: number;
  public searchIcon = configImage.searchIcon;
  public modalRef: BsModalRef;
  public message: string;
  public search: any;
  public DriversIcon = configImage.driversIcon;
  public CustomerIcon = configImage.customerIcon;
  public infoCircle = configImage.infoCircle;
  public nextArrow = configImage.nextArrow;
  public locationIcon = configImage.locationIcon;
  public dollarIcon = configImage.dollarIcon;
  public userBlue = configImage.userBlue;
  public userVoilet = configImage.userVoilet;
  public dollarColors = configImage.dollarColors;
  public closeIcon = configImage.closeIcon;

  public Location1Icon = configImage.location1Icon;
  public Location2Icon = configImage.location2Icon;
  public Location3Icon = configImage.location3Icon;
  public Location4Icon = configImage.location4Icon;

  public CardIcon = configImage.cardIcon;
  public CashIcon = configImage.cashIcon;
  public PaypalIcon = configImage.paypalIcon;
  public WalletIcon = configImage.walletIcon;

  public cancelledTrips = configImage.cancelledTrips;
  public completedTrips = configImage.completedTrips;
  public OngoingTrips = configImage.OngoingTrips;
  public scheduledTrips = configImage.scheduledTrips;
  public userDefault = configImage.userDefault;
  public downArrow = configImage.downArrow;
  public downloadCSV = configImage.downloadCSV;
  public menu = configImage.menu;
  public error = configImage.error;
  public reset = configImage.reset;
  public activeTab = 'drivers';

  public activeTabChat = 'week';
  public highcharts = Highcharts;
  public totalUserDataList: any;
  public tripsLeaderboard: any;
  public lastWeekRevenue: number;
  public currentWeekRevenue: any;
  public currentweekTrips: number;
  public currentMonthRevenue: number;
  public currentYearRevenue: number;
  public lastWeekTrips: number;
  public currentweekRevenue: number;
  public customerLists: any[];
  public driverList: any[];
  public chartExcel: any[];
  public math = Math;
  public chartOptions = {
    chart: {
      type: 'line',
      reflow: true,
    },
    tooltip: {
      headerFormat: '<b style="color: #22d489; font-weight: 500">{point.x}</b><br/>',
      pointFormat: ` <b>{point.y}  </b> Trips`,
      shared: true
    },
    legend: { enabled: false },
    title: {
      text: '',
      align: 'left',
      style: {
       color: '#000000',
          fontFamily: 'Helvetica-Neue-Bold',
          fontSize: '7px',
      },
    },
    colors: ['#22D489'],
    xAxis: {
      categories: [],
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Helvetica-Neue-Bold',
          fontSize: '7px',
        },
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%e of %b'
        },
      },

      crosshair: true,
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Helvetica-Neue-Bold',
          fontSize: '7px',
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [],
  };
  public chartOptions1 = {
    chart: {
      type: 'column',
      reflow: true,
    },
    legend: { enabled: false },
    title: {
      text: '',
      align: 'left',
      style: {
        color: '#000000',
        fontFamily: 'Helvetica-Neue-Bold',
        fontSize: '7px',
      },
    },
    colors: ['#22D489'],
    xAxis: {
      categories: [],
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Helvetica-Neue-Bold',
          fontSize: '7px',
        },
      },
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        enabled: false,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<b style="color: #22d489; font-weight: 500">{point.x}</b><br/>',
      pointFormat: `Amount: <b>{point.y} AED</b>`,
      shared: true
      
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [],
  };
  public chartOptions2 = {
    chart: {
      type: 'donut',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: '',
      align: 'left',
      style: {
        color: '#000000',
        fontFamily: 'Helvetica-Neue-Bold',
        fontSize: '7px',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: [
          '#FFC700',
          '#58D9FF',
          '#00D880',
          '#FF4848',
          '#e65100'
        ],
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: -180,
        center: ['50%', '50%'],
        size: '90%',
        showInLegend: false
      }
    },
    series: []
  };
  public chartOptions3 = {
    chart: {
      type: 'donut',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: '',
      align: 'left',
      style: {
        color: '#000000',
        fontFamily: 'Helvetica-Neue-Bold',
        fontSize: '7px',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        colors: [
          '#00a5ff',
          '#ff7248',
          '#fff14e',
          '#0076ff',
          '#ffa600',
          '#00d880',
          '#7aa9f7',
          '#ff4848',
          '#66bbc4',
          '#ff6289',
        ],
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: -180,
        center: ['50%', '50%'],
        size: '90%',
        showInLegend: false,
      }
    },
    series: [],
  };
  public chartOptions4 = {
    chart: {
      type: 'donut',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: '',
      align: 'left',
      style: {
        color: '#000000',
        fontFamily: 'Helvetica-Neue-Bold',
        fontSize: '7px',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: [
          '#00a5ff',
          '#ff7248',
          '#fff14e',
          '#0076ff',
          '#ffa600',
          '#00d880',
          '#7aa9f7',
          '#ff4848',
          '#66bbc4',
          '#ff6289',
        ],
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: '7px',
          }
        },
        startAngle: -90,
        endAngle: -180,
        center: ['50%', '50%'],
        size: '90%',
        showInLegend: false
      }
    },
    series: []
  };
  public chartOptions5 = {
    chart: {
      type: 'column',
      reflow: true,
    },
    legend: { enabled: false },
    title: {
      text: '',
      align: 'left',
      style: {
        color: '#000000',
        fontFamily: 'Helvetica-Neue-Bold',
        fontSize: '7px',
      },
    },
    colors: ['#22D489'],
    xAxis: {
      categories: [],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        enabled: false,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<b style="color: #22d489; font-weight: 500">{point.x}</b><br/>',
      pointFormat: `Revenue: <b>{point.y} AED</b>`,
      shared: true
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [],
  };
  public chartOptions6 = {
    chart: {
      type: 'column',
      reflow: true,
    },
    legend: { enabled: false },
    title: {
      text: '',
      align: 'left',
      style: {
        color: '#000000',
        fontFamily: 'Helvetica-Neue-Bold',
        fontSize: '7px',
      },
    },
    colors: ['#22D489'],
    xAxis: {
      categories: [],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        enabled: false,
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<b style="color: #22d489; font-weight: 500">{point.x}</b><br/>',
      pointFormat: ` <b>{point.y}  </b> Trips`,
      shared: true
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [],
  };
  public chart: any;
  public chartCallback: (chart: any) => void;
  public updateFromInput = false;
  public chartData = null;

  public chart1: any;
  public chartCallback1: (chart: any) => void;
  public updateFromInput1 = false;
  public chartData1 = null;

  public chart2: any;
  public chartCallback2: (chart: any) => void;
  public updateFromInput2 = false;
  public chartData2 = null;

  public chart3: any;
  public chartCallback3: (chart: any) => void;
  public updateFromInput3 = false;
  public chartData3 = null;

  public chart4: any;
  public chartCallback4: (chart: any) => void;
  public updateFromInput4 = false;
  public chartData4 = null;

  public chart5: any;
  public chartCallback5: (chart: any) => void;
  public updateFromInput5 = false;
  public chartData5 = null;

  public chart6: any;
  public chartCallback6: (chart: any) => void;
  public updateFromInput6 = false;
  public chartData6 = null;

  public user = [];
  public userName: any;
  public userId: any;
  public userRole: any;
  public userProfile: any;
  public tripOverView: any;
  public driverId: any;
  public profileImg: any;
  public customerId: any;
  public tripsLeaders: any;
  public liveFeeds: any;
  public driverName: any;
  public customerName: any;
  public customerImg: any;
  public driverImg: any;
  public driverrole: any;
  public customerrole: any;

  public calculateWeekRevenuHigh: any;
  public calculateWeekRevenuLow: any;
  public calculateWeekTripsHigh: any;
  public calculateWeekTripsLow: any;
  public totalAmount: number;
  public totalAmountHigh: number;
  public totalAmountLow: any;
  public completedTripsHigh: number;
  public completedTripsLow: any;
  public completedTrip: number;

  public TodayTrips = [];
  public tripsLeadersExcel = [];
  public Scheduled: any;
  public Ongoing: any;
  public Completed: any;
  public Cancelled: any;
  public MostPickupExcel = [];
  public MostDropExcel = [];
  public revenueExcel: any;
  public tripExcel: any;
  public MostTodayTrips = [];
  public totalUserData = [];
  public weeklyData = [];
  public monthlyData = [];
  public yearlyData = [];
  public weeklyTotalData = [];
  public monthlyTotalData = [];
  public yearlyTotalData = [];
  public unvalue;
  public date;
  public totalRevenue;
  public ExcelAmount = [];
  public totalTrips;
  public TripsEarnings;
  public totalCurrentMonthAmount;
  public totalCurrentMonthTrips;
  public totalCurrentWeekAmount;
  public totalCurrentWeekTrips;
  public totalYearAmount;
  public totalYearTrips;
  public chartAmount;
  public chartTrip;
  public startDate;
  public dayData;
  public ngOnInit(): void {
    this.getTripsOverview();
    this.getTripsLeaders();
    this.getTodayTrips();
    this.getMostPickup();
    this.getMostDrop();
    this.getUserLists('DRIVER');
    this.getUserLists('CUSTOMER');
    this.getLiveFeed();
  }

  public getUserLists(role: string) {
    this.analyticsServices.getUserLists(role).subscribe(
      (response: any) => {
        if (response && response.result && response.result.rows) {
          response.result.rows.map(ele => {
            if (ele.profileImage) {
              ele.profileImage = this.s3Service.getSignedUrl(ele.profileImage);
            }
          });
          if (role === 'DRIVER') {           
            this.driverList = response.result.rows;            
            this.onItemDriverChange(this.driverList[0]);
          }
          if (role === 'CUSTOMER') {            
            this.customerLists = response.result.rows;           
            this.onItemCustomerChanges(this.customerLists[0]);
          }
        }
      },
      error => console.error(error)
    );
  }

  public getTripsLeaders() {
    this.analyticsServices.getTripsLeaders().subscribe((response) => {
      this.tripsLeaders = response.result;
      const tripsLeadersList = this.tripsLeaders.map((obj) => {
        if (obj.driver_details.profileImage) {
          obj.driver_details.profileImage = this.s3Service.getSignedUrl(obj.driver_details.profileImage);
        }
        return {
          fullName: obj.driver_details.fullName,
          totalAmount: obj.totalAmount
        };
      });
      const filtered = tripsLeadersList.filter(
        function() {
          if (this.count < 5) {
            this.count++;
            return true;
          }
          return false;
        },
        { count: 0 }
      );
      this.tripsLeadersExcel = filtered;
    });
  }

  public getLiveFeed() {
    this.analyticsServices.getLiveFeed().subscribe((response) => {
      this.liveFeeds =  response.result.rows;
    });
  }

  public changeContent(activeTabVal: string) {
    this.activeTab = activeTabVal;
  }
  public openModalDriver(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  public openModalCustomer(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  public openModalLg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  public openModalAmount(template: TemplateRef<any>) {
    this.getTripsTotalOverview();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  public openModalTrip(template: TemplateRef<any>) {
    this.getTripsTotalOverview();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  public closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  public getTripsOverview() {
    this.analyticsServices.getTripsOverview().subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      this.tripOverView = response['result'];
      const data = response.result;

      const revenueList = {
        'current Week Revenue': this.tripOverView.currentweekRevenue,
        'current Month Revenue': this.tripOverView.currentMonthRevenue,
        'current Year Revenue': this.tripOverView.currentYearRevenue
      };
      const tripList = {
        'current Week Trips': this.tripOverView.currentweekTrips,
        'current Month Trips': this.tripOverView.currentMonthTrips,
        'current Year Trips': this.tripOverView.currentYearTrips
      };
      this.revenueExcel = Object.entries(revenueList).map((key) => {
        const temp = { Name: key[0], Value: key[1] };
        return temp;
      });
      this.tripExcel = Object.entries(tripList).map((key) => {
        const temp = { Name: key[0], Value: key[1] };
        return temp;
      });


      this.lastWeekRevenue = response.result.lastWeekRevenue;
      this.currentweekRevenue = response.result.currentweekRevenue;
      this.currentMonthRevenue = response.result.currentMonthRevenue;
      this.currentYearRevenue = response.result.currentYearRevenue;
      this.currentweekTrips = response.result.currentweekTrips;
      this.currentMonthTrip = response.result.currentMonthTrips;
      this.currentYearTrip = response.result.currentYearTrips;
      this.lastWeekTrips = response.result.lastWeekTrips;
      this.totalAmount = response.result.totalAmount;
      this.completedTrip = response.result.completedTrips;
      this.loadOverChart('week');
      this.loadTripChart('week');

      if (this.totalAmount >= 1000) {
        this.totalAmountHigh = this.totalAmount / 1000;
      } else {
        this.totalAmountLow = this.totalAmount;
      }
      if (this.completedTrip >= 1000) {
        this.completedTripsHigh = this.completedTrip / 1000;
      } else {
        this.completedTripsLow = this.completedTrip;
      }

      if (this.lastWeekRevenue > 0) {
        if (this.currentweekRevenue < this.lastWeekRevenue) {         
          this.calculateWeekRevenuLow =  this.globalServices.percentage(this.lastWeekRevenue, this.currentweekRevenue);         
        } else {         
          this.calculateWeekRevenuHigh =  this.globalServices.percentage(this.currentweekRevenue, this.lastWeekRevenue);
        }
      } else {
        this.unvalue = true;
      }
      if (this.lastWeekTrips > 0) {
        if (this.currentweekTrips < this.lastWeekTrips) {          
          this.calculateWeekTripsLow =  this.globalServices.percentage(this.lastWeekTrips, this.currentweekTrips);
        } else {         
          this.calculateWeekTripsHigh =  this.globalServices.percentage(this.currentweekTrips, this.lastWeekTrips);
        }
      } else {
        this.unvalue = true;
      }
    });
  }
  public getTripsTotalOverview(){
    this.analyticsServices.getTripsTotalOverview().subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      if (response && response['responseCode'] === 'SUCCESS' && response['result']) {
        this.weeklyTotalData = response.result.weeklyData;
        this.monthlyTotalData = response.result.monthlyData;
        this.yearlyTotalData = response.result.yearlyData;
        this.loadOverChart('week');
        this.loadTripChart('week');
      }
    },
      error => {
        console.log(error);

    });
  }
  public totalAmountWeek;
  public totalAmountMonth;
  public totalAmountYear;
  public loadOverChart(activeTabVal: string) {
    this.activeTabChat = activeTabVal;
    if (this.weeklyTotalData || this.monthlyTotalData || this.yearlyTotalData) {


      let amountTotalDataMonthly = [];
      let amountTotalDataXvalueMonthly = [];


      let amountTotalDataYearly = [];
      let amountTotalDataXvalueYearly = [];


      let amountTotalDataWeekly = [];
      let amountTotalDataXvalueWeekly = [];

      if (this.weeklyTotalData) {
        amountTotalDataWeekly = this.weeklyTotalData.map(data => {
          return parseInt(data.totalTodayAmount, 10);
        });      
        this.totalAmountWeek = this.globalServices.sumItems(amountTotalDataWeekly); 
        amountTotalDataXvalueWeekly = this.weeklyTotalData.map(data => {
          return this.datePipe.transform(data.date, 'EEE');
        });
      }
      if (this.monthlyTotalData) {
        amountTotalDataMonthly = this.monthlyTotalData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.totalMonthlyAmount);
        });
        this.totalAmountMonth = this.globalServices.sumItems(amountTotalDataMonthly);      
        amountTotalDataXvalueMonthly = this.monthlyTotalData.map(data => {
          return this.datePipe.transform(data.Month, 'MMM');
        });
      }
      if (this.yearlyTotalData) {

        amountTotalDataYearly = this.yearlyTotalData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.totalYeaelyAmount);
        });        
        this.totalAmountYear = this.globalServices.sumItems(amountTotalDataYearly); 
        amountTotalDataXvalueYearly = this.yearlyTotalData.map(data => {
          return data.year;
        });
      }

      if (this.activeTabChat === 'week') {
        this.chartData5 = amountTotalDataWeekly;
        this.ExcelAmount = this.weeklyTotalData;
        this.totalRevenue = this.totalAmountWeek;     
        this.chartOptions5.series = [{
          data: amountTotalDataWeekly
        }];       
        this.chartOptions5.xAxis.categories = amountTotalDataXvalueWeekly;
       
      }

      if (this.activeTabChat === 'month') {
        this.chartData5 = amountTotalDataMonthly;
        this.ExcelAmount = this.monthlyTotalData;
        this.totalRevenue = this.totalAmountMonth;     
        this.chartOptions5.series = [{
          data: amountTotalDataMonthly
        }];
        this.chartOptions5.xAxis.categories = amountTotalDataXvalueMonthly;
        
      }
      if (this.activeTabChat === 'year') {
        this.chartData5 = amountTotalDataYearly;
        this.ExcelAmount = this.yearlyTotalData;
        this.totalRevenue = this.totalAmountYear;       
        this.chartOptions5.series = [{
          data: amountTotalDataYearly
        }];
        this.chartOptions5.xAxis.categories = amountTotalDataXvalueYearly;
        
      }
      this.updateFromInput5 = true;
      try {
        setTimeout(() => {
          // this.chart.reflow() ;
          // this.chart1.reflow()
        }, 0);
      } catch (error) {
      }
    }
  }
  public totalTripWeek;
  public totalTripMonth;
  public totalTripYear;
  public loadTripChart(activeTabVal: string) {
    this.activeTabChat = activeTabVal;
    if (this.weeklyTotalData || this.monthlyTotalData || this.yearlyTotalData) {

      let tripTotalDataMonthly = [];
      let amountTotalDataXvalueMonthly = [];

      let tripTotalDataYearly = [];
      let amountTotalDataXvalueYearly = [];

      let tripTotalDataWeekly = [];
      let amountTotalDataXvalueWeekly = [];

      if (this.weeklyTotalData) {
        tripTotalDataWeekly = this.weeklyTotalData.map(data => {
          return parseInt(data.completedTrips, 10);
        });         
        this.totalTripWeek = this.globalServices.sumItems(tripTotalDataWeekly); 
        amountTotalDataXvalueWeekly = this.weeklyTotalData.map(data => {
          return this.datePipe.transform(data.date, 'EEE');
        });
      }
      if (this.monthlyTotalData) {
        tripTotalDataMonthly = this.monthlyTotalData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.completedTrips);
        });
        this.totalTripMonth = this.globalServices.sumItems(tripTotalDataMonthly);
        amountTotalDataXvalueMonthly = this.monthlyTotalData.map(data => {
          return this.datePipe.transform(data.Month, 'MMM');
        });
      }
      if (this.yearlyTotalData) {
        tripTotalDataYearly = this.yearlyTotalData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.completedTrips);
        });
        this.totalTripYear = this.globalServices.sumItems(tripTotalDataYearly);
        amountTotalDataXvalueYearly = this.yearlyTotalData.map(data => {
          return data.year;
        });
      }

      if (this.activeTabChat === 'week') {
        this.chartData6 = tripTotalDataWeekly;
        this.ExcelAmount = this.weeklyTotalData;
        this.totalTrips =  this.totalTripWeek;       
        this.chartOptions6.series = [{
          data: tripTotalDataWeekly
        }];
        this.chartOptions6.xAxis.categories = amountTotalDataXvalueWeekly;
      }

      if (this.activeTabChat === 'month') {
        this.chartData6 = tripTotalDataMonthly;
        this.ExcelAmount = this.monthlyTotalData;
        this.totalTrips =  this.totalTripMonth;       
        this.chartOptions6.series = [{
          data: tripTotalDataMonthly
        }];
        this.chartOptions6.xAxis.categories = amountTotalDataXvalueMonthly;
      }
      if (this.activeTabChat === 'year') {
        this.chartData6 = tripTotalDataYearly;
        this.ExcelAmount = this.yearlyTotalData;
        this.totalTrips =  this.totalTripYear;      
        this.chartOptions6.series = [{
          data: tripTotalDataYearly
        }];

        this.chartOptions6.xAxis.categories = amountTotalDataXvalueYearly;
      }
      this.updateFromInput6 = true;
      try {
        setTimeout(() => {
          // this.chart.reflow() ;
          // this.chart1.reflow()
        }, 0);
      } catch (error) {
      }
    }

  }
  public getTodayTrips() {
    this.analyticsServices.getTodayTrips().subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      if (response && response['responseCode'] === 'SUCCESS' && response['result']) {
        this.Scheduled = response.result.Scheduled;
        this.Ongoing = response.result.Ongoing;
        this.Completed = response.result.Completed;
        this.Cancelled = response.result.Cancelled;
        const data = response.result;
        this.chartData2 = Object.entries(data).map((key) => {
          const temp = { name: key[0], y: key[1] };
          return temp;
        });
        this.MostTodayTrips = Object.entries(data).map((key) => {
          const temp = { TripsStatus: key[0], TripsCount: key[1] };
          return temp;
        });  
        this.chartOptions2.series = [
          {
            data: this.chartData2,
            type: 'pie',
            innerSize: '50%',
          },
        ];
        this.updateFromInput2 = true;
        try {
          setTimeout(() => {

          }, 0);
        } catch (error) {
          console.log(error);
        }
      }
    },
      error => {
        console.log(error);
      });
  }
  public getMostPickup() {
    this.analyticsServices.getMostPickup().subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      if (
        response &&
        response.responseCode === 'SUCCESS' &&
        response.result
      ) {
        const data = response.result;
        this.chartData3 = Object.entries(data).map((key, index) => {
          if (index < 20) {
            const temp = { name: key[0], y: key[1] };
            return temp;
          }
        });
        this.MostPickupExcel = Object.entries(data).map((key) => {
          const temp = { Location: key[0], Value: key[1] };
          return temp;
        });
        this.chartOptions3.series = [
          {
            data: this.chartData3,
            type: 'pie',
            innerSize: '50%',
          },
        ];
        this.updateFromInput3 = true;
        try {
          setTimeout(() => {

          }, 0);
        } catch (error) {
          console.log(error);
        }
      }
    },
      error => {
        console.log(error);
      });
  }
  public getMostDrop() {
    this.analyticsServices.getMostDrop().subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      if (
        response &&
        response.responseCode === 'SUCCESS' &&
        response.result
      ) {
        const data = response.result;
        this.chartData4 = Object.entries(data).map((key, index) => {
          if (index < 20) {
            const temp = { name: key[0], y: key[1] };
            return temp;
          }
        });
        this.MostDropExcel = Object.entries(data).map((key) => {
          const temp = { Location: key[0], Value: key[1] };
          return temp;
        });

        this.chartOptions4.series = [
          {
            data: this.chartData4,
            type: 'pie',
            innerSize: '50%',
          },
        ];
        this.updateFromInput4 = true;
        try {
          setTimeout(() => {

          }, 0);
        } catch (error) {
          console.log(error);
        }
      }
    },
      error => {
        console.log(error);
      });
  }
  
  public totalCustomerDataList
  public onItemCustomerChanges(value: { fullName: any; role: any; id: any; profileImage: any; }) {
    this.customerName = value.fullName;
    this.customerrole = value.role;
    this.customerId = value.id;
    this.customerImg = value.profileImage;
    if (value.id) {
      this.analyticsServices.getCustomerOverview(value.id).subscribe((response) => {
        if (response && response.responseCode === 'SUCCESS' && response.result) {
          this.totalCustomerDataList = response.result.totalUserData;  
                  
        }
      });      
    }
    this.closeModal();
    this.dayData = false;
  }
  public onItemDriverChange(value: { fullName: any; role: any; id: any; profileImage: any; }) {
    this.driverName = value.fullName;
    this.driverrole = value.role;
    this.driverId = value.id;
    this.driverImg = value.profileImage;    
    if (value.id) {
      this.analyticsServices.getDriverOverview(value.id).subscribe(response => {
        if (response && response.responseCode === 'SUCCESS' && response.result) {
          this.weeklyData = response.result.weeklyData.reverse();
          this.monthlyData = response.result.monthlyData;
          this.yearlyData = response.result.yearlyData;
          this.totalUserData = response.result.totalUserData;
          this.totalUserDataList = response.result.totalUserData[0];
          this.totalCurrentMonthAmount = response.result.totalUserData[0].totalCurrentMonthAmount;
          this.totalCurrentMonthTrips = response.result.totalUserData[0].totalCurrentMonthTrips;
          this.totalCurrentWeekAmount = response.result.totalUserData[0].totalCurrentWeekAmount;
          this.totalCurrentWeekTrips = response.result.totalUserData[0].totalCurrentWeekTrips;
          this.totalYearAmount = response.result.totalUserData[0].totalAmount;
          this.totalYearTrips = response.result.totalUserData[0].totalTrips;
          this.loadChart('week');                           
        }
      },
        error => {
          console.log(error);
        });
    }
    this.closeModal();
    this.dayData = false;
  }
  public loadChart(activeTabVal: string) {
    this.activeTabChat = activeTabVal;

    if (this.weeklyData || this.monthlyData || this.yearlyData) {

      let tripDataMonthly = [];
      let amountDataMonthly = [];
      let amountDataXvalueMonthly = [];

      let tripDataYearly = [];
      let amountDataYearly = [];
      let amountDataXvalueYearly = [];

      let tripDataWeekly = [];
      let amountDataWeekly = [];
      let amountDataXvalueWeekly = [];

      if (this.weeklyData) {
        tripDataWeekly = this.weeklyData.map(data => {
          return parseInt(data.totalDayTrips, 10);
        });
        amountDataWeekly = this.weeklyData.map(data => {
          return parseInt(data.totalDayAmount, 10);
        });       
        amountDataXvalueWeekly = this.weeklyData.map(data => {
          return this.datePipe.transform(data.tripdate, 'EEE');
        });
        
      }
      if (this.monthlyData) {
        tripDataMonthly = this.monthlyData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.totalMonthTrips);
        });
        amountDataMonthly = this.monthlyData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.totalMonthAmount);
        });
        amountDataXvalueMonthly = this.monthlyData.map(data => {
          return this.datePipe.transform(data.month, 'MMM');
        });
      }
      if (this.yearlyData) {
        tripDataYearly = this.yearlyData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.totalYearTrips);
        });
        amountDataYearly = this.yearlyData.map(data => {
          // tslint:disable-next-line: radix
          return parseInt(data.totalYearAmount);
        });
        amountDataXvalueYearly = this.yearlyData.map(data => {
          return data.year;
        });
      }

      if (this.activeTabChat === 'week') {
        this.chartData = tripDataWeekly;
        this.chartData1 = amountDataWeekly;
        this.chartExcel = this.weeklyData;
        this.chartAmount = this.globalServices.sumItems(amountDataWeekly);;        
        this.chartTrip = this.globalServices.sumItems(tripDataWeekly);;
        this.TripsEarnings = 'Weekly';
        this.chartOptions.series = [{
          data: tripDataWeekly
        }];
        this.chartOptions1.series = [{
          data: amountDataWeekly
        }];
        this.chartOptions.xAxis.categories = amountDataXvalueWeekly;
        this.chartOptions1.xAxis.categories = amountDataXvalueWeekly;       
      }

      if (this.activeTabChat === 'month') {
        this.chartData = tripDataMonthly;       
        this.chartData1 = amountDataMonthly;
        this.chartExcel = this.monthlyData;        
        this.chartAmount = this.globalServices.sumItems(amountDataMonthly);
        this.chartTrip = this.globalServices.sumItems(tripDataMonthly);
        this.TripsEarnings = 'Monthly';
        this.chartOptions.series = [{
          data: tripDataMonthly
        }];
        this.chartOptions1.series = [{
          data: amountDataMonthly
        }];
        this.chartOptions.xAxis.categories = amountDataXvalueMonthly;
        this.chartOptions1.xAxis.categories = amountDataXvalueMonthly;
      }
      if (this.activeTabChat === 'year') {
        this.chartData = tripDataYearly;
        this.chartData1 = amountDataYearly;
        this.chartExcel = this.yearlyData;
        this.chartAmount = this.globalServices.sumItems(amountDataYearly);;
        this.chartTrip = this.globalServices.sumItems(tripDataYearly);;
        this.TripsEarnings = 'Yearly';
        this.chartOptions.series = [{
          data: tripDataYearly
        }];
        this.chartOptions1.series = [{
          data: amountDataYearly
        }];
        this.chartOptions.xAxis.categories = amountDataXvalueYearly;
        this.chartOptions1.xAxis.categories = amountDataXvalueYearly;
      }
      this.updateFromInput = true;
      this.updateFromInput1 = true;
      try {
        setTimeout(() => {
          // this.chart.reflow() ;
          // this.chart1.reflow()
        }, 0);
      } catch (error) {
      }
    }
  }
  public onChangeDriverDay(event: any) {
    this.startDate = event.target.value;
    if (this.startDate !== '') {
      this.analyticsServices.getDriverDayData(this.driverId, this.startDate).subscribe(response => {
        if (response && response.responseCode === 'SUCCESS' && response.result) {
          this.dayData = response.result.dayData;
        }
      },
        error => {
          console.log(error);
        });
    }
  }
  public onChangeCustomerDay(event: any) {
    this.startDate = event.target.value;
    if (this.startDate !== '') {
      this.analyticsServices.getCustomerDayData(this.customerId, this.startDate).subscribe(response => {
        if (response && response.responseCode === 'SUCCESS' && response.result) {
          this.dayData = response.result.dayData;
        }
      },
        error => {
          console.log(error);
        });
    }
  }
  public exportAsXLSXMostPickup(): void {
    this.excelService.exportAsExcelFile(this.MostPickupExcel, 'MostPickup');
  }
  public exportAsXLSXMostDrop(): void {
    this.excelService.exportAsExcelFile(this.MostDropExcel, 'MostDrop');
  }
  public exportAsXLSXTodayTrips(): void {
    this.excelService.exportAsExcelFile(this.MostTodayTrips, 'TodayTrips');
  }
  public exportAsXLSXTripsLeaders(): void {
    this.excelService.exportAsExcelFile(this.tripsLeadersExcel, 'TripsLeaders');
  }
  public exportAsXLSXLoadChart(): void {
    this.excelService.exportAsExcelFile(this.chartExcel, 'todayAmount');
  }
  public exportAsXLSXRevenue(): void {
    this.excelService.exportAsExcelFile(this.revenueExcel, 'revenueExcel');
  }
  public exportAsXLSXTrip(): void {
    this.excelService.exportAsExcelFile(this.tripExcel, 'tripExcel');
  }
  public exportAsXLSXtotalAmount(): void {
    this.excelService.exportAsExcelFile(this.ExcelAmount, 'todayAmount');
  }
  public resetDate(){   
    this.dayData = false;
    this.date = '';
  }
}
