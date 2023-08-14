import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class Ride extends Model {
    public id: number;
}

Ride.init({
    code: {
        type: DataTypes.STRING
    },    
    ride_type: {
        type: DataTypes.STRING
    },
    ride_type_desc: {
        type: DataTypes.STRING
    }    
}, {
    modelName: 'ride',
    tableName: 'ridetype',
    sequelize,
    timestamps: true
});


export default Ride;