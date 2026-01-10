import { useState } from "react";
import { addJob } from "../services/jobService";
import type{ JobStatus } from "../types/Job";
import { useAuth } from "../context/AuthContext";

const AddJobForm = () => {
  const { user } = useAuth();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("APPLIED");
  const [appliedDate, setAppliedDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("User not authenticated");
      return;
    }

    if (!company || !role || !appliedDate) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await addJob(user.uid, {
        company,
        role,
        status,
        appliedDate,
      });

      // reset form
      setCompany("");
      setRole("");
      setStatus("APPLIED");
      setAppliedDate("");
    } catch (err) {
      setError("Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Job</h2>

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as JobStatus)}
      >
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <input
        type="date"
        value={appliedDate}
        onChange={(e) => setAppliedDate(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Job"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default AddJobForm;
