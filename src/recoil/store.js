import { atom } from "recoil";

export const searchedPhoto = atom({
  key: "searchedPhoto",
  default: [],
});

export const createdDrawArray = atom({
  key: "createdDrawArray",
  default: [],
});