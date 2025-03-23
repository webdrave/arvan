"use client";
import React, {
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

const OTPInput: React.FC<{
  otp: string[];
  setOtp: (otp: string[]) => void;
}> = ({ otp, setOtp }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 7);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (i >= 7) break;
      newOtp[i] = pasteData[i];
      if (inputRefs.current[i]) inputRefs.current[i].value = pasteData[i];
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-2xl font-bold text-center bg-transparent border-2 border-lime-400
                      rounded-md outline-none focus:ring-2 focus:ring-lime-500"
              autoComplete="off"
            />
          ))}
      </div>
    </div>
  );
};

export default OTPInput;
