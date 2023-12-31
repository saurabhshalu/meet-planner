import ReactLogo from "../assets/cookie.svg";

/* eslint-disable react/prop-types */
export default function LoginRegisterHeader({ isWhat }) {
  let title = "";
  console.log(isWhat);
  if (isWhat === "Register") {
    title = "Register User";
  } else if (isWhat === "Login") {
    title = "Login";
  } else if (isWhat === "OTP") {
    title = "Verify OTP";
  }
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          src={ReactLogo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
    </>
  );
}
