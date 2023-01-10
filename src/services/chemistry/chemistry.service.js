import { buildQueryString } from "../../helpers";
import { createInstance, handleError } from "../base";

const services = createInstance("/");
const baseUrl = "/chemistry";

export const getMenu = async (filter) => {
  try {
    let query = `${baseUrl}/menu`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getMaterial = async (filter) => {
  try {
    let query = `${baseUrl}/get-material`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getDocument = async (filter) => {
  try {
    let query = `${baseUrl}/get-ref-doc`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
