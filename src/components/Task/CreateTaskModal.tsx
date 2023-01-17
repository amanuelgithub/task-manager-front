import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "../../service/axios";
import Title from "../ui/Title";
import Divider from "@mui/material/Divider";
import CTextField from "../ui/CTextField";
import CreateButton from "../ui/CreateButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreateTaskModal({
  handleIsTaskCreated,
  projectId,
  open,
  handleClose,
}: {
  projectId: string;
  open: boolean;
  handleClose: () => void;
  handleIsTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");

  const handleCreateProject = (e: any) => {
    e.preventDefault();
    const task = { projectId, title };
    try {
      console.log("task project id: ", projectId);

      const response = axios.post("/task", task);
      // console.log("task response: ", response);

      handleIsTaskCreated();

      handleClose();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-center">
            <Title title={"Create Project"} />

            <Divider />

            <Box component="form" onSubmit={handleCreateProject}>
              <CTextField
                name="title"
                label={"Title"}
                placeholder={"Title"}
                value={title}
                onChange={(event: any) => setTitle(event.target.value)}
              />

              <CreateButton text={"Create Task"} />
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateTaskModal;
