import { pool } from "../db/connection.js";

const getAll = async () => {
  const result = await pool.query("SELECT * FROM users WHERE active = true");
  return result;
};

const getById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";

  const result = await pool.query(query, [id]);

  return result;
};

const getByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";

  const result = await pool.query(query, [email]);

  return result;
};

const create = async ({ full_name, email, password, avatar, birthdate }) => {
  const query =
    "INSERT INTO users (full_name, email, password, avatar, birthdate) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  const result = await pool.query(query, [
    full_name,
    email,
    password,
    avatar,
    birthdate,
  ]);

  return result;
};

const update = async ({ full_name, avatar, birthdate, id }) => {
  const query =
    "UPDATE users SET full_name = $1, avatar = $2, birthdate = $3, active = true WHERE id = $4 RETURNING *";

  const result = await pool.query(query, [full_name, avatar, birthdate, id]);

  return result;
};

const remove = async (id) => {
  const query = "UPDATE users SET active = false WHERE id = $1 RETURNING *";

  const result = await pool.query(query, [id]);

  return result;
};

export const usersModel = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove,
};
