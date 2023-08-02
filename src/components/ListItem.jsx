import { Checkbox, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ListItem = ({ listItem, index, handleDone, handleDelete }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      border={1}
      borderColor="lightgray"
      borderRadius={2}
      height={50}
    >
      <Checkbox
        name="done"
        checked={listItem?.done}
        onClick={() => handleDone(index)}
      />
      {listItem?.done ? (
        <strike>
          <Typography>Task 1</Typography>
        </strike>
      ) : (
        <Typography>{listItem.item}</Typography>
      )}
      <IconButton onClick={() => handleDelete(index)}>
        <DeleteForeverIcon sx={{ color: "red" }} />
      </IconButton>
    </Stack>
  );
};

export default ListItem;
