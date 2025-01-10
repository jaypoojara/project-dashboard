import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchProjectDetails } from "../../api/productApi";
import Button from "../../components/button";
import { useSnackbar } from "../../context/SnackbarContext";
import { routes } from "../../utils/constants/routes";
import { Container, Footer, SvgWrapper } from "./style";
import { Project } from "../../api/type";
import ListItem from "./ListItem";
import BookmarkSvgIcon from "../../assets/svg/bookmark";
import { useProjectContext } from "../../context/ProjectContext";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState<Project>();
  const { projectList, handleAddToFavourite } = useProjectContext();
  const { showSnackbar } = useSnackbar();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [location, projectList]);

  const handleNavigation = () => {
    navigate(`${routes.projectDetails}/${projectDetails?.id}/edit`);
  };

  return (
    <Container>
      <SvgWrapper
        data-testid="bookmark-icon"
        onClick={() => handleAddToFavourite(projectDetails?.id)}
      >
        <BookmarkSvgIcon
          fillColor={projectDetails?.isFavourite ? "magenta" : ""}
        />
      </SvgWrapper>
      <ListItem title={"Project ID"} value={projectDetails?.id} />
      <ListItem title={"Project Name"} value={projectDetails?.projectName} />
      <ListItem title={"Description"} value={projectDetails?.description} />
      <ListItem title={"Start Date"} value={projectDetails?.startDate} />
      <ListItem title={"End Date"} value={projectDetails?.endDate} />
      <ListItem
        title={"Project Manager"}
        value={projectDetails?.projectManager}
      />

      <Footer>
        <Button
          label={"Back"}
          variant="contained"
          onClick={() => navigate(routes.projectList)}
        />
        <Button label={"Edit"} variant="contained" onClick={handleNavigation} />
      </Footer>
    </Container>
  );
};

export default ProjectDetails;
