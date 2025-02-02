export { Page };

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from '../../components/AuthProvider/AuthProvider';


const stripePromise = loadStripe("pk_test_51Qn6p4RoO280mx7jwfqkc7gummGs3CyKz5DPUgDVvzgh0faWbQCd6xZszEMfZbw88OsvZnM7EUd5msyNSslt3xu4000T32JdeY");

function Page() {
  const [amount, setAmount] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { ensureValidToken, user } = useAuth();

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Starting payment request with amount:", amount);

      const token = await ensureValidToken();
      if (!token) {
        throw new Error("Unauthorized: Failed to get authentication token.");
      }

      const response = await fetch("https://api.cheap.chat/createPaymentSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Origin": window.location.origin
        },
        body: JSON.stringify({ 
          amount: Number(amount), 
          userId: user?.userId || "unknown"
        })
      });

      const data = await response.json();
      console.log("Response from API:", data);

      if (!response.ok || !data.id) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }
      await stripe.redirectToCheckout({ sessionId: data.id });

    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Buy CheapChat Credits</h1>
      <p>Enter the amount (in USD) you want to purchase:</p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", margin: "10px", fontSize: "16px", width: "200px" }}
      />

      <br />

      <button
        onClick={handlePayment}
        disabled={!amount || loading}
        style={{
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          padding: "10px 20px",
          fontSize: "18px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "5px"
        }}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
