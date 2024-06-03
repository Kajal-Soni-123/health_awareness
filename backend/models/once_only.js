'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class once_only extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  once_only.init({
    medi_date: DataTypes.DATEONLY,
    medi_time: DataTypes.TIME,
    user_id: DataTypes.INTEGER,
    medi_name: DataTypes.STRING,
    medi_desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'once_only',
    paranoid:true
  });
  return once_only;
};