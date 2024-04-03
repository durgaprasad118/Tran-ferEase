import { useParams } from "react-router-dom";
import { Button, ButtonI, MainHeading, Rounded } from "../components";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { tokenAtom, userBalanceAtom, userdetailsAtom } from "../store/atoms";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const SendMoney = () => {
  const {
    state,
    contents: { user },
  } = useRecoilValueLoadable(userdetailsAtom);
  const refresh = useRecoilRefresher_UNSTABLE(userBalanceAtom);
  let name;
  if (state === "loading") {
    name = "N";
  }
  if (state == "hasValue") {
    name = user.firstName[0];
  }

  const [amount, setAmount] = useState(0);
  const Usertoken = useRecoilValue(tokenAtom);
  const { id } = useParams();
  async function SubmitHandler() {
    try {
      const { data } = await axios.post(
        "http://localhost:3089/api/v1/account/transfer",
        {
          amount: amount,
          to: id.toString(),
        },
        {
          headers: {
            Authorization: "Bearer " + Usertoken,
          },
        },
      );
      refresh();
      setAmount(0);
      const { success, message } = data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className=" max-w-sm mx-auto flex flex-col justify-center h-screen ">
      <div className="border md:p-4 border-gray-300 rounded-lg box-border p-2 flex flex-col gap-3 ">
        <MainHeading text="Send Money" />
        <div className="flex gap-4 items-center my-2 ">
          <Rounded letter={name.toUpperCase()} />
          <h1 className="text-md  md:text-xl text-black font-semibold ml-2">
            Name
          </h1>
        </div>
        <div className="mb-5">
          <label className="block mb-1 mx-1 text-sm font-medium  text-gray-600">
            Enter Amount in Rs.
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? 0 : parseFloat(e.target.value))
            }
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={"Enter Amount"}
            required
          />
        </div>
        <ButtonI onClick={SubmitHandler}>Transfer Money</ButtonI>
      </div>
    </div>
  );
};

export default SendMoney;
