import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import {
  Fade,
  IconButton,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "../../service/axios";

function ProjectTreeOption({
  handleOpenCreateTaskModal,
  handleIsProjectMutated,
  projectId,
  handleProjectTreeOptionClick,
}: {
  handleOpenCreateTaskModal: () => void;
  handleIsProjectMutated: () => void;
  projectId: string;
  handleProjectTreeOptionClick: (e: any, projectId: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    projectId: string
  ) => {
    setAnchorEl(event.currentTarget);
    handleProjectTreeOptionClick(event, projectId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProject = (e: any, projectId: string) => {
    e.preventDefault();
    try {
      const res = axios.delete(`/project/${projectId}`);

      console.log("Deleted Project Response: ", res);

      handleIsProjectMutated();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e: any) => handleClick(e, projectId)}
      >
        <MoreHorizIcon color="primary" />
      </IconButton>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={(e: any) => {
            handleOpenCreateTaskModal();
            handleClose();
          }}
        >
          <ListItemIcon>
            <AddIcon fontSize="small" color="primary" />
          </ListItemIcon>

          <Typography variant="body2" noWrap>
            Add
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e: any) => {
            handleDeleteProject(e, projectId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" color="error" />
          </ListItemIcon>

          <Typography variant="body2" noWrap>
            Delete
          </Typography>
        </MenuItem>
        {/* </List>
        </Box> */}
        {/* </Paper> */}
      </Menu>
    </div>
  );
}

export default ProjectTreeOption;
