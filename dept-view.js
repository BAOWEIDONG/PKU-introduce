/* 科室介绍 */
(function () {
  "use strict";

  const { $, escapeHtml, avatar, icon, openSheet, closeSheet } = window.PKU;
  const DEPTS = Array.isArray(window.DEPARTMENTS) ? window.DEPARTMENTS : [];
  const id = new URLSearchParams(window.location.search).get("id");
  const dept = DEPTS.find(item => String(item.id) === String(id));
  const content = $("#deptContent");

  if (!dept) {
    content.innerHTML = `
      <div class="empty-state">
        <b>没有找到该科室</b>
        <p>科室信息可能已更新，请返回列表重新选择。</p>
        <a class="btn btn-primary" href="./team.html?view=departments">返回科室列表</a>
      </div>`;
    return;
  }

  document.title = `${dept.name} · 科室介绍 · 北京大学国际医院`;
  $("#deptTopTitle").textContent = dept.name;

  const paragraphs = (dept.intro || []).filter(Boolean);
  const intro = paragraphs.length
    ? paragraphs.map(item => `<p>${escapeHtml(item)}</p>`).join("")
    : '<p class="muted">该科室详细介绍暂未发布。</p>';

  const personLink = person => (person.memberId ? `./member.html?id=${person.memberId}` : person.profile || "#");

  const photoMarkup = person => {
    const img = person.photo
      ? `<img src="${escapeHtml(person.photo)}" alt="${escapeHtml(person.name)}" loading="lazy" onerror="this.remove()" />`
      : "";
    return `<span class="leader-photo">${img}<span class="profile-fallback" style="font-size:26px">${escapeHtml(person.name.slice(0, 1))}</span></span>`;
  };

  const leaders = (dept.leaders || []).length
    ? `
      <section class="profile-section">
        <h2>学科带头人</h2>
        <div class="leader-row">
          ${dept.leaders.map(person => `
            <a class="leader-card press" href="${escapeHtml(personLink(person))}" target="_blank" rel="noopener">
              ${photoMarkup(person)}
              <span class="leader-copy">
                <b>${escapeHtml(person.name)}</b>
                <small>${escapeHtml(person.title || "学科带头人")}</small>
              </span>
            </a>`).join("")}
        </div>
      </section>` : "";

  const features = (dept.features || []).length
    ? `
      <section class="profile-section">
        <h2>科室特色</h2>
        <div class="feature-list">
          ${dept.features.map(feature => `
            <article class="feature-card">
              ${feature.tag ? `<span class="chip brand">${escapeHtml(feature.tag)}</span>` : ""}
              <b>${escapeHtml(feature.title || "科室特色")}</b>
              <p>${escapeHtml(feature.desc || "")}</p>
            </article>`).join("")}
        </div>
      </section>` : "";

  const doctors = (dept.doctors || []).length
    ? `
      <section class="profile-section">
        <h2>医生团队 <span class="muted" style="font-size:12px;font-weight:500">${dept.doctors.length} 位</span></h2>
        <div class="person-list">
          ${dept.doctors.map(person => `
            <a class="person" href="${escapeHtml(personLink(person))}" ${person.memberId ? "" : 'target="_blank" rel="noopener"'}>
              ${avatar(person.name, person.photo, 48, "", 1)}
              <span class="person-copy">
                <span class="person-name"><b>${escapeHtml(person.name)}</b><span class="chip plain">${escapeHtml(person.title || "医师")}</span></span>
                <span class="person-role">${escapeHtml(dept.name)} · 医生团队</span>
              </span>
              <svg class="ic ic-18 chev"><use href="#i-chev"/></svg>
            </a>`).join("")}
        </div>
      </section>` : "";

  content.innerHTML = `
    <section class="dept-hero">
      <p class="eyebrow">${escapeHtml(dept.category || "科室中心")} · PKU IH</p>
      <h1>${escapeHtml(dept.name)}</h1>
      <p>北京大学国际医院 · 科室介绍 · ${(dept.doctors || []).length} 位医生</p>
      <div class="dept-hero-stats">
        <span><b>${(dept.leaders || []).length}</b><small>学科带头人</small></span>
        <span><b>${(dept.doctors || []).length}</b><small>医生团队</small></span>
        <span><b>${(dept.features || []).length}</b><small>特色方向</small></span>
      </div>
    </section>

    <section class="profile-section">
      <h2>科室介绍</h2>
      ${intro}
    </section>

    ${features}
    ${leaders}
    ${doctors}

    <a class="profile-back" href="./team.html?view=departments">
      ${icon("back", "ic-16")} 返回科室列表
    </a>
  `;
})();
