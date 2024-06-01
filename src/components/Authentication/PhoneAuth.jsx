import { Link } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { useForm } from "react-hook-form";

const PinCodeAuth = () => {
  const msg = useSignal("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="container text-center">
      <div className="row justify-content-center" style={{ marginTop: "30vh" }}>
        <div className="col-md-6 font-weight-bold">
          <h2 style={{ color: "#ff4500", fontWeight: "bold" }}>
            Reset using phone number
          </h2>
          <p style={{ color: "#795d9a" }}>
            Enter your phone and email below and we will send you a reset code
          </p>
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <form onSubmit={handleSubmit()}>
            {/* 1 */}
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Enter Your Phone Number"
                type="number"
                {...register("phoneNumber", {
                  minLength: {
                    value: 11,
                    message: "Phone must have at least 11 digits",
                  },
                })}
              />
            </div>
            <div className="m-0">
              <span
                className="text-danger font-weight-bold"
                style={{ fontSize: "25px" }}
              >
                {errors.phoneNumber && errors.phoneNumber.message}
              </span>
            </div>
            {/* 2 */}
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Enter Your Email"
                id="email-address"
                name="email"
                type="email"
                required
                autoComplete="email"
                {...register("email", {
                  required: "Please enter your email address",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            <div className="m-0">
              <span
                className="text-danger font-weight-bold"
                style={{ fontSize: "25px" }}
              >
                {errors.email && errors.email.message}
              </span>
            </div>

            <button
              className="btn btn-primary btn-block border-none"
              type="submit"
              style={{ backgroundColor: "#ff4500" }}
            >
              Request Code
            </button>
          </form>
          {/* <div className="mt-3">
            <Link
              to="/phoneAuth"
              className="text-decoration-none font-weight-bold"
              style={{ color: "#795d9a" }}
            >
              Also you can use your phone number
            </Link>
          </div>
          <div className="mt-3">
            <Link
              to="/"
              className="text-decoration-none font-weight-bold"
              style={{ color: "#795d9a" }}
            >
              Back to Login
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PinCodeAuth;
