import { useState } from "react";
import { Container, TextInput } from "../components/Container";
import {
  useFundWalletMutation,
  useGetAuthQuery,
  useVerifyFundingMutation,
} from "../endpoints/api";
import { notification } from "antd";
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router";

/**
 * @typedef {import('../types')}
 */

const Deposit = () => {
  /**
   * @type {{data: User}}
   */
  const { data: user } = useGetAuthQuery();

  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);

  const navigate = useNavigate();

  const [deposit, depositHook] = useFundWalletMutation();
  const [verify, verifyHook] = useVerifyFundingMutation();

  const submitRequest = async (e) => {
    if (Number(amount) < 100) {
      notification.error({
        message: "Amount should be greater or equal to 100",
        duration: 3,
      });
      return;
    }

    try {
      const data = await deposit({ email: user.email, amount }).unwrap();
      const popup = new PaystackPop();

      popup.resumeTransaction(data.transaction.access_code, {
        onSuccess: (data1) => {
          setTx(data1);
          setTransaction(data.data);
        },
        onError: console.log,
        onCancel: console.log,
      });
    } catch (err) {
      notification.error({
        message: err.message || "An error has occurred.",
        duration: 3,
      });
      console.error(err);
    }
  };

  const verifyTransaction = async () => {
    // ! submit transaction reference to backend for verification and giving value to user
    try {
      const r = await verify({
        ...tx,
        transaction_id: transaction.id,
      }).unwrap();

      setTransaction(undefined);
      setTx(undefined);

      navigate("/");
    } catch (error) {
      console.error(error);
      notification.error({
        message: error.data.message || "Could not verify your deposit.",
        duration: 3,
      });
    }
  };

  return (
    <Container className="grid place-items-center gap-y-3">
      <TextInput
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="btn btn-primary"
        disabled={depositHook.isLoading}
        onClick={submitRequest}
      >
        Deposit
      </button>

      {tx && (
        <button
          className="btn btn-primary"
          disabled={verifyHook.isLoading}
          onClick={verifyTransaction}
        >
          I've completed the payment.
        </button>
      )}
    </Container>
  );
};

export default Deposit;
