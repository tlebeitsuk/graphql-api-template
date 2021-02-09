
export async function up (knex) {

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('user', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('email', 100).notNullable().unique()
    table.string('password').notNullable()
    table.string('name', 100).notNullable()
    table.boolean('verified').defaultTo(false)
    table.timestamps(true, true)
  })
}

export function down (knex) {
  return knex.schema.dropTable('user')
}
