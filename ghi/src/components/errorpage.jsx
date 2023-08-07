import React from "react";

function ErrorPage() {
  return (
    <div className="h-screen error-page">
      <div className="h-[calc(100%-8rem)] flex flex-col items-center justify-center w-screen bg-black">
        <div>
          <p className="text-4xl decoration-8 text-center place-content-center">
            (╯°□°）╯ uh oh, you're more lost than your other sock! ヽ(°□°ヽ)
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
