import { request, response } from "express";

import { commentsModel } from "../models/comments.model.js";

const getByVideoId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await commentsModel.getByVideoId(id);

    return res.json({
      data,
      message: "All data collected",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `no data collected with video id: ${id}`,
    });
  }
};

const getByUserId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await commentsModel.getByUserId(id);

    return res.json({
      data,
      message: "All data collected",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `no data collected with user id: ${id}`,
    });
  }
};

const create = async (req = request, res = response) => {
  const { video_id, title, body } = req.body;
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { id: user_id } = user;

  try {
    const { rows: data } = await commentsModel.create({
      video_id,
      user_id,
      title,
      body,
    });

    return res.json({
      data,
      message: "Comment was create",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "Error creting comment",
    });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const { rows: data } = await commentsModel.update({ title, body, id });

    return res.json({
      data,
      message: "Comment was changed",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "Error updating comment",
    });
  }
};

const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await commentsModel.remove(id);

    return res.json({
      data,
      message: "Comment was delete",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `Error delteing comment`,
    });
  }
};

export const commentsControllers = {
  getByVideoId,
  getByUserId,
  create,
  update,
  remove,
};
