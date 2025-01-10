import { createContext, useState, useEffect, useContext } from "react";
import { Project } from "../api/type";
import { fetchProjectList, updateProjectDetails } from "../api/productApi";
import { useSnackbar } from "./SnackbarContext";

type ProjectContextType = {
  projectList: Project[];
  fetchProjects: () => void;
  handleAddToFavourite: (id: string) => void;
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

  const handleAddToFavourite = async (id: string) => {
    const project = projectList?.find((project) => project?.id === id);
    try {
      await updateProjectDetails(id, {
        ...project,
        isFavourite: !project?.isFavourite,
      });
      showSnackbar("Added to Favourite", "success");
      fetchProjects();
    } catch (error) {
      showSnackbar("Error adding to favourite", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projectList, fetchProjects, handleAddToFavourite }}
    >
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
