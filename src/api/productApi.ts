import axios, { AxiosResponse } from "axios";
import { Project } from "./type";

const API_BASE_URL = "http://localhost:3500/projects";

export const fetchProjectList = async (): Promise<Project[]> => {
  const response: AxiosResponse<Project[]> = await axios.get(API_BASE_URL);
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
  return response.data;
};
