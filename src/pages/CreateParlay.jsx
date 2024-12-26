/**
 * @typedef {import('../types')}
 */

import React, { useRef, useState } from "react";
import { Container, DateInput, TextInput } from "../components/Container";
import { notification } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { DraftParlayCard, ParlayCardPreview } from "../components/ParlayCard";
import { format, addHours, addMinutes, roundToNearestMinutes } from "date-fns";
import { useCreateParlayMutation } from "../endpoints/parlays";
import { useNavigate } from "react-router";
import { formatDate } from "../util";

/**
 * @type {ParlayType}
 */
export const EmptyParlay = ((date) => ({
  title: "",
  outcomes: ["", ""],
  entry_amount: 0,
  status: 1,
  start_date: format(date, "yyyy-MM-dd"),
  start_time: format(date, "HH:mm"),
  close_date: format(addHours(date, 1), "yyyy-MM-dd"),
  close_time: format(addHours(date, 1), "HH:mm"),
}))(roundToNearestMinutes(addMinutes(new Date(), 5)));

export const ParlayForm = ({
  parlayHook,
  saveParlay,
  publishParlay,
  formRef,
  editing = false,
}) => {
  const minStartDate = format(new Date(), "yyyy-MM-dd");
  const minEndDate = format(addMinutes(new Date(), 5), "yyyy-MM-dd");

  const [parlay, setParlay] = parlayHook;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        publishParlay(parlay);
      }}
      ref={formRef}
    >
      <Container className="grid grid-cols-7 gap-x-4">
        {/* Parlay form */}
        <div className="col-span-5 rounded-md border-2 border-white p-3 flex flex-col gap-3 items-start">
          <h1 className="text-2xl">Set your parlay</h1>
          <div className="w-full">
            <label>Title</label>
            <TextInput
              className="w-full"
              placeholder="Jake Paul v. Mike Tyson"
              value={parlay.title}
              onChange={(e) => {
                setParlay({ ...parlay, title: e.target.value });
              }}
            />
          </div>

          {/* Outcomes */}
          <div className="w-full flex flex-col gap-3 py-3">
            {parlay.outcomes?.map((i, k) => (
              <div className="w-full" key={k}>
                <label>Outcome {k + 1}</label>
                <span className="flex justify-between gap-x-3 items-center">
                  <TextInput
                    className="w-full"
                    placeholder={`outcome ${k + 1}`}
                    value={parlay.outcomes[k]}
                    onChange={(e) => {
                      const evts = [...parlay.outcomes];
                      evts[k] = e.target.value;
                      setParlay({ ...parlay, outcomes: evts });
                    }}
                    required
                  />

                  {/* Delete outcomes button */}
                  {parlay.outcomes?.length > 2 && (
                    <span
                      className="btn bg-red-400 text-xl font-semibold"
                      onClick={(e) => {
                        const evts = [...parlay.outcomes];
                        evts.splice(k, 1); // splice is an in-place method
                        setParlay({ ...parlay, outcomes: evts });
                      }}
                    >
                      &times;
                    </span>
                  )}
                </span>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-primary self-start"
              onClick={(e) => {
                if (parlay.outcomes?.length <= 3) {
                  setParlay({ ...parlay, outcomes: [...parlay.outcomes, ""] });
                } else {
                  notification.error({
                    message: "Maximum outcomes reached.",
                    duration: 4,
                  });
                }
              }}
            >
              Add Outcome
            </button>
          </div>

          <div className="w-1/3">
            <label>Entry price $</label>
            <TextInput
              className="w-full"
              value={parlay.entry_amount}
              placeholder="$1.00"
              onChange={(e) =>
                setParlay({ ...parlay, entry_amount: e.target.value })
              }
            />
          </div>

          <div className="w-1/2">
            <label>Start Date</label>
            <div className="flex gap-x-3">
              <DateInput
                type={"date"}
                value={formatDate(parlay.start_date)}
                min={minStartDate}
                className="w-full"
                onChange={(e) => {
                  setParlay({ ...parlay, start_date: e.target.value });
                }}
              />
              <DateInput
                type={"time"}
                value={parlay.start_time}
                className="w-full"
                onChange={(e) => {
                  setParlay({ ...parlay, start_time: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="w-1/2">
            <label>End Date</label>
            <div className="flex gap-x-3">
              <DateInput
                type={"date"}
                value={formatDate(parlay.close_date)}
                min={minEndDate}
                className="w-full"
                onChange={(e) => {
                  setParlay({ ...parlay, close_date: e.target.value });
                }}
              />
              <DateInput
                type="time"
                className="w-full"
                value={parlay.close_time}
                onChange={(e) => {
                  setParlay({ ...parlay, close_time: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-x-2 w-full">
            <button type="submit" className="col-span-5 btn bg-blue-400 w-full">
              Publish
            </button>

            <button
              type="button"
              className="btn w-full bg-red-400"
              onClick={(e) => {
                saveParlay({ ...parlay, status: 0 });
              }}
            >
              Save draft <SaveFilled />
            </button>
          </div>
        </div>

        {/* Parlay preview */}
        {!editing ? (
          <ParlayCardPreview parlay={parlay} />
        ) : (
          <div className="col-span-2">
            <DraftParlayCard parlay={parlay} no_action />
          </div>
        )}
      </Container>
    </form>
  );
};

const CreateParlay = () => {
  const [parlay, setParlay] = useState({ ...EmptyParlay });

  /**
   * @type {React.MutableRefObject<HTMLFormElement>}
   */
  const formRef = useRef();
  const navigate = useNavigate();

  const [create, createHook] = useCreateParlayMutation();

  const saveParlay = async (parlay) => {
    try {
      const data = await create(parlay).unwrap();
      notification.success({
        message: data.message || "Success",
        duration: 4,
      });

      if (data.is_draft) {
        navigate("/drafts");
      } else {
        navigate(`/parlays/${data.code}`);
      }
    } catch (error) {
      notification.error({
        message: error.data.error,
        duration: 4,
      }); console.error(error);
    }
  };

  return (
    <ParlayForm
      parlayHook={[parlay, setParlay]}
      formRef={formRef}
      publishParlay={saveParlay}
      saveParlay={saveParlay}
    />
  );
};

export default CreateParlay;
