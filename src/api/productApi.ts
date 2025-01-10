import axios, { AxiosResponse } from "axios";
import { Project } from "./type";

const API_BASE_URL = "http://localhost:3500/projects";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProjectList = async (): Promise<Project[]> => {
  const response: AxiosResponse<Project[]> = await axios.get(API_BASE_URL);
  await delay(2000);
  return response.data;
};

export const fetchProjectDetails = async (id: string): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.get(
    `${API_BASE_URL}/${id}`
  );
  return response.data;
};

export const updateProjectDetails = async (
  id: string,
  projectData: Project
): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.patch(
    `${API_BASE_URL}/${id}`,
    projectData
  );
  await delay(2000);
  return response.data;
};

export const updateFavoriteProject = async (
  id: string,
  projectData: Project
): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.patch(
    `${API_BASE_URL}/${id}`,
    projectData
  );
  return response.data;
};

export const createProject = async (projectData: Project): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.post(
    API_BASE_URL,
    projectData
  );
  await delay(2000);
  return response.data;
};
