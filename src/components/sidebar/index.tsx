import { List, ListItemText, Typography } from "@mui/material";
import { ListItemWrapper, Wrapper } from "./style";
import { useProjectContext } from "../../context/ProjectContext";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants/routes";

const Sidebar = () => {
  const { projectList } = useProjectContext();
  const navigate = useNavigate();

  const handleNavigate = (projectId: string) => {
    navigate(`${routes.projectDetails}/${projectId}`);
  };

  return (
    <Wrapper>
      <Typography variant="body1">Favourite Projects</Typography>
      <List sx={{ listStyleType: "disc", padding: 0, paddingLeft: 2 }}>
        {projectList
          ?.filter((i) => i?.isFavourite)
          ?.map((list) => (
            <ListItemWrapper key={list?.id}>
              <ListItemText
                primary={list?.projectName}
                onClick={() => handleNavigate(list?.id)}
              />
            </ListItemWrapper>
          ))}
      </List>
    </Wrapper>
  );
};

export default Sidebar;
