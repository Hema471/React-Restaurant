import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiClient } from "./../../Data/apiclient";
import { toast } from "react-toastify";
import { useSignal } from "@preact/signals-react";

export default function ForgotPass() {
  const msg = useSignal("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const m = useMutation({
    mutationKey: [],
    // cacheTime: 600000,
    // onSuccess: onSuccess,
    // onError: onError,
    mutationFn: async (params) => {
      console.log("trying to load");
      let url = "/api/users/forget-password";
      console.log("posting to ", url);
      return await apiClient.post(url, params);
    },
  });

  const onSubmit = async function (data) {
    const result = await m.mutateAsync({ email: data.email });
    // alert(result.data.msg);
    msg.value = result.data.msg;
    notify(msg.value);
  };
  function notify(msg) {
    if (msg === "Email Send Successfully") {
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="container text-center">
      <div className="row justify-content-center" style={{ marginTop: "30vh" }}>
        <div className="col-md-6 font-weight-bold">
          <h2 style={{ color: "#ff4500", fontWeight: "bold" }}>
            Forgot Your Password?
          </h2>
          <p style={{ color: "#795d9a" }}>
            Enter your email below and we will send you a reset link
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              Send
            </button>
          </form>
          <div className="mt-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
