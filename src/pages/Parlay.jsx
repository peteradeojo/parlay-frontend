/**
 * @typedef {import('../types.js')}
 */

import { Link, useParams } from "react-router";
import { useGetParlayQuery } from "../endpoints/parlays.js";
import { Container } from "../components/Container.jsx";
import { Outcomes, ParlayCard } from "../components/ParlayCard.jsx";
import { useState } from "react";
import { formatDate, formatTime } from "../util.js";

const Parlay = () => {
  const params = useParams();

  const [selectedOutcome, setSelectedOutcome] = useState();

  /**
   * @type {{data: ParlayType} & {[k: string]: boolean}}
   */
  const {
    data: parlay,
    isLoading,
    isSuccess,
    isError,
  } = useGetParlayQuery(params.id);

  return (
    <>
      <Container>
        <div className="grid gap-y-4">
          <p>
            Created by:{" "}
            <Link
              className="underline hover:text-blue-300"
              to={`/users/${parlay?.creator.id}`}
            >
              {parlay?.creator.firstname} {parlay?.creator.lastname}
            </Link>
          </p>
          <p className="text-xl font-bold">{parlay?.title}</p>

          <Outcomes outcomes={parlay?.outcomes} />

          <p>Entry amount: ${Number(parlay?.entry_amount || 0).toFixed(2)}</p>

          <p>
            This parlay opened{" "}
            <b>
              {formatDate(parlay?.start_date)} {formatTime(parlay?.start_time)}
            </b>{" "}
            and closes{" "}
            <b>
              {formatDate(parlay?.close_date)} {formatTime(parlay?.close_time)}
            </b>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Parlay;
