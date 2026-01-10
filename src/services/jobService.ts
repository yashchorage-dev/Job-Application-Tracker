import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { JobStatus } from "../types/Job";

interface AddJobInput {
  company: string;
  role: string;
  status: JobStatus;
  appliedDate: string;
  location?: string;
  notes?: string;
}

export const addJob = async (userId: string, job: AddJobInput) => {
  const jobsRef = collection(db, "users", userId, "jobs");

  await addDoc(jobsRef, {
    ...job,
    createdAt: serverTimestamp(),
  });
};
