import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../api/productApi";
import { Project } from "../../api/type";
import Button from "../../components/button";
import Input from "../../components/input";
import TextArea from "../../components/textarea";
import { useProjectContext } from "../../context/ProjectContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { routes } from "../../utils/constants/routes";
import { Container, DescriptionBox, Footer } from "./style";

const initialProjectDetails: Project = {
  id: "",
  projectName: "",
  startDate: "",
  endDate: "",
  projectManager: "",
  description: "",
  isFavourite: false,
};

const ProjectCreate = () => {
  const [projectDetails, setProjectDetails] = useState<Project>(
    initialProjectDetails
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    id: false,
    projectName: false,
    description: false,
    startDate: false,
    endDate: false,
    projectManager: false,
  });

  const { projectList, fetchProjects } = useProjectContext();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const validateForm = () => {
    const newErrors = {
      id: !projectDetails?.id?.trim(),
      projectName: !projectDetails?.projectName?.trim(),
      description: !projectDetails?.description?.trim(),
      startDate: !projectDetails?.startDate?.trim(),
      endDate: !projectDetails?.endDate?.trim(),
      projectManager: !projectDetails?.projectManager?.trim(),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const createNewProject = async () => {
    if (!validateForm()) {
      showSnackbar("Please fill in all required fields", "error");
      return;
    }

    if (projectDetails.endDate < projectDetails.startDate) {
      showSnackbar("Please choose appropriate dates", "error");
      return;
    }
    if (projectList?.some((project) => project.id === projectDetails.id)) {
      showSnackbar("Project ID already exists", "error");
      return;
    }
    setIsLoading(true);
    try {
      await createProject(projectDetails);
      showSnackbar("Project created successfully", "success");
      navigate(`${routes.projectList}`);
      await fetchProjects();
      setProjectDetails(initialProjectDetails);
    } catch (error) {
      showSnackbar("Error creating project", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  return (
    <Container>
      <Input
        name="id"
        label={"Project ID"}
        value={projectDetails?.id}
        onChange={handleChange}
        error={errors.id}
        helperText={errors.id ? "Project ID is required" : ""}
        slotProps={{ htmlInput: { "data-testid": "id" } }}
      />
      <Input
        name="projectName"
        label={"Project Name"}
        value={projectDetails?.projectName}
        onChange={handleChange}
        error={errors.projectName}
        helperText={errors.projectName ? "Project Name is required" : ""}
        slotProps={{ htmlInput: { "data-testid": "projectName" } }}
      />
      <DescriptionBox>
        <TextArea
          label={"Description"}
          name="description"
          value={projectDetails?.description}
          onChange={handleChange}
          minRows={10}
          data-testid="description"
        />
      </DescriptionBox>
      <Input
        name="startDate"
        label={"Start Date"}
        value={projectDetails?.startDate}
        onChange={handleChange}
        type="date"
        error={errors.startDate}
        helperText={errors.startDate ? "Start Date is required" : ""}
        slotProps={{ htmlInput: { "data-testid": "startDate" } }}
      />

      <Input
        name="endDate"
        label={"End Date"}
        value={projectDetails?.endDate}
        onChange={handleChange}
        type="date"
        error={errors.endDate}
        helperText={errors.endDate ? "End Date is required" : ""}
        slotProps={{ htmlInput: { "data-testid": "endDate" } }}
      />

      <Input
        name="projectManager"
        label={"Project Manager"}
        value={projectDetails?.projectManager}
        onChange={handleChange}
        error={errors.projectManager}
        helperText={errors.projectManager ? "Project Manager is required" : ""}
        slotProps={{ htmlInput: { "data-testid": "projectManager" } }}
      />

      <Footer>
        <Button
          label={"Create"}
          variant="contained"
          onClick={createNewProject}
          loading={isLoading}
        />
      </Footer>
    </Container>
  );
};

export default ProjectCreate;
