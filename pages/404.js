import "98.css";
import styles from "../styles/Custom404.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    document.addEventListener("keydown", pushToHome);
    function pushToHome() {
      document.removeEventListener("keydown", pushToHome);
      router.push("/");
    }
  });

  return (
    <home>
      <section>
        <a href="/">
          <div className={styles.blbg}>
            <div className={styles.yeet}>
              <p className={styles.header}>404</p>
              <div className={styles.textcontainer}>
                <p>An error has occured. To continue:</p>
                <p>
                  Click/tap anywhere or press any key to return to the home
                  page.
                </p>
                <p>Error: 404 : P4G3 : N07F0UND</p>
                <div className={styles.pressDiv}>
                  <p className={styles.pressText}>
                    Press any key to continue&nbsp;
                    <p className={styles.blink}>_</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </section>
    </home>
  );
}