import { Container } from "../components/Container";
import { ParlayCard } from "../components/ParlayCard";
import { useMyParlaysQuery } from "../endpoints/parlays";

const Parlays = () => {
  const { data, isLoading } = useMyParlaysQuery();

  return (
    <Container>
      <div className="grid grid-cols-4 gap-x-3 gap-y-3">
        {data?.map((parlay, i) => (
          <ParlayCard parlay={parlay} key={i} />
        ))}
      </div>
    </Container>
  );
};

export default Parlays;
