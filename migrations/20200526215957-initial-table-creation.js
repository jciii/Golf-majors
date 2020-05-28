module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER })
    */
    await queryInterface.createTable('winners', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nameFirst: { type: Sequelize.STRING, allowNull: false },
      nameLast: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE }
    })

    await queryInterface.createTable('majors', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      major: {
        type: Sequelize.STRING, allowNull: false
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE }
    })

    await queryInterface.createTable('years', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      year: { type: Sequelize.INTEGER, allowNull: false },
      course: { type: Sequelize.STRING, allowNull: false },
      score: { type: Sequelize.INTEGER, allowNull: false },
      winnerId: { type: Sequelize.INTEGER, references: { model: 'winners', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE }
    })

    return queryInterface.createTable('majorWinners', {
      majorId: { type: Sequelize.INTEGER, references: { model: 'majors', key: 'id' } },
      yearId: { type: Sequelize.INTEGER, references: { model: 'years', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE, },
    })
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users')
    */
    await queryInterface.dropTable('years')
    await queryInterface.dropTable('majorWinners')
    await queryInterface.dropTable('winners')

    return queryInterface.dropTable('majors')
  }
}
