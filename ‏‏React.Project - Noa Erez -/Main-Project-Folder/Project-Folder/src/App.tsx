import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import LogIn from "./Pages/LogIn/LogIn";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/RouteGuard";
import CreateCard from "./Pages/CreateCard/CreateCard";
import CardDetails from "./Components/CardDetails";

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow overflow-auto">
      
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
      
        <Route path="/LogIn" element={<LogIn />} />

        <Route path="/card/:id" element={<CardDetails />} />

        <Route
          path="/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />

        <Route
          path="/create-card"
          element={
            <RouteGuard isBiz={true}>
              <CreateCard />
            </RouteGuard>
          }
        />
      </Routes>
      <Footer />
      </main>
    </div>
  );
}

export default App;
