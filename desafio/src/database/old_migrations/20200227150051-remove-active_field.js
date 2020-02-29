module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('couriers', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }),
  down: queryInterface => queryInterface.addColumn('couriers', 'active'),
};
