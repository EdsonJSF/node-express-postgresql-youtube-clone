import { request, response } from "express";

import { videosModel } from "../models/videos.model.js";

const getAll = async (req, res = response) => {
  try {
    const { rows: data } = await videosModel.getAll();

    return res.json({
      data,
      message: "All data collected",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "no data collected",
    });
  }
};

const getById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await videosModel.getById(id);

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

const getBySlug = async (req = request, res = response) => {
  const { slug } = req.params;

  try {
    const { rows: data } = await videosModel.getBySlug(slug);

    return res.json({
      data,
      message: "All data collected",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `no data collected with slug: ${slug}`,
    });
  }
};

const getByUserId = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await videosModel.getByUserId();

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
  const { user_id, link, title, description, poster, slug } = req.body;

  try {
    const { rows: data } = await videosModel.create({
      user_id,
      link,
      title,
      description,
      poster,
      slug,
    });

    return res.json({
      data,
      message: "Video was inserted",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "no data inserted",
    });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { link, title, description, poster, slug } = req.body;

  try {
    const { rows: data } = await videosModel.update({
      id,
      link,
      title,
      description,
      poster,
      slug,
    });

    return res.json({
      data,
      message: "Video was update",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "no data update",
    });
  }
};

const remove = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await videosModel.remove(id);

    return res.json({
      data,
      message: "Video was delete",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `Error delteing video id: ${id}`,
    });
  }
};

export const videosControllers = {
  getAll,
  getById,
  getBySlug,
  getByUserId,
  create,
  update,
  remove,
};
