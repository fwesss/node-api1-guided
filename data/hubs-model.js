import knex from 'knex';

import knexfile from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const knexConfiguration = knexfile[environment];
const db = knex(knexConfiguration);

export async function find(query = {}) {
  const { page = 1, limit = 10, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  const rows = await db('hubs')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

export function findById(id) {
  return db('hubs')
    .where({ id })
    .first();
}

export async function add(hub) {
  const [id] = await db('hubs').insert(hub, 'id');

  return findById(id);
}

export async function remove(id) {
  const removed = await findById(id);

  await db('hubs')
    .where({ id })
    .del();

  return removed;
}

export async function update(id, changes) {
  await db('hubs')
    .where({ id })
    .update(changes);

  return findById(id);
}
