import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class LanguageModel extends Model {
    public id: number;
    public uuid: string;
    public language: string;
}

LanguageModel.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    language: {
        type: DataTypes.STRING(50),
        unique: true
    }
}, {
    modelName: 'languages',
    tableName: 'languages',
    sequelize,
    timestamps: true
});

export default LanguageModel;
