/* 分院网络 */
(function () {
  "use strict";

  const { $, escapeHtml, icon, openSheet, closeSheet, toast } = window.PKU;
  const NET = window.PKU_NETWORK || { TYPES: {}, REGIONS: [], INSTITUTIONS: [] };
  const TYPES = NET.TYPES || {};
  const REGIONS = (NET.REGIONS || []).filter(region => region.id !== "all");
  const INSTITUTIONS = NET.INSTITUTIONS || [];
  const params = new URLSearchParams(window.location.search);
  const initialRegion = params.get("region");

  const state = {
    region: REGIONS.some(region => region.id === initialRegion) ? initialRegion : "all",
    query: ""
  };

  $("#hospitalResult").textContent = `共 ${INSTITUTIONS.length} 家机构`;

  function typeOf(item) {
    return TYPES[item.type] || { name: "医疗机构", icon: "hospital", color: "#0b63e5" };
  }
  function regionOf(item) {
    return REGIONS.find(region => region.id === item.region) || { short: "", name: "" };
  }

  function renderFilter() {
    const chips = [
      `<button type="button" class="chip ${state.region === "all" ? "is-active" : ""}" data-region="all">全部 · ${INSTITUTIONS.length}</button>`
    ].concat(
      REGIONS.map(region => {
        const count = INSTITUTIONS.filter(item => item.region === region.id).length;
        return `<button type="button" class="chip ${state.region === region.id ? "is-active" : ""}" data-region="${region.id}">${escapeHtml(region.short)} · ${count}</button>`;
      })
    );
    $("#regionFilter").innerHTML = chips.join("");
  }

  function filtered() {
    const query = state.query.trim().toLowerCase();
    return INSTITUTIONS.filter(item => {
      if (state.region !== "all" && item.region !== state.region) return false;
      if (!query) return true;
      const region = regionOf(item);
      const type = typeOf(item);
      const haystack = `${item.name} ${item.fullName} ${item.subtitle} ${item.address} ${item.branch || ""} ${item.phone} ${item.aliases} ${region.name} ${type.name}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  function card(item) {
    const type = typeOf(item);
    const region = regionOf(item);
    return `
      <article class="hospital-card" style="--tone:${type.color}">
        <div class="hospital-card-top">
          <span class="hospital-mark">${icon(type.icon, "ic-20")}</span>
          <span class="hospital-card-copy">
            <b>${escapeHtml(item.name)}</b>
            <span class="hospital-tags">
              <span class="chip plain">${escapeHtml(type.name)}</span>
              <span class="chip plain">${escapeHtml(region.short)}</span>
              ${item.subtitle ? `<span class="chip plain">${escapeHtml(item.subtitle)}</span>` : ""}
            </span>
          </span>
        </div>
        <div class="hospital-addr">
          ${icon("pin", "ic-12")}
          <span>${escapeHtml(item.address)}${item.branch ? `<br />${escapeHtml(item.branch)}` : ""}</span>
        </div>
        <div class="hospital-actions">
          <a class="call" href="tel:${escapeHtml(item.phone.replace(/[^\d+]/g, ""))}">${icon("phone", "ic-14")}${escapeHtml(item.phone)}</a>
          <button type="button" data-hospital="${escapeHtml(item.id)}">查看详情${icon("chev", "ic-12")}</button>
        </div>
      </article>`;
  }

  function render() {
    renderFilter();
    const items = filtered();
    $("#hospitalList").innerHTML = items.map(card).join("");
    $("#hospitalResult").textContent = state.region === "all" ? `共 ${items.length} 家机构` : `${regionOf({ region: state.region }).name} · ${items.length} 家`;
    $("#hospitalEmpty").classList.toggle("hide", items.length > 0);
  }

  function openDetail(id) {
    const item = INSTITUTIONS.find(inst => inst.id === id);
    if (!item) return;
    const type = typeOf(item);
    const region = regionOf(item);
    $("#hospitalSheetBody").innerHTML = `
      <div class="hospital-sheet-head">
        <span class="hospital-tags" style="margin-bottom:8px">
          <span class="chip brand">${escapeHtml(type.name)}</span>
          <span class="chip plain">${escapeHtml(region.name)}</span>
        </span>
        <h2>${escapeHtml(item.fullName || item.name)}</h2>
        <p>${escapeHtml(item.subtitle || region.summary || "")}</p>
      </div>
      <div class="hospital-info-row">${icon("pin", "ic-16")}<span><b>地址</b><span>${escapeHtml(item.address)}</span></span></div>
      ${item.branch ? `<div class="hospital-info-row">${icon("pin", "ic-16")}<span><b>分院区</b><span>${escapeHtml(item.branch)}</span></span></div>` : ""}
      <div class="hospital-info-row">${icon("phone", "ic-16")}<span><b>电话</b><span>${escapeHtml(item.phone)}</span></span></div>
      <div class="hospital-info-row">${icon("building", "ic-16")}<span><b>所属网络</b><span>北大医疗 · ${escapeHtml(region.name)}</span></span></div>
      <div class="member-sheet-actions">
        <a class="btn btn-primary btn-block" href="tel:${escapeHtml(item.phone.replace(/[^\d+]/g, ""))}">拨打电话</a>
        <button class="btn btn-ghost" type="button" data-copy="${escapeHtml(item.address)}">复制地址</button>
      </div>
      <button class="btn btn-ghost btn-block" type="button" data-close-sheet style="margin-top:10px">关闭</button>
    `;
    openSheet($("#hospitalSheet"));
    const body = $("#hospitalSheetBody");
    body.querySelector("[data-close-sheet]").addEventListener("click", () => closeSheet($("#hospitalSheet")));
    const copy = body.querySelector("[data-copy]");
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copy.dataset.copy);
        toast("地址已复制");
      } catch (err) {
        toast("复制失败，请长按地址选择");
      }
    });
  }

  $("#regionFilter").addEventListener("click", event => {
    const button = event.target.closest("[data-region]");
    if (!button) return;
    state.region = button.dataset.region;
    render();
  });

  $("#hospitalList").addEventListener("click", event => {
    const button = event.target.closest("[data-hospital]");
    if (button) openDetail(button.dataset.hospital);
  });

  let timer = 0;
  $("#hospitalSearch").addEventListener("input", event => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.query = event.target.value;
      render();
    }, 120);
  });

  $("#hospitalReset").addEventListener("click", () => {
    state.region = "all";
    state.query = "";
    $("#hospitalSearch").value = "";
    $("#hospitalSearch").closest(".search").classList.remove("has-value");
    render();
  });

  $("#hospitalEmptyReset").addEventListener("click", () => {
    state.region = "all";
    state.query = "";
    $("#hospitalSearch").value = "";
    $("#hospitalSearch").closest(".search").classList.remove("has-value");
    render();
  });

  render();
window.__pageReady = true;
})();
