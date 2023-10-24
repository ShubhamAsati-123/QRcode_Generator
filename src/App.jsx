import { useRef, useState, useCallback } from "react";
import { db } from "./config/firebase";
import { addDoc, collection } from "firebase/firestore";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

const Form = () => {
  const [link, setLink] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save the data to Firebase
    const qrcoderef = collection(db, "qrcode");
    await addDoc(qrcoderef, {
      link,
    });

    // Set the QR code value
    setQRCodeValue(link);

    // Reset the form
    setLink("");
  };

  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        setLink("");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="lg:h-128 lg:w-128 bg-slate-500 p-5 text-white">
        <h2 className="text-3xl lg:text-5xl text-center">QR Code Generator</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 my-10 mx-5"
        >
          <label htmlFor="Link">Enter the Link</label>
          <input
            className=" text-xl text-black"
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black py-1 bg-opacity-70 hover:bg-opacity-100"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center items-center flex-col ">
          {qrCodeValue && (
            <>
              <div
                className="flex flex-col justify-center items-center bg-black rounded-2xl bg-opacity-75 p-5"
                ref={ref}
              >
                <QRCode
                  size={192}
                  value={qrCodeValue}
                  viewBox={`0 0 256 256`}
                  className="border-8 rounded-xl"
                />
                <h1 className="text-3xl bg-gray-400 text-black rounded-lg m-5 px-5 py-2">
                  Scan Me
                </h1>
              </div>
              <button
                onClick={onButtonClick}
                className="mt-2 px-5 py-2 bg-black bg-opacity-70 hover:bg-opacity-100"
              >
                Download QR Code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
