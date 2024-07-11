import { useEffect } from "react";
import useAppStore from "../../store/AppStore";
import Users from ".";

function MaleUsers() {
  const { getAuthenticatedUser, user, getUser } = useAppStore();
  useEffect(() => {
    getUser();
  },[]);
  console.log(user , "*******************************");
  useEffect(() => {
    getAuthenticatedUser(user.gender);
  }, [getAuthenticatedUser]);
  return (
    <>
      <Users />
    </>
  );
}

export default MaleUsers;
