import React, { useEffect, useState } from "react";
import CustomInput from "../../components/input";
import CustomButton from "../../components/button";
import { Container, DescriptionBox, Footer } from "./style";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../utils/routes";
import {
  fetchProjectDetails,
  updateProjectDetails,
} from "../../api/productApi";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
    updateProjectDetails(id, projectDetails)
      .then(() => navigate(`${routes.projectList}`))
      .catch((error) => console.error("Error updating project:", error));
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
        handleChange={handleChange}
      />
      <DescriptionBox>
        <CustomInput
          label={"Description"}
          name="description"
          value={projectDetails?.description}
          handleChange={handleChange}
          multiline
          rows={8}
        />
      </DescriptionBox>
      <CustomInput
        name={"startDate"}
        label={"Start Date"}
        value={projectDetails?.startDate}
        handleChange={handleChange}
      />

      <CustomInput
        name={"endDate"}
        label={"End Date"}
        value={projectDetails?.endDate}
        handleChange={handleChange}
      />

      <CustomInput
        name={"projectManager"}
        label={"Project Manager"}
        value={projectDetails?.projectManager}
        handleChange={handleChange}
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
