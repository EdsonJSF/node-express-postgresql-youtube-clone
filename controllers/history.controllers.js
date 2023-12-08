import { request, response } from "express";

import { historyModel } from "../models/history.model.js";

const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await historyModel.getById(id);

    return res.json({
      data,
      message: "All data collected",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `no data collected with id: ${id}`,
    });
  }
};

const getByVideoId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await historyModel.getByVideoId(id);

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
    const { rows: data } = await historyModel.getByUserId(id);

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
  const { video_id } = req.body;
  const user = req.getUser;

  if (!user) {
    return res.status(500).json({
      msg: "Verify the token first",
      errors: [],
    });
  }

  const { id: user_id } = user;

  try {
    const { rows: data } = await historyModel.create({ video_id, user_id });

    return res.json({
      data,
      message: "History was create",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "Error creting history",
    });
  }
};

const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await historyModel.remove(id);

    return res.json({
      data,
      message: "History was delete",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `Error delteing history`,
    });
  }
};

export const historyControllers = {
  getById,
  getByVideoId,
  getByUserId,
  create,
  remove,
};
