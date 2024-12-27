import { useState } from "react";
import { Container, TextInput } from "../components/Container";
import { useFundWalletMutation, useGetAuthQuery } from "../endpoints/api";
import { notification } from "antd";
import PaystackPop from "@paystack/inline-js";

/**
 * @typedef {import('../types')}
 */

const Deposit = () => {
  /**
   * @type {{data: User}}
   */
  const { data: user } = useGetAuthQuery();

  const [amount, setAmount] = useState(0);

  const [deposit, depositHook] = useFundWalletMutation();

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

      console.log(data);

      const popup = new PaystackPop();

      const tx = popup.resumeTransaction(data.transaction.access_code, {
        onSuccess: (data) => {
          // TODO: submit transaction reference to backend for verification and giving value to user
        },
      });
      console.log(tx);
    } catch (err) {
      notification.error({
        message: err.message || "An error has occurred.",
        duration: 3,
      });
      console.error(err);
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
    </Container>
  );
};

export default Deposit;
