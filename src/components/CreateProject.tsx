import React from "react";
import CreateButton from "./ui/CreateButton";
import CreateProjectModal from "./CreateProjectModal";

function CreateProject({
  handleIsProjectCreated,
}: {
  handleIsProjectCreated: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center h-screen items-center">
      <CreateButton text={"Create Project"} onClick={handleOpen} />

      <CreateProjectModal
        open={open}
        handleClose={handleClose}
        handleIsProjectCreated={handleIsProjectCreated}
      />
    </div>
  );
}

export default CreateProject;
