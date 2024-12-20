import { useState } from "react";
import { Container, TextInput } from "../components/Container";

const CreateParlay = () => {
  const [events, setEvents] = useState(["", ""]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Container className="grid grid-cols-5">
        <div className="col-start-2 col-span-3 rounded-md border-2 border-white p-3 flex flex-col gap-3 items-start">
          <h1 className="text-2xl">Set your parlay</h1>
          <div className="w-full">
            <label>Title</label>
            <TextInput className="w-full" />
          </div>

          <div className="w-full flex flex-col gap-3 py-3">
            {events.map((i, k) => (
              <div className="w-full" key={k}>
                <label>Outcome {k + 1}</label>
                <TextInput
                  className="w-full"
                  placeholder={`outcome ${k + 1}`}
                  value={events[k]}
                  onChange={(e) => {
                    const evts = [...events];
                    evts[k] = e.target.value;
                    setEvents(evts);
                  }}
                  required
                />
              </div>
            ))}

            <button className="btn self-start">Add Outcome</button>
          </div>

          <div className="w-1/3">
            <label>Min. entry price $</label>
            <TextInput className="w-full" placeholder="$1.00" />
          </div>

          <div className="w-1/2">
            <label>Start Date</label>
            <div className="flex gap-x-3">
              <TextInput type={"date"} className="w-full" />
              <TextInput type={"time"} className="w-full" />
            </div>
          </div>

          <div className="w-1/2">
            <label>End Date</label>
            <div className="flex gap-x-3">
              <TextInput type={"date"} className="w-full" />
              <TextInput type="time" className="w-full" />
            </div>
          </div>

          <button className="btn w-full">Set</button>
        </div>
      </Container>
    </form>
  );
};

export default CreateParlay;
