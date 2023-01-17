import { useEffect, useState } from "react";
import { ActivityStatusEnum } from "../../models/Activity";
import axios from "../../service/axios";
import CreateActivity from "./CreateActivity";
import ActivityCard from "./ActivityCard";
import AddIcon from "@mui/icons-material/Add";

const NewButton = ({
  children,
  onClick,
}: {
  children: any;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full opacity-40 hover:opacity-70 text-sm text-start p-1 hover:bg-gray-100 rounded-md flex items-center gap-1"
    >
      <AddIcon sx={{ width: 18, height: 18 }} />

      {children}
    </button>
  );
};

function TaskActivities({ taskId }: { taskId: string }) {
  const [isActivityMutated, setIsActivityMutated] = useState(false);

  const [allActvities, setAllActivities] = useState<any[]>([]);
  const [todoActivities, setTodoActivities] = useState<any[]>([]);
  const [inprogressActivities, setInprogressActivities] = useState<any[]>([]);
  const [completedActivities, setCompletedActivities] = useState<any[]>([]);

  const [createActivityTodo, setCreateActivityTodo] = useState(false);
  const [createActivityInprogress, setCreateActivityInProgress] =
    useState(false);
  const [createActivityCompleted, setCreateActivityCompleted] = useState(false);

  const getActivities = (taskId: string) => {
    try {
      axios.get(`/task/${taskId}/activities`).then((result) => {
        const activities = result.data;

        setAllActivities(activities);

        console.log("Activities Response: ", activities);
      });
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getActivities(taskId);

    return () => {
      setIsActivityMutated(false);
    };
  }, [taskId, isActivityMutated]);

  useEffect(() => {
    const todoActivities = [];
    const inprogressActivities = [];
    const completedActivities = [];

    for (let index = 0; index < allActvities.length; index++) {
      let activity = allActvities[index];

      if (activity.status === ActivityStatusEnum.NOT_STARTED) {
        todoActivities.push(activity);
      } else if (activity.status === ActivityStatusEnum.INPROGRESS) {
        inprogressActivities.push(activity);
      } else if (activity.status === ActivityStatusEnum.COMPLETED) {
        completedActivities.push(activity);
      }
    }

    setTodoActivities(todoActivities);
    setInprogressActivities(inprogressActivities);
    setCompletedActivities(completedActivities);
  }, [allActvities]);

  const handleCloseActivityTodoInput = () => {
    setCreateActivityTodo(false);
  };
  const handleCloseActivityInprogressInput = () => {
    setCreateActivityInProgress(false);
  };
  const handleCloseActivityCompletedInput = () => {
    setCreateActivityCompleted(false);
  };

  const handleActivityMutated = () => {
    setIsActivityMutated((prev) => !prev);
  };

  return (
    <>
      {allActvities && (
        <div className="flex justify-center">
          <div className="flex justify-evenly gap-1 w-full">
            <div className="w-1/3 p-2">
              <h3 className="pb-6">To Do</h3>
              <div>
                {/* listing all todo activitie */}
                {todoActivities &&
                  todoActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      handleIsActivityMutated={handleActivityMutated}
                    />
                  ))}

                {/* activity status for a `todo` is NOT_STARTED */}
                {createActivityTodo && (
                  <CreateActivity
                    key="not_started"
                    taskId={taskId}
                    activityStatus={ActivityStatusEnum.NOT_STARTED}
                    setActivityCreated={setIsActivityMutated}
                    handleCloseCreateActivityInput={
                      handleCloseActivityTodoInput
                    }
                  />
                )}

                <NewButton onClick={() => setCreateActivityTodo(true)}>
                  New
                </NewButton>
              </div>
            </div>
            <div className="w-1/3 p-2">
              <h3 className="pb-6">Inprogress</h3>
              <div>
                {/* listing all inprogress activitie */}
                {inprogressActivities &&
                  inprogressActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      handleIsActivityMutated={handleActivityMutated}
                    />
                  ))}

                {/* activity status for a `todo` is Inprogress */}
                {createActivityInprogress && (
                  <CreateActivity
                    key={"inprogress"}
                    taskId={taskId}
                    activityStatus={ActivityStatusEnum.INPROGRESS}
                    setActivityCreated={setIsActivityMutated}
                    handleCloseCreateActivityInput={
                      handleCloseActivityInprogressInput
                    }
                  />
                )}

                <NewButton onClick={() => setCreateActivityInProgress(true)}>
                  New
                </NewButton>
              </div>
            </div>
            <div className="w-1/3 p-2">
              <h3 className="pb-6">Completed</h3>
              <div>
                {/* listing all completed activitie */}
                {completedActivities &&
                  completedActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      handleIsActivityMutated={handleActivityMutated}
                    />
                  ))}

                {/* activity status for a `todo` is Completed */}
                {createActivityCompleted && (
                  <CreateActivity
                    key={"completed"}
                    taskId={taskId}
                    activityStatus={ActivityStatusEnum.COMPLETED}
                    setActivityCreated={setIsActivityMutated}
                    handleCloseCreateActivityInput={
                      handleCloseActivityCompletedInput
                    }
                  />
                )}

                <NewButton onClick={() => setCreateActivityCompleted(true)}>
                  New
                </NewButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskActivities;
