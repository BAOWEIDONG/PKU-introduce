/* 健康营项目团队 */
(function () {
  "use strict";

  const { $, $$, escapeHtml, avatar, icon, openSheet, closeSheet } = window.PKU;
  const CAMP = window.HEALTH_CAMP;
  if (!CAMP) return;

  const ROLE_TONES = {
    lead: "#0b63e5",
    doctor: "#e05555",
    nutrition: "#0aa39a",
    rehab: "#e08a3b",
    health: "#7c6cf0",
    supervisor: "#5b6b82"
  };
  const roleByKey = key => CAMP.roles.find(role => role.key === key) || { name: "", icon: "users", short: "" };
  const hospitalById = id => CAMP.hospitals.find(h => h.id === id) || { name: "营期服务团队", short: "团队", tone: "#0b63e5" };

  const state = { role: "all", hospital: "all" };

  /* hero */
  const ratio = Math.round((CAMP.day / CAMP.totalDays) * 100);
  const dateText = `${CAMP.startDate.slice(5).replace("-", ".")} — ${CAMP.endDate.slice(5).replace("-", ".")}`;
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText("heroStatus", CAMP.status);
  setText("heroEdition", CAMP.edition);
  setText("heroTheme", CAMP.theme);
  setText("heroSummary", CAMP.summary);
  setText("heroDates", dateText);
  setText("heroDay", `第 ${CAMP.day} 天`);
  setText("heroTeam", CAMP.roster.length);
  setText("heroHospitals", CAMP.hospitals.length);
  setText("heroRoles", CAMP.roles.length);
  const heroBar = $("#heroBar");
  if (heroBar) heroBar.dataset.progress = String(ratio);

  /* timeline */
  const timeline = $("#timeline");
  if (timeline) {
    timeline.innerHTML = CAMP.timeline
      .map(item => `
        <div class="tl-item ${item.state}">
          <span class="tl-date">${escapeHtml(item.date)}</span>
          <b>${escapeHtml(item.title)}</b>
          <p>${escapeHtml(item.desc)}</p>
        </div>`)
      .join("");
  }

  /* role filter */
  const roleFilter = $("#roleFilter");
  const counts = key =>
    key === "all" ? CAMP.roster.length : CAMP.roster.filter(item => item.roleKey === key).length;

  function renderRoleFilter() {
    const options = [{ key: "all", name: "全部", short: "全部" }, ...CAMP.roles];
    roleFilter.innerHTML = options
      .map(
        role => `
        <button type="button" role="tab" data-role="${role.key}" class="${state.role === role.key ? "is-active" : ""}">
          ${escapeHtml(role.key === "all" ? "全部" : (role.short || role.name))}
        </button>`
      )
      .join("");
  }

  /* hospital filter */
  const hospitalFilter = $("#hospitalFilter");
  function renderHospitalFilter() {
    const chips = [
      `<button type="button" class="chip ${state.hospital === "all" ? "is-active" : ""}" data-hospital="all">全部医院</button>`
    ].concat(
      CAMP.hospitals.map(h => {
        const total = CAMP.roster.filter(item => item.hospitalId === h.id).length;
        return `<button type="button" class="chip ${state.hospital === h.id ? "is-active" : ""}" data-hospital="${h.id}">${escapeHtml(h.short)} · ${total}</button>`;
      })
    );
    hospitalFilter.innerHTML = chips.join("");
  }

  /* roster */
  const list = $("#rosterList");
  const empty = $("#rosterEmpty");
  const rosterCount = $("#rosterCount");

  function filtered() {
    return CAMP.roster.filter(item => {
      if (state.role !== "all" && item.roleKey !== state.role) return false;
      if (state.hospital !== "all" && item.hospitalId !== state.hospital) return false;
      return true;
    });
  }

  function personCard(item, index) {
    const role = roleByKey(item.roleKey);
    const hospital = hospitalById(item.hospitalId);
    return `
      <button class="person" type="button" data-person="${escapeHtml(item.id)}">
        ${avatar(item.name, item.photo, 52, "", index)}
        <span class="person-copy">
          <span class="person-name">
            <b>${escapeHtml(item.name)}</b>
            <span class="chip plain">${escapeHtml(item.role)}</span>
          </span>
          <span class="person-role">${escapeHtml(item.qualification)}</span>
          <span class="person-hospital">${icon("hospital", "ic-12")}${escapeHtml(item.hospital)}</span>
        </span>
        <svg class="ic ic-18 chev"><use href="#i-chev"/></svg>
      </button>`;
  }

  function renderRoster() {
    const items = filtered();
    rosterCount.textContent = `${items.length} 人`;
    empty.classList.toggle("hide", items.length > 0);

    if (!items.length) {
      list.innerHTML = "";
      return;
    }

    if (state.role !== "all") {
      list.innerHTML = `<div class="person-list">${items.map(personCard).join("")}</div>`;
      return;
    }

    let index = 0;
    list.innerHTML = CAMP.roles
      .map(role => {
        const members = items.filter(item => item.roleKey === role.key);
        if (!members.length) return "";
        const cards = members
          .map(item => {
            const card = personCard(item, index);
            index += 1;
            return card;
          })
          .join("");
        return `
          <div class="role-group">
            <div class="role-group-head" style="--role-tone:${ROLE_TONES[role.key] || "#0b63e5"}">
              <i>${icon(role.icon, "ic-14")}</i>
              <b>${escapeHtml(role.name)}</b>
              <span>${members.length} 人</span>
            </div>
            <div class="person-list">${cards}</div>
          </div>`;
      })
      .join("");
  }

  /* source hospitals */
  const source = $("#sourceHospitals");
  function renderSources() {
    source.innerHTML = CAMP.hospitals
      .map(h => {
        const members = CAMP.roster.filter(item => item.hospitalId === h.id);
        const faces = members
          .slice(0, 4)
          .map((item, index) => avatar(item.name, item.photo, 28, "", index))
          .join("");
        return `
          <button class="row" type="button" data-source="${h.id}">
            <span class="hospital-mark" style="--tone:${h.tone};width:38px;height:38px;border-radius:12px">${icon("hospital", "ic-18")}</span>
            <span class="row-copy">
              <b>${escapeHtml(h.name)}</b>
              <small>${escapeHtml(h.city)} · ${members.length} 位团队成员</small>
            </span>
            <span class="avatar-stack" style="margin-right:2px">${faces}</span>
            <svg class="ic ic-16 chev"><use href="#i-chev"/></svg>
          </button>`;
      })
      .join("");
  }

  /* member sheet */
  const sheet = $("#memberSheet");
  const sheetBody = $("#memberSheetBody");

  function openPerson(id) {
    const item = CAMP.roster.find(person => String(person.id) === String(id));
    if (!item) return;
    const role = roleByKey(item.roleKey);
    const detailUrl = `./member.html?id=${encodeURIComponent(item.id)}`;
    sheetBody.innerHTML = `
      <div class="member-sheet-hero">
        ${avatar(item.name, item.photo, 72)}
        <div>
          <h2>${escapeHtml(item.name)}</h2>
          <p>${escapeHtml(item.role)}</p>
          <span class="chip brand">${icon("hospital", "ic-12")} ${escapeHtml(item.hospital)}</span>
        </div>
      </div>
      <div class="member-sheet-block">
        <small>在营期中的职责</small>
        <p>${escapeHtml(item.duty || "负责营期相关专业支持。")}</p>
      </div>
      <div class="member-sheet-block">
        <small>角色说明</small>
        <p>${escapeHtml(role.desc || "")}</p>
        <span class="member-sheet-tags">${(item.tags || []).map(tag => `<span class="chip plain">${escapeHtml(tag)}</span>`).join("")}</span>
      </div>
      <div class="member-sheet-actions">
        <a class="btn btn-primary btn-block" href="${detailUrl}">查看完整介绍</a>
        <button class="btn btn-ghost" type="button" data-close-sheet>关闭</button>
      </div>
    `;
    openSheet(sheet);
    sheetBody.querySelector("[data-close-sheet]").addEventListener("click", () => closeSheet(sheet));
  }

  function openHospital(id) {
    const h = hospitalById(id);
    const members = CAMP.roster.filter(item => item.hospitalId === id);
    sheetBody.innerHTML = `
      <div class="member-sheet-hero">
        <span class="hospital-mark" style="--tone:${h.tone};width:64px;height:64px;border-radius:20px">${icon("hospital", "ic-26")}</span>
        <div>
          <h2 style="font-size:21px">${escapeHtml(h.name)}</h2>
          <p>${escapeHtml(h.city)} · ${members.length} 位团队成员</p>
        </div>
      </div>
      <div class="member-sheet-block">
        <small>本期派驻角色</small>
        <p>${[...new Set(members.map(item => item.role))].map(escapeHtml).join(" · ")}</p>
      </div>
      <div class="member-sheet-block">
        <small>团队成员</small>
        <div class="member-sheet-tags">${members.map(item => `<span class="chip plain">${escapeHtml(item.name)} · ${escapeHtml(item.role)}</span>`).join("")}</div>
      </div>
      <div class="member-sheet-actions">
        <button class="btn btn-primary btn-block" type="button" data-filter-hospital="${h.id}">只看这家医院</button>
        <button class="btn btn-ghost" type="button" data-close-sheet>关闭</button>
      </div>
    `;
    openSheet(sheet);
    sheetBody.querySelector("[data-close-sheet]").addEventListener("click", () => closeSheet(sheet));
    const apply = sheetBody.querySelector("[data-filter-hospital]");
    apply.addEventListener("click", () => {
      state.hospital = h.id;
      renderHospitalFilter();
      renderRoster();
      closeSheet(sheet);
      $("#rosterSection").scrollIntoView({ behavior: "smooth", block: "start" });
      window.PKU.toast(`已筛选：${h.name}`);
    });
  }

  /* events */
  roleFilter.addEventListener("click", event => {
    const button = event.target.closest("[data-role]");
    if (!button) return;
    state.role = button.dataset.role;
    renderRoleFilter();
    renderRoster();
  });

  hospitalFilter.addEventListener("click", event => {
    const button = event.target.closest("[data-hospital]");
    if (!button) return;
    state.hospital = button.dataset.hospital;
    renderHospitalFilter();
    renderRoster();
  });

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-person]");
    if (button) openPerson(button.dataset.person);
  });

  source.addEventListener("click", event => {
    const button = event.target.closest("[data-source]");
    if (button) openHospital(button.dataset.source);
  });

  $("#rosterReset").addEventListener("click", () => {
    state.role = "all";
    state.hospital = "all";
    renderRoleFilter();
    renderHospitalFilter();
    renderRoster();
  });

  renderRoleFilter();
  renderHospitalFilter();
  renderRoster();
  renderSources();
})();
