import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import axios from "../../service/axios";
import Title from "../ui/Title";
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

function CreateProjectModal({
  handleIsProjectCreated,
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
  handleIsProjectCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = (e: any) => {
    e.preventDefault();
    const project = { title, description };
    try {
      const response = axios.post("/project", project);
      // console.log("project response: ", response);

      handleIsProjectCreated();

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

              <CTextField
                name="description"
                label={"Description"}
                placeholder={"Description"}
                multiline
                value={description}
                onChange={(event: any) => setDescription(event.target.value)}
              />

              <CreateButton text={"Create Project"} />
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateProjectModal;
