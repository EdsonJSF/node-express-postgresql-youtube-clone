import { videosModel } from "../models/videos.model.js";

export const validateVideoId = async (id = "") => {
  const { rows: data } = await videosModel.getById(id);

  if (data.length === 0) {
    throw new Error(`Video ${id} does not exist`);
  }
};

export const validateVideoSlug = async (slug = "") => {
  const { rows: data } = await videosModel.getBySlug(slug);

  if (data.length === 0) {
    throw new Error(`Video slug ${slug} does not exist`);
  }
};
export const validateVideoUserId = async (id = "") => {
  const { rows: data } = await videosModel.getByUserId(id);

  if (data.length === 0) {
    throw new Error(`Video with user ${id} does not exist`);
  }
};
