import { Container } from "../components/Container";
import { DraftParlayCard, ParlayCard } from "../components/ParlayCard";
import { useGetAuthQuery } from "../endpoints/api";
import { useTopParlaysQuery } from "../endpoints/parlays";

// const ParlayCard = ({ code, title }) => (
//   <div className="border-4 border-white p-4 rounded-md font-semibold">
//     <p className="font-bold">{code}</p>
//     <p>{title}</p>
//     <div className="h-64 bg-slate-400"></div>
//     <p>Min entry: $1.00</p>
//     <button className="btn font-normal">Enter this parlay</button>
//   </div>
// );

const Home = () => {
  const { data, isLoading, isSuccess } = useTopParlaysQuery();
  const { data: user } = useGetAuthQuery();

  return (
    <Container>
      <h1 className="text-2xl mb-4 text-center">Top parlays</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2">
            {data.length > 0 ? (
              data.map((i, k) => (
                <ParlayCard
                  parlay={i}
                  key={k}
                  isMine={i.creator_id == user.id}
                />
              ))
            ) : (
              <div className="grid col-span-4 h-64 place-items-center w-full">
                No parlays found.
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Home;
