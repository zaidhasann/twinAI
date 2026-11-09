(function () {
  console.log("[TwinAI Companion] Initializing diagnostic overlay...");

  const isCodeforces = window.location.hostname.includes("codeforces.com");
  const isLeetCode = window.location.hostname.includes("leetcode.com");

  function getProblemDetails() {
    let title = "Unknown Problem";
    let tags = [];
    let problemId = "CF";

    if (isCodeforces) {
      const titleElem = document.querySelector(".title");
      if (titleElem) title = titleElem.innerText.trim();

      const tagElems = document.querySelectorAll(".tag-box");
      tagElems.forEach(el => tags.push(el.innerText.trim()));

      const urlParts = window.location.pathname.split("/");
      problemId = urlParts.slice(-2).join("");
    } else if (isLeetCode) {
      const titleElem = document.querySelector("div[class*='text-title-large'], a[class*='no-underline']");
      if (titleElem) title = titleElem.innerText.trim();
      
      const tagBadges = document.querySelectorAll("a[href*='/tag/']");
      tagBadges.forEach(el => tags.push(el.innerText.trim()));
      
      problemId = window.location.pathname.split("/")[2] || "LC";
    }

    return {
      platform: isCodeforces ? "codeforces" : "leetcode",
      problem_id: problemId,
      problem_title: title,
      verdict: "INSPECT",
      tags: tags
    };
  }

  function injectFloatingBadge() {
    if (document.getElementById("twinai-badge")) return;

    const badge = document.createElement("div");
    badge.id = "twinai-badge";
    badge.className = "twinai-floating-badge";
    badge.innerHTML = `
      <div class="twinai-pulse-dot"></div>
      <span>TwinAI Root-Cause Diagnosis</span>
    `;

    badge.addEventListener("click", triggerDiagnosis);
    document.body.appendChild(badge);
  }

  async function triggerDiagnosis() {
    const details = getProblemDetails();
    showModalLoading();

    try {
      const response = await fetch("http://localhost:8000/api/extension/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details)
      });

      if (!response.ok) throw new Error("Diagnosis API returned " + response.status);
      const data = await response.json();
      renderModalResult(data);
    } catch (err) {
      renderModalError(err.message);
    }
  }

  function showModalLoading() {
    removeExistingModal();
    const modal = document.createElement("div");
    modal.id = "twinai-modal";
    modal.className = "twinai-modal-container";
    modal.innerHTML = `
      <div class="twinai-card">
        <h3>⚡ Running Backward Graph Diagnosis...</h3>
        <p style="font-size: 13px; color: #9ca3af; margin-top: 8px;">
          Tracing ancestor prerequisite paths across 41 canonical DSA concepts via NetworkX...
        </p>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function renderModalResult(data) {
    removeExistingModal();
    const modal = document.createElement("div");
    modal.id = "twinai-modal";
    modal.className = "twinai-modal-container";

    modal.innerHTML = `
      <div class="twinai-card">
        <button class="twinai-close-btn" id="twinai-close">✕</button>
        <h3>${data.problem_title}</h3>
        
        <div class="twinai-badge-row">
          <span class="twinai-tag-symptom">Symptom: ${data.symptom_name}</span>
          <span class="twinai-tag-root">Root Cause: ${data.root_cause_name}</span>
        </div>

        <div class="twinai-chain-box">
          <strong style="color: #ffffff;">Dependency Propagation Chain:</strong><br />
          <span style="color: #7ed6a5;">${data.causal_path}</span>
        </div>

        <div class="twinai-explanation">
          ${data.explanation.replace(/\n\n/g, '<br /><br />')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
          <a class="twinai-action-btn" href="${data.recommended_fix_problem.url || '#'}" target="_blank">
            Fix Root Cause: ${data.recommended_fix_problem.title || 'Start Recommended Problem'} →
          </a>
          <span style="font-size: 11px; color: #6b7280;">TwinAI Digital Twin</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("twinai-close").addEventListener("click", removeExistingModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) removeExistingModal();
    });
  }

  function renderModalError(msg) {
    removeExistingModal();
    const modal = document.createElement("div");
    modal.id = "twinai-modal";
    modal.className = "twinai-modal-container";
    modal.innerHTML = `
      <div class="twinai-card">
        <button class="twinai-close-btn" id="twinai-close">✕</button>
        <h3 style="color: #f87171;">TwinAI Connection Notice</h3>
        <p style="font-size: 13px; color: #d1d5db; margin: 12px 0;">
          Could not connect to TwinAI backend at <code>http://localhost:8000</code>.<br />
          Ensure the FastAPI backend is running: <code>uvicorn app.main:app --port 8000</code>.
        </p>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("twinai-close").addEventListener("click", removeExistingModal);
  }

  function removeExistingModal() {
    const el = document.getElementById("twinai-modal");
    if (el) el.remove();
  }

  // Inject badge once page loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectFloatingBadge);
  } else {
    injectFloatingBadge();
  }
})();
