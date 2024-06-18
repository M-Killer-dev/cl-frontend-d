// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import "amazon-connect-streams";
import React, { memo, useRef, useEffect } from "react";
import axios from "axios";
import CallButton from "./phone/CallButton.tsx";
import HangUpButton from "./phone/HandUpButton.tsx";
import subscribeToContactEvents from './phone/contactEvents.js';
import subscribeToAgentEvents from './phone/agentEvents.js';

const ConnectCCP = ({ phoneNum }) => {
  const ref = useRef();

  const acceptHandler = () => {
    let filterdNum = phoneNum.replace(/\D/g, '');
    console.log("phone number : ", filterdNum);
    const attributes = window.contact.getAttributes();
    let callerID = attributes.CallerID;
    if (callerID)
      callerID = "695227e1-08a7-41ff-b42e-1fd6f882ea55";
    console.log(callerID);
    axios.post(
      `https://bx9wl6a2jj.execute-api.us-east-1.amazonaws.com/test/ConnectManager?destPhone=%2B${filterdNum}&queueARN=${callerID}`, {});
  }

  const disconnectHandler = () => {
    if (window.contact) {
      window.contact.getAgentConnection().destroy({
        success: function () {
          console.log("Disconnected contact via Streams");
        },
        failure: function () {
          console.log("Failed to disconnect contact via Streams");
        }
      });
    }
  }

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

      window.connect.core.onViewContact(
        function (event) {
          console.log("Now Vieving contact ID: '" + event.contactId + "'");
        }
      );

      // Subscribe to Contact events
      window.connect.contact(subscribeToContactEvents);
      // Subscribe to Agent events
      window.connect.agent(subscribeToAgentEvents);

      // Send information to the Connect Logger
      window.connect.getLog().info("CDEBUG >> CCP initialized and subscribed to events");
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
      <div className="flex justify-between mb-5">
        <CallButton acceptHandler={acceptHandler} />
        <HangUpButton disconnectHandler={disconnectHandler} />
      </div>
    </>
  );
};

export default memo(ConnectCCP);
