module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('couriers', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }),
  down: queryInterface => queryInterface.removeColumn('couriers', 'active'),
};
