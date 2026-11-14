/*
  NUCSEBD — Syllabus + Question Bank
  Reads its data from data/pdf-library.js (window.NUCSEBD_LIBRARY).
  Works independently from script.js, so the CGPA calculator and the
  existing Notes / Hand Notes / Tutorials popup are not affected.
*/
(function () {
  "use strict";

  const modal = document.getElementById("libraryModal");
  if (!modal) return;

  const kickerEl = document.getElementById("libKicker");
  const titleEl = document.getElementById("libTitle");
  const subtitleEl = document.getElementById("libSubtitle");
  const closeBtn = modal.querySelector(".modal-close");

  const steps = {
    syllabus: document.getElementById("libSyllabusStep"),
    semester: document.getElementById("libSemesterStep"),
    subject: document.getElementById("libSubjectStep"),
    papers: document.getElementById("libPapersStep"),
    result: document.getElementById("libResultStep")
  };

  const syllabusList = document.getElementById("libSyllabusList");
  const semesterGrid = document.getElementById("libSemesterGrid");
  const subjectGrid = document.getElementById("libSubjectGrid");
  const papersList = document.getElementById("libPapersList");
  const resultList = document.getElementById("libResultList");
  const backToSemesters = document.getElementById("libBackToSemesters");
  const backToSubjects = document.getElementById("libBackToSubjects");

  let lastOpener = null;
  let currentSemester = null;
  let currentSubject = null;

  /* ---------- helpers ---------- */
  function data() {
    return window.NUCSEBD_LIBRARY || { syllabus: [], questionBank: [] };
  }

  // Icons come from the SVG sprite at the top of index.html
  function ico(id) {
    return '<svg class="ico" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c];
    });
  }

  function showStep(name) {
    Object.keys(steps).forEach(function (key) {
      steps[key].classList.toggle("active", key === name);
    });
    modal.querySelector(".modal-card").scrollTop = 0;
  }

  function setHead(kicker, title, subtitle) {
    kickerEl.textContent = kicker;
    titleEl.textContent = title;
    subtitleEl.textContent = subtitle;
  }

  function openModal(opener) {
    lastOpener = opener || null;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus({ preventScroll: true });
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastOpener) lastOpener.focus({ preventScroll: true });
  }

  /* ---------- PDF availability check ----------
     Cloudflare Pages answers a missing file with the home page (status 200,
     text/html), so a "404" check alone is not enough. A file counts as
     missing when the server says 404/410 or sends back an HTML page.
     If the check cannot run (offline, opened from disk), the link is kept. */
  const fileChecks = new Map();

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function checkFile(url) {
    if (!url) return Promise.resolve("missing");
    if (isExternal(url)) return Promise.resolve("ok");
    if (fileChecks.has(url)) return fileChecks.get(url);

    const result = fetch(url, { method: "HEAD", cache: "no-cache" })
      .then(function (res) {
        const type = (res.headers.get("content-type") || "").toLowerCase();
        if (res.status === 404 || res.status === 410) return "missing";
        if (res.ok && type.indexOf("text/html") !== -1) return "missing";
        return "ok";
      })
      .catch(function () {
        return "ok";
      });

    fileChecks.set(url, result);
    return result;
  }

  function comingSoonHTML() {
    return '<span class="coming-badge">Coming Soon</span>';
  }

  function pdfButtonsHTML(file, label) {
    const href = esc(file);
    const name = esc(label);
    return (
      '<a class="lib-btn lib-btn-view" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="View PDF: ' + name + '">View PDF</a>' +
      '<a class="lib-btn lib-btn-download" href="' + href + '" download aria-label="Download PDF: ' + name + '">Download PDF</a>'
    );
  }

  // Fills a container with View/Download buttons, or "Coming Soon" when no usable file exists.
  function fillActions(container, file, label) {
    if (!file) {
      container.innerHTML = comingSoonHTML();
      return;
    }
    container.innerHTML = '<span class="lib-checking">Checking file…</span>';
    checkFile(file).then(function (state) {
      container.innerHTML = state === "ok" ? pdfButtonsHTML(file, label) : comingSoonHTML();
    });
  }

  /* ---------- Syllabus ---------- */
  function renderSyllabus() {
    const items = data().syllabus || [];
    syllabusList.innerHTML = "";

    items.forEach(function (item) {
      const card = document.createElement("div");
      card.className = "lib-card";
      card.innerHTML =
        '<div class="lib-card-icon" aria-hidden="true">' + ico("i-cap") + "</div>" +
        '<div class="lib-card-main">' +
          "<h3>" + esc(item.title) + "</h3>" +
          '<span class="lib-tag">' + esc(item.curriculum) + "</span>" +
          (item.description ? "<p>" + esc(item.description) + "</p>" : "") +
        "</div>" +
        '<div class="lib-actions"></div>';
      fillActions(card.querySelector(".lib-actions"), item.file, item.title);
      syllabusList.appendChild(card);
    });

    if (!items.length) {
      syllabusList.innerHTML = '<div class="resource-coming-card"><div class="coming-icon">' + ico("i-cap") + '</div><h3>Syllabus</h3>' + comingSoonHTML() + "</div>";
    }
  }

  function openSyllabus(opener) {
    setHead("Syllabus", "Select Syllabus", "Choose the curriculum you follow.");
    renderSyllabus();
    showStep("syllabus");
    openModal(opener);
  }

  /* ---------- Question Bank ---------- */
  function renderSemesters() {
    const semesters = data().questionBank || [];
    semesterGrid.innerHTML = "";

    semesters.forEach(function (sem) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sem-popup-btn sem-" + sem.semester;
      btn.textContent = sem.name;
      btn.addEventListener("click", function () {
        currentSemester = sem;
        renderSubjects(sem);
        setHead("Question Bank", sem.name, "Select a subject to see question papers.");
        showStep("subject");
      });
      semesterGrid.appendChild(btn);
    });
  }

  function paperCount(subject) {
    return (subject.papers || []).filter(function (p) { return p && p.file; }).length;
  }

  function renderSubjects(sem) {
    subjectGrid.innerHTML = "";
    (sem.subjects || []).forEach(function (subject) {
      const count = paperCount(subject);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "subject-popup-btn";
      btn.innerHTML =
        esc(subject.name) +
        "<small>" + (count ? count + (count === 1 ? " question paper" : " question papers") : "Coming Soon") + "</small>";
      btn.addEventListener("click", function () {
        currentSubject = subject;
        renderPapers(sem, subject);
        setHead("Question Bank", subject.name, sem.name + " • Question papers");
        showStep("papers");
      });
      subjectGrid.appendChild(btn);
    });

    if (!(sem.subjects || []).length) {
      subjectGrid.innerHTML = '<div class="resource-coming-card lib-wide"><div class="coming-icon">' + ico("i-list") + '</div><h3>' + esc(sem.name) + "</h3>" + comingSoonHTML() + "</div>";
    }
  }

  function yearValue(paper) {
    const n = parseInt(paper.year, 10);
    return isNaN(n) ? -1 : n;
  }

  function renderPapers(sem, subject) {
    const papers = (subject.papers || []).filter(function (p) { return p && p.title; });
    papersList.innerHTML = "";

    if (!papers.length) {
      papersList.innerHTML =
        '<div class="resource-coming-card"><div class="coming-icon">' + ico("i-list") + '</div><h3>' + esc(subject.name) + "</h3>" +
        "<p>Question papers for this subject will appear here when they are added.</p>" + comingSoonHTML() + "</div>";
      return;
    }

    // Newest exam year first; papers without a year go last.
    papers.slice().sort(function (a, b) { return yearValue(b) - yearValue(a); }).forEach(function (paper) {
      const row = document.createElement("div");
      row.className = "lib-card lib-paper";
      row.innerHTML =
        '<div class="lib-card-icon" aria-hidden="true">' + ico("i-list") + "</div>" +
        '<div class="lib-card-main">' +
          "<h3>" + esc(paper.title) + "</h3>" +
          (paper.year ? '<span class="lib-tag">Exam Year: ' + esc(paper.year) + "</span>" : "") +
        "</div>" +
        '<div class="lib-actions"></div>';
      fillActions(row.querySelector(".lib-actions"), paper.file, paper.title);
      papersList.appendChild(row);
    });
  }

  function openQuestionBank(opener) {
    setHead("Question Bank", "Select Semester", "Choose a semester to find question papers.");
    renderSemesters();
    showStep("semester");
    openModal(opener);
  }

  /* ---------- Result (official NU links, open in a new tab) ---------- */
  function openResult(opener) {
    const items = (data().results || []).filter(function (r) { return r && r.url; });
    resultList.innerHTML = "";

    items.forEach(function (item) {
      const card = document.createElement("div");
      card.className = "lib-card";
      card.innerHTML =
        '<div class="lib-card-icon" aria-hidden="true">' + ico("i-award") + "</div>" +
        '<div class="lib-card-main">' +
          "<h3>" + esc(item.title) + "</h3>" +
          '<span class="lib-tag">Official NU Portal</span>' +
          (item.description ? "<p>" + esc(item.description) + "</p>" : "") +
        "</div>" +
        '<div class="lib-actions"><a class="lib-btn lib-btn-view" href="' + esc(item.url) +
        '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + esc(item.title) + ' in a new tab">Open Portal ↗</a></div>';
      resultList.appendChild(card);
    });

    if (!items.length) {
      resultList.innerHTML = '<div class="resource-coming-card"><div class="coming-icon">' + ico("i-award") + '</div><h3>Result</h3>' + comingSoonHTML() + "</div>";
    }

    setHead("Result", "NU Results", "Opens the official National University result portal in a new tab.");
    showStep("result");
    openModal(opener);
  }

  /* ---------- events ---------- */
  document.querySelectorAll("[data-library]").forEach(function (card) {
    card.addEventListener("click", function () {
      if (card.dataset.library === "syllabus") openSyllabus(card);
      else if (card.dataset.library === "question-bank") openQuestionBank(card);
      else if (card.dataset.library === "result") openResult(card);
    });
  });

  // Header menu and hero buttons simply click the matching homepage card
  document.querySelectorAll("[data-trigger]").forEach(function (el) {
    el.addEventListener("click", function () {
      const target = document.querySelector(el.dataset.trigger);
      if (target) target.click();
    });
  });

  modal.querySelectorAll("[data-close-library]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  backToSemesters.addEventListener("click", function () {
    setHead("Question Bank", "Select Semester", "Choose a semester to find question papers.");
    showStep("semester");
  });

  backToSubjects.addEventListener("click", function () {
    if (!currentSemester) return;
    setHead("Question Bank", currentSemester.name, "Select a subject to see question papers.");
    renderSubjects(currentSemester);
    showStep("subject");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
