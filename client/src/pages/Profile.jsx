import axios from "axios";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { toast } from "sonner";
import { Button, ButtonI, UpdateInput } from "../components";
import { useLogOut } from "../hooks/useLogoutHandler";
import { tokenAtom, userdetailsAtom } from "../store/atoms";
import { useEffect, useState } from "react";
const initalData = {
  firstName: "",
  lastName: "",
  currentPassword: "",
  newPassword: "",
};
const Profile = () => {
  const refetch = useRecoilRefresher_UNSTABLE(userdetailsAtom);
  const {
    state,
    contents: { user },
  } = useRecoilValueLoadable(userdetailsAtom);
  const [name, setName] = useState(initalData);
  function handleOnChange(e) {
    const { name, value } = e.target;
    setName((prevName) => ({
      ...prevName,
      [name]: value,
    }));
  }
  useEffect(() => {
    if (state == "hasValue") {
      setName({
        ...name,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [state, setName, user]);

  const logoutHandler = useLogOut();
  const userToken = useRecoilValue(tokenAtom);
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3089/api/v1/user/update",
        name,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        },
      );
      refetch();
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      setName(initalData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="max-w-sm mx-auto flex flex-col justify-center h-screen ">
      <div className="md:border md:p-4 md:border-gray-300 rounded-lg box-border p-2">
        <form onSubmit={submitHandler} className="mb-2">
          <UpdateInput
            onChange={handleOnChange}
            value={name.firstName}
            type="text"
            placeholder="firstName"
            label="firstName"
          />
          <UpdateInput
            onChange={handleOnChange}
            type="text"
            value={name.lastName}
            placeholder="lastName"
            label="lastName"
          />
          <UpdateInput
            onChange={handleOnChange}
            type="password"
            value={name.currentPassword}
            placeholder="currentPassword"
            label="currentPassword"
          />
          <UpdateInput
            onChange={handleOnChange}
            type="password"
            value={name.newPassword}
            placeholder="new Password"
            label="newPassword"
          />
          <Button type="submit" stretch={true}>
            Update Details
          </Button>
        </form>
        <ButtonI onClick={logoutHandler} stretch={true}>
          LogOut
        </ButtonI>
      </div>
    </div>
  );
};

export default Profile;
