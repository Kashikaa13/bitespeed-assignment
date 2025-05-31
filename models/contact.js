const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure db.js exists in config/

const Contact = sequelize.define('Contact', {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  linkPrecedence: {
    type: DataTypes.ENUM('primary', 'secondary'),
    defaultValue: 'primary',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'Contacts',
  timestamps: true,
  paranoid: true, // enables soft delete (deletedAt)
});

module.exports = Contact;
