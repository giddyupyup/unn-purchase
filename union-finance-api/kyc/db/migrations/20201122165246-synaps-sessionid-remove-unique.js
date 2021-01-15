'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
     try {
       await queryInterface.changeColumn(
         'Synaps',
         'session_id',
         {
           type: Sequelize.UUID,
           allowNull: false
         },
         { transaction }
       );
       await queryInterface.removeIndex(
        'Synaps',
        'session_id',
        { transaction }
      );
       await transaction.commit();
     } catch (error) {
       await transaction.rollback();
       throw error;
     }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn( 'Synaps', 'session_id' );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
