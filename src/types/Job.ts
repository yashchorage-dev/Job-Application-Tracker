export type JobStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  appliedDate: string;
  location?: string;
  notes?: string;
  createdAt: number;
}
