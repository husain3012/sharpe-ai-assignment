import { useState } from "react";
import toast from "react-hot-toast";
import validator from "validator";
import web3 from 'web3'

interface IFormValues<T> {
  value: T | null;
  error: string | null;
}

const MIN_TRANSACTION_AMOUNT = 100;
const MAX_TRANSACTION_AMOUNT = 10000000000000;

const TransactionForm = () => {
  /* --------------------------------- States --------------------------------- */
  const [walletAddress, setWalletAddress] = useState<IFormValues<string>>({
    value: "",
    error: null,
  });
  const [transactionAmount, setTransactionAmount] = useState<
    IFormValues<number>
  >({ value: null, error: null });

  /* -------------------------------- Handlers -------------------------------- */

  const handleWalletAddressChange = (address: string) => {
    const errors = Array<string>();
    if (!validator.isEthereumAddress(address)) {
      errors.push("Invalid ETH Address");
    }

    setWalletAddress({
      value: address,
      error: errors.length ? errors.join(", ") : null,
    });
  };

  const handleTransactionAmountChange = (amount: string) => {
    const errors = Array<string>();

    if (!validator.isNumeric(amount)) {
      errors.push("Invalid Number");
    }

    if (parseInt(amount) < MIN_TRANSACTION_AMOUNT) {
      errors.push(`Min amount is ${MIN_TRANSACTION_AMOUNT}`);
    }

    if (parseInt(amount) > MAX_TRANSACTION_AMOUNT) {
      errors.push(`Max amount is ${MAX_TRANSACTION_AMOUNT}`);
    }

    setTransactionAmount({
      value: parseInt(amount),
      error: errors.length ? errors.join(", ") : null,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (walletAddress.value === null || walletAddress.error != null) {
      toast.error("Please check wallet address");
      return;
    }
    if (transactionAmount.value === null || transactionAmount.error != null) {
      toast.error("Please check transaction amount");
      return;
    }

    setTransactionAmount({
      value: null,
      error: null,
    });
    setWalletAddress({
      value: "",
      error: null,
    });
    const amountInEth = web3.utils.fromWei(transactionAmount.value.toString(), 'ether')
    
    const formattedWalletAddress = walletAddress.value.slice(0,3) + "..." + walletAddress.value.slice(-4)

    toast.success(
      `Transaction of ${amountInEth} ETH to ${formattedWalletAddress} is successful!`, {duration:7000}
    );
    console.log("Submit");
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title">Transaction</h2>

        <div className="flex flex-col gap-4">
          <label className="form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Ethereum Wallet Address</span>
            </div>
            <input
              type="text"
              placeholder="0x6da6..."
              className={`input input-bordered w-full max-w-sm ${
                walletAddress.error ? "input-error" : ""
              }`}
              value={walletAddress.value || ""}
              onChange={(e) => handleWalletAddressChange(e.target.value)}
            />
          </label>

          <div className="label">
            <span className="label-text-alt">{walletAddress.error}</span>
          </div>

          <label className="form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Amount</span>
              <span className="label-text">in Wei</span>

            </div>
            <input
              type="number"
              min={MIN_TRANSACTION_AMOUNT}
              max={MAX_TRANSACTION_AMOUNT}
              placeholder="1000000"
              className={`input input-bordered w-full max-w-sm ${
                transactionAmount.error ? "input-error" : ""
              }`}
              value={transactionAmount.value || ""}
              onChange={(e) => handleTransactionAmountChange(e.target.value)}
            />
            <div className="label">
              <span className="label-text-alt">{transactionAmount.error}</span>
            </div>
          </label>
        </div>
        <br />
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
