/* 师资团队 */
(function () {
  "use strict";

  const { $, $$, escapeHtml, avatar, icon, toast } = window.PKU;
  const TEAM = Array.isArray(window.MEDICAL_TEAM) ? window.MEDICAL_TEAM : [];
  const OPS = Array.isArray(window.OPERATIONS_TEAM) ? window.OPERATIONS_TEAM : [];
  const DEPTS = Array.isArray(window.DEPARTMENTS) ? window.DEPARTMENTS : [];
  const CAMP = window.HEALTH_CAMP || { roster: [], roles: [] };
  const params = new URLSearchParams(window.location.search);
  const allowed = ["experts", "doctors", "nursing", "departments", "ops"];
  const initial = allowed.includes(params.get("view")) ? params.get("view") : "experts";

  const tabs = [
    { key: "experts", label: "专家", count: TEAM.filter(item => item.expert).length },
    { key: "doctors", label: "医师", count: TEAM.length },
    { key: "nursing", label: "护理", count: 107 },
    { key: "ops", label: "运营", count: OPS.length },
    { key: "departments", label: "科室", count: DEPTS.length }
  ];

  const state = { view: initial, query: "", limit: 24, deptCategory: "科室中心" };

  $("#heroExperts").textContent = tabs[0].count;
  $("#heroDoctors").textContent = tabs[1].count;
  $("#heroDepts").textContent = DEPTS.length || 70;

  /* tabs */
  function renderTabs() {
    $("#teamTabs").innerHTML = tabs
      .map(tab => `<button type="button" role="tab" data-view="${tab.key}" class="${state.view === tab.key ? "is-active" : ""}" aria-label="${tab.label} ${tab.count} 位">${tab.label}</button>`)
      .join("");
  }

  function hospitalOfOps(id) {
    const person = CAMP.roster.find(item => String(item.id) === String(id));
    return person ? person.hospital : "营期服务团队";
  }

  /* cards */
  function facultyCard(item, index) {
    return `
      <a class="person" href="./member.html?id=${encodeURIComponent(item.id)}">
        ${avatar(item.name, item.photo, 54, "", index)}
        <span class="person-copy">
          <span class="person-name">
            <b>${escapeHtml(item.name)}</b>
            <span class="chip ${item.expert ? "brand" : "plain"}">${item.expert ? "专家" : "医师"}</span>
          </span>
          <span class="person-role">${escapeHtml(item.title || "医师")}${item.dept ? " · " + escapeHtml(item.dept) : ""}</span>
          <span class="person-hospital">${icon("hospital", "ic-12")}${escapeHtml(item.hospital || "北京大学国际医院")}</span>
        </span>
        <svg class="ic ic-18 chev"><use href="#i-chev"/></svg>
      </a>`;
  }

  function opsCard(item, index) {
    const hospital = hospitalOfOps(item.id);
    return `
      <a class="person" href="./member.html?id=${encodeURIComponent(item.id)}">
        ${avatar(item.name, item.photo, 52, "", index)}
        <span class="person-copy">
          <span class="person-name"><b>${escapeHtml(item.name)}</b><span class="chip plain">${escapeHtml(item.role)}</span></span>
          <span class="person-role">${escapeHtml(item.qualification)}</span>
          <span class="person-hospital">${icon("hospital", "ic-12")}${escapeHtml(hospital)}</span>
        </span>
        <svg class="ic ic-18 chev"><use href="#i-chev"/></svg>
      </a>`;
  }

  function nursingPanel() {
    return `
      <div class="profile-hero" style="padding:0;overflow:hidden">
        <img src="./assets/nursing.webp" alt="国际护理团队" style="width:100%;height:190px;object-fit:cover" />
        <div style="padding:18px 20px 20px">
          <p class="eyebrow">INTERNATIONAL NURSING</p>
          <h2 class="h2" style="font-size:21px">国际护理团队</h2>
          <p style="margin:9px 0 0;font-size:13.5px;line-height:1.7;color:var(--ink-2)">
            北京大学国际医院实行护理垂直管理，建立全方位分层次培训体系。团队本科及以上学历占比 61%，含博士 1 人、硕士 15 人，专科护士 107 人，获批中华护理学会心血管、血液净化专科护士培养基地。
          </p>
          <div class="stat-row" style="margin-top:18px;padding-top:15px;border-top:.5px solid rgba(12,21,34,.08)">
            <div><b>107</b><small>专科护士</small></div>
            <div><b>61%</b><small>本科及以上</small></div>
            <div><b>16</b><small>硕士 / 博士</small></div>
          </div>
        </div>
      </div>
      <a class="network-more press" href="./camp.html" style="margin-top:14px">
        <span>护理团队在健康营中的角色</span>
        <span>查看<svg class="ic ic-12"><use href="#i-chev"/></svg></span>
      </a>`;
  }

  function deptCard(dept) {
    return `
      <a class="row" href="./department.html?id=${encodeURIComponent(dept.id)}" style="border-radius:18px;background:rgba(255,255,255,.72);margin-bottom:8px;border:.5px solid rgba(255,255,255,.9)">
        <span class="hospital-mark" style="--tone:#0b63e5;width:38px;height:38px;border-radius:12px">${icon("grid", "ic-18")}</span>
        <span class="row-copy">
          <b>${escapeHtml(dept.name)}</b>
          <small>${escapeHtml(dept.category || "科室中心")} · ${(dept.leaders || []).length} 位学科带头人</small>
        </span>
        <svg class="ic ic-16 chev"><use href="#i-chev"/></svg>
      </a>`;
  }

  function renderDeptCategories() {
    const wrap = $("#deptCats");
    if (!wrap) return;
    const categories = ["科室中心", "特色中心", "特色门诊"];
    wrap.innerHTML = categories
      .map(cat => {
        const count = DEPTS.filter(d => (d.category || "科室中心") === cat).length;
        return `<button type="button" class="chip ${state.deptCategory === cat ? "is-active" : ""}" data-dept-cat="${cat}" style="${state.deptCategory === cat ? "color:#fff;background:linear-gradient(150deg,#2f86ff,#0b5bdc);border-color:transparent" : ""}">${cat} ${count}</button>`;
      })
      .join("");
  }

  /* render */
  function render() {
    renderTabs();
    const query = state.query.trim().toLowerCase();
    const content = $("#teamContent");
    const result = $("#teamResult");
    const hint = $("#teamHint");
    const empty = $("#teamEmpty");
    const loadMore = $("#loadMore");
    loadMore.classList.add("hide");
    hint.textContent = "";

    if (state.view === "nursing") {
      result.textContent = "国际护理 · 107 位专科护士";
      content.innerHTML = nursingPanel();
      empty.classList.add("hide");
      return;
    }

    if (state.view === "departments") {
      const categories = ["科室中心", "特色中心", "特色门诊"];
      let list = DEPTS.filter(d => (d.category || "科室中心") === state.deptCategory);
      if (query) list = DEPTS.filter(d => `${d.name} ${(d.intro || []).join("")}`.toLowerCase().includes(query));
      content.innerHTML = `
        <div class="hospital-filter" id="deptCats" style="margin:0 -16px 12px;padding:2px 16px 6px"></div>
        <div>${list.map(deptCard).join("") || ""}</div>`;
      renderDeptCategories();
      $("#deptCats").addEventListener("click", event => {
        const button = event.target.closest("[data-dept-cat]");
        if (!button) return;
        state.deptCategory = button.dataset.deptCat;
        render();
      });
      result.textContent = `${state.deptCategory} · ${list.length} 个科室`;
      hint.textContent = categories.length ? "" : "";
      empty.classList.toggle("hide", list.length > 0);
      return;
    }

    if (state.view === "ops") {
      let list = OPS.filter(item => {
        if (!query) return true;
        return `${item.name} ${item.role} ${item.qualification} ${hospitalOfOps(item.id)}`.toLowerCase().includes(query);
      });
      result.textContent = `运营团队 · ${list.length} 位`;
      content.innerHTML = `<div class="person-list">${list.map(opsCard).join("")}</div>`;
      empty.classList.toggle("hide", list.length > 0);
      return;
    }

    const base = state.view === "experts" ? TEAM.filter(item => item.expert) : TEAM;
    const list = base.filter(item => {
      if (!query) return true;
      return `${item.name} ${item.dept} ${item.title} ${item.specialty} ${item.role}`.toLowerCase().includes(query);
    });

    result.textContent = `${state.view === "experts" ? "专家团队" : "医师团队"} · ${list.length} 位`;
    hint.textContent = state.view === "doctors" ? "按姓名排序" : "";

    const visible = list.slice(0, state.limit);
    content.innerHTML = `<div class="person-list">${visible.map(facultyCard).join("")}</div>`;
    empty.classList.toggle("hide", list.length > 0);

    if (list.length > visible.length) {
      loadMore.classList.remove("hide");
      loadMore.textContent = `加载更多（还有 ${list.length - visible.length} 位）`;
    }
  }

  /* events */
  $("#teamTabs").addEventListener("click", event => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    state.view = button.dataset.view;
    state.limit = 24;
    state.query = "";
    $("#teamSearch").value = "";
    $("#teamSearch").closest(".search").classList.remove("has-value");
    const url = new URL(window.location.href);
    if (state.view === "experts") url.searchParams.delete("view");
    else url.searchParams.set("view", state.view);
    history.replaceState(null, "", url);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let searchTimer = 0;
  $("#teamSearch").addEventListener("input", event => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = event.target.value;
      state.limit = 24;
      render();
    }, 120);
  });

  $("#loadMore").addEventListener("click", () => {
    state.limit += 36;
    render();
  });

  $("#teamEmptyReset").addEventListener("click", () => {
    state.query = "";
    state.limit = 24;
    $("#teamSearch").value = "";
    $("#teamSearch").closest(".search").classList.remove("has-value");
    render();
  });

  render();
})();
