import Image from "next/image";
import Link from "next/link";
import { PopupButton } from "@typeform/embed-react";

function DefaultFrameRender() {
  return (
    <>
      <Image
        src="/frame_image.jpeg"
        alt="Description of the image"
        width={500}
        height={500}
        style={{
          borderRadius: "4px",
          border: "1px solid #ccc",
          aspectRatio: "1:1",
          maxHeight: "500px",
          width: "100%",
        }}
      />
      <input
        className="w-full p-2 text-sm border mt-[10px] border-gray-400 rounded bg-white" // Set background color to white
        type="text"
        disabled
        placeholder={"Create the best of frames with bare minimum effort"}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          gap: "4px",
          width: "100%",
        }}
      >
        <div
          className="btn bg-black rounded-md text-white px-4 py-2"
          style={{
            flex: "1 1 0px",
            cursor: "pointer",
          }}
        >
          <Link href="/dashboard"> Dashboard</Link>
        </div>
        <PopupButton
          id="oNSMcTf6"
          className="btn bg-black rounded-md text-white px-4 py-2"
          style={{
            flex: "1 1 0px",
          }}
        >
          Contact Us
        </PopupButton>
      </div>
    </>
  );
}

export default DefaultFrameRender;
