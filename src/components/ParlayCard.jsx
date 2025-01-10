/**
 * @typedef {import('../types')}
 */

import { format, parse } from "date-fns";
import { Link } from "react-router";
import { formatDate, formatTime } from "../util";
import { Currency } from "./Container";

/**
 * ParlayCard component
 * @param {{parlay: ParlayType, previewState: [any, React.Dispatch<React.SetStateAction<any>>]}} param0
 * @returns
 */
export const ParlayCardPreview = ({ parlay, previewState }) => {
  return (
    <div className="border-2 border-white col-span-2 p-4">
      <h1 className="text-3xl">#1xxx8</h1>
      <p className="text-xl">{parlay.title || "Parlay title"}</p>

      <div className="py-3">
        <p className="text-lg font-semibold">Outcomes</p>
        <div className="flex w-full justify-evenly border-collapse rounded-md">
          {parlay.outcomes.filter((i, k) => i != "").length > 0 ? (
            parlay.outcomes
              .filter((o, k) => o != "")
              .map((out, k) => (
                <button
                  className={`btn p-1 w-full bg-gray-700 border border-red-400 rounded-[inherit] ${
                    previewState && previewState[0].selected_outcome == k
                      ? "bg-green-400"
                      : ""
                  }`}
                  key={k}
                  type="button"
                  onClick={(e) => {
                    if (previewState) {
                      if (previewState[0].selected_outcome == k) {
                        previewState[1]((prev) => ({
                          ...prev,
                          selected_outcome: undefined,
                        }));
                      } else {
                        previewState[1]((prev) => ({
                          ...prev,
                          selected_outcome: k,
                        }));
                      }
                    }
                  }}
                >
                  <p>{out}</p>
                  <span className="text-xs">x0.0</span>
                </button>
              ))
          ) : (
            <>No outcome set.</>
          )}
        </div>
      </div>

      <div className="py-3">
        <p className="text-lg font-semibold">Entry Amount</p>
        <span>
          <Currency /> {Number(parlay.entry_amount)?.toFixed(2)}
        </span>
      </div>

      <div className="py-3 flex justify-between">
        <div>
          <p>Starts:</p>

          <p>
            {parlay.start_date}{" "}
            {format(parse(parlay.start_time, "HH:mm", new Date()), "hh:mm aa")}
          </p>
        </div>
        <div>
          <p>End:</p>

          <p>
            {parlay.close_date}{" "}
            {format(parse(parlay.close_time, "HH:mm", new Date()), "hh:mm aa")}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 *
 * @param {{parlay: ParlayType}} param0
 * @returns
 */
export const DraftParlayCard = ({ parlay, no_action = false }) => {
  return (
    <>
      <div className="border-2 border-white p-4 rounded w-full flex flex-col">
        <h1 className="text-3xl">#1xxx8</h1>
        <p className="text-xl">{parlay.title || "Parlay title"}</p>

        <div className="py-3">
          <p className="text-lg font-semibold">Outcomes</p>
          <div className="flex w-full justify-evenly border-collapse rounded-md">
            {parlay.outcomes?.filter((i, k) => i != "").length > 0 ? (
              parlay.outcomes
                .filter((o, k) => o != "")
                .map((out, k) => (
                  <button
                    className="btn p-1 w-full bg-gray-700 border border-red-400 rounded-[inherit]"
                    key={k}
                  >
                    <p>{out}</p>
                    <span className="text-xs">x0.0</span>
                  </button>
                ))
            ) : (
              <>No outcome set.</>
            )}
          </div>
        </div>

        <div className="py-3">
          <p className="text-lg font-semibold">Entry Amount</p>
          <span>
            <Currency /> {Number(parlay.entry_amount || 0).toFixed(2)}
          </span>
        </div>

        <div className="py-3 flex justify-between">
          <div>
            <p>Starts:</p>
            <p>
              {formatDate(parlay.start_date, "yyyy-MM-dd", "yyyy-MM-dd")}{" "}
              {formatTime(parlay.start_time, "hh:mm aa", "HH:mm:ss")}
            </p>
          </div>
          <div>
            <p>End:</p>
            <p>
              {formatDate(parlay.close_date, "yyyy-MM-dd", "yyyy-MM-dd")}{" "}
              {formatTime(parlay.close_time, "HH:mm:ss")}
            </p>
          </div>
        </div>

        {!no_action && (
          <div className="grid gap-y-2 place-self-end w-full">
            <Link
              to={`/drafts/${parlay.id}`}
              className="btn bg-blue-400 w-full"
            >
              Edit or Publish
            </Link>
            {/* <button className="btn bg-blue-400 w-full">Publish</button> */}
          </div>
        )}
      </div>
    </>
  );
};

export const Outcomes = ({ outcomes, odds, state, className }) => {
  return (
    <>
      <div
        className={`${className} flex gap-x-2 w-full justify-evenly border-collapse rounded-md`}
      >
        {outcomes?.filter((i, k) => i != "").length > 0 ? (
          outcomes
            .filter((o, k) => o != "")
            .map((out, k) => (
              <button
                className={`btn p-1 w-full border rounded-[inherit] ${
                  state && state[0] === k
                    ? "bg-green-600"
                    : "bg-gray-700 border-red-400"
                }`}
                key={k}
                onClick={(e) => {
                  if (state) {
                    if (state[0] !== k) {
                      state[1](k);
                    } else {
                      state[1](undefined);
                    }
                  }
                }}
              >
                <p>{out}</p>
                {odds && (
                  <span className="text-xs">
                    x{odds ? Number(odds[k].value).toFixed(2) : "0.0"}
                  </span>
                )}
                {odds && odds[k].noBets && (
                  <p
                    className={`text-xs ${
                      state && state[0] == k ? "text-white" : "text-red-400"
                    }`}
                  >
                    This outcome has no bets on it
                  </p>
                )}
              </button>
            ))
        ) : (
          <>No outcome set.</>
        )}
      </div>
    </>
  );
};

/**
 *
 * @param {{parlay: ParlayType, isMine: boolean}} param0
 * @returns
 */
export const ParlayCard = ({ parlay, isMine }) => {
  return (
    <div className="border-2 p-2 rounded grid gap-y-3">
      <div>
        <p>#{parlay.code}</p>
        <p className="my-1 text-lg">{parlay.title}</p>
      </div>

      <div>
        <p className="text-lg">Outcomes</p>
        <Outcomes outcomes={parlay.outcomes} />
      </div>

      <div>
        <p>
          Entry: <Currency /> {Number(parlay.entry_amount).toFixed(2)}
        </p>
      </div>

      <span>
        <div>
          Starts: {formatDate(parlay.start_date)}{" "}
          {formatTime(parlay.start_time)}
        </div>
        <div>
          Closes: {formatDate(parlay.close_date)}{" "}
          {formatTime(parlay.close_time)}
        </div>
      </span>

      {!isMine && (
        <Link to={`/parlays/${parlay.id}`} className="btn bg-blue-400">
          Enter Parlay
        </Link>
      )}
    </div>
  );
};
