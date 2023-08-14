import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class PaymentTypeModel extends Model {
    public id: number;
    public uuid: string;
    public name: string;
}

PaymentTypeModel.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    name: {
        type: DataTypes.STRING(150),
    },
    status: {
        type: DataTypes.INTEGER,
    }
}, {
    modelName: 'paymentype',
    tableName: 'paymenttype',
    sequelize,
    timestamps: true
});

export default PaymentTypeModel;
