import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Job, JobStatus } from "../types/Job";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";


//  ADD JOB

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

export const updateJobStatus = async (
  userId: string,
  jobId: string,
  status: JobStatus
) => {
  const jobRef = doc(db, "users", userId, "jobs", jobId);

  await updateDoc(jobRef, {
    status,
  });
};

export const deleteJob = async (userId: string, jobId: string) => {
  const jobRef = doc(db, "users", userId, "jobs", jobId);
  await deleteDoc(jobRef);
};



//  SUBSCRIBE TO JOBS

export const subscribeToJobs = (
  userId: string,
  callback: (jobs: Job[]) => void
) => {
  const jobsRef = collection(db, "users", userId, "jobs");
  const q = query(jobsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const jobs: Job[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        company: data.company,
        role: data.role,
        status: data.status,
        appliedDate: data.appliedDate,
        location: data.location,
        notes: data.notes,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toMillis()
            : Date.now(),
      };
    });

    callback(jobs);
  });
};
