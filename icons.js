/* SVG icon sprite — injected before this script tag */
(function () {
  var sprite = `
<svg class="svg-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M4 10.6 12 4l8 6.6"/><path d="M6 9.4V20h12V9.4"/><path d="M10 20v-5h4v5"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.6a3.2 3.2 0 0 1 0 6"/><path d="M17.6 14.4a5.5 5.5 0 0 1 3 5.1"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></symbol>
  <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z"/><path d="M4 21c3-6 8-10 14-13"/></symbol>
  <symbol id="i-building" viewBox="0 0 24 24"><path d="M4 21V6l8-3v18"/><path d="M12 8h8v13"/><path d="M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01"/><path d="M2.5 21h19"/></symbol>
  <symbol id="i-hospital" viewBox="0 0 24 24"><path d="M4 21V8l8-4 8 4v13"/><path d="M9 21v-5h6v5"/><path d="M12 7v4M10 9h4"/><path d="M3 21h18"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16.2 16.2 21 21"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
  <symbol id="i-chev" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>
  <symbol id="i-chev-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></symbol>
  <symbol id="i-back" viewBox="0 0 24 24"><path d="M20 12H5"/><path d="m11 6-6 6 6 6"/></symbol>
  <symbol id="i-activity" viewBox="0 0 24 24"><path d="M3 12h4l2.2-6 4 12 2-6H21"/></symbol>
  <symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="10" r="2"/></symbol>
  <symbol id="i-clipboard" viewBox="0 0 24 24"><rect x="5" y="4.5" width="14" height="16.5" rx="2.5"/><path d="M9 4.5V3h6v1.5"/><path d="M8.5 10h7M8.5 14h7M8.5 18h4"/></symbol>
  <symbol id="i-flag" viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6 3h4l2 5-3 2a13 13 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>
  <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9 12 3.5Z"/><path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 6.5"/></symbol>
  <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="m8 12 2.8 2.8L16.5 9"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 7.8h.01"/></symbol>
  <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/></symbol>
  <symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></symbol>
</svg>`;
  var script = document.currentScript;
  if (script) script.insertAdjacentHTML("beforebegin", sprite);
  else document.body.insertAdjacentHTML("afterbegin", sprite);
})();
