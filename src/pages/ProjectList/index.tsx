import CustomTable from "../../components/table";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants/routes";
import { useProjectContext } from "../../context/ProjectContext";
import { projectListColumns } from "./constant";

const ProjectList = () => {
  const navigate = useNavigate();
  const { projectList } = useProjectContext();

  const handleEdit = (projectId: string) => {
    navigate(`${routes.projectDetails}/${projectId}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTable
        columns={projectListColumns}
        rows={projectList}
        handleEdit={handleEdit}
      />
    </Box>
  );
};

export default ProjectList;
