(() => {
  const STORAGE_KEY = "bio12_gk1_review_v1";

  const SECTIONS = {
    "dc-p1": {
      title: "Đề cương ôn tập – Phần I: Trắc nghiệm nhiều phương án lựa chọn",
      desc: "Đầy đủ 73 câu (Câu 1 → Câu 73) kèm giải thích chi tiết cơ chế đúng/sai của từng phương án theo đúng tài liệu PDF gốc.",
      kind: "decuong-p1"
    },
    "dc-p2": {
      title: "Đề cương ôn tập – Phần II: Trắc nghiệm Đúng / Sai",
      desc: "Đầy đủ 6 câu (24 ý a, b, c, d) kèm hình vẽ gốc và giải thích cơ sở khoa học cho từng nhận định.",
      kind: "decuong-p2"
    },
    "dc-p3": {
      title: "Đề cương ôn tập – Phần III: Trắc nghiệm Trả lời ngắn",
      desc: "Gồm 8 câu (Câu 69 → Câu 78, lưu ý tài liệu PDF gốc bỏ qua số 76) kèm hình ảnh và lời giải chi tiết từng bước.",
      kind: "decuong-p3"
    },
    "de-201": {
      title: window.DETHI_201.title,
      desc: window.DETHI_201.subtitle + " · Gồm Phần I (18 câu), Phần II (4 câu Đúng/Sai) và Phần III (6 câu Trả lời ngắn).",
      kind: "exam",
      exam: window.DETHI_201
    },
    "de-202": {
      title: window.DETHI_202.title,
      desc: window.DETHI_202.subtitle + " · Gồm Phần I (18 câu), Phần II (4 câu Đúng/Sai) và Phần III (6 câu Trả lời ngắn).",
      kind: "exam",
      exam: window.DETHI_202
    },
    "de-203": {
      title: window.DETHI_203.title,
      desc: window.DETHI_203.subtitle + " · Gồm Phần I (18 câu), Phần II (4 câu Đúng/Sai) và Phần III (6 câu Trả lời ngắn).",
      kind: "exam",
      exam: window.DETHI_203
    }
  };

  let state = loadState();

  function defaultState() {
    return {
      section: "dc-p1",
      mode: "practice",
      filter: "all",
      search: "",
      showAllExplain: false,
      dark: false,
      answers: {},
      checkedShort: {},
      bookmarks: {},
      examSubmitted: {}
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage quota errors
    }
  }

  // Helpers
  function normalizeVi(str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .trim();
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getSectionItems(sectionKey) {
    const sec = SECTIONS[sectionKey];
    if (sec.kind === "decuong-p1") {
      return window.DECUONG_P1.map((q) => ({ ...q, qType: "mcq" }));
    }
    if (sec.kind === "decuong-p2") {
      return window.DECUONG_P2.map((q) => ({ ...q, qType: "tf" }));
    }
    if (sec.kind === "decuong-p3") {
      return window.DECUONG_P3.map((q) => ({ ...q, qType: "short" }));
    }
    const ex = sec.exam;
    return [
      ...ex.p1.map((q) => ({ ...q, qType: "mcq", partLabel: "Phần I. Trắc nghiệm nhiều phương án lựa chọn (Câu 1 – 18)" })),
      ...ex.p2.map((q) => ({ ...q, qType: "tf", partLabel: "Phần II. Trắc nghiệm Đúng / Sai (Câu 1 – 4)" })),
      ...ex.p3.map((q) => ({ ...q, qType: "short", partLabel: "Phần III. Trắc nghiệm Trả lời ngắn (Câu 1 – 6)" }))
    ];
  }

  function isRevealAllowed(sectionKey) {
    if (state.showAllExplain) return true;
    if (state.mode === "practice") return true;
    return !!state.examSubmitted[sectionKey];
  }

  function isShortCorrect(q, val) {
    if (val === undefined || val === null) return false;
    const norm = String(val).trim().toLowerCase().replace(/\s+/g, " ");
    if (!norm) return false;
    return q.acceptedAnswers.some((ans) => ans.toLowerCase() === norm);
  }

  function getQuestionStatus(q, sectionKey) {
    const reveal = isRevealAllowed(sectionKey);
    const ans = state.answers[q.id];

    if (q.qType === "mcq") {
      if (!ans) return "unanswered";
      if (!reveal) return "answered";
      return ans === q.answer ? "ok" : "err";
    }

    if (q.qType === "tf") {
      const obj = ans && typeof ans === "object" ? ans : {};
      const keys = Object.keys(obj);
      if (keys.length === 0) return "unanswered";
      if (!reveal) return keys.length === q.statements.length ? "answered" : "partial";
      let right = 0;
      let wrong = 0;
      q.statements.forEach((s) => {
        if (obj[s.key] === true || obj[s.key] === false) {
          if (obj[s.key] === s.answer) right++;
          else wrong++;
        }
      });
      if (wrong === 0 && right === q.statements.length) return "ok";
      if (wrong > 0 && right === 0 && keys.length === q.statements.length) return "err";
      if (wrong > 0) return "err";
      return "partial";
    }

    if (q.qType === "short") {
      const hasTyped = ans !== undefined && String(ans).trim() !== "";
      const checked = !!state.checkedShort[q.id];
      if (!hasTyped && !checked) return "unanswered";
      if (!reveal) return hasTyped ? "answered" : "unanswered";
      if (!checked && state.mode === "practice") return "unanswered";
      if (!hasTyped && checked) return "err";
      return isShortCorrect(q, ans) ? "ok" : "err";
    }

    return "unanswered";
  }

  function matchesFilterAndSearch(q, sectionKey) {
    const st = getQuestionStatus(q, sectionKey);
    if (state.filter === "unanswered") {
      if (st !== "unanswered" && st !== "partial") return false;
    } else if (state.filter === "wrong") {
      if (st !== "err") return false;
    } else if (state.filter === "image") {
      if (!q.image) return false;
    } else if (state.filter === "bookmarked") {
      if (!state.bookmarks[q.id]) return false;
    }

    const query = normalizeVi(state.search);
    if (!query) return true;

    const hayParts = [q.question || "", q.prompt || "", q.quote || "", q.label || "", `cau ${q.num}`];
    if (q.options) hayParts.push(...Object.values(q.options));
    if (q.explainCorrect) hayParts.push(q.explainCorrect);
    if (q.explainOptions) hayParts.push(...Object.values(q.explainOptions));
    if (q.statements) {
      q.statements.forEach((s) => {
        hayParts.push(s.text || "", s.explain || "");
      });
    }
    if (q.explain) hayParts.push(q.explain);

    const hay = normalizeVi(hayParts.join(" "));
    return hay.includes(query);
  }

  // DOM References
  const elSectionNav = document.getElementById("sectionNav");
  const elSectionBanner = document.getElementById("sectionBanner");
  const elQuestionsList = document.getElementById("questionsList");
  const elPaletteGrid = document.getElementById("paletteGrid");
  const elProgressPercent = document.getElementById("progressPercent");
  const elProgressFill = document.getElementById("progressFill");
  const elStatCorrect = document.getElementById("statCorrect");
  const elStatWrong = document.getElementById("statWrong");
  const elStatPending = document.getElementById("statPending");
  const elMobileStatsText = document.getElementById("mobileStatsText");
  const elSearchInput = document.getElementById("searchInput");
  const elFilterPills = document.getElementById("filterPills");
  const elExamActionBox = document.getElementById("examActionBox");
  const elBtnSubmitExam = document.getElementById("btnSubmitExam");
  const elExamScoreCard = document.getElementById("examScoreCard");
  const elBtnToggleAllExplain = document.getElementById("btnToggleAllExplain");
  const elBtnResetSection = document.getElementById("btnResetSection");
  const elBtnThemeToggle = document.getElementById("btnThemeToggle");
  const elSidebar = document.getElementById("sidebar");
  const elBtnOpenPaletteMobile = document.getElementById("btnOpenPaletteMobile");
  const elLightbox = document.getElementById("lightbox");
  const elLightboxImg = document.getElementById("lightboxImg");
  const elLightboxCaption = document.getElementById("lightboxCaption");

  function applyTheme() {
    document.body.classList.toggle("dark", !!state.dark);
    elBtnThemeToggle.textContent = state.dark ? "☀️" : "🌙";
  }

  function syncTopControls() {
    elSectionNav.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.section === state.section);
    });
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });
    elFilterPills.querySelectorAll(".pill").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === state.filter);
    });
    elSearchInput.value = state.search;
    elBtnToggleAllExplain.classList.toggle("active", state.showAllExplain);
    elBtnToggleAllExplain.textContent = state.showAllExplain
      ? "📕 Ẩn bớt giải thích sẵn"
      : "📖 Mở toàn bộ giải thích";
  }

  function renderStatsAndPalette(items) {
    const reveal = isRevealAllowed(state.section);
    let okCount = 0;
    let errCount = 0;
    let answeredCount = 0;

    items.forEach((q) => {
      const st = getQuestionStatus(q, state.section);
      if (st === "ok") {
        okCount++;
        answeredCount++;
      } else if (st === "err") {
        errCount++;
        answeredCount++;
      } else if (st === "answered" || st === "partial") {
        answeredCount++;
      }
    });

    const total = items.length;
    const pending = total - answeredCount;
    const pct = total ? Math.round((answeredCount / total) * 100) : 0;

    elProgressPercent.textContent = `${pct}% (${answeredCount}/${total})`;
    elProgressFill.style.width = `${pct}%`;
    elStatCorrect.textContent = reveal ? okCount : answeredCount;
    elStatCorrect.nextElementSibling.textContent = reveal ? "Đúng" : "Đã chọn";
    elStatWrong.textContent = reveal ? errCount : 0;
    elStatPending.textContent = pending;
    elMobileStatsText.textContent = reveal
      ? `Đúng ${okCount}/${total} · Sai ${errCount}`
      : `Đã làm ${answeredCount}/${total}`;

    // Exam submit box
    if (state.mode === "exam") {
      elExamActionBox.hidden = false;
      const submitted = !!state.examSubmitted[state.section];
      elBtnSubmitExam.textContent = submitted ? "✓ Đã nộp bài (Bấm để tính lại)" : "Nộp bài & Chấm điểm";
      if (submitted) {
        renderExamScoreCard(items);
      } else {
        elExamScoreCard.hidden = true;
      }
    } else {
      elExamActionBox.hidden = true;
      elExamScoreCard.hidden = true;
    }

    // Palette
    elPaletteGrid.innerHTML = items
      .map((q) => {
        const st = getQuestionStatus(q, state.section);
        const cls = ["pal-btn"];
        if (st === "ok") cls.push("ok");
        else if (st === "err") cls.push("err");
        else if (st === "partial") cls.push("partial");
        else if (st === "answered") cls.push("answered");
        if (state.bookmarks[q.id]) cls.push("bookmarked");
        const shortLabel = q.qType === "tf" && SECTIONS[state.section].kind === "exam"
          ? `II.${q.num}`
          : q.qType === "short" && SECTIONS[state.section].kind === "exam"
          ? `III.${q.num}`
          : String(q.num);
        return `<button type="button" class="${cls.join(" ")}" data-jump="${q.id}" title="Tới ${escapeHtml(q.label || `Câu ${q.num}`)}">${escapeHtml(shortLabel)}</button>`;
      })
      .join("");
  }

  function renderExamScoreCard(items) {
    let mcqRight = 0, mcqTotal = 0;
    let tfPoints = 0, tfStmtsRight = 0, tfStmtsTotal = 0, tfCount = 0;
    let shortRight = 0, shortTotal = 0;

    items.forEach((q) => {
      const ans = state.answers[q.id];
      if (q.qType === "mcq") {
        mcqTotal++;
        if (ans === q.answer) mcqRight++;
      } else if (q.qType === "tf") {
        tfCount++;
        const obj = ans && typeof ans === "object" ? ans : {};
        let c = 0;
        q.statements.forEach((s) => {
          tfStmtsTotal++;
          if (obj[s.key] === s.answer) {
            c++;
            tfStmtsRight++;
          }
        });
        if (c === 1) tfPoints += 0.1;
        else if (c === 2) tfPoints += 0.25;
        else if (c === 3) tfPoints += 0.5;
        else if (c === 4) tfPoints += 1.0;
      } else if (q.qType === "short") {
        shortTotal++;
        if (isShortCorrect(q, ans)) shortRight++;
      }
    });

    let html = "";
    if (SECTIONS[state.section].kind === "exam") {
      const p1Score = mcqRight * 0.25;
      const p2Score = tfPoints;
      const p3Score = shortRight * 0.25;
      const total10 = (p1Score + p2Score + p3Score).toFixed(2);
      html = `
        <div>Điểm dự kiến (thang 10): <strong>${total10} / 10</strong></div>
        <div style="margin-top:4px;font-size:0.78rem;color:var(--text-muted)">
          • Phần I: ${mcqRight}/${mcqTotal} câu (${p1Score.toFixed(2)}đ)<br/>
          • Phần II: ${tfStmtsRight}/${tfStmtsTotal} ý (${p2Score.toFixed(2)}đ)<br/>
          • Phần III: ${shortRight}/${shortTotal} câu (${p3Score.toFixed(2)}đ)
        </div>`;
    } else if (SECTIONS[state.section].kind === "decuong-p1") {
      const score10 = ((mcqRight / mcqTotal) * 10).toFixed(2);
      html = `<div>Kết quả: <strong>${mcqRight}/${mcqTotal} câu đúng</strong> (${score10}/10đ)</div>`;
    } else if (SECTIONS[state.section].kind === "decuong-p2") {
      html = `<div>Kết quả: <strong>${tfStmtsRight}/${tfStmtsTotal} ý đúng</strong> (${tfPoints.toFixed(2)}/${tfCount}.00đ)</div>`;
    } else {
      html = `<div>Kết quả: <strong>${shortRight}/${shortTotal} câu đúng</strong></div>`;
    }

    elExamScoreCard.innerHTML = html;
    elExamScoreCard.hidden = false;
  }

  function renderDiagram(img) {
    if (!img) return "";
    return `
      <div class="diagram-frame">
        <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.caption || "Hình minh họa")}" data-zoom-src="${escapeHtml(img.src)}" data-zoom-cap="${escapeHtml(img.caption || "")}" loading="lazy" />
        ${img.caption ? `<p class="diagram-caption">${escapeHtml(img.caption)} (Nhấn vào ảnh để phóng to)</p>` : ""}
      </div>
    `;
  }

  function renderMcqCard(q, reveal) {
    const userChoice = state.answers[q.id];
    const hasAnswered = !!userChoice;
    const isCorrect = userChoice === q.answer;
    const showExplain = state.showAllExplain || (reveal && hasAnswered);

    let cardCls = "q-card";
    if (reveal && hasAnswered) {
      cardCls += isCorrect ? " state-ok" : " state-err";
    }

    const statusTag = reveal && hasAnswered
      ? isCorrect
        ? `<span class="q-status-tag ok">✓ Chính xác (${q.answer})</span>`
        : `<span class="q-status-tag err">✕ Bạn chọn ${userChoice} · Đúng: ${q.answer}</span>`
      : "";

    const letters = ["A", "B", "C", "D"];
    const optionsHtml = letters
      .map((L) => {
        if (!q.options[L]) return "";
        let itemCls = "opt-item";
        if (!reveal && userChoice === L) {
          itemCls += " selected";
        } else if (showExplain) {
          if (L === q.answer) itemCls += " correct";
          else if (userChoice === L && L !== q.answer) itemCls += " wrong";
        }

        // Pinpoint inline explanation directly under the wrong option the user picked
        let inlineWrongHtml = "";
        if (reveal && hasAnswered && userChoice === L && L !== q.answer) {
          const reason = q.explainOptions && q.explainOptions[L]
            ? q.explainOptions[L]
            : `Bạn đã chọn ${L}, nhưng đáp án đúng của câu này là ${q.answer}.`;
          inlineWrongHtml = `<div class="opt-inline-why"><strong>Vì sao ${L} sai?</strong> ${escapeHtml(reason)}</div>`;
        }

        const disabledAttr = state.mode === "practice" && hasAnswered ? "disabled" : "";

        return `
          <div class="${itemCls}">
            <button type="button" class="opt-btn" data-action="pick-mcq" data-qid="${q.id}" data-opt="${L}" ${disabledAttr}>
              <span class="opt-letter">${L}</span>
              <span>${escapeHtml(q.options[L])}</span>
            </button>
            ${inlineWrongHtml}
          </div>
        `;
      })
      .join("");

    let explainHtml = "";
    if (showExplain) {
      const boxCls = hasAnswered ? (isCorrect ? "explain-box ok" : "explain-box err") : "explain-box";
      const titleCls = hasAnswered ? (isCorrect ? "explain-title ok" : "explain-title err") : "explain-title ok";
      const titleText = hasAnswered
        ? isCorrect
          ? `✓ Chính xác! Vì sao chọn đáp án ${q.answer}?`
          : `💡 Đáp án đúng là ${q.answer} — Giải thích chi tiết:`
        : `📖 Đáp án đúng: ${q.answer} — Hướng dẫn giải:`;

      let otherRows = "";
      if (q.explainOptions) {
        const seenTexts = new Set();
        const wrongLetters = letters.filter((L) => L !== q.answer && q.explainOptions[L]);
        const rows = [];
        wrongLetters.forEach((L) => {
          const txt = q.explainOptions[L];
          if (seenTexts.has(txt)) return;
          seenTexts.add(txt);
          const isUserWrong = userChoice === L;
          rows.push(`<div class="other-opt-row ${isUserWrong ? "is-user-wrong" : ""}">${escapeHtml(txt)}</div>`);
        });
        if (rows.length > 0) {
          otherRows = `
            <div class="other-options-block">
              <div class="other-options-title">Tại sao không chọn các phương án còn lại?</div>
              ${rows.join("")}
            </div>
          `;
        }
      }

      explainHtml = `
        <div class="${boxCls}">
          <div class="${titleCls}">${titleText}</div>
          <div class="explain-body">${escapeHtml(q.explainCorrect)}</div>
          ${otherRows}
        </div>
      `;
    }

    const retryBtn = state.mode === "practice" && hasAnswered
      ? `<div class="q-footer-tools"><button type="button" class="ghost-btn small" data-action="retry-q" data-qid="${q.id}">↺ Chọn lại câu này</button></div>`
      : "";

    return `
      <article class="${cardCls}" id="q-${q.id}">
        <div class="q-head">
          <div class="q-badges">
            <span class="q-num">Câu ${q.num}</span>
            ${statusTag}
          </div>
          <div class="q-actions-mini">
            <button type="button" class="bookmark-btn ${state.bookmarks[q.id] ? "active" : ""}" data-action="bookmark" data-qid="${q.id}">
              ${state.bookmarks[q.id] ? "★ Đã lưu" : "☆ Đánh dấu"}
            </button>
          </div>
        </div>
        <div class="q-text">${escapeHtml(q.question)}</div>
        ${renderDiagram(q.image)}
        <div class="options-list">${optionsHtml}</div>
        ${explainHtml}
        ${retryBtn}
      </article>
    `;
  }

  function renderTfCard(q, reveal) {
    const userObj = (state.answers[q.id] && typeof state.answers[q.id] === "object") ? state.answers[q.id] : {};
    let answeredCount = 0;
    let rightCount = 0;
    let wrongCount = 0;

    q.statements.forEach((s) => {
      if (userObj[s.key] === true || userObj[s.key] === false) {
        answeredCount++;
        if (userObj[s.key] === s.answer) rightCount++;
        else wrongCount++;
      }
    });

    let cardCls = "q-card";
    let statusTag = "";
    if (reveal && answeredCount > 0) {
      if (wrongCount === 0 && answeredCount === q.statements.length) {
        cardCls += " state-ok";
        statusTag = `<span class="q-status-tag ok">✓ Đúng cả ${q.statements.length}/${q.statements.length} ý</span>`;
      } else if (wrongCount > 0) {
        cardCls += " state-err";
        statusTag = `<span class="q-status-tag err">Đúng ${rightCount}/${answeredCount} ý đã chọn</span>`;
      } else {
        statusTag = `<span class="q-status-tag ok">Đang đúng ${rightCount}/${q.statements.length} ý</span>`;
      }
    }

    const stmtsHtml = q.statements
      .map((s) => {
        const uVal = userObj[s.key];
        const hasVal = uVal === true || uVal === false;
        const showStmtExplain = state.showAllExplain || (reveal && hasVal);
        const isRight = hasVal && uVal === s.answer;

        let rowCls = "tf-row";
        if (reveal && hasVal) {
          rowCls += isRight ? " ok" : " err";
        }

        const trueBtnCls = [
          "tf-btn",
          uVal === true ? (reveal ? "chosen" : "active-true") : ""
        ].filter(Boolean).join(" ");

        const falseBtnCls = [
          "tf-btn",
          uVal === false ? (reveal ? "chosen" : "active-false") : ""
        ].filter(Boolean).join(" ");

        let explainBlock = "";
        if (showStmtExplain) {
          const verdictBadge = s.answer
            ? `<span class="tf-verdict true-ans">Đáp án: Đúng</span>`
            : `<span class="tf-verdict false-ans">Đáp án: Sai</span>`;
          const userNote = hasVal && reveal
            ? isRight
              ? `<span class="tf-user-note ok">✓ Bạn chọn đúng</span>`
              : `<span class="tf-user-note err">✕ Bạn chọn ${uVal ? "Đúng" : "Sai"} (chưa chính xác)</span>`
            : "";
          const expText = s.explain ? escapeHtml(s.explain) : (s.answer ? "Nhận định Đúng theo đáp án chuẩn." : "Nhận định Sai theo đáp án chuẩn.");
          explainBlock = `
            <div class="tf-explain">
              ${verdictBadge}${userNote}
              <div style="margin-top:5px;">${expText}</div>
            </div>
          `;
        }

        return `
          <div class="${rowCls}">
            <div class="tf-top">
              <div class="tf-statement"><span class="tf-key">${s.key})</span> ${escapeHtml(s.text)}</div>
              <div class="tf-controls">
                <button type="button" class="${trueBtnCls}" data-action="pick-tf" data-qid="${q.id}" data-key="${s.key}" data-val="true">Đúng</button>
                <button type="button" class="${falseBtnCls}" data-action="pick-tf" data-qid="${q.id}" data-key="${s.key}" data-val="false">Sai</button>
              </div>
            </div>
            ${explainBlock}
          </div>
        `;
      })
      .join("");

    const quoteHtml = q.quote ? `<div class="q-quote">${escapeHtml(q.quote)}</div>` : "";
    const retryBtn = state.mode === "practice" && answeredCount > 0
      ? `<div class="q-footer-tools"><button type="button" class="ghost-btn small" data-action="retry-q" data-qid="${q.id}">↺ Làm lại câu này</button></div>`
      : "";

    return `
      <article class="${cardCls}" id="q-${q.id}">
        <div class="q-head">
          <div class="q-badges">
            <span class="q-num">${escapeHtml(q.label || `Câu ${q.num}`)}</span>
            ${statusTag}
          </div>
          <div class="q-actions-mini">
            <button type="button" class="bookmark-btn ${state.bookmarks[q.id] ? "active" : ""}" data-action="bookmark" data-qid="${q.id}">
              ${state.bookmarks[q.id] ? "★ Đã lưu" : "☆ Đánh dấu"}
            </button>
          </div>
        </div>
        <div class="q-text">${escapeHtml(q.prompt)}</div>
        ${quoteHtml}
        ${renderDiagram(q.image)}
        <div class="tf-list">${stmtsHtml}</div>
        ${retryBtn}
      </article>
    `;
  }

  function renderShortCard(q, reveal) {
    const userVal = state.answers[q.id] || "";
    const isChecked = !!state.checkedShort[q.id];
    const showExplain = state.showAllExplain || (reveal && isChecked);
    const isRight = isShortCorrect(q, userVal);

    let cardCls = "q-card";
    let statusTag = "";
    if (reveal && isChecked) {
      if (isRight) {
        cardCls += " state-ok";
        statusTag = `<span class="q-status-tag ok">✓ Chính xác</span>`;
      } else {
        cardCls += " state-err";
        statusTag = `<span class="q-status-tag err">✕ Đáp số đúng: ${escapeHtml(q.answerDisplay)}</span>`;
      }
    }

    const explainBlock = showExplain
      ? `
        <div class="explain-box ${isChecked && reveal ? (isRight ? "ok" : "err") : ""}">
          <div class="explain-title ${isChecked && reveal && !isRight ? "err" : "ok"}">
            ➔ Đáp số: ${escapeHtml(q.answerDisplay)}
          </div>
          <div class="explain-body">${escapeHtml(q.explain)}</div>
        </div>
      `
      : "";

    const actionBtns = state.mode === "practice"
      ? `
        <button type="button" class="primary-btn" data-action="check-short" data-qid="${q.id}">Kiểm tra</button>
        <button type="button" class="ghost-btn" data-action="reveal-short" data-qid="${q.id}">Xem lời giải</button>
      `
      : "";

    return `
      <article class="${cardCls}" id="q-${q.id}">
        <div class="q-head">
          <div class="q-badges">
            <span class="q-num">${escapeHtml(q.label || `Câu ${q.num}`)}</span>
            ${statusTag}
          </div>
          <div class="q-actions-mini">
            <button type="button" class="bookmark-btn ${state.bookmarks[q.id] ? "active" : ""}" data-action="bookmark" data-qid="${q.id}">
              ${state.bookmarks[q.id] ? "★ Đã lưu" : "☆ Đánh dấu"}
            </button>
          </div>
        </div>
        <div class="q-text">${escapeHtml(q.question)}</div>
        ${renderDiagram(q.image)}
        <div class="sa-box">
          <input type="text" class="sa-input" placeholder="Nhập đáp số của bạn..." value="${escapeHtml(userVal)}" data-action="input-short" data-qid="${q.id}" />
          ${actionBtns}
        </div>
        ${explainBlock}
      </article>
    `;
  }

  function renderAll() {
    const sec = SECTIONS[state.section];
    const items = getSectionItems(state.section);
    const reveal = isRevealAllowed(state.section);

    // Banner
    let examJumpHtml = "";
    if (sec.kind === "exam") {
      examJumpHtml = `
        <div class="exam-subnav">
          <button type="button" class="ghost-btn small" data-jump-part="part-1">Phần I (18 TN)</button>
          <button type="button" class="ghost-btn small" data-jump-part="part-2">Phần II (4 Đúng/Sai)</button>
          <button type="button" class="ghost-btn small" data-jump-part="part-3">Phần III (6 Trả lời ngắn)</button>
        </div>
      `;
    }
    elSectionBanner.innerHTML = `
      <h2>${escapeHtml(sec.title)}</h2>
      <p>${escapeHtml(sec.desc)}</p>
      ${examJumpHtml}
    `;

    renderStatsAndPalette(items);

    const visibleItems = items.filter((q) => matchesFilterAndSearch(q, state.section));
    if (visibleItems.length === 0) {
      elQuestionsList.innerHTML = `
        <div class="empty-state">
          <p>Không tìm thấy câu hỏi nào khớp với bộ lọc hiện tại.</p>
          <button type="button" class="ghost-btn" id="btnClearFilters">Xóa bộ lọc &amp; tìm kiếm</button>
        </div>
      `;
      return;
    }

    let lastPartLabel = "";
    let partIdx = 0;
    const htmlParts = visibleItems.map((q) => {
      let header = "";
      if (sec.kind === "exam" && q.partLabel && q.partLabel !== lastPartLabel) {
        lastPartLabel = q.partLabel;
        partIdx++;
        header = `<h3 class="exam-part-title" id="part-${partIdx}">${escapeHtml(q.partLabel)}</h3>`;
      }
      let cardHtml = "";
      if (q.qType === "mcq") cardHtml = renderMcqCard(q, reveal);
      else if (q.qType === "tf") cardHtml = renderTfCard(q, reveal);
      else cardHtml = renderShortCard(q, reveal);
      return header + cardHtml;
    });

    elQuestionsList.innerHTML = htmlParts.join("");
  }

  function updateSingleQuestion(qid) {
    const items = getSectionItems(state.section);
    const q = items.find((item) => item.id === qid);
    if (!q) {
      renderAll();
      return;
    }
    const el = document.getElementById(`q-${qid}`);
    if (!el) {
      renderAll();
      return;
    }
    const reveal = isRevealAllowed(state.section);
    const wrapper = document.createElement("div");
    if (q.qType === "mcq") wrapper.innerHTML = renderMcqCard(q, reveal);
    else if (q.qType === "tf") wrapper.innerHTML = renderTfCard(q, reveal);
    else wrapper.innerHTML = renderShortCard(q, reveal);

    el.replaceWith(wrapper.firstElementChild);
    renderStatsAndPalette(items);
  }

  // Event Listeners
  elSectionNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-tab");
    if (!btn) return;
    state.section = btn.dataset.section;
    saveState();
    syncTopControls();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelector(".mode-switch").addEventListener("click", (e) => {
    const btn = e.target.closest(".mode-btn");
    if (!btn) return;
    state.mode = btn.dataset.mode;
    saveState();
    syncTopControls();
    renderAll();
  });

  elBtnThemeToggle.addEventListener("click", () => {
    state.dark = !state.dark;
    saveState();
    applyTheme();
  });

  elFilterPills.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    state.filter = btn.dataset.filter;
    saveState();
    syncTopControls();
    renderAll();
  });

  elSearchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    saveState();
    renderAll();
  });

  elBtnToggleAllExplain.addEventListener("click", () => {
    state.showAllExplain = !state.showAllExplain;
    saveState();
    syncTopControls();
    renderAll();
  });

  elBtnResetSection.addEventListener("click", () => {
    const items = getSectionItems(state.section);
    if (!confirm("Bạn muốn xóa toàn bộ câu trả lời đã làm ở phần này để ôn lại từ đầu?")) return;
    items.forEach((q) => {
      delete state.answers[q.id];
      delete state.checkedShort[q.id];
    });
    delete state.examSubmitted[state.section];
    saveState();
    renderAll();
  });

  elBtnSubmitExam.addEventListener("click", () => {
    const items = getSectionItems(state.section);
    items.forEach((q) => {
      if (q.qType === "short") {
        state.checkedShort[q.id] = true;
      }
    });
    state.examSubmitted[state.section] = true;
    saveState();
    renderAll();
  });

  elPaletteGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".pal-btn");
    if (!btn) return;
    const qid = btn.dataset.jump;
    const target = document.getElementById(`q-${qid}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      elSidebar.classList.remove("mobile-open");
    } else {
      // If hidden by filter, reset filter to all first
      state.filter = "all";
      state.search = "";
      saveState();
      syncTopControls();
      renderAll();
      const newTarget = document.getElementById(`q-${qid}`);
      if (newTarget) newTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      elSidebar.classList.remove("mobile-open");
    }
  });

  elSectionBanner.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-jump-part]");
    if (!btn) return;
    const target = document.getElementById(btn.dataset.jumpPart);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  elBtnOpenPaletteMobile.addEventListener("click", () => {
    elSidebar.classList.toggle("mobile-open");
  });

  elQuestionsList.addEventListener("click", (e) => {
    // Clear filters button in empty state
    if (e.target.id === "btnClearFilters") {
      state.filter = "all";
      state.search = "";
      saveState();
      syncTopControls();
      renderAll();
      return;
    }

    // Image Lightbox trigger
    const zoomImg = e.target.closest("[data-zoom-src]");
    if (zoomImg) {
      elLightboxImg.src = zoomImg.dataset.zoomSrc;
      elLightboxImg.alt = zoomImg.dataset.zoomCap || "Hình minh họa";
      elLightboxCaption.textContent = zoomImg.dataset.zoomCap || "";
      elLightbox.hidden = false;
      return;
    }

    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const qid = btn.dataset.qid;

    if (action === "pick-mcq") {
      state.answers[qid] = btn.dataset.opt;
      saveState();
      updateSingleQuestion(qid);
    } else if (action === "pick-tf") {
      const key = btn.dataset.key;
      const val = btn.dataset.val === "true";
      if (!state.answers[qid] || typeof state.answers[qid] !== "object") {
        state.answers[qid] = {};
      }
      state.answers[qid][key] = val;
      saveState();
      updateSingleQuestion(qid);
    } else if (action === "check-short" || action === "reveal-short") {
      state.checkedShort[qid] = true;
      saveState();
      updateSingleQuestion(qid);
    } else if (action === "retry-q") {
      delete state.answers[qid];
      delete state.checkedShort[qid];
      saveState();
      updateSingleQuestion(qid);
    } else if (action === "bookmark") {
      if (state.bookmarks[qid]) delete state.bookmarks[qid];
      else state.bookmarks[qid] = true;
      saveState();
      updateSingleQuestion(qid);
    }
  });

  elQuestionsList.addEventListener("input", (e) => {
    const inp = e.target.closest("[data-action='input-short']");
    if (!inp) return;
    state.answers[inp.dataset.qid] = inp.value;
    saveState();
  });

  elQuestionsList.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const inp = e.target.closest("[data-action='input-short']");
      if (inp && state.mode === "practice") {
        e.preventDefault();
        state.checkedShort[inp.dataset.qid] = true;
        saveState();
        updateSingleQuestion(inp.dataset.qid);
      }
    }
  });

  // Lightbox Close
  function closeLightbox() {
    elLightbox.hidden = true;
    elLightboxImg.src = "";
  }
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxBackdrop").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !elLightbox.hidden) closeLightbox();
  });

  // Init
  applyTheme();
  syncTopControls();
  renderAll();
})();
