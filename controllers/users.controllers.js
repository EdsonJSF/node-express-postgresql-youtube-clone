import { response, request } from "express";
import bcryptjs from "bcryptjs";

import { usersModel } from "../models/users.model.js";

const getAll = async (req = request, res = response) => {
  try {
    const { rows: data } = await usersModel.getAll();

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
    const { rows: data } = await usersModel.getById(id);

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

const create = async (req = request, res = response) => {
  const { full_name, email, password, avatar = "", birthdate } = req.body;

  // Encrypt pass
  const salt = bcryptjs.genSaltSync();
  const passwordEncrypt = bcryptjs.hashSync(password, salt);

  try {
    const { rows: data } = await usersModel.create({
      full_name,
      email,
      password: passwordEncrypt,
      avatar,
      birthdate,
    });

    return res.json({
      data,
      message: "User was created",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `Error creating user ${full_name}`,
    });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { full_name, avatar, birthdate } = req.body;

  try {
    const { rows: data } = await usersModel.update({
      full_name,
      avatar,
      birthdate,
      id,
    });

    return res.json({
      data,
      message: "User was update",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: `Error updating user ${full_name}`,
    });
  }
};

const remove = async (req, res = response) => {
  const { id } = req.params;

  try {
    const { rows: data } = await usersModel.remove(id);

    return res.json({
      data,
      message: "User was delete",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      data: [],
      message: "Error delete user",
    });
  }
};

export const usersControllers = {
  getAll,
  getById,
  create,
  update,
  remove,
};
