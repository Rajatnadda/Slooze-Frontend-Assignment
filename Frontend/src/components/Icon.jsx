import React from "react";
import {
  FiHome,
  FiPackage,
  FiPlusCircle,
  FiSun,
  FiMoon,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

export const Icons = {
  Dashboard: FiBarChart2,
  Products: FiPackage,
  Add: FiPlusCircle,
  Sun: FiSun,
  Moon: FiMoon,
  Home: FiHome,
  Logout: FiLogOut,
};

export default function Icon({ name, className = "" }) {
  const Comp = Icons[name] || FiHome;
  return <Comp className={className} />;
}
  