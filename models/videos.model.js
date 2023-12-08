import { pool } from "../db/connection.js";

const getAll = async () => {
  const result = await pool.query("SELECT * FROM videos");
  return result;
};

const getById = async (id) => {
  const query = "SELECT * FROM videos WHERE id = $1";

  const result = await pool.query(query, [id]);

  return result;
};

const getBySlug = async (slug) => {
  const query = "SELECT * FROM videos WHERE slug = $1";

  const result = await pool.query(query, [slug]);
  return result;
};

const getByUserId = async (id) => {
  const query = "SELECT * FROM videos WHERE user_id = $1";

  const result = await pool.query(query, [id]);
  return result;
};

const create = async ({ user_id, link, title, description, poster, slug }) => {
  const query =
    "INSERT INTO videos (user_id, link, title, description, poster, slug) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

  const result = await pool.query(query, [
    user_id,
    link,
    title,
    description,
    poster,
    slug,
  ]);

  return result;
};

const update = async ({ id, link, title, description, poster }) => {
  const query =
    "UPDATE videos SET link = $1, title = $2, description = $3, poster = $4 WHERE id = $5 RETURNING *";

  const result = await pool.query(query, [
    link,
    title,
    description,
    poster,
    id,
  ]);

  return result;
};

const remove = async (id) => {
  const query = "DELETE FROM videos WHERE id = $1 RETURNING *";

  const result = await pool.query(query, [id]);

  return result;
};

export const videosModel = {
  getAll,
  getById,
  getBySlug,
  getByUserId,
  create,
  update,
  remove,
};
