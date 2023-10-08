import LoginRegisterHeader from "../LoginRegisterHeader/LoginRegisterHeader.jsx";

function OtpVerification() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <LoginRegisterHeader isWhat="OTP" />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              OPT
            </label>
            <div className="mt-2">
              <input
                id="otp"
                name="otp"
                type="number"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
