import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const Packs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);

  // if (!logined) {
  //   console.log("hhhhhhhhhhhhhhhhhhhhhh");
  //   navigate("/profile");
  // }

  return <div>Packs</div>;
};
