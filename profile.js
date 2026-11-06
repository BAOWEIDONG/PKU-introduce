/* 成员介绍：按 id 按需加载数据，运营成员不再加载医师大文件 */
(function () {
  "use strict";

  const { $, escapeHtml, icon } = window.PKU;
  const CAMP = window.HEALTH_CAMP || { roster: [] };
  const id = new URLSearchParams(window.location.search).get("id") || "";
  const content = $("#profileContent");
  const isOps = /^op-/.test(id);

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "1") resolve();
        else {
          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener("error", reject, { once: true });
        }
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.dataset.src = src;
      script.onload = () => {
        script.dataset.loaded = "1";
        resolve();
      };
      script.onerror = () => reject(new Error(src));
      document.body.appendChild(script);
    });
  }

  function showError() {
    content.innerHTML = `
      <div class="empty-state">
        <b>成员信息加载失败</b>
        <p>网络较慢或数据未加载完成，请重试。</p>
        <button class="btn btn-primary" type="button" onclick="location.reload()">重新加载</button>
      </div>`;
  }

  function boot() {
    const TEAM = Array.isArray(window.MEMBER_TEAM_SHARD) ? window.MEMBER_TEAM_SHARD : (Array.isArray(window.MEDICAL_TEAM) ? window.MEDICAL_TEAM : []);
    const OPS = Array.isArray(window.OPERATIONS_TEAM) ? window.OPERATIONS_TEAM : [];
    const DETAILS = window.MEMBER_DETAILS || {};
    const doctor = isOps ? null : TEAM.find(item => String(item.id) === id);
    const opsPerson = isOps ? OPS.find(item => String(item.id) === id) : null;
    const member = doctor || opsPerson;
    const campPerson = CAMP.roster.find(item => String(item.id) === id);

    if (!member) {
      content.innerHTML = `
        <div class="empty-state">
          <b>没有找到该成员</b>
          <p>成员信息可能已更新，请返回团队列表重新选择。</p>
          <a class="btn btn-primary" href="./team.html">返回师资团队</a>
        </div>`;
      return;
    }

    const detail = DETAILS[id] || {};
    const hospital = (campPerson && campPerson.hospital) || member.hospital || "营期服务团队";
    const photo = member.photo
      ? `<img src="${escapeHtml(member.photo)}" alt="${escapeHtml(member.name)}" onerror="this.remove()" />`
      : "";
    const fallback = `<span class="profile-fallback">${escapeHtml(member.name.slice(0, 1))}</span>`;
    const rawTags = isOps ? [] : [member.expert ? "专家" : "", ...(member.tags || [])].filter(Boolean);
    const tags = rawTags.filter(tag => !(member.title || "").includes(tag));
    const specialty = isOps ? member.qualification : detail.specialty || member.specialty || "暂无详细介绍";
    const bio = isOps ? member.bio || [] : detail.bio || [];
    const appointments = isOps ? [] : detail.appointments || [];
    const honors = isOps ? [] : detail.honors || [];

    document.title = `${member.name} · ${isOps ? "项目团队" : "师资团队"} · 北大医疗`;
    $("#topTitle").textContent = member.name;
    const backLink = $("#backLink");
    if (isOps) {
      backLink.href = "./camp.html";
      backLink.innerHTML = `<svg class="ic ic-18"><use href="#i-back"/></svg>健康营`;
    } else {
      backLink.href = member.expert ? "./team.html?view=experts" : "./team.html?view=doctors";
      backLink.innerHTML = `<svg class="ic ic-18"><use href="#i-back"/></svg>师资`;
    }

    content.innerHTML = `
      <section class="profile-hero">
        <div class="profile-photo">${photo}${fallback}</div>
        <div class="profile-copy">
          <p class="eyebrow" style="margin-bottom:5px">${isOps ? "HEALTH CAMP TEAM" : "PKU HEALTHCARE FACULTY"}</p>
          <h1>${escapeHtml(member.name)}</h1>
          <div class="profile-role">
            <span>${escapeHtml(isOps ? ((campPerson && campPerson.role) || member.role) : (member.title || member.role || "医师"))}</span>
            ${isOps && member.qualification ? `<span style="color:var(--ink-3)">·</span><span>${escapeHtml(member.qualification)}</span>` : ""}
          </div>
          <span class="profile-hospital">${icon("hospital", "ic-12")}${escapeHtml(hospital)}</span>
          ${tags.length ? `<div class="profile-tags" style="margin-top:10px">${tags.map(tag => `<span class="chip plain">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        </div>
      </section>

      ${campPerson && campPerson.duty ? `
        <section class="profile-section">
          <h2>在健康营中的职责</h2>
          <p>${escapeHtml(campPerson.duty)}</p>
          ${(campPerson.tags || []).length ? `<div class="profile-tags">${campPerson.tags.map(tag => `<span class="chip teal">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        </section>` : ""}

      <section class="profile-section">
        <h2>${isOps ? "专业资质" : "擅长方向"}</h2>
        <p>${escapeHtml(specialty)}</p>
        ${!isOps && member.dept ? `<div class="profile-tags"><span class="chip brand">${escapeHtml(member.dept)}</span><span class="chip plain">${escapeHtml(hospital)}</span></div>` : ""}
      </section>

      ${bio.length ? `
        <section class="profile-section">
          <h2>${isOps ? "岗位介绍" : "医生简介"}</h2>
          ${bio.map(item => `<p>${escapeHtml(item)}</p>`).join("")}
        </section>` : ""}

      ${appointments.length ? `
        <section class="profile-section">
          <h2>学术及社会任职</h2>
          <ul>${appointments.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>` : ""}

      ${honors.length ? `
        <section class="profile-section">
          <h2>荣誉与成果</h2>
          <ul>${honors.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>` : ""}

      ${!bio.length && !appointments.length && !honors.length ? `
        <section class="profile-section">
          <h2>成员介绍</h2>
          <p class="muted">该成员的详细介绍暂未发布。</p>
        </section>` : ""}

      <a class="profile-back" href="${isOps ? "./camp.html" : "./team.html"}">
        ${icon("back", "ic-16")} ${isOps ? "返回健康营项目团队" : "返回师资团队"}
      </a>
    `;
  }

  async function start() {
    if (!id) {
      showError();
      return;
    }
    try {
      if (isOps) {
        if (!Array.isArray(window.OPERATIONS_TEAM)) await loadScript("./operations-team-data.js");
      } else {
        const numeric = Number(id);
        const bucket = Number.isFinite(numeric) ? Math.abs(numeric) % 8 : 0;
        if (!Array.isArray(window.MEMBER_TEAM_SHARD)) await loadScript(`./member-team-${bucket}.js`);
        if (!window.MEMBER_DETAILS_BUCKET) {
          await loadScript(`./member-details-${bucket}.js`);
          window.MEMBER_DETAILS_BUCKET = true;
        }
      }
      boot();
    } catch (err) {
      showError();
    }
  }

  start();
})();
