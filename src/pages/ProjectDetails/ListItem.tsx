import { Box, Typography } from "@mui/material";
import { Text } from "./style";

type ListItemProps = {
  title: string;
  value: string;
};

const ListItem = ({ title, value }: ListItemProps) => {
  return (
    <Box display={"flex"} gap={"16px"}>
      <Typography width={150} textAlign={"end"}>
        {title}
      </Typography>

      <Text>{value}</Text>
    </Box>
  );
};

export default ListItem;
