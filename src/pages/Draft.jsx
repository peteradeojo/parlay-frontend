import { useParams } from "react-router";
import { useGetParlayQuery } from "../endpoints/parlays";
import { Container } from "../components/Container";
import { useEffect, useRef, useState } from "react";
import { ParlayForm, EmptyParlay } from "../pages/CreateParlay";

const Draft = () => {
  const params = useParams();

  const { data, isLoading, isSuccess, isError } = useGetParlayQuery(params.id);

  const [parlay, setParlay] = useState({ ...data });

  useEffect(() => {
    if (data) {
      setParlay((prev) => ({ ...data }));
    }
  }, [data]);

  const formRef = useRef();
  const saveDraft = (parlay) => {};

  console.log(data);

  return (
    <>
      {isSuccess && data ? (
        <ParlayForm
          parlayHook={[parlay, setParlay]}
          formRef={formRef}
          saveParlay={saveDraft}
          editing
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Draft;
