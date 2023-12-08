import { request, response } from "express";

import { likesModel } from "../models/likes.model.js";

const getByVideoId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await likesModel.getByVideoId(id);

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
    const { rows: data } = await likesModel.getByUserId(id);

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
  const { video_id, like } = req.body;
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { id: user_id } = user;

  try {
    const { rows: data } = await likesModel.create({ video_id, user_id, like });

    return res.json({
      data,
      message: "Like was changed",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "Error updating like",
    });
  }
};

const remove = async (req = request, res = response) => {
  const { id: video_id } = req.params;
  const { id: user_id } = req.getUser;

  try {
    const { rows: data } = await likesModel.remove({ video_id, user_id });

    return res.json({
      data,
      message: "Like was delete",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `Error delteing like`,
    });
  }
};

export const likesControllers = {
  getByVideoId,
  getByUserId,
  create,
  remove,
};
