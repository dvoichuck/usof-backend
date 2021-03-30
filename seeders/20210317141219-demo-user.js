module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'Flygames',
      full_name: 'Dima',
      email: 'dima20030318@ukr.net',
      password: "123456",
      role: 'admin'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};