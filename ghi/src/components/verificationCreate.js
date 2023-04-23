import { useState } from "react";
import { useCreateVerificationMutation } from "../store/verificationsApi";
import detailLogo from "../images/detailLogo.png";

function VerificationCreate() {
  const [createVerification, result] = useCreateVerificationMutation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [license, setLicense] = useState("");

  const handleLicenseChange = (event) => {
    const value = event.target.value;
    setLicense(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVerification({
      license: license,
      user_id: 0,
      verification_status: "pending",
    });
    setShowSuccessMessage(true);
    setLicense("");
  };

  if (result.isSuccess && !showSuccessMessage) {
    setShowSuccessMessage(true);
  }

  return (
    <div className="flex mt-60 ml-[500px] gap-x-4 relative">
      <div className="px-8">
        <img
          src={detailLogo}
          className="w-[500px]"
          alt="two socks, left sock is transparent and made of dotted lines, right sock is orange with yellow toe and heal. Lost soles, helping you find your missing half."
        ></img>
      </div>
      {showSuccessMessage ? (
        <div className="mt-40 font-bold">
          Verification request submitted. Thank you!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="absolute flex flex-col left-[32%] top-[50%]"
        >
          <div>
            <label htmlFor="license">License URL</label>
            <input
              type="text"
              id="license"
              name="license"
              placeholder="License URL"
              className="border-2 border-blue bg-yellow p-2 rounded-lg w-[320px]"
              onChange={handleLicenseChange}
              value={license}
            />
            <button
              type="submit"
              className="bg-lorange text-white font-bold py-2 px-4 rounded-lg w-[20%] border-2 ml-44 mt-1 border-blue"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default VerificationCreate;
