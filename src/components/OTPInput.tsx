"use client";
import React, {
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on empty input
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      if (i >= 6) break;
      newOtp[i] = pasteData[i];

      // Update the input field display
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pasteData[i];
      }
    }

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const focusIndex = Math.min(pasteData.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  // Get the complete OTP value
  // const getOtpValue = (): string => {
  //   return otp.join("");
  // };

  return (
    <div className="flex flex-col items-center gap-4 ">
      <div className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              ref={(ref: HTMLInputElement) => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-2xl font-bold  bg-transparent
                      border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49] text-center 
                      rounded-md outline-none focus:ring-2 focus:ring-lime-500"
              autoComplete="off"
            />
          ))}
      </div>
    </div>
  );
};

export default OTPInput;
