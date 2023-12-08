import { pool } from "../db/connection.js";

const getById = async (id) => {
  const query = "SELECT * FROM history WHERE id = $1 AND hide_element = false";

  const result = await pool.query(query, [id]);
  return result;
};

const getByVideoId = async (id) => {
  const query =
    "SELECT * FROM history WHERE video_id = $1 AND hide_element = false";

  const result = await pool.query(query, [id]);
  return result;
};

const getByUserId = async (id) => {
  const query =
    "SELECT * FROM history WHERE user_id = $1 AND hide_element = false";

  const result = await pool.query(query, [id]);
  return result;
};

const create = async ({ video_id, user_id }) => {
  const query =
    "INSERT INTO history (video_id, user_id) VALUES ($1, $2) RETURNING *";

  const result = await pool.query(query, [video_id, user_id]);

  return result;
};

const remove = async (id) => {
  const query =
    "UPDATE history SET hide_element = true WHERE id = $1 RETURNING *";

  const result = await pool.query(query, [id]);

  return result;
};

export const historyModel = {
  getById,
  getByVideoId,
  getByUserId,
  create,
  remove,
};
