import { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { IActivity } from "../../models/Activity";
import axios from "../../service/axios";

function ActivityCard({
  activity,
  handleIsActivityMutated,
}: {
  activity: IActivity;
  handleIsActivityMutated: () => void;
}) {
  const [isInputMouseEntered, setIsInputMouseEntered] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const [taskId, setTaskId] = useState("");
  const [description, setDescription] = useState("");

  const handleMouseEnterLeave = () => {
    setIsInputMouseEntered((prev) => !prev);
  };

  const [isInputFocused, setIsInputFocused] = useState(true);

  const inputRef = useRef<HTMLInputElement | any>();

  const handleFocusedBlurred = () => {
    setIsInputFocused((prev) => !prev);
  };

  useEffect(() => {
    setTaskId(activity.taskId);
    setDescription(activity.description);
  }, [activity]);

  const handleUpdateActivity = () => {
    handleFocusedBlurred();

    const activityData = {
      description,
    };
    try {
      const response = axios.patch(`/activity/${activity.id}`, activityData);

      // remove the input value after thr form submission
      inputRef.current.value = "";

      setIsDisabled(true);
      handleIsActivityMutated();

      console.log("Activity Updated Reponse: ", response);
      // console.log(inputRef.current);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  const handleDeleteActivity = () => {
    handleFocusedBlurred();

    try {
      const response = axios.delete(`/activity/${activity.id}`);

      // remove the input value after thr form submission
      inputRef.current.value = "";

      setIsDisabled(true);
      handleIsActivityMutated();

      console.log("Activity Delete Reponse: ", response);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  const onDragStart = (ev: any, activity: IActivity) => {
    console.log("drag start: ", activity.id);
    ev.dataTransfer.setData("activityId", activity.id);
  };

  return (
    <>
      {activity && (
        <div
          draggable
          onDragStart={(ev: any) => onDragStart(ev, activity)}
          className="w-full relative"
          onMouseEnter={() => {
            handleMouseEnterLeave();
            // console.log("Mouse Entered:", isInputMouseEntered);
          }}
          onMouseLeave={() => {
            handleMouseEnterLeave();
            // console.log("Mouse Leave:", isInputMouseEntered);
          }}
        >
          <input
            key={activity.id}
            type="text"
            value={description}
            disabled={isDisabled}
            ref={inputRef}
            onFocus={() => {
              handleFocusedBlurred();
              // console.log("Focused", isInputFocused);
            }}
            onBlur={handleUpdateActivity}
            onChange={(ev: any) => {
              setDescription(ev.target.value);
              // console.log("update description: ", description);
            }}
            placeholder="Untitled"
            className="w-full overflow-x-hidden border-2 border-gray-200 px-2 py-1 rounded-md outline-none my-1 text-gray-600"
          />

          {isInputMouseEntered || isInputFocused ? (
            <div className="absolute top-1.5 right-2 bg-white">
              {isDisabled && (
                <IconButton
                  sx={{ width: 32, height: 32 }}
                  onClick={() => {
                    setIsDisabled(false);
                    inputRef.current.focus();
                  }}
                >
                  <EditIcon
                    sx={{ color: "gray" }}
                    className="border border-gray-200 rounded-full p-1"
                  />
                </IconButton>
              )}

              <IconButton
                sx={{ width: 32, height: 32 }}
                onClick={handleDeleteActivity}
              >
                <DeleteIcon
                  sx={{ color: "gray" }}
                  className="border border-gray-200 rounded-full p-1"
                />
              </IconButton>
            </div>
          ) : undefined}
        </div>
      )}
    </>
  );
}

export default ActivityCard;
