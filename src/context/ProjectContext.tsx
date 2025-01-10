import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchProjectList, updateFavoriteProject } from "../api/productApi";
import { Project } from "../api/type";
import { useSnackbar } from "./SnackbarContext";

type ProjectContextType = {
  projectList: Project[];
  fetchProjects: () => Promise<void>;
  handleAddToFavourite: (id: string) => void;
  isLoading: boolean;
  isFavoriteLoading?: string;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(undefined);
  const { showSnackbar } = useSnackbar();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchProjectList();
      setProjectList(data);
    } catch (error) {
      showSnackbar("Error fetching project list", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddToFavourite = useCallback(
    async (id: string) => {
      const project = projectList?.find((project) => project?.id === id);
      setIsFavoriteLoading(id);
      try {
        await updateFavoriteProject(id, {
          ...project,
          isFavourite: !project?.isFavourite,
        });
        const newProjectList = await fetchProjectList();
        setProjectList(newProjectList);
        showSnackbar("Added to Favourite", "success");
      } catch (error) {
        showSnackbar("Error adding to favourite", error);
      } finally {
        setIsFavoriteLoading(undefined);
      }
    },
    [projectList]
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projectList,
        fetchProjects,
        handleAddToFavourite,
        isLoading,
        isFavoriteLoading,
      }}
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
