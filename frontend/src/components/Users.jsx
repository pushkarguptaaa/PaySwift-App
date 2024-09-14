import Button from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = ({user}) => {
    // const navigate = useNavigate();
    return (
      <div className="w-full flex justify-between">
        <div className="flex justify-center items-center">
          <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-300">
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user}`}
              className="h-[90%] w-[90%] rounded-full"
            />
          </div>
          <div className="font-medium text-sm ml-2">
            {user}
          </div>
        </div>
  
        <div>
          <Button
            label={"Send Money"}
            // onClick={(e) =>
            //   navigate(
            //     "/send?id=" +
            //       user._id +
            //       "&name=" +
            //       user.firstname +
            //       "_" +
            //       user.lastname
            //   )
            // }
          />
        </div>
      </div>
    );
}