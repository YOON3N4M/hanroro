import Image from "next/image";
import React from "react";

export default function ProfileContainer() {
  return (
    <section className="mt-md">
      <div className="relative w-full">
        <div>
          <Image width={1000} height={1000} src="/images/profile/profile.jpg" alt="profile" />
        </div>
        <div className="absolute w-full h-full bg-black z-[-10] -top-sm"> </div>
      </div>
      <div className="mt-md text-authentic-brown text-sm">
        <div className="flex gap-md w-[80%] ml-auto bg-white translate-y-[-50%] p-md shadow-md">
          <div className="flex-1 flex flex-col">
            <h1 className="font-semibold text-lg">한로로</h1>
            <div className="flex justify-between mt-auto">
              <span>birth</span>
              <span>2000.11.11</span>
            </div>
            <div className="flex justify-between">
              <span>debut</span>
              <span>2022.03.14</span>
            </div>
            <div className="flex justify-between">
              <span>agency</span>
              <span>Authentic</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="">
              다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 그의 작품은 시작됩니다. 누구보다 자신의 두려움이
              크지만, 못지않은 용기로 한로로는 분연히 시대의 아픔을 관통하고 우리와 유대합니다.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="mt-md flex gap-md">
        <div className="flex-1 bg-authentic-brown text-4xl text-right">
          <p className="text-white">A</p>
          <p className="text-white">L</p>
          <p className="text-white">B</p>
          <p className="text-white">U</p>
          <p className="text-white">M</p>
        </div>
        <div className="flex-1">
          <Image width={1000} height={1000} src="/images/album/mayfly.webp" alt="mayfly" />
        </div>
      </div> */}
      {/* <div className="h-[100vh]"></div> */}
    </section>
  );
}
