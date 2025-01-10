import Table from "../../components/table";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants/routes";
import { useProjectContext } from "../../context/ProjectContext";
import { projectListColumns } from "./constant";
import Button from "../../components/button";
import { ListContainer } from "./style";
import { useCallback } from "react";

const ProjectList = () => {
  const navigate = useNavigate();
  const { projectList, handleAddToFavourite, isLoading, isFavoriteLoading } =
    useProjectContext();

  const handleEdit = useCallback((projectId: string, action: string) => {
    if (action !== "edit") {
      navigate(`${routes.projectDetails}/${projectId}`);
      return;
    }

    navigate(`${routes.projectDetails}/${projectId}/edit`);
  }, []);

  return (
    <ListContainer>
      <Button
        label={"Create Project"}
        variant="contained"
        style={{ alignSelf: "flex-end" }}
        onClick={() => navigate(`${routes.projectCreate}`)}
      />
      <Table
        columns={projectListColumns}
        rows={projectList}
        handleEdit={handleEdit}
        handleAddToFavourite={handleAddToFavourite}
        isLoading={isLoading}
        isFavoriteLoading={isFavoriteLoading}
      />
    </ListContainer>
  );
};

export default ProjectList;
