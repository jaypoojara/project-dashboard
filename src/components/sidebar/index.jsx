import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchProjectList } from "../../api/productApi";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [projectList, setProjectList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchProjectList()
      .then((data) => setProjectList(data))
      .catch((error) => console.error("Error fetching project list:", error));
  }, [location]);

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
