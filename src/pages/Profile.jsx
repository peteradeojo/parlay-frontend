/**
 * @typedef {import('../types.js')}
 */

import { DollarCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Container, Currency } from "../components/Container";
import { ProfilePicture } from "../components/Navbar";
import { useGetAuthQuery } from "../endpoints/api";
import { Link } from "react-router";
import { useGetTransactionsQuery } from "../endpoints/transactions";
import { formatDate, formatDateTime } from "../util.js";

// ! This must maintain the same index ordering as the enum on the backend
export const Status = [
  "DRAFT",
  "OPEN",
  "RUNNING",
  "CLOSED",
  "RESOLVED",
  "Completed",
];

const Profile = () => {
  const { data } = useGetAuthQuery();
  /**
   * @type {{data: {data: ITransaction[]}}} param0
   */
  const { data: transactions, isLoading } = useGetTransactionsQuery();

  return (
    <Container>
      <div className="grid w-full border-2 rounded p-4 gap-y-8 sm:gap-y-4">
        <div className="grid gap-y-4 sm:flex justify-between items-end">
          <div>
            <ProfilePicture
              profile={data}
              height={120}
              width={120}
              className={"bg-white p-2"}
            />
            <p className="md:text-xl font-semibold">
              {data?.firstname} {data?.lastname}
            </p>
          </div>

          <div className="lg:w-1/4 grid grid-cols-2 md:grid-cols-4 gap-y-2">
            <DollarCircleTwoTone className="text-[24px] col-span-1" />
            <p className="text-2xl md:col-span-2 col-start-2">
              <Currency /> {Number(data.wallet?.amount).toFixed(2)}
            </p>
            <Link
              to={"/account/deposit"}
              className="btn bg-blue-400 place-self-start md:row-start-1 md:col-start-3 col-span-2 md:row-span-2 w-full"
            >
              Fund Wallet
            </Link>
          </div>
        </div>

        {isLoading ? (
          <LoadingOutlined />
        ) : (
          <div className="w-full md:w-1/2">
            <p className="text-xl font-semibold">Transactions</p>

            <ul className="border divide-y">
              {transactions.data.map((t, i) => (
                <li key={`tx-${i}`} className="p-1 grid grid-cols-3 gap-y-2">
                  <p className="col-span-2">{t.reference}</p>
                  <p className="col-span-1">{Status[t.status]}</p>
                  <p className="text-lg font-semibold">{t.name}</p>
                  <p>
                    <Currency /> {t.amount.toFixed(2)}
                  </p>
                  <p>{formatDateTime(t.createdat)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Profile;
