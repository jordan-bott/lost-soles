import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SockFeed from "./components/feed.jsx";
import Login from "./components/auth/login.jsx";
import Signup from "./components/auth/signup.jsx";
import SockDrawer from "./components/sockdrawer.jsx";
import VerificationList from "./components/verificationList.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/skeleton/nav.jsx";
import ListUsers from "./components/listAllUsers.jsx";
import SockDetail from "./components/sock_detail_page/sockdetail.jsx"
import VerificationCreate from "./components/verificationCreate.jsx";
import CreateSock from "./components/createSocks.jsx";
import MatchList from "./components/matchList.jsx";
import MatchApproval from "./components/matchApproval.jsx";
import Footer from "./components/skeleton/footer.jsx";
import UpdateUser from "./components/updateUser.jsx";
import ErrorPage from "./components/errorpage.jsx";
import AdminSignup from "./components/auth/adminSignup.jsx";

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
