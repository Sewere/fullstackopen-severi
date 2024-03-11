import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../reducers/notificationsReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style} onClick={() => dispatch(clearNotification())}>
      {notification}
    </div>
  );
};

export default Notification;
