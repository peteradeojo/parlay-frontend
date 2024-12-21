/**
 * @typedef {import('../types')}
 */

import { format, parse } from "date-fns";

/**
 * ParlayCard component
 * @param {{parlay: Parlay}} param0
 * @returns
 */
export const ParlayCard = ({ parlay }) => {
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
        <span>$ {Number(parlay.entry_amount)?.toFixed(2)}</span>
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
            {parlay.end_date}{" "}
            {format(parse(parlay.end_time, "HH:mm", new Date()), "hh:mm aa")}
          </p>
        </div>
      </div>
    </div>
  );
};
