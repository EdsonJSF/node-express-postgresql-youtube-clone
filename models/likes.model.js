import { pool } from "../db/connection.js";

const getByVideoId = async (id) => {
  const query = "SELECT * FROM likes WHERE video_id = $1";

  const result = await pool.query(query, [id]);
  return result;
};

const getByUserId = async (id) => {
  const query = "SELECT * FROM likes WHERE user_id = $1";

  const result = await pool.query(query, [id]);
  return result;
};

const getByVideoAndUserId = async ({ video_id, user_id }) => {
  const query = "SELECT * FROM likes WHERE video_id = $1 AND user_id = $2";

  const result = await pool.query(query, [video_id, user_id]);

  return result;
};

const update = async ({ video_id, user_id, like }) => {
  const query =
    "UPDATE likes SET status = $1 WHERE video_id = $2 AND user_id = $3 RETURNING *";

  const result = await pool.query(query, [like, video_id, user_id]);

  return result;
};

const create = async ({ video_id, user_id, like }) => {
  const { rows } = await getByVideoAndUserId({ video_id, user_id });

  if (rows.length > 0) {
    return update({ video_id, user_id, like });
  }

  const query =
    "INSERT INTO likes (video_id, user_id, status) VALUES ($1, $2, $3) RETURNING *";

  const result = await pool.query(query, [video_id, user_id, like]);

  return result;
};

const remove = async ({ video_id, user_id }) => {
  const query =
    "DELETE FROM likes WHERE video_id = $1 AND user_id = $2 RETURNING *";

  const result = await pool.query(query, [video_id, user_id]);

  return result;
};

export const likesModel = {
  getByVideoId,
  getByUserId,
  getByVideoAndUserId,
  create,
  remove,
};
