import { Box } from "@mui/material";
import Script from "next/script";
import { useMounted } from "../hooks/useMounted";

export const TurnstileWrapper = function TurnstileWrapper() {
  const mounted = useMounted();
  if (!mounted) {
    return <></>;
  }
  return (
    <Box style={{ alignSelf: "center" }}>
      <Script id="cf-turnstile-callback">
        {`window.onloadTurnstileCallback = function () {
          window.turnstile.render('#cf-turnstile', {
            theme: "light",
            sitekey: "0x4AAAAAAAdCiau-5tjdQjbk",
            callback: function (token) {
              window.turnstileCallback(token);
            }
          });
        }`}
      </Script>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        async={true}
        defer={true}
      />
      <div
        style={{ alignSelf: "center" }}
        id="cf-turnstile"
        className="checkbox"
      ></div>
    </Box>
  );
};
