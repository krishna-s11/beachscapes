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
import Destinations from "./Components/AdminPanel/Destinations/Destinations";
import Destinations2 from "./Components/AdminPanel/Destinations2/Destinations2";
import Lead from "./Components/AdminPanel/Leads/Lead";
import AdminBlogs from "./Components/AdminPanel/Blogs/Blogs";
import Homepage from "./Components/AdminPanel/Homepage/Homepage";
import { useEffect, useState } from "react";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Components/Footer/Footer";

// import Product from "./Pages/Product/Product";

function App() {
  let location = useLocation();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (!location.pathname.includes("admin")) {
      setTimeout(() => {
        setPopup(true);
      }, 20000);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      {popup ? (
        <Contact
          enquire
          close={() => {
            setPopup(false);
          }}
        />
      ) : null}
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
          path="/blog/:id"
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
            path="destinations_t2"
            element={
              <>
                <Destinations2 />
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
          <Route
            path="blogs"
            element={
              <>
                <AdminBlogs />
              </>
            }
          />
          <Route
            path="homepage"
            element={
              <>
                <Homepage />
              </>
            }
          />
        </Route>
      </Routes>
      {location.pathname.includes("admin") ? null : <Footer />}
    </div>
  );
}

export default App;
