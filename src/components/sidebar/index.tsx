import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Wrapper } from "./style";
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
            <ListItem
              sx={{ display: "list-item", paddingBottom: 0, paddingLeft: 0 }}
              key={list?.id}
            >
              <ListItemText
                primary={list?.projectName}
                onClick={() => handleNavigate(list?.id)}
              />
            </ListItem>
          ))}
      </List>
    </Wrapper>
  );
};

export default Sidebar;
