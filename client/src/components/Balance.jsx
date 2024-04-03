import { useRecoilValueLoadable } from "recoil";
import { userBalanceAtom } from "../store/atoms";

const Balance = () => {
  const {
    state,
    contents: { balance },
  } = useRecoilValueLoadable(userBalanceAtom);
  let amount;
  if (state === "loading") {
    amount = 0;
  }
  if (state == "hasValue") {
    amount = balance;
  }
  return (
    <div>
      <h1 className="text-md  md:text-2xl font-semibold ml-2 ">
        Your balance is{" "}
        <span className="font-medium text-blue-600">{amount.toFixed(3)}</span>{" "}
      </h1>
    </div>
  );
};

export { Balance };
