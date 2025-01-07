import { createContext, useState, useEffect, useContext } from "react";
import { Project } from "../api/type";
import React = require("react");
import { fetchProjectList } from "../api/productApi";

type ProjectContextType = {
  projectList: Project[];
  fetchProjects: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const fetchProjects = () =>
    fetchProjectList()
      .then((data) => setProjectList(data))
      .catch((error) => console.error("Error fetching project list:", error));

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projectList, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
