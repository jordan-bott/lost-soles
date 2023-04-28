import React from "react";
import { useNavigate } from "react-router-dom";

function LoginError() {
  const navigate = useNavigate();
  return (
    <div className="h-screen error-page scrollbar-none overflow-hidden">
      <div className="h-[calc(100%-8rem)] flex flex-col items-center justify-center w-screen bg-black">
        <div>
          <p className="text-4xl decoration-8 text-center place-content-center">
            Uh oh. Looks like you're not logged in.
          </p>
          <div className="flex place-content-center gap-x-12 mt-12">
            <button
              className="p-2 text-xl bg-lorange border-blue border-2 hover:scale-105 rounded-lg w-[120px]"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="p-2 text-xl bg-yellow border-blue border-2 hover:scale-105 rounded-lg w-[120px]"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginError;
