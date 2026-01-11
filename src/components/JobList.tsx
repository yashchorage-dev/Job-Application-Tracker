import { useEffect, useState } from "react";
import { subscribeToJobs } from "../services/jobService";
import type { Job } from "../types/Job";
import { useAuth } from "../context/AuthContext";
import { updateJobStatus } from "../services/jobService";
import type { JobStatus } from "../types/Job";
import { deleteJob } from "../services/jobService";

const JobList = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToJobs(user.uid, (fetchedJobs) => {
      setJobs(fetchedJobs);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p>No job applications yet.</p>;
  }

  return (
    <div>
      <h2>Your Applications</h2>

      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <h3>{job.company}</h3>
          <p>Role: {job.role}</p>
          <label>
            Status:{" "}
            <select
              value={job.status}
              onChange={(e) =>
                updateJobStatus(user!.uid, job.id, e.target.value as JobStatus)
              }
            >
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this job?"
                );

                if (confirmed) {
                  deleteJob(user!.uid, job.id);
                }
              }}
            >
              Delete
            </button>
          </label>

          <p>Applied On: {job.appliedDate}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
