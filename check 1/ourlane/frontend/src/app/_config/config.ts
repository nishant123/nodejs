export const config = {
  fbUrl: 'https://www.facebook.com/',
  twitterURl: 'https://twitter.com/',
  instagramUrl: 'https://www.instagram.com/',
  linkedinUrl: 'https://www.linkedin.com/',
  headerHeight: 23,
  footerHeight: 45,
  limit: 10,
  perPage: 10,
  pageNumber: 1,
  screenWidth: 991,
  max: 300
};
export const listStatus = [
  { value: 'All', label: 'Status' },
  { value: 'statuss', label: 'Status 1' },
  { value: 'status2', label: 'Status 2' }
];

export const listCreatedStatus = [
  { value: 'All', label: 'Status' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'created', label: 'Created' }
];
export const listCompletedStatus = [
  { value: 'All', tripType: "All", tripStatus: "All" },
  { value: 'Completed', tripType: "KMBooking", tripStatus: "Completed" },
  { value: 'Cancelled', tripType: "KMBooking", tripStatus: "Cancelled" },
  { value: 'Rejected', tripType: "KMBooking", tripStatus: "Rejected" },
  { value: 'Hourly Booking', tripType: "HourlyBooking", tripStatus: "All" },
];
export const listOngoingStatus = [
  { value: "All", tripType: "All", tripStatus :"Ongoing" },
  { value: "Right now", tripType: "All", tripStatus :"Ongoing" },
  { value: "Hourly Booking", tripType: "All", tripStatus :"Ongoing" },
];
export const listScheduledStatus = [
  { value: "All", tripType: "All", tripStatus :"Scheduled" },
  { value: "Scheduled", tripType: "KMBooking", tripStatus :"Scheduled" },
  { value: "Hourly Booking", tripType: "HourlyBooking", tripStatus :"Scheduled" },
];
export const driverStatus = ['Available', 'Driving'];
export const configImage = {
  logo: './../assets/images/logo-white.svg',
  logoIcon: './../assets/images/logo-icon.svg',
  userDefault: './../assets/images/user.png',
  dashboard: './../assets/images/dashboard.svg',
  administration: './../assets/images/administration.svg',
  cars: './../assets/images/cars.svg',
  drivers: './../assets/images/drivers.svg',
  customers: './../assets/images/customers.svg',
  booking: './../assets/images/booking.svg',
  tripCars: './../assets/images/tripCars.svg',

  backIcon: './../assets/images/icon-back.svg',
  keyIcon: './../assets/images/icon-key.png',
  eyeIcon: './../assets/images/icon-red-eye.png',
  eyeActiveIcon: './../assets/images/icon-red-eye-active.png',
  signupImage: './../assets/images/signup.png',

  searchIcon: './../assets/images/icon-search.svg',
  viewIcon: './../assets/images/icon-eye.svg',
  deleteIcon: './../assets/images/icon-trash.svg',

  fileNameLength: 25,
  profilePicSize: 500,

  editIcon: './../assets/images/pencil-edit.svg',
  uploadIcon: './../assets/images/upload.svg',
  closeIcon: './../assets/images/close.svg',
  deletepopupIcon: './../assets/images/delete.svg',
  locationIcon: './../assets/images/location-icon.svg',
  locationEndIcon: './../assets/images/location-icon.png',
  locationStartIcon: './../assets/images/location-icon2.png',
  timeBigIcon: './../assets/images/time-big-icon.png',
  locationBigIcon: './../assets/images/location-big-icon.png',
  driversIcon: './../assets/images/driver.svg',
  customerIcon: './../assets/images/customertab.svg',
  location1Icon: './../assets/images/001.svg',
  location2Icon: './../assets/images/002.svg',
  location3Icon: './../assets/images/003.svg',
  location4Icon: './../assets/images/004.svg',
  cardIcon: './../assets/images/card.svg',
  cashIcon: './../assets/images/cash.svg',
  paypalIcon: './../assets/images/paypal.svg',
  walletIcon: './../assets/images/wallet.svg',
  infoCircle: './../assets/images/info-circle.svg',
  nextArrow: './../assets/images/next-arrow.svg',
  dollarIcon: './../assets/images/dollar-icon.svg',
  dollarColors: './../assets/images/dollar-icons.svg',
  userBlue: './../assets/images/user-blue.svg',
  userVoilet: './../assets/images/user-voilet.svg',
  cancelledTrips: './../assets/images/cancelled-trips.svg',
  completedTrips: './../assets/images/completed-trips.svg',
  OngoingTrips: './../assets/images/on-going-trips.svg',
  scheduledTrips: './../assets/images/scheduled-trips.svg',
  downArrow: './../assets/images/down-arrow.svg',
  endLocation: './../assets/images/end-location.svg',
  startLocation: './../assets/images/start-location.svg',
  feedback: './../assets/images/feedback.svg',
  carAddIcon: './../assets/images/car-add.png',
  carRemoveIcon: './../assets/images/car-remove.png',
  successIcon: './../assets/images/success.png',
  userAddIcon: './../assets/images/user-add.png',
  userRemoveIcon: './../assets/images/user-remove.png',
  notificationsIcon: './../assets/images/icon-notifications.svg',
  settingsIcon: './../assets/images/icon-settings.svg',
  carIcon: './../assets/images/car-icon.svg',
  approveIcon: './../assets/images/approve.png',
  declineIcon: './../assets/images/decline.png',
  downloadCSV: './../assets/images/download.svg',
  menu: './../assets/images/menu.svg',
  iconError: './../assets/images/icon-error.svg',
  iconSuccess: './../assets/images/icon-success.svg',
  check: './../assets/images/check.svg',
  error: './../assets/images/error.svg',
  reset: './../assets/images/reload.svg',
  logoutImage: './../assets/images/logout-menu-icon.svg',
  arrayLeft: './../assets/images/array-left.svg',
  whiteCheckIcon: './../assets/images/check-white.svg',
  checkCircle: './../assets/images/check-circle-outline.svg',
  mapLocationStart: './../assets/images/location-icon3.png',
  mapDriverLocation: './../assets/images/driver-location.png',
  trash: './../assets/images/trash.svg'
};

export const configDataTable = {
  limit: 10,
  headerHeight: 32,
  footerHeight: 45
};
export const allBookingsImgs = {
  backButton: './assets/images/icon-arrow-left.svg',
  origin: './assets/images/origin.svg',
  destination: './assets/images/destination.svg',
  minutes: './assets/images/icon-minutes.svg',
  user: './assets/images/user.png',
  iconPhone: './assets/images/icon-phone.png',
  zoomIn: './assets/images/zoom-in.svg',
  zoomOut: './assets/images/zoom-out.svg'
};

export const chatCredentials = {
  username: '7259916919',
  password: '7259916919',
  userRole: 'Driver',
  userName: 'Admin',
  assignee: 'Admin',
  cipherKey: 'ourLane123'
};
