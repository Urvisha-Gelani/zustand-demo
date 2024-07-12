import { useEffect } from "react";
import useAppStore from "../../store/AppStore";
import Users from ".";
import { commonUser } from "../../common/Common";

function FemaleUser() {
  const { getAllUsers } = useAppStore();

  
  useEffect(() => {
    getAllUsers(commonUser().gender);
  }, [getAllUsers]);
  return (
    <>
      <Users />
    </>
  );
}

export default FemaleUser;
