const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(repos_url) => "Users"
 * changeColumn(gists_url) => "Users"
 * changeColumn(starred_url) => "Users"
 *
 */

const info = {
  revision: 6,
  name: "update-user-feilds",
  created: "2025-09-08T22:06:17.185Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "Users",
      "repos_url",
      { type: Sequelize.TEXT, field: "repos_url" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Users",
      "gists_url",
      { type: Sequelize.TEXT, field: "gists_url" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Users",
      "starred_url",
      { type: Sequelize.TEXT, field: "starred_url" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "Users",
      "repos_url",
      { type: Sequelize.STRING, field: "repos_url" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Users",
      "gists_url",
      { type: Sequelize.STRING, field: "gists_url" },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Users",
      "starred_url",
      { type: Sequelize.STRING, field: "starred_url" },
      { transaction },
    ],
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
