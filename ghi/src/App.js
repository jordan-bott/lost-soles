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
import MatchApproval from "./components/matchApproval.js";
import Footer from "./footer.js";
import UpdateUser from "./components/updateUser.js";
import ErrorPage from "./components/errorpage.js";
import AdminSignup from "./components/auth/adminSignup.js";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <>
      <div className="h-screen">
        <BrowserRouter basename={basename}>
          <div className="h-[calc(100%-8rem)] scrollbar-thin scrollbar-thumb-orange">
            <Nav />
            <Routes>
              <Route path="" element={<SockFeed />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="admin" element={<AdminSignup />} />
              <Route path="verifications" element={<VerificationList />} />
              <Route path="users">
                <Route path="" element={<ListUsers />} />
                <Route path="verify" element={<VerificationCreate />} />
                <Route path=":id" element={<UpdateUser />} />
              </Route>
              <Route path="socks">
                <Route path="" element={<ErrorPage />} />
                <Route path="create" element={<CreateSock />} />
                <Route path="sockdrawer" element={<SockDrawer />} />
                <Route path=":id" element={<SockDetail />} />
              </Route>
              <Route path="matches">
                <Route path="" element={<MatchList />} />
                <Route path=":id" element={<MatchApproval />} />
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
                marginBottom: "50px",
              }}
            />
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
