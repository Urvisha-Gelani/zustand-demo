import { useEffect } from "react";
import useAppStore from "../../store/AppStore";
import Users from ".";
import { commonUser } from "../../common/Common";

function FemaleUser() {
  const { getAuthenticatedUser, user, getUser } = useAppStore();
  useEffect(() => {
    getUser();
  },[]);
  console.log(commonUser().gender, "+*-/*-+-***************");
  useEffect(() => {
    getAuthenticatedUser(user.gender);
  }, [getAuthenticatedUser]);
  return (
    <>
      <Users />
    </>
  );
}

export default FemaleUser;
