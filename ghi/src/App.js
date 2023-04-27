// import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SockFeed from "./components/feed.js";
import Login from "./components/auth/login.js";
import Signup from "./components/auth/signup.js";
import SockDrawer from "./components/sockdrawer.js";
import VerificationList from "./components/verificationList.js";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./nav.js";
import ListUsers from "./components/listAllUsers.js";
import SockDetail from "./components/sockdetail.js";
import VerificationCreate from "./components/verificationCreate.js";
import CreateSock from "./components/createSocks.js";
import MatchList from "./components/matchList.js";
import Footer from "./footer.js";
import ErrorPage from "./components/errorpage.js";

function App() {
  //   const [launch_info, setLaunchInfo] = useState([]);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     async function getData() {
  //       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //       console.log("fastapi url: ", url);
  //       let response = await fetch(url);
  //       console.log("------- hello? -------");
  //       let data = await response.json();

  //       if (response.ok) {
  //         console.log("got launch data!");
  //         setLaunchInfo(data.launch_details);
  //       } else {
  //         console.log("drat! something happened");
  //         setError(data.message);
  //       }
  //     }
  //     getData();
  //   }, []);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <Routes>
        <Route path="" element={<SockFeed />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verifications" element={<VerificationList />} />
        <Route path="users">
          <Route path="" element={<ListUsers />} />
          <Route path="verify" element={<VerificationCreate />} />
        </Route>
        <Route path="socks">
          <Route path="create" element={<CreateSock />} />
          <Route path="sockdrawer" element={<SockDrawer />} />
          <Route path=":id" element={<SockDetail />} />
        </Route>
        <Route path="matches">
          <Route path="" element={<MatchList />} />
          <Route path=":id" />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "#fff5db",
          color: "#79aadd",
          fontFamily: "Comfortaa",
          border: "2px solid #79aadd ",
          borderRadius: "5px",
        }}
      />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
