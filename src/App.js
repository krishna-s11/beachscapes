import Nav from "./Components/Nav/Nav";
import Landing from "./Pages/Landing/Landing";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Tours from "./Pages/Tours/Tours";
import AdminTours from "./Components/AdminPanel/Tours/Tours";
import Product from "./Pages/Product-new/Product";
import Blogs from "./Pages/Blogs/Blogs";
import Blog from "./Pages/Blog/Blog";
import Dashboard from "./Pages/AdminPanel/Dashboard/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";
import Destinations from "./Components/AdminPanel/Destinations/Destinations";
import Lead from "./Components/AdminPanel/Leads/Lead";
// import Product from "./Pages/Product/Product";

function App() {
  let location = useLocation();

  return (
    <div className="App">
      {location.pathname.includes("admin") ? null : (
        <Nav
          colour={
            location.pathname.includes("tours") ||
            location.pathname.includes("tour")
              ? "#F5F5F5"
              : null
          }
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
            </>
          }
        />
        <Route
          path="/tours"
          element={
            <>
              <Tours />
            </>
          }
        />
        <Route
          path="/tours/:destination"
          element={
            <>
              <Tours />
            </>
          }
        />
        <Route
          path="/tour/:id"
          element={
            <>
              <Product />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <Blogs />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Blog />
            </>
          }
        />
        <Route
          path="/admin/dashboard/*"
          element={
            <>
              <Dashboard />
            </>
          }
        >
          <Route
            path="tours"
            element={
              <>
                <AdminTours />
              </>
            }
          />
          <Route
            path="destinations"
            element={
              <>
                <Destinations />
              </>
            }
          />
          <Route
            path="leads"
            element={
              <>
                <Lead />
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
