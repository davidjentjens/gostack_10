module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('recipients', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('recipients', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]),
  down: queryInterface => [
    queryInterface.removeColumn('recipients', 'created_at'),
    queryInterface.removeColumn('recipients', 'updated_at'),
  ],
};
