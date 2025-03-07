import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProjectDetails,
  updateProjectDetails,
} from "../../api/productApi";
import Button from "../../components/button";
import Input from "../../components/input";
import { useSnackbar } from "../../context/SnackbarContext";
import { routes } from "../../utils/constants/routes";
import { Project } from "../../api/type";
import { useProjectContext } from "../../context/ProjectContext";
import TextArea from "../../components/textarea";
import { Container, DescriptionBox, Footer } from "./style";

const ProjectEdit = () => {
  const [projectDetails, setProjectDetails] = useState<Project>();
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { fetchProjects } = useProjectContext();

  const getProductDetailsById = async (id: string) => {
    try {
      const data = await fetchProjectDetails(id);
      setProjectDetails(data);
    } catch (error) {
      showSnackbar("Error fetching project details:", "error");
    }
  };

  useEffect(() => {
    projectId && getProductDetailsById(projectId);
  }, []);

  const updateProductDetails = async () => {
    if (projectDetails.endDate < projectDetails.startDate) {
      showSnackbar("Please choose appropriate dates", "error");
      return;
    }
    setIsLoading(true);
    try {
      await updateProjectDetails(projectId, projectDetails);
      showSnackbar("Details updated successfully", "success");
      await fetchProjects();
      navigate(`${routes.projectList}`);
    } catch (error) {
      showSnackbar("Error updating project:", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e?.target;
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Box display={"flex"} gap={"16px"}>
        <Typography width={150} textAlign={"end"}>
          Project ID
        </Typography>
        <Typography>{projectDetails?.id}</Typography>
      </Box>
      <Input
        name="projectName"
        label={"Project Name"}
        value={projectDetails?.projectName}
        onChange={handleChange}
      />
      <DescriptionBox>
        <TextArea
          label={"Description"}
          name="description"
          value={projectDetails?.description}
          onChange={handleChange}
          minRows={10}
        />
      </DescriptionBox>
      <Input
        name={"startDate"}
        label={"Start Date"}
        value={projectDetails?.startDate}
        onChange={handleChange}
        type="date"
      />

      <Input
        name={"endDate"}
        label={"End Date"}
        value={projectDetails?.endDate}
        onChange={handleChange}
        type="date"
      />

      <Input
        name={"projectManager"}
        label={"Project Manager"}
        value={projectDetails?.projectManager}
        onChange={handleChange}
      />

      <Footer>
        <Button
          label={"Update"}
          variant="contained"
          onClick={updateProductDetails}
          loading={isLoading}
        />
      </Footer>
    </Container>
  );
};

export default ProjectEdit;
