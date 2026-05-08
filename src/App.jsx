import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";

function getUrlParams(url) {
  try {
    const parsed = new URL(
      url,
      typeof window !== "undefined" ? window.location.href : undefined
    );
    return Object.fromEntries(parsed.searchParams.entries());
  } catch (error) {
    const urlStr = ("" + url).split("?")[1] || "";
    return Object.fromEntries(new URLSearchParams(urlStr).entries());
  }
}

//to generate kit token
async function tryGenerateKitTokenClientSide(
  appID,
  serverSecret,
  roomID,
  userID,
  username
) {
  if (typeof window?.ZegoUIKitPrebuilt === "undefined") {
    throw new Error("ZegoUIKitPrebuilt not available globally.");
  }

  if (!serverSecret) {
    throw new Error("Server Secret missing");
  }

  try {
    const token = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      username
    );
    return token;
  } catch (error) {
    throw new Error("generateKitTokenForTest failed:", error.message || error);
  }
}

const App = () => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("initializing");

  useEffect(() => {
    if (window.__ZegoUIKitPrebuiltInitialized) {
      console.warn("Zego already initialized in this page");
      setStatus("already-initialized");
      return;
    }
    window.__ZegoUIKitPrebuiltInitialized = true;

    let zpInstance = null;

    (async () => {
      try {
        console.log("import.meta.env:", import.meta.env);
        const rawAppID = import.meta.env?.VITE_APP_ID;
        const rawServerSecret = import.meta.env?.VITE_SERVER_SECRET;
        const appID = rawAppID ? Number(rawAppID) : NaN;

        if (!Number.isFinite(appID)) {
          console.error("Vite_APP_Id is invalid", rawAppID);
          setStatus("missing app id");
          return;
        }

        if (typeof window?.ZegoUIKitPrebuilt === "undefined") {
          console.error(
            "ZegoUIKITPrebuilt is not loaded. Please include the script in the index.html"
          );
          setStatus("sdk-missing");
          return;
        }

        const params = getUrlParams(window.location.href);
        const roomID =
          params.roomID || String(Math.floor(Math.random() * 10000));
        const userID =
          params.userID || String(Math.floor(Math.random() * 10000));
        const username = params.username || "user_" + userID;

        const roleParam = (params.role || "Host").toString();
        const role =
          roleParam === "Host"
            ? window.ZegoUIKitPrebuilt.Host
            : window.ZegoUIKitPrebuilt.Audience;

        let kitToken = null;

        try {
          setStatus("fetching-kit-token");
          const resp = await fetch(
            `/api/kit-token?roomID=${encodeURIComponent(
              roomID
            )}&userID=${encodeURIComponent(
              userID
            )}&userName=${encodeURIComponent(username)}`
          );

          if (resp.ok) {
            const json = await resp.json();
            if (json?.kitToken) {
              kitToken = json.kitToken;
            }
          }
        } catch (error) {
          console.log("No api kittoken available or fetch failed:", error);
        }

        if (!kitToken) {
          if (rawServerSecret) {
            try {
              setStatus("generating kit-token");
              kitToken = await tryGenerateKitTokenClientSide(
                appID,
                rawServerSecret,
                roomID,
                userID,
                username
              );
            } catch (error) {
              setStatus("kit-token failed");
              return;
            }
          } else {
            console.error("No server token");
            setStatus("no token available");
            return;
          }
        }

        if (!kitToken) {
          console.error("No kittoken obtained");
          setStatus("no-kit-token");
          return;
        }

        try {
          setStatus("creating-instance");
          zpInstance = window.ZegoUIKitPrebuilt.create(kitToken);
          window.__ZegoUIKitPrebuiltInstance = zpInstance;
        } catch (error) {
          console.error("ZegoUIKitPrebuilt.create error:", error);
          setStatus("create failed");
          return;
        }

        if (!zpInstance || typeof zpInstance.joinRoom !== "function") {
          console.error(
            "ZegoUIKitPrebuilt.create returned invalid obj.",
            zpInstance
          );
          setStatus("invalid-instance");
          return;
        }

        const hostConfig = {
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
        };

        const joinOpts = {
          container:
            containerRef.current ||
            document.querySelector("#zego-root") ||
            document.body,
          scenario: {
            mode: window.ZegoUIKitPrebuilt.LiveStreaming,
            config: { role },
          },

          sharedLinks: [
            {
              name: "Join as a audience",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                encodeURIComponent(roomID) +
                "&role=Audience",
            },
          ],
          ...(role === window.ZegoUIKitPrebuilt.Host ? hostConfig : {}),
        };

        try {
          setStatus("joining room");
          await zpInstance.joinRoom(joinOpts);
          setStatus("joined");
          console.log("Joined Room Successfully!");

          if (containerRef.current && containerRef.current.requestFullscreen) {
            containerRef.current.requestFullscreen().catch((err) => {
              console.warn("FullScreen request failed:", err);
            });
          } else {
            console.warn("FullScreen API not supported in this browser");
          }
        } catch (joinErr) {
          console.error("zpInstance.joinRoom failed:", joinErr);
          setStatus("unexpected error");
        }
      } catch (error) {
        console.error("Unexpected Zego Error:", err);
        setStatus("unexpected error");
      }
    })();

    return () => {
      try {
        const inst = zpInstance || window.__ZegoUIKitPrebuiltInstance;
        if (inst && typeof inst.destroy === "function") {
          inst.destroy();
        }
      } catch (cleanupErr) {
        console.warn("Zego cleanup error:", cleanupErr);
      }
    };
  }, []);
  return (
    <div className="min-h-screen font-serif text-blue-00 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">
          Live Streaming (Zego)
        </h2>

        <div className="mb-4">
          <span className="inline-block text-blue-500 mr-2 font-medium">
            Status:
          </span>
          <span data-testid=" zego-status text-green-400">{status}</span>
        </div>

        <div
          id="zego-root"
          ref={containerRef}
          style={{
            width: "100%",
            height: "70vh",
            minHeight: "400px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {/* Zego Ui */}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
