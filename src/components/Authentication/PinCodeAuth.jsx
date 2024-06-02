import "./PinCodeAuth.scss";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useMutation } from "react-query";
import { apiClient } from "../../Data/apiclient";
import { useParams } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { useRef } from "react";
import { useEffect } from "react";
const PinCodeAuth = () => {
  const msg = useSignal();
  const { email, phoneNumber } = useParams();

  const emailRef = useRef();
  const phoneRef = useRef();
  console.log("email and phoneNumber", email, phoneNumber);

  const m = useMutation({
    mutationKey: ["reset-password-pinCode"],
    mutationFn: async (params) => {
      console.log("trying to load");
      let url = "/reset-password-sms";
      console.log("posting to ", url);
      return await apiClient.post(url, params);
    },
  });

  const onSubmit = async function (data) {
    console.log("Data to send", data);
    const result = await m.mutateAsync(data);

    console.log("reset-password-sms", result.data?.data);
  };

  // const [pins, setPins] = useState(Array(6).fill(""));
  // const [message, setMessage] = useState("");

  const pins = useSignal(Array(6).fill(""));
  const message = useSignal("");

  const handleChange = (index, value) => {
    const newPins = [...pins.value];
    newPins[index] = value;
    pins.value = newPins;

    // Focus the next input
    if (value && index < 5) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredPin = pins.value.join("");
    if (enteredPin === "123456") {
      message.value = "PIN code is correct!";
    } else {
      message.value = "Invalid PIN code.";
    }
  };

  console.log("My Code", pins.value.join(""));
  // To get phone and email
  useEffect(() => {
    console.log("emailRef", emailRef.current.value);
    console.log("phoneRef", phoneRef.current.value);
  }, []);

  return (
    <div className="pin-auth-container" style={{ marginTop: "25vh" }}>
      <h2 className="text-center">Enter PIN Code</h2>

      <Form onSubmit={handleSubmit} className="pin-form">
        {/* style={{ display: "none" }} */}
        <input type="text" value={email} ref={emailRef} />
        <input type="text" value={phoneNumber} ref={phoneRef} />
        <FormGroup className="pin-inputs">
          {pins.value.map((pin, index) => (
            <Input
              key={index}
              id={`pin-${index}`}
              type="text"
              value={pin}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength="1"
              className="pin-input"
            />
          ))}
        </FormGroup>
        <Button type="submit" className="btn-orange btn-block">
          Submit
        </Button>
      </Form>
      {message && <p className="text-center message">{message}</p>}
    </div>
  );
};

export default PinCodeAuth;
