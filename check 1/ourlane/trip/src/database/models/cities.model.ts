import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class CityModel extends Model {
    public id: number;
    public uuid: string;
    public name: string;
}

CityModel.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        unique: true
    },
    country: {
        type: DataTypes.STRING(50),
    },
    countryCode: {
        type: DataTypes.STRING(20),
    }
}, {
    modelName: 'cities',
    tableName: 'cities',
    sequelize,
    timestamps: true
});

export default CityModel;
