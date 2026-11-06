/* 首页 */
(function () {
  "use strict";

  const { $, escapeHtml, avatar } = window.PKU;
  const FEATURED = window.PKU_FEATURED || { counts: {}, experts: [] };
  const CAMP = window.HEALTH_CAMP || null;
  const NET = window.PKU_NETWORK || { REGIONS: [], INSTITUTIONS: [] };

  /* stats */
  const counts = {
    doctors: FEATURED.counts.doctors || 726,
    experts: FEATURED.counts.experts || 57,
    nurses: FEATURED.counts.nurses || 107,
    depts: FEATURED.counts.depts || 70
  };
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText("statDoctors", counts.doctors);
  setText("statExperts", counts.experts);

  /* featured faculty */
  const featured = Array.isArray(FEATURED.experts) ? FEATURED.experts : [];
  const scroller = $("#expertScroller");
  if (scroller) {
    scroller.innerHTML = featured
      .map(item => `
          <a class="expert-card press" href="./member.html?id=${encodeURIComponent(item.id)}">
            ${avatar(item.name, item.photo, 58, "ring")}
            <span class="expert-body">
              <span class="expert-name">
                <b>${escapeHtml(item.name)}</b>
                <span class="chip brand">${item.expert ? "专家" : "医师"}</span>
              </span>
              <span class="expert-title">${escapeHtml(item.title || "医师")}</span>
              <span class="expert-dept">${escapeHtml(item.dept || "临床科室")}</span>
            </span>
          </a>`)
      .join("");
  }

  /* camp */
  if (CAMP) {
    const ratio = Math.round((CAMP.day / CAMP.totalDays) * 100);
    setText("campStatus", `${CAMP.edition} · ${CAMP.status}`);
    setText("campDate", `${CAMP.startDate.slice(5).replace("-", ".")} — ${CAMP.endDate.slice(5).replace("-", ".")}`);
    setText("campDay", `第 ${CAMP.day} 天`);
    const bar = $("#campProgress");
    if (bar) bar.dataset.progress = String(ratio);
    setText("campTeamCount", `${CAMP.roster.length} 位项目团队`);
    setText("campHospitalCount", `来自 ${CAMP.hospitals.length} 家医院`);

    const avatars = $("#campAvatars");
    if (avatars) {
      const sample = CAMP.roster.filter(item => ["lead", "nutrition", "rehab", "health", "doctor"].includes(item.roleKey)).slice(0, 5);
      avatars.innerHTML = sample.map((item, index) => avatar(item.name, item.photo, 30, "ring", index)).join("");
    }
  }

  /* network */
  const grid = $("#regionGrid");
  if (grid) {
    const institutions = NET.INSTITUTIONS || [];
    const regions = (NET.REGIONS || []).filter(region => region.id !== "all");
    grid.innerHTML = regions
      .map(region => {
        const total = institutions.filter(item => item.region === region.id).length;
        return `
          <a class="region-card press" href="./hospitals.html?region=${encodeURIComponent(region.id)}" style="--tone:${region.color}">
            <span class="region-city">${escapeHtml(region.city)}</span>
            <b>${escapeHtml(region.name.replace("地区", ""))}</b>
            <small>${escapeHtml(region.summary || "")}</small>
            <span class="region-count"><b>${total}</b> 家</span>
          </a>`;
      })
      .join("");
  }
})();
