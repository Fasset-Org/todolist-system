import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";

const TodoList = () => {
  const [task, setTask] = useState();
  const [todoLists, setTodoList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // a function to add Task into todo list
  const addTodoList = (item) => {
    // first set the error to false to remove previous error
    setError(false);
    if (item === "") {
      // if empty set error to true and set error message
      setError(true);
      setErrorMessage("Task is required");
    } else {
      setTodoList((prevTodoList) => {
        localStorage.setItem(
          "list",
          JSON.stringify([...prevTodoList, { item: item, done: false }])
        );
        return [...prevTodoList, { item: item, done: false }];
      });
    }
  };

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    setTodoList(list);
  }, []);

  const handleDone = (i) => {
    setTodoList((prevTodoList) => {
      const newList = prevTodoList.map((item, idx) => {
        return idx !== i ? item : { ...item, done: !item.done };
      });
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
  };

  const handleDelete = (i) => {
    setTodoList((prevTodoList) => {
      const newList = prevTodoList.filter((item, idx) => {
        return idx !== i;
      });
      localStorage.setItem("list", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <Stack width="50%" m="auto">
      <Stack spacing={2} width="100%">
        {error && <Typography color="error">{errorMessage}</Typography>}
        <TextField
          name="task"
          label="Task"
          fullWidth
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            addTodoList(task);
          }}
        >
          Add Task
        </Button>
        {todoLists.length > 0 &&
          todoLists?.map((listItem, i) => {
            return (
              <ListItem
                key={i}
                listItem={listItem}
                index={i}
                handleDone={handleDone}
                handleDelete={handleDelete}
              />
            );
          })}
      </Stack>
    </Stack>
  );
};

export default TodoList;
