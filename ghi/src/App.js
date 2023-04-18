// import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SockFeed from "./components/feed.js";
import Login from "./components/auth/login.js";
import Logout from "./components/auth/logout.js";
import Signup from "./components/user/signup.js";

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
      <Routes>
        <Route path="" element={<SockFeed />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verification" />
        <Route path="users">
          <Route path="verify" />
        </Route>
        <Route path="socks">
          <Route path="create" />
          <Route path="sockdrawer" />
        </Route>
        <Route path="matches">
          <Route path="request" />
          <Route path="approve" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
