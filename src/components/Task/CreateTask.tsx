import React from "react";
import CreateButton from "../ui/CreateButton";
import CreateTaskModal from "./CreateTaskModal";

function CreateTask({
  selectedProjectId,
  handleIsTaskCreated,
}: {
  handleIsTaskCreated: () => void;
  selectedProjectId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center h-screen items-center">
      <CreateButton text={"Create Task"} onClick={handleOpen} />

      <CreateTaskModal
        open={open}
        projectId={selectedProjectId}
        handleClose={handleClose}
        handleIsTaskCreated={handleIsTaskCreated}
      />
    </div>
  );
}

export default CreateTask;
