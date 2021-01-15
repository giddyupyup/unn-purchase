'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     const transaction = await queryInterface.sequelize.transaction();
     try {
       await queryInterface.addColumn(
         'Synaps',
         'step',
         {
           type: Sequelize.STRING
         },
         {
           after: 'session_id',
           transaction
         }
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
      await queryInterface.removeColumn( 'Synaps', 'step', { transaction } );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};