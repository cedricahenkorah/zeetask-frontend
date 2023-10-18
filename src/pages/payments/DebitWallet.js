import { useState } from "react";
import { useParams } from "react-router-dom";

const DebitWallet = () => {
  const { teamId } = useParams();

  const [customerName, setCustomerName] = useState("");
  const [mno, setMno] = useState("Zeepay");
  const [amount, setAmount] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [reference, setReference] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDebit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const debit = { customerName, mno, amount, msisdn, teamId, reference };

    if (!customerName || !mno || !amount || !msisdn)
      return alert("Please fill in all fields");

    console.log(debit);

    const response = await fetch(
      "http://localhost:5000/api/payments/debit-mobile-wallet",
      {
        method: "POST",
        body: JSON.stringify(debit),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log("debit: ", json);

    if (!response.ok) {
      console.log(json.error);
      setIsLoading(false);
      setError(json.error);
      setCustomerName("");
      setAmount("");
      setMno("");
      setMsisdn("");
    }

    if (response.ok) {
      setIsLoading(false);
      setCustomerName("");
      setAmount("");
      setMno("");
      setMsisdn("");
      alert("payment made");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-20">
      <main className="flex-1 flex flex-col items-center">
        {/* register form */}
        <div className="bg-white rounded-2xl shadow-lg text-black">
          <div className="px-10 lg:px-20 py-8 lg:py-8">
            {/* <IoMdArrowRoundBack size={30} onClick={goBack} /> */}

            <h1 className="text-lg lg:text-2xl font-bold tracking-wide mt-3">
              SUBSCRIPTION PAYMENT
            </h1>

            <p className="text-gray-400 text-sm lg:text-base mt-1">
              Make payment to activate your account and team
            </p>

            {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )}

            <form className="mt-5 flex flex-col" onSubmit={handleDebit}>
              <div className="flex flex-col">
                <label className="text-sm lg:text-base">Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Network</label>
                  <select
                    name="mno"
                    value={mno}
                    onChange={(e) => setMno(e.target.value)}
                  >
                    <option value="">Choose a mobile network</option>
                    <option value="Zeepay">Zeepay</option>
                    <option value="MTN">MTN</option>
                    <option value="Vodafone">Vodafone</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Mobile Number</label>
                  <input
                    type="number"
                    value={msisdn}
                    onChange={(e) => setMsisdn(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm lg:text-base">Reference</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                  />
                </div>
              </div>

              {!isLoading ? (
                <button className="w-full bg-green-500 text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3">
                  Make payment
                </button>
              ) : (
                <button
                  className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
                  disabled
                >
                  Hold on...
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DebitWallet;
