import { createContext, useState, useEffect, useContext } from "react";
import { Project } from "../api/type";
import { fetchProjectList } from "../api/productApi";
import { useSnackbar } from "./SnackbarContext";

type ProjectContextType = {
  projectList: Project[];
  fetchProjects: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const { showSnackbar } = useSnackbar();

  const fetchProjects = async () => {
    try {
      const data = await fetchProjectList();
      setProjectList(data);
    } catch (error) {
      showSnackbar("Error fetching project list", "error");
    }
  };

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
