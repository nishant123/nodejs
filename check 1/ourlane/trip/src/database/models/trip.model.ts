import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import { applicationStatuses } from '../../config/constants';
import Users from './users.model';
import Driver from './driver.model';
class Trip extends Model {
    public id: number;
}

Trip.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    locationType: {
        type: DataTypes.STRING(50)
    },
    startLat: {
        type: DataTypes.FLOAT
    },
    startLong: {
        type: DataTypes.FLOAT
    },
    endLat: {
        type: DataTypes.FLOAT
    },
    endLong: {
        type: DataTypes.FLOAT
    },
    startLocationName: {
        type: DataTypes.STRING
    },
    endLocationName: {
        type: DataTypes.STRING
    },
    paymentType: {
        type: DataTypes.ENUM,
        values: Object.values(applicationStatuses.paymentType)
    },
    cardType: {
        type: DataTypes.STRING(50)
    },
    cardNo: {
        type: DataTypes.BIGINT
    },
    paymentAmount: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.ENUM,
        values: Object.values(applicationStatuses.tripStatus)
    },
    tripId: {
        type: DataTypes.STRING(100)
    },
    tripDate: {
        type: DataTypes.STRING
    },
    otp: {
        type: DataTypes.INTEGER
    },
    customerFeedback: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    driverFeedback: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    ratingCustomer: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    ratingDriver: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    pickUpTime: {
        type: DataTypes.STRING(100)
    },
    dropTime: {
        type: DataTypes.STRING(100)
    },
    description: {
        type: DataTypes.TEXT
    },
    canceledBy: {
        type: DataTypes.INTEGER
    },
    totalKms: {
        type: DataTypes.FLOAT
    },
    totalTimeInMinute: {
        type: DataTypes.FLOAT
    },
    waitingTime: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    bookedHours: {
        type: DataTypes.INTEGER
    },
    tripType: {
        type: DataTypes.STRING(20)
    },
    twoMinuteBefore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    tenMinuteBefore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    thirtyMinuteBefore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    oneHoursBefore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    modelName: 'trip',
    tableName: 'trip',
    sequelize,
    timestamps: true
});


export default Trip;