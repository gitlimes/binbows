import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import "98.css";

export async function getServerSideProps(context) {
  let fetched = await fetch("https://api.monty.ga/api/discord/presence");
  let res = await fetched.json();
  let presence = await res.presence;

  if (presence === "dnd") {
    presence = "in Do Not Disturb mode"
  }
  return {
    props: { presence },
  };
}

export default function amIOnline({ presence }) {
  const timeOpt = {
    timeZone: "Europe/Rome",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    
  };

  const dateOpt = {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  function getTimeOrDate(options) {
    return new Intl.DateTimeFormat([], options).format(new Date());
  }

  useEffect(() => {
    dragElement(document.getElementById("mainWindow"));

    function dragElement(elmnt) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }

      function updateTime() {
        document.getElementById("timeElmt").innerHTML = getTimeOrDate(timeOpt);
        document.getElementById("dateElmt").innerHTML = getTimeOrDate(dateOpt);
      }
      updateTime(), window.setInterval(updateTime, 500);
    }
  });

  return (
    <home>
      <Head>
        <title>monty.exe</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:image" content="/og_image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="monty.exe" />
        <meta property="og:url" content="https://monty.ga" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og_image.png" />
      </Head>
      <section>
        <div
          style={{
            width: 300,
          }}
          className="window monty"
          id="mainWindow"
        >
          <div className="title-bar" id="mainWindowheader">
            <div className="title-bar-text">W32Time.dll</div>
            <div className="title-bar-controls">
              <Link href="/">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>

          <div className="window-body" style={{ textAlign: "center" }}>
            <h5>Time in Italy (where I live):</h5>
            <h3 id="timeElmt">{getTimeOrDate(timeOpt)}</h3>
            <h5 id="dateElmt">{getTimeOrDate(dateOpt)}</h5>
            <p>I'm {presence} on Discord (Monty#3581)</p>
          </div>
        </div>
      </section>
    </home>
  );
}