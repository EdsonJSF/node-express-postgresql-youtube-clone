import { usersModel } from "../models/users.model.js";

export const validateUserId = async (id = "") => {
  const { rows: data } = await usersModel.getById(id);

  if (data.length === 0) {
    throw new Error(`User ${id} does not exist`);
  } else if (!data[0].active) {
    throw new Error(`User ${id} was deleted`);
  }
};

export const validateUserEmail = async (email = "") => {
  const { rows: data } = await usersModel.getByEmail(email);

  if (data.length !== 0) {
    throw new Error(`Email ${email} already exist`);
  }
};
