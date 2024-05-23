import { UserData } from "../../Globals";
import defaultProfile from "../../images/defaultProfile.png";

export default function Me({ message }) {
  // console.log("my message", message);
  return (
    <>
      {message != null && (
        <span className="chatter_msg_item chatter_msg_item_admin">
          <div className="chatter_avatar">
            <img src={UserData.value.userImg || defaultProfile} />
          </div>
          <div className="message-content">
            <strong className="chatter_name">{UserData.value.name}</strong>
            {message}
          </div>
        </span>
      )}
    </>
  );
}
