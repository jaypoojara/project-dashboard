import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProjectDetails,
  updateProjectDetails,
} from "../../api/productApi";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import { useSnackbar } from "../../context/SnackbarContext";
import { routes } from "../../utils/routes";
import { Container, DescriptionBox, Footer } from "./style";
import { Project } from "../../api/type";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState<Project>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const getProductDetailsById = (id) => {
    fetchProjectDetails(id)
      .then((data) => setProjectDetails(data))
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );
  };

  useEffect(() => {
    id && getProductDetailsById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProductDetails = () => {
    if (projectDetails.endDate < projectDetails.startDate) {
      showSnackbar("Please choose appropriate dates", "error");
      return;
    }
    updateProjectDetails(id, projectDetails)
      .then(() => {
        showSnackbar("Details updated successfully", "success");
        navigate(`${routes.projectList}`);
      })
      .catch((error) => showSnackbar("Error updating project:", error));
  };

  const handleChange = (e) => {
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
      <CustomInput
        name="projectName"
        label={"Project Name"}
        value={projectDetails?.projectName}
        onChange={handleChange}
      />
      <DescriptionBox>
        <CustomInput
          label={"Description"}
          name="description"
          value={projectDetails?.description}
          onChange={handleChange}
          multiline
          rows={8}
        />
      </DescriptionBox>
      <CustomInput
        name={"startDate"}
        label={"Start Date"}
        value={projectDetails?.startDate}
        onChange={handleChange}
        type="date"
      />

      <CustomInput
        name={"endDate"}
        label={"End Date"}
        value={projectDetails?.endDate}
        onChange={handleChange}
        type="date"
      />

      <CustomInput
        name={"projectManager"}
        label={"Project Manager"}
        value={projectDetails?.projectManager}
        onChange={handleChange}
      />

      <Footer>
        <CustomButton
          label={"Update"}
          variant="contained"
          onClick={updateProductDetails}
        />
      </Footer>
    </Container>
  );
};

export default ProjectDetails;
