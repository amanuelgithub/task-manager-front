import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ProjectTreeOption from "./ProjectTreeOption";
import Button from "@mui/material/Button";
import CreateProjectModal from "./CreateProjectModal";
import axios from "../../service/axios";
import CreateTaskModal from "../Task/CreateTaskModal";

function ProjectTree({
  handleIsProjectMutated,
  handleIsTaskMutated,
  selectedProjectId,
  changeSelectedProjectId,
  changeSelectedTaskId,
  projectsWithTask,
}: {
  projectsWithTask: any[];
  selectedProjectId: string;
  changeSelectedProjectId: (projectId: string) => void;
  changeSelectedTaskId: (taskId: string) => void;
  handleIsProjectMutated: () => void;
  handleIsTaskMutated: () => void;
}) {
  const [open, setOpen] = React.useState(true);

  const [isProjectTreeOptionOpen, setProjectTreeOptionOpen] = useState(false);
  const [openProjectTreeOptionID, setProjectTreeOptionID] = useState("");

  const [openCreateProjectModal, setOpenCreateProjectModal] =
    React.useState(false);
  const handleOpenCreateProjectModal = () => setOpenCreateProjectModal(true);
  const handleCloseCreateProjectModal = () => setOpenCreateProjectModal(false);

  const [openCreateTaskModal, setOpenCreateTaskModal] = React.useState(false);
  const handleOpenCreateTaskModal = () => setOpenCreateTaskModal(true);
  const handleCloseCreateTaskModal = () => setOpenCreateTaskModal(false);

  const handleProjectTreeOptionClick = (e: any, projectId: string) => {
    e.preventDefault();

    changeSelectedProjectId(projectId);

    setProjectTreeOptionOpen((prev) => !prev);
  };

  const handleDeleteTask = (e: any, taskId: string) => {
    e.preventDefault();
    try {
      const response = axios.delete(`/task/${taskId}`);

      handleIsTaskMutated();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {}, [projectsWithTask]);

  const handleProjectListButtonClick = (projectId: string) => {
    setOpen(!open);
    changeSelectedProjectId(projectId);
  };

  return (
    <>
      <CreateProjectModal
        open={openCreateProjectModal}
        handleClose={handleCloseCreateProjectModal}
        handleIsProjectCreated={handleIsProjectMutated}
      />

      <CreateTaskModal
        open={openCreateTaskModal}
        handleClose={handleCloseCreateTaskModal}
        handleIsTaskCreated={handleIsTaskMutated}
        projectId={selectedProjectId}
      />

      <div>
        <Button onClick={handleOpenCreateProjectModal} startIcon={<AddIcon />}>
          New Project
        </Button>
      </div>

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {projectsWithTask &&
          projectsWithTask.map((project) => (
            <div key={project?.title}>
              <div className="flex justify-between items-center">
                <ListItemButton
                  onClick={() => handleProjectListButtonClick(project?.id)}
                >
                  <ListItemIcon>
                    <ConstructionIcon />
                  </ListItemIcon>
                  <ListItemText primary={project?.title} />
                </ListItemButton>

                <ProjectTreeOption
                  key={project.id}
                  projectId={project?.id}
                  handleOpenCreateTaskModal={handleOpenCreateTaskModal}
                  handleIsProjectMutated={handleIsProjectMutated}
                  handleProjectTreeOptionClick={handleProjectTreeOptionClick}
                />
              </div>

              <Divider />

              <Collapse in={open && project.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {project?.tasks.map((task: any) => (
                    <div
                      key={task?.id}
                      className="flex justify-center items-center"
                    >
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => changeSelectedTaskId(task.id)}
                      >
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText secondary={task?.title} />
                      </ListItemButton>

                      {/* Delete Task */}
                      <IconButton
                        onClick={(e: any) => handleDeleteTask(e, task?.id)}
                      >
                        <DeleteOutlineIcon sx={{ p: 0.6 }} color="error" />
                      </IconButton>
                    </div>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
      </List>
    </>
  );
}

export default ProjectTree;
