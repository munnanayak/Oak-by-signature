'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('bookings', 'roomId');
  },

  down: async (queryInterface, Sequelize) => {
    // If you want to undo this migration, you can add the column back
    await queryInterface.addColumn('bookings', 'roomId', {
      type: Sequelize.INTEGER,
      allowNull: false, // or true depending on your needs
    });
  }
};
