const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Technologies", deps: []
 * createTable() => "Users", deps: []
 * createTable() => "Connections", deps: [Users, Users]
 * createTable() => "UserProfiles", deps: [Users]
 * createTable() => "UserTechnologies", deps: [Technologies, Users]
 *
 */

const info = {
  revision: 1,
  name: "init",
  created: "2025-09-07T23:15:20.564Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Technologies",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          allowNull: false,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        github_id: {
          type: Sequelize.BIGINT,
          field: "github_id",
          unique: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          field: "username",
          unique: true,
          allowNull: false,
        },
        node_id: { type: Sequelize.STRING, field: "node_id" },
        profile_url: { type: Sequelize.TEXT, field: "profile_url" },
        html_url: { type: Sequelize.TEXT, field: "html_url" },
        avatar_url: { type: Sequelize.TEXT, field: "avatar_url" },
        twitter_username: { type: Sequelize.STRING, field: "twitter_username" },
        name: { type: Sequelize.STRING, field: "name" },
        company: { type: Sequelize.STRING, field: "company" },
        bio: { type: Sequelize.TEXT, field: "bio" },
        email: { type: Sequelize.STRING, field: "email" },
        blog: { type: Sequelize.TEXT, field: "blog" },
        followers_count: {
          type: Sequelize.INTEGER,
          field: "followers_count",
          defaultValue: 0,
        },
        following_count: {
          type: Sequelize.INTEGER,
          field: "following_count",
          defaultValue: 0,
        },
        repos_url: { type: Sequelize.TEXT, field: "repos_url" },
        followers_url: { type: Sequelize.TEXT, field: "followers_url" },
        following_url: { type: Sequelize.TEXT, field: "following_url" },
        github_updated_at: { type: Sequelize.DATE, field: "github_updated_at" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Connections",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          field: "status",
          defaultValue: "pending",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        requester_id: {
          type: Sequelize.INTEGER,
          field: "requester_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
        receiver_id: {
          type: Sequelize.INTEGER,
          field: "receiver_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "UserProfiles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        linkedin_url: { type: Sequelize.TEXT, field: "linkedin_url" },
        website: { type: Sequelize.TEXT, field: "website" },
        location: { type: Sequelize.STRING, field: "location" },
        years_of_experience: {
          type: Sequelize.INTEGER,
          field: "years_of_experience",
        },
        custom_bio: { type: Sequelize.TEXT, field: "custom_bio" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "UserTechnologies",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        technology_id: {
          type: Sequelize.INTEGER,
          field: "technology_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Technologies", key: "id" },
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Connections", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Technologies", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserProfiles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserTechnologies", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
