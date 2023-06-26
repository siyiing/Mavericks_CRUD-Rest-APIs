'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [{
      uuid: '496aedf2-4545-482f-9487-3e0a38394a11',
      name: 'John Doe',
      salary: 1,
      department: 'HR',
      createdAt: '2023-06-23T03:16:10.260Z', 
      updatedAt: '2023-06-23T03:16:10.260Z'
   },
   {
    uuid: '6f03a657-e911-42d6-89b3-ba150e5078f1',
    name: 'Jane Doe',
    salary: 1,
    department: 'PS',
    createdAt: '2023-06-23T03:18:58.245Z',  
    updatedAt: '2023-06-23T03:18:58.245Z'
 }
], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
