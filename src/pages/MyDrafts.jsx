import { Container } from "../components/Container";
import { DraftParlayCard, ParlayCardPreview } from "../components/ParlayCard";
import { useGetDraftsQuery } from "../endpoints/parlays";

const MyDrafts = () => {
  /**
   * @type {{data: Parlay[]}}
   */
  const { data, isLoading, isError, isSuccess } = useGetDraftsQuery();

  return (
    <Container className="mt-4">
      <h2 className="text-3xl">Your drafts</h2>
      <div className="py-4"></div>
      <div className="grid grid-cols-4 gap-x-3 justify-items-center items-center">
        {data?.map((parlay, k) => (
          <DraftParlayCard key={k} parlay={parlay} />
        ))}
      </div>
    </Container>
  );
};

export default MyDrafts;
