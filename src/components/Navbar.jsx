/**
 * @typedef {import('../types')}
 */

import { Dropdown, Space } from "antd";
import api, { useGetAuthQuery } from "../endpoints/api";
import {
  DollarOutlined,
  FileOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { TextInput } from "./Container";
import { Link } from "react-router";

/**
 *
 * @returns {import("antd/es/menu/interface").ItemType[]}
 * @param {User?} profile
 */
const profileLinkItems = (profile) => [
  {
    key: "1",
    label: (
      <Link to={"/account"}>
        <b className="text-lg">
          {profile?.firstname} {profile?.lastname}
        </b>
      </Link>
    ),
  },
  {
    key: "drafts",
    label: <Link to="/drafts">Your drafts</Link>,
    icon: <FileOutlined />,
  },
  {
    key: "2",
    label: <Link to="/parlays">Your parlays</Link>,
    icon: <HistoryOutlined />,
  },
  {
    key: "fund-account",
    label: <Link to="/bets">Your bets</Link>,
    icon: <DollarOutlined />,
  },
  {
    key: "logout",
    label: (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          api.util.resetApiState();
          localStorage.removeItem("authToken");
          window.location.href = "/";
        }}
        className="text-red-600"
      >
        Log out
      </a>
    ),
    danger: true,
    icon: <LogoutOutlined />,
  },
];

export const ProfilePicture = ({ profile, height, width, className }) => (
  <img
    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${
      profile ? profile.firstname : ""
    }`}
    alt=""
    className={className}
    height={height || 65}
    width={width || 65}
  />
);

const ProfileLinks = ({ profile }) => (
  <Dropdown
    menu={{
      items: profileLinkItems(profile),
      style: { minWidth: "180px" },
    }}
    trigger={["click"]}
    placement="bottomRight"
  >
    <span>
      <Space>
        <ProfilePicture profile={profile} className={"bg-white rounded-full bg-clip-border"} />
      </Space>
    </span>
  </Dropdown>
);
const Navbar = () => {
  const { data: user, isLoading } = useGetAuthQuery();

  return (
    <div className="flex p-3 items-center align-middle justify-between">
      <h1>
        <Link to={"/"} className="md:text-5xl font-bold">
          Parlay Master
        </Link>
      </h1>

      <TextInput
        type="search"
        className="w-2/5 rounded-full"
        placeholder="Search parlay code. #12345"
      />

      <div className="flex gap-x-8 justify-between items-center">
        <Link to={"/create"} className="btn bg-blue-400">
          {"\u002b"} Create a parlay
        </Link>

        <p>${Number(user.wallet?.amount).toFixed(2)}</p>

        <ProfileLinks profile={user} />
      </div>
    </div>
  );
};

export default Navbar;
