export default (connection, Sequelize) => connection.define('winners', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  nameFirst: { type: Sequelize.STRING, allowNull: false },
  nameLast: { type: Sequelize.STRING, allowNull: false },
})
