/**
 * @typedef {import('../types.js')}
 */

import { Link, useParams, useNavigate } from "react-router";
import {
  useEnterParlayMutation,
  useGetParlayQuery,
} from "../endpoints/parlays.js";
import { Container } from "../components/Container.jsx";
import { Outcomes, ParlayCard } from "../components/ParlayCard.jsx";
import { useEffect, useState } from "react";
import { formatDate, formatTime } from "../util.js";
import { notification } from "antd";

const Parlay = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [selectedOutcome, setSelectedOutcome] = useState();
  const [winnings, setWinnings] = useState(0);
  const [enterParlay, enterHook] = useEnterParlayMutation();

  /**
   * @type {{data: {parlay: ParlayType, odds: number[]}} & {[k: string]: boolean}}
   */
  const { data, isLoading, isSuccess, isError } = useGetParlayQuery(params.id);

  useEffect(() => {
    if (selectedOutcome !== undefined) {
      setWinnings(Math.max(1, data.odds[selectedOutcome]) * data.parlay.entry_amount);
    } else {
      setWinnings(0);
    }
  }, [selectedOutcome]);

  return (
    <>
      <Container>
        <div className="grid gap-y-4">
          <p>
            Created by:{" "}
            <Link
              className="underline hover:text-blue-300"
              to={`/users/${data?.parlay?.creator.id}`}
            >
              {data?.parlay?.creator.firstname} {data?.parlay?.creator.lastname}
            </Link>
          </p>
          <p className="text-xl font-bold">{data?.parlay?.title}</p>

          <Outcomes
            className={"text-xl"}
            outcomes={data?.parlay?.outcomes}
            odds={data?.odds}
            state={[selectedOutcome, setSelectedOutcome]}
          />

          <p>
            Entry amount: $ {Number(data?.parlay?.entry_amount || 0).toFixed(2)}
          </p>
          <p>Potential winnings: $ {Number(winnings || 0).toFixed(2)}</p>

          <p>
            This parlay opened{" "}
            <b>
              {formatDate(data?.parlay?.start_date)}{" "}
              {formatTime(data?.parlay?.start_time)}
            </b>{" "}
            and closes{" "}
            <b>
              {formatDate(data?.parlay?.close_date)}{" "}
              {formatTime(data?.parlay?.close_time)}
            </b>
          </p>

          <button
            className="btn btn-primary"
            disabled={
              data?.parlay?.status !== 1 ||
              selectedOutcome === undefined ||
              enterHook.isLoading
            }
            onClick={async (e) => {
              try {
                const datum = await enterParlay({
                  odds: data?.odds[selectedOutcome],
                  selected_outcome: selectedOutcome,
                  id: data?.parlay.id,
                }).unwrap();

                navigate("/");
              } catch (error) {
                console.error(error);
                notification.error({
                  message:
                    error.data.message ||
                    "Unable to enter parlay at this time.",
                });
              }
            }}
          >
            Enter this parlay
          </button>
        </div>
      </Container>
    </>
  );
};

export default Parlay;
