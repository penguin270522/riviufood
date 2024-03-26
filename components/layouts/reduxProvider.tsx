"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";

interface IProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: IProps) {
  return <Provider store={store}>{children}</Provider>;
}