import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import LifthouseLogo from "@/app/assets/lifthouse_logo_black.png";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Image className="mb-2 w-72 h-20" src={LifthouseLogo} alt="" />
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: 24, color: "black" }}
            spin
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        }
      />
    </div>
  );
}
