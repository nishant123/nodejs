import { environment } from 'src/environments/environment';

export const endpoints = {
    allBookings: {
        GetTripByIdUrl: environment.tripURL + '/trip/getTripDetails/',
        TripListUrl: environment.tripOverviewURL + '/trip/tripList',
        completeTripUrl: environment.tripURL + '/trip/completeTrip'
    },
    driver: {
        getDriverUrl: environment.tripURL + '/driver/getDrivers',
        getDriversUrl: environment.tripOverviewURL + '/trip/driverTrips',
        deleteDriverUrl: environment.tripURL + '/driver/deleteDriver'
    },
    analytics: {
        getTripsOverviewUrl: environment.tripOverviewURL + '/trip/tripsOverview',
        getTripsTotalOverviewUrl: environment.tripOverviewURL + '/trip/tripsTotalOverview',
        getTripsLeadersUrl: environment.tripOverviewURL + '/trip/leaders',
        getDriverOverviewUrl: environment.tripOverviewURL + '/trip/driverOverview',
        getCustomerOverviewUrl: environment.tripOverviewURL + '/trip/customerOverview',
        getTodayTripsUrl: environment.tripOverviewURL + '/trip/todayTrips',
        getMostPickupUrl: environment.tripOverviewURL + '/trip/mostPickup',
        getMostDropUrl: environment.tripOverviewURL + '/trip/mostDrop',
        userListUrl: environment.userURL + '/user/list',
        getLiveFeedUrl: environment.notificationURL + '/notification/liveFeed',
        getDriverDayDataUrl: environment.tripOverviewURL + '/trip/driverDayData',
        getCustomerDayDataUrl: environment.tripOverviewURL + '/trip/customerDayData',
    },
    cars: {
        createCarUrl: environment.carURL + '/car/create',
        getCarUrl: environment.carURL + '/car/searchCar',
        deleteCarUrl: environment.carURL + '/car/deleteCar',
        updateCarUrl: environment.carURL + '/car/updateCar',
        getDriverUrl: environment.carURL + '/car/getDriver',
        multideletecarUrl: environment.carURL + '/car/deletemultipleCar',
        createCarTypeUrl: environment.carURL + '/car/carType',
        getCarTypeUrl: environment.carURL + '/car/searchCartype',
        deleteCarTypeUrl: environment.carURL + '/car/deleteCartype',
        multiDeleteCarTypeUrl: environment.carURL + '/car/deleteMultipleCarType',
        updateCarTypeUrl: environment.carURL + '/car/updateCarType',
    },
    auth: {
        registerUrl: environment.userURL + '/auth/create',
        loginUrl: environment.userURL + '/auth/login',
        verifyEmailUrl: environment.userURL + '/auth/verifyEmail',
        forgetPasswordUrl: environment.userURL + '/auth/forgetPassword',
        setPasswordUrl: environment.userURL + '/auth/setPassword',
        resendVerifyEmailUrl: environment.userURL + '/auth/resendverifyEmail',
        chanagePasswordUrl: environment.userURL + '/auth/changePassword',
        deleteAdminUrl: environment.userURL + '/user/deleteUser',
        deleteAllAdminUrl: environment.userURL + '/user/deletemultipleUser',
        approveAdminUrl: environment.userURL + '/user/approveUser',
        declineAdminUrl: environment.userURL + '/user/declineUser',
        userInfoUrl: environment.userURL + '/user/details',
        updateUserUrl: environment.userURL + '/user/updateUser',
        adminListUrl: environment.userURL + '/user/list',
        customerTrips: environment.tripOverviewURL + '/trip/customerTrips',
        getImageByLocationUrl: environment.userURL + '/user/getImageByLocation',
        getLanguageListUrl: environment.staticURL + '/driver/languageList',
        getCityListUrl: environment.staticURL + '/driver/cityList',
        notfictionListUrl: environment.notificationURL + '/notification/liveFeed',
        notificationDeleteUrl: environment.notificationURL + '/notification/deleteNotification',
        notificationReadUrl: environment.notificationURL + '/notification'
    },
    mqtt: {
        getDriverLocation: 'mobile/getLocation',
        getCustomerLocation: 'mobile/getCustomer/Location'
    },
    chat: {
        saveChat: environment.chatURL + '/chatTicket/saveChat',
        getTickets: environment.chatURL + '/chatTicket/getTickets',
        getResolve: environment.chatURL + '/chatTicket/resolveChat',
        getChats: environment.chatURL + '/chatTicket/getChat',
        loadLastMessages: environment.chatURL + '/chatTicket/getLastMessages',
        updateAssign: environment.chatURL + '/chatTicket/updateAssign',
        getNewTickets: environment.chatURL + '/chatTicket/getNewTickets'
    },
    staticPage: {
        termsAndCondition: environment.staticURL + '/managePages/getManagePage/termsAndCondition',
        privacyPolicy: environment.staticURL + '/managePages/getManagePage/privacyPolicy'
    }
};
