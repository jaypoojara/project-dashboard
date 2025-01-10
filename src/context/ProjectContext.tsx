import { createContext, useState, useEffect, useContext } from "react";
import { Project } from "../api/type";
import { fetchProjectList, updateProjectDetails } from "../api/productApi";
import { useSnackbar } from "./SnackbarContext";

type ProjectContextType = {
  projectList: Project[];
  fetchProjects: () => void;
  handleAddToFavourite: (id: string) => void;
  isLoading: boolean;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProjectList();
      setIsLoading(false);
      setProjectList(data);
    } catch (error) {
      setIsLoading(false);
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
      value={{ projectList, fetchProjects, handleAddToFavourite, isLoading }}
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
