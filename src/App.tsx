import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (!user) {
    return (
      <>
        <Signup />
        <Login />
      </>
    );
  }

  return <Dashboard />;
}

export default App;
