import * as cron from 'node-cron';
import CronService from '../services/cron';

cron.schedule('* * * * *', () => {
    CronService.getScheduledTripTwoMinuteAway();
    CronService.getScheduledTripTenMinuteBefore();
});

cron.schedule('*/2 * * * *', () => {
    CronService.getScheduledTripOneHoursBefore();
    CronService.getScheduledTrip30MinuteBefore();
});
