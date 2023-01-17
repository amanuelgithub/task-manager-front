import React, { useEffect, useState } from "react";
import CreateProject from "./components/Project/CreateProject";
import CreateTask from "./components/Task/CreateTask";
import TaskActivities from "./components/Activities/TaskActivities";
import axios from "./service/axios";
import ProjectTree from "./components/Project/ProjectTree";

function Dashboard() {
  const [projectMutated, setProjectMutated] = useState(false);
  const [taskMutated, setTaskMutated] = useState(false);
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const [taskIdChanged, setTaskIdChanged] = useState(false);

  let taskActivityComponent: any;

  const getProjects = async () => {
    axios.get("/project").then((result) => {
      const projects = result.data;
      setProjects(projects);
    });

    // console.log("projects: ", projects);
  };

  useEffect(() => {
    getProjects();

    return () => {
      setProjectMutated(false);
      setTaskMutated(false);
    };
  }, [projectMutated, taskMutated]);

  // useEffect(() => {
  // taskActivityComponent = (
  //   <TaskActivities key={selectedTaskId} taskId={selectedTaskId} />
  // );
  // }, [selectedTaskId]);

  // project created, deleted, updated
  const handleProjectMutated = () => {
    setProjectMutated(true);
  };
  // task created, deleted, updated
  const handleTaskMutated = () => {
    setTaskMutated(true);
  };

  const changeSelectedProjectId = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const changeSelectedTaskId = (taskId: string) => {
    console.log("Selected task id: " + taskId);
    setSelectedTaskId(taskId);

    setTaskIdChanged(!taskIdChanged);
  };

  return (
    <div className="bg-gray-100">
      {projects.length <= 0 ? (
        <>
          {/* If There is no single project */}
          <CreateProject handleIsProjectCreated={handleProjectMutated} />
        </>
      ) : (
        <>
          {/* If Project Exist  */}
          <div className="flex justify-between bg-white  h-screen mx-32">
            {/* left project list view */}
            <div className="p-4 w-1/4 border-r border-gray-200">
              <ProjectTree
                projectsWithTask={projects}
                selectedProjectId={selectedProjectId}
                changeSelectedProjectId={changeSelectedProjectId}
                changeSelectedTaskId={changeSelectedTaskId}
                handleIsTaskMutated={handleTaskMutated}
                handleIsProjectMutated={handleProjectMutated}
              />
            </div>
            {/* right */}
            <div className="p-4 w-3/4">
              {selectedTaskId && <TaskActivities taskId={selectedTaskId} />}

              {/* {selectedProjectId !== "" ? (
                <CreateTask
                  selectedProjectId={selectedProjectId}
                  handleIsTaskCreated={handleTaskMutated}
                />
              ) : (
                <div className="flex justify-center h-screen items-center">
                  Start by selecting a project to create a Task.
                </div>
              )} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
