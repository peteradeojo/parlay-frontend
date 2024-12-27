import { DollarCircleTwoTone } from "@ant-design/icons";
import { Container } from "../components/Container";
import { ProfilePicture } from "../components/Navbar";
import { useGetAuthQuery } from "../endpoints/api";
import { Link } from "react-router";

const Profile = () => {
  const { data } = useGetAuthQuery();

  return (
    <Container>
      <div className="grid w-full border-2 rounded p-4 gap-y-4">
        <div className="flex justify-between items-end">
          <div>
            <ProfilePicture
              profile={data}
              height={120}
              width={120}
              className={"bg-white p-2"}
            />
            <p className="text-xl font-semibold">
              {data?.firstname} {data?.lastname}
            </p>
          </div>
          <div className="w-1/4 grid grid-cols-4 gap-y-3">
            <DollarCircleTwoTone className="text-[24px] col-span-2" />
            <p className="text-2xl col-span-2 col-start-1">
              $ {Number(data.wallet?.amount).toFixed(2)}
            </p>
            <Link to={'/account/deposit'} className="btn bg-blue-400 place-self-start row-start-1 col-start-3 col-span-2 row-span-2 w-full">
              Fund Wallet
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
