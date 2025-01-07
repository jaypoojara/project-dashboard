import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Wrapper } from "./style";
import { useProjectContext } from "../../context/ProjectContext";

const Sidebar = () => {
  const { projectList } = useProjectContext();

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
              <ListItemText primary={list?.projectName} />
            </ListItem>
          ))}
      </List>
    </Wrapper>
  );
};

export default Sidebar;
