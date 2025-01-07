import CustomTable from "../../components/table";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants/routes";
import { useProjectContext } from "../../context/ProjectContext";

const ProjectList = () => {
  const navigate = useNavigate();
  const { projectList } = useProjectContext();
  const columns = [
    { id: "id", label: "Project ID" },
    { id: "projectName", label: "Project Name", width: "250px" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "projectManager", label: "Project Manager" },
  ];

  const handleEdit = (projectId: string) => {
    navigate(`${routes.projectDetails}/${projectId}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTable
        columns={columns}
        rows={projectList}
        handleEdit={handleEdit}
      />
    </Box>
  );
};

export default ProjectList;
