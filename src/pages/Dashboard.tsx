import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome: {user?.email}</p>

      <AddJobForm />
      <JobList />

      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default Dashboard;
