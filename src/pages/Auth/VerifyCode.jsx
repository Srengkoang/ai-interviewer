import React, { useState, useRef } from "react";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next box automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    const verifyCode = code.join("");
    console.log(verifyCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-3xl font-bold mb-4">
          Verify Your Account
        </h1>

        <p className="mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex gap-3 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              className="
                w-12 h-12
                text-center
                text-xl
                font-bold
                border
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-[#9AB17A]
              "
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="
            mt-8
            px-8
            py-3
            rounded-lg
            bg-[#9AB17A]
            text-white
            font-semibold
          "
        >
          Verify
        </button>

      </div>
    </div>
  );
};

export default VerifyCode;