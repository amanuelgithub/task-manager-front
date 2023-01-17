import { useState, useRef } from "react";
import { ActivityStatusEnum, IActivity } from "../../models/Activity";
import axios from "../../service/axios";

function CreateActivity({
  taskId,
  activityStatus,
  handleCloseCreateActivityInput,
  setActivityCreated,
}: {
  taskId: string;
  activityStatus: ActivityStatusEnum;
  handleCloseCreateActivityInput: () => void;
  setActivityCreated: (isCreated: boolean) => void;
}) {
  const [activityText, setActivityText] = useState("");

  const [isInputFocused, setIsInputFocused] = useState(true);

  const inputRef = useRef<any>(null);

  const handleFocusedBlurred = () => {
    setIsInputFocused((prev) => !prev);
  };

  const handleCreateActivity = () => {
    handleFocusedBlurred();

    // submit activity
    const activity: IActivity = {
      taskId,
      description: activityText,
      status: activityStatus,
    };
    try {
      const response = axios.post("/activity", activity);

      setActivityCreated(true);

      // remove the input value after thr form submission
      inputRef.current.value = "";

      handleCloseCreateActivityInput();

      console.log("Activity Created Reponse: ", response);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      onFocus={() => {
        handleFocusedBlurred();
        console.log("Focused", isInputFocused);
      }}
      onBlur={handleCreateActivity}
      onChange={(ev: any) => setActivityText(ev.target.value)}
      placeholder="Untitled"
      className="w-[186px] overflow-x-hidden border-2 border-gray-200 px-2 py-1 rounded-md outline-none my-1"
    />
  );
}

export default CreateActivity;
