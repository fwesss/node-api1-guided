const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const find = () => db('users');

const findById = (id) =>
  db('users')
    .where({ id: Number(id) })
    .first();

const insert = async (user) => {
  const ids = await db('users').insert(user);
  return { id: ids[0] };
};

const update = (id, user) =>
  db('users')
    .where('id', Number(id))
    .update(user);

const remove = (id) =>
  db('users')
    .where('id', Number(id))
    .del();

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};
