// ==UserScript==
// @name         Emphasize Holidays In Tenkijp
// @namespace    https://github.com/klim0824/
// @version      0.1
// @description
// @author       klim
// @match        https://tenki.jp/forecast/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
  "use strict";

  fetch("https://holidays-jp.github.io/api/v1/date.json")
    .then(response => {
      return response.json();
    })
    .then(holidays => {
      const classes = [
        "#main-column .today-weather h3",
        "#main-column .tomorrow-weather h3",
        ".forecast-point-3h .head td p",
        ".forecast-point-1h .head td p"
      ];
      for (const c of classes) {
        const element = document.querySelector(c);

        if (!element) {
          return;
        }

        const textInHeading = element.textContent;
        const date = generateDate(textInHeading);

        for (const h of Object.keys(holidays)) {
          if (date === h) {
            element.style.color = "red";
            element.textContent = textInHeading + "(" + holidays[h] + ")";
          }
        }
      }
    });

  const generateDate = heading => {
    const daysInHeading = heading.match(/(\d{2})月(\d{2})日/);
    const month = daysInHeading[1];
    const day = daysInHeading[2];
    const now = new Date();
    let year = now.getFullYear();
    let date;

    if (now.getMonth() === 11 && month === "01" && day === "01") {
      year += 1;
    }
    date = year + "-" + month + "-" + day;
    return date;
  };
})();
