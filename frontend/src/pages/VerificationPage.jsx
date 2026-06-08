import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const VerificationPage = () => {
  const { id } = useParams();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // STEP 1: fetch claim
  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const res = await API.get(`/claims/${id}`);
        setClaim(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load claim");
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  // STEP 2: verify action
  const handleVerify = async (action, force = false) => {
    try {
      setActionLoading(true);

      const res = await API.post(`/claims/${id}/verify`, {
        action,
        force,
      });

      setClaim(res.data.claim); // update UI after decision
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!claim) return <div className="p-6">No claim found</div>;

  const item = claim.itemId;
  const answers = claim.answers;

  return (
    <div className="min-h-screen bg-[#FDF0ED] p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-4">
          Claim Verification
        </h1>

        {/* SCORE */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Match Score</p>
          <p className="text-3xl font-bold text-[#5A735A]">
            {claim.score}%
          </p>
        </div>

        {/* ITEM INFO */}
        <div className="border p-4 rounded-xl mb-4">
          <h2 className="font-semibold mb-2">Item Details</h2>
          <p>{item?.description}</p>
        </div>

        {/* CLAIM ANSWERS */}
        <div className="border p-4 rounded-xl mb-4">
          <h2 className="font-semibold mb-2">Claim Answers</h2>

          <p><b>Description:</b> {answers?.description}</p>
          <p><b>Unique Marks:</b> {answers?.uniqueMarks}</p>
          <p><b>Inside Items:</b> {answers?.insideItems}</p>
          <p><b>Extra Proof:</b> {answers?.extraProof}</p>
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <p>
            Status:{" "}
            <span className="font-semibold">
              {claim.status}
            </span>
          </p>
        </div>

        {/* ACTION BUTTONS */}
        {claim.status === "pending" && (
          <div className="flex gap-3">

            <button
              disabled={actionLoading}
              onClick={() => handleVerify("approve")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>

            <button
              disabled={actionLoading}
              onClick={() => handleVerify("reject")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>

            {claim.score < 50 && (
              <button
                disabled={actionLoading}
                onClick={() => handleVerify("approve", true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Force Approve
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default VerificationPage;