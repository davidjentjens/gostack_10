module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('recipients', 'email', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    }),
  down: queryInterface => queryInterface.removeColumn('recipients', 'email'),
};
