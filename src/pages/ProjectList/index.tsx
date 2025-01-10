import CustomTable from "../../components/table";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants/routes";
import { useProjectContext } from "../../context/ProjectContext";
import { projectListColumns } from "./constant";
import Button from "../../components/button";
import { ListContainer } from "./style";

const ProjectList = () => {
  const navigate = useNavigate();
  const { projectList, handleAddToFavourite, isLoading } = useProjectContext();

  const handleEdit = (projectId: string, action: string) => {
    action === "edit"
      ? navigate(`${routes.projectDetails}/${projectId}/edit`)
      : navigate(`${routes.projectDetails}/${projectId}`);
  };

  return (
    <ListContainer>
      <Button
        label={"Create Project"}
        variant="contained"
        style={{ alignSelf: "flex-end" }}
        onClick={() => navigate(`${routes.projectCreate}`)}
      />
      <CustomTable
        columns={projectListColumns}
        rows={projectList}
        handleEdit={handleEdit}
        handleAddToFavourite={handleAddToFavourite}
        isLoading={isLoading}
      />
    </ListContainer>
  );
};

export default ProjectList;
