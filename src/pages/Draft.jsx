import { useNavigate, useParams } from "react-router";
import {
  useGetParlayQuery,
  useUpdateParlayMutation,
} from "../endpoints/parlays";
import { useEffect, useRef, useState } from "react";
import { ParlayForm } from "../pages/CreateParlay";
import { notification } from "antd";

const Draft = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError } = useGetParlayQuery(params.id);

  const [parlay, setParlay] = useState(undefined);

  const [update, updateHook] = useUpdateParlayMutation();

  useEffect(() => {
    if (data) {
      if (data.status != 0) {
        navigate("/");
        return;
      }
      setParlay(() => ({ ...data }));
    }
  }, [data]);

  const formRef = useRef();
  const saveDraft = async (parlay) => {
    parlay.status = 0;

    try {
      const data = await update(parlay).unwrap();
      navigate("/drafts");
    } catch (error) {
      console.error(error);
      notification.error({
        message: error.data.message,
        duration: 3,
      });
    }
  };

  /**
   *
   * @param {ParlayType} parlay
   */
  const publish = async (parlay) => {
    parlay.status = 1;
    try {
      await update(parlay).unwrap();
      notification.success({
        message: "Parlay published!.",
        duration: 3,
      });

      // navigate("/");
    } catch (error) {
      console.error(error);
      notification.error({
        message: error.data.message,
        duration: 3,
      });
    }
  };

  return (
    <>
      {parlay != undefined ? (
        <ParlayForm
          parlayHook={[parlay, setParlay]}
          formRef={formRef}
          saveParlay={saveDraft}
          publishParlay={publish}
          editing
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Draft;
