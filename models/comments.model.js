import { pool } from "../db/connection.js";

const getById = async (id) => {
  const query = "SELECT * FROM comments WHERE id = $1 AND hide_element = false";

  const result = await pool.query(query, [id]);
  return result;
};

const getByVideoId = async (id) => {
  const query =
    "SELECT * FROM comments WHERE video_id = $1 AND hide_element = false";

  const result = await pool.query(query, [id]);
  return result;
};

const getByUserId = async (id) => {
  const query =
    "SELECT * FROM comments WHERE user_id = $1 AND hide_element = false";

  const result = await pool.query(query, [id]);
  return result;
};

const create = async ({ video_id, user_id, title, body }) => {
  const query =
    "INSERT INTO comments (video_id, user_id, title, body) VALUES ($1, $2, $3, $4) RETURNING *";

  const result = await pool.query(query, [video_id, user_id, title, body]);

  return result;
};

const update = async ({ title, body, id }) => {
  const query =
    "UPDATE comments SET title = $1, body = $2 WHERE id = $3 RETURNING *";

  const result = await pool.query(query, [title, body, id]);

  return result;
};

const remove = async (id) => {
  const query =
    "UPDATE comments SET hide_element = true WHERE id = $1 RETURNING *";

  const result = await pool.query(query, [id]);

  return result;
};

export const commentsModel = {
  getById,
  getByVideoId,
  getByUserId,
  create,
  update,
  remove,
};
