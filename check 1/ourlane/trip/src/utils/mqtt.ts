import { vars } from '../config/vars';
import * as mqtt from 'mqtt';
//import { Console } from 'node:console';

const { mqttUrl } = vars;

const client = mqtt.connect(mqttUrl);

const mqttPublishTripComplete = (tripDetails) => {
  let details = {
    tripId: tripDetails.tripId,
    totalKms: tripDetails.totalKms,
    totalTimeInMinute: tripDetails.totalTimeInMinute,
    totalFare: tripDetails.totalFare,
    status: tripDetails.status,
    driverId: tripDetails.driverId,
    customerId: tripDetails.customerId
  }
  const message = JSON.stringify(details);
  client.publish(`mobile/admin/tripComplete/${tripDetails.tripId}`, message, {qos: 2});
}

const mqttPublishDriverTripId = (tripDetails) => {
  let details = { tripId: tripDetails.tripId }
  const message = JSON.stringify(details);
  console.log("mqtt-tripDetails...........",tripDetails)
  client.publish(`mobile/driver/tripDetails/${tripDetails.driverId}`, message, {qos: 2});
}

const mqttPublishCustomerResponse = (customerDetails) => { 
  const message = JSON.stringify({ message : customerDetails.msg });
  console.log("mqtt-customerMessage...........",customerDetails)
  client.publish(`mobile/customer/noCabFound/${customerDetails.customerId}`, message, {qos: 2});
}

export { mqttPublishTripComplete,mqttPublishDriverTripId,mqttPublishCustomerResponse };