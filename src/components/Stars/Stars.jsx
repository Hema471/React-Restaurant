import "./Stars.scss";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef } from "react";
const Stars = ({ stars }) => {
  const randomName = uuidv4(); // To Generate Random Name

  const inputRefs = useRef(Array(5).fill(null)); // Initialize as an array of length 5 with null values

  useEffect(() => {
    switch (stars) {
      case 1:
        inputRefs.current[0].disabled = false;
        inputRefs.current[1].disabled = true;
        inputRefs.current[2].disabled = true;
        inputRefs.current[3].disabled = true;
        inputRefs.current[4].disabled = true;
        break;
      case 2:
        inputRefs.current[0].disabled = false;
        inputRefs.current[1].disabled = false;
        inputRefs.current[2].disabled = true;
        inputRefs.current[3].disabled = true;
        inputRefs.current[4].disabled = true;
        break;
      case 3:
        inputRefs.current[0].disabled = false;
        inputRefs.current[1].disabled = false;
        inputRefs.current[2].disabled = false;
        inputRefs.current[3].disabled = true;
        inputRefs.current[4].disabled = true;
        break;
      case 4:
        inputRefs.current[0].disabled = false;
        inputRefs.current[1].disabled = false;
        inputRefs.current[2].disabled = false;
        inputRefs.current[3].disabled = false;
        inputRefs.current[4].disabled = true;
        break;
      case 5:
        inputRefs.current[0].disabled = false;
        inputRefs.current[1].disabled = false;
        inputRefs.current[2].disabled = false;
        inputRefs.current[3].disabled = false;
        inputRefs.current[4].disabled = false;
        break;
      default:
        console.log("Error In Stars Switch");
    }
  }, [stars]);

  const r1 = uuidv4();
  const r2 = uuidv4();
  const r3 = uuidv4();
  const r4 = uuidv4();
  const r5 = uuidv4();

  return (
    <div className="my-stars-rating">
      {/* The defaultChecked in radio buttons is reversed */}
      <div className="rating">
        <input
          type="checkbox"
          name={randomName}
          id={r1}
          ref={(el) => (inputRefs.current[4] = el)}
          defaultChecked={stars === 5}
        />
        <label htmlFor={r1} />
        <input
          type="checkbox"
          name={randomName}
          id={r2}
          ref={(el) => (inputRefs.current[3] = el)}
          defaultChecked={stars === 4}
        />
        <label htmlFor={r2} />
        <input
          type="checkbox"
          name={randomName}
          id={r3}
          ref={(el) => (inputRefs.current[2] = el)}
          defaultChecked={stars === 3}
        />
        <label htmlFor={r3} />
        <input
          type="checkbox"
          name={randomName}
          id={r4}
          ref={(el) => (inputRefs.current[1] = el)}
          defaultChecked={stars === 2}
        />
        <label htmlFor={r4} />
        <input
          type="checkbox"
          name={randomName}
          id={r5}
          ref={(el) => (inputRefs.current[0] = el)}
          defaultChecked={stars === 1}
        />
        <label htmlFor={r5} />
      </div>
    </div>
  );
};

export default Stars;
