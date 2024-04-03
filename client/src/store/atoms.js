import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
export const tokenAtom = atom({
  key: "tokenAtom",
  default: localStorage.getItem("token"),
});

export const userdetailsAtom = atom({
  key: "userdetailsAtom",
  default: selector({
    key: "userdetailsSelector",
    get: async ({ get }) => {
      const Usertoken = get(tokenAtom);
      const { data } = await axios.get(
        "http://localhost:3089/api/v1/user/details",
        {
          headers: {
            Authorization: "Bearer " + Usertoken,
          },
        },
      );
      return data;
    },
  }),
});
export const userBalanceAtom = atom({
  key: "userBalanceAtom",
  default: selector({
    key: "balanceSelector",
    get: async ({ get }) => {
      const Usertoken = get(tokenAtom);
      const { data } = await axios.get(
        "http://localhost:3089/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + Usertoken,
          },
        },
      );
      return data;
    },
  }),
});
export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});
export const transferAtom = atom({
  key: "transferAtom",
  default: selector({
    key: "transferSelector",
    get: async ({ get }) => {
      const Usertoken = get(tokenAtom);
      const { data } = await axios.post(
        "http://localhost:3089/api/v1/account/transfer",
        {
          headers: {
            Authorization: "Bearer " + Usertoken,
          },
        },
      );
      return data;
    },
  }),
});
export const allUsersAtom = atomFamily({
  key: "allUsersAtom",
  default: selectorFamily({
    key: "allUsersSelector",
    get:
      () =>
      async ({ get }) => {
        const Usertoken = get(tokenAtom);
        let filter = get(filterAtom);
        const { data } = await axios.get(
          "http://localhost:3089/api/v1/user/bulk?filter=" + filter,
          {
            headers: {
              Authorization: "Bearer " + Usertoken,
            },
          },
        );
        return data;
      },
  }),
});
