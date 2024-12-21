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
      <button href="#">
        <b className="text-lg">
          {profile?.firstname} {profile?.lastname}
        </b>
      </button>
    ),
  },
  {
    key: "drafts",
    label: <Link to="/drafts">Your drafts</Link>,
    icon: <FileOutlined />,
  },
  {
    key: "2",
    label: <Link to="/my-parlays">Your parlays</Link>,
    icon: <HistoryOutlined />,
  },
  {
    key: "fund-account",
    label: <Link to="/wallet">Fund Wallet</Link>,
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
        <img
          src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${
            profile ? profile.firstname : ""
          }`}
          alt=""
          className="rounded-full bg-white"
          height={65}
          width={65}
        />
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

        <p>${Number(user.wallet?.amount).toPrecision(3)}</p>

        <ProfileLinks profile={user} />
      </div>
    </div>
  );
};

export default Navbar;
