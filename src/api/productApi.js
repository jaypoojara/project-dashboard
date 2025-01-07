import axios from "axios";

const API_BASE_URL = "http://localhost:3500/projects";

export const fetchProjectList = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching project list:", error);
    throw error;
  }
};

export const fetchProjectDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

export const updateProjectDetails = async (id, projectData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error("Error updating project details:", error);
    throw error;
  }
};
