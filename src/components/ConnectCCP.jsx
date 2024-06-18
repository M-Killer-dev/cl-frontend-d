// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import "amazon-connect-streams";
import React, { memo, useRef, useEffect } from "react";

const ConnectCCP = () => {
  const ref = useRef();

  useEffect(() => {
    try {
      if (typeof window === "undefined") throw new Error("window missing");
      if (typeof window.connect === "undefined")
        throw new Error("global connect missing");
      console.log("init start");

      const ccpUrl = "https://tbi-test-connect.my.connect.aws/connect/ccp-v2";//ccpUrl

      //init CCP
      window.connect.core.initCCP(
        ref.current,
        {
          ccpUrl: ccpUrl,
          region: "us-east-1",
          loginPopup: true,				// optional, defaults to `true`
          loginPopupAutoClose: true,		// optional, defaults to `true`
          loginOptions: {                 // optional, if provided opens login in new window
            autoClose: true,              // optional, defaults to `false`
            height: 600,                  // optional, defaults to 578
            width: 400,                   // optional, defaults to 433
            top: 0,                       // optional, defaults to 0
            left: 0                       // optional, defaults to 0
          },
          softphone: {                    // optional, defaults below apply if not provided
            allowFramedSoftphone: true,   // optional, defaults to false
            disableRingtone: false,       // optional, defaults to false
            // ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
          },
          pageOptions: {                  // optional
            enableAudioDeviceSettings: true, // optional, defaults to 'false'
            enablePhoneTypeSettings: true // optional, defaults to 'true'
          },
          ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
          ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
          ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
        });
      console.log("init end");
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  return (
    <>
      <div
        ref={ref}
        style={{ display: "none" }}
      >
      </div>
    </>
  );
};

export default memo(ConnectCCP);
