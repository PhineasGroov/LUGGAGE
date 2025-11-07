import { Layout } from "antd";
import SpaceLayoutClient from "./SpaceLayoutClient";

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpaceLayoutClient>{children}</SpaceLayoutClient>;
}
