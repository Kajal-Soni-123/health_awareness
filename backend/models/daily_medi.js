'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daily_medi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daily_medi.init({
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    medi_time: DataTypes.TIME,
    medi_name: DataTypes.STRING,
    medi_desc: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'daily_medi',
    paranoid:true
  });
  return daily_medi;
};