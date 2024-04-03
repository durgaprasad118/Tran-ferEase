import { useRecoilValueLoadable } from "recoil";
import { allUsersAtom } from "../store/atoms";
import { UserList } from "./UserList";

const Display = () => {
  const {
    state,
    contents: { user },
  } = useRecoilValueLoadable(allUsersAtom());
  let usersList = [];
  if (state === "loading") {
    usersList = [];
  }
  if (state == "hasValue") {
    usersList = [...user];
  }
  return (
    <div className=" gap-4 flex flex-col">
      {usersList.map((x) => {
        return (
          <UserList
            key={x._id}
            name={`${x.firstName} ${x.lastName}`}
            _id={x._id}
          />
        );
      })}
    </div>
  );
};

export default Display;
