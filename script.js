const gradePoints = {"A+":4,"A":3.75,"A-":3.5,"B+":3.25,"B":3,"B-":2.75,"C+":2.5,"C":2.25,"D":2,"F":0};
const gradeMarks = {"A+":"80–100","A":"75–79","A-":"70–74","B+":"65–69","B":"60–64","B-":"55–59","C+":"50–54","C":"45–49","D":"40–44","F":"Below 40"};

const gradeColors = {
  "A+": {bg:"#d8f3dc", color:"#137333", border:"#52b788"},
  "A":  {bg:"#e8f5e9", color:"#1b7f3a", border:"#74c69d"},
  "A-": {bg:"#e7f7ef", color:"#27864b", border:"#95d5b2"},
  "B+": {bg:"#e3f2fd", color:"#0b66c3", border:"#64b5f6"},
  "B":  {bg:"#eef4ff", color:"#3156a3", border:"#8ab4f8"},
  "B-": {bg:"#f1f0ff", color:"#5b50a6", border:"#aaa2e8"},
  "C+": {bg:"#fff8db", color:"#9a6a00", border:"#f4d35e"},
  "C":  {bg:"#fff3cd", color:"#9c6500", border:"#ffc857"},
  "D":  {bg:"#ffe0e0", color:"#c1121f", border:"#ef476f"},
  "F":  {bg:"#ffd6d6", color:"#9b111e", border:"#d90429"}
};

const subjectPalette = [
  "#6f2dbd", "#0066cc", "#00875a", "#d35400", "#b5174f", "#5e548e",
  "#007f8b", "#9a6700", "#c1121f", "#4d7c0f", "#7c3aed", "#0369a1"
];

const semesterTheme = {
  1:{bg:"linear-gradient(135deg,#e8f5e9,#d8f3dc)", color:"#1b7f3a", border:"#74c69d"},
  2:{bg:"linear-gradient(135deg,#e3f2fd,#d9efff)", color:"#0b66c3", border:"#64b5f6"},
  3:{bg:"linear-gradient(135deg,#f3e8ff,#ead8ff)", color:"#7b2cbf", border:"#c084fc"},
  4:{bg:"linear-gradient(135deg,#fff3cd,#ffe69c)", color:"#9c6500", border:"#ffc857"},
  5:{bg:"linear-gradient(135deg,#ffe8d6,#ffd4b2)", color:"#c75b12", border:"#fb923c"},
  6:{bg:"linear-gradient(135deg,#e6fffb,#ccfbf1)", color:"#087f8c", border:"#2dd4bf"},
  7:{bg:"linear-gradient(135deg,#ffe5ec,#ffd6e2)", color:"#b5174f", border:"#f472b6"},
  8:{bg:"linear-gradient(135deg,#ecebff,#dedcff)", color:"#5145cd", border:"#8b83ff"}
};

function applyGradeColor(select, marks, trigger) {
  const c = gradeColors[select.value];
  select.style.background = c.bg;
  select.style.color = c.color;
  select.style.borderColor = c.border;
  marks.style.background = c.bg;
  marks.style.color = c.color;
  marks.style.borderColor = c.border;

  if (trigger) {
    trigger.style.background = c.bg;
    trigger.style.color = c.color;
    trigger.style.borderColor = c.border;
  }
}

const semesterData = {
  1:[{name:"Structured Programming Language",credit:3},{name:"Structured Programming Language Lab",credit:1.5},{name:"Electrical & Electronic Circuit",credit:3},{name:"Electrical & Electronic Circuit Lab",credit:1.5},{name:"Calculus",credit:3},{name:"Physics",credit:3},{name:"English",credit:3}],
  2:[{name:"Digital Systems Design",credit:3},{name:"Digital Systems Lab",credit:1.5},{name:"Discrete Mathematics",credit:3},{name:"Linear Algebra",credit:3},{name:"Statistics & Probability",credit:3},{name:"History of Emergence of Independent Bangladesh",credit:3}],
  3:[{name:"Data Structure",credit:3},{name:"Data Structure Lab",credit:1.5},{name:"Object Oriented Programming",credit:3},{name:"Object Oriented Programming Lab",credit:1.5},{name:"Computer Architecture",credit:3},{name:"Ordinary Differential Equation",credit:3},{name:"Fundamental of Business Studies",credit:3}],
  4:[{name:"Database Management System",credit:3},{name:"Database Management System Lab",credit:1.5},{name:"Microprocessor & Assembly Lang.",credit:3},{name:"Microprocessor & Assembly Lang. Lab",credit:1.5},{name:"Design & Analysis of Algorithms",credit:3},{name:"Design & Analysis of Algorithms Lab",credit:1.5},{name:"Numerical Analysis",credit:3}],
  5:[{name:"Peripheral & Interfacing",credit:3},{name:"Peripheral & Interfacing Lab",credit:1.5},{name:"Data & Telecom",credit:3},{name:"Data & Telecom Lab",credit:1.5},{name:"Operating System",credit:3},{name:"Operating System Lab",credit:1.5},{name:"Economics",credit:3}],
  6:[{name:"Software Engineering",credit:3},{name:"Software Engineering Lab",credit:1.5},{name:"Computer Networking",credit:3},{name:"Computer Networking Lab",credit:1.5},{name:"Embedded System Programming",credit:3},{name:"Embedded System Programming Lab",credit:1.5},{name:"Theory of Computation",credit:3}],
  7:[{name:"Artificial Intelligence",credit:3},{name:"Artificial Intelligence Lab",credit:1.5},{name:"Compiler Design & Construction",credit:3},{name:"Compiler Design Lab",credit:1.5},{name:"Computer Graphics",credit:3},{name:"Computer Graphics Lab",credit:1.5},{name:"E-Commerce & Web Eng.",credit:3},{name:"E-Commerce & Web Eng. Lab",credit:1.5}],
  8:[{name:"Network & Info Security",credit:3},{name:"Network & Info Security Lab",credit:1.5},{name:"Information System Mgmt.",credit:3},{name:"Project / Industry Attachment",credit:6},{name:"Optional Subject",credit:3},{name:"Optional Lab",credit:1.5}]
};

document.addEventListener("DOMContentLoaded", function(){
  const semesterSelect = document.getElementById("semester");
  const semesterPicker = document.getElementById("semesterPicker");
  const semesterTrigger = document.getElementById("semesterTrigger");
  const semesterSelectedText = document.getElementById("semesterSelectedText");
  const semesterOptions = [...document.querySelectorAll(".semester-option")];
  const subjectsDiv = document.getElementById("subjects");
  const resultH2 = document.getElementById("result");

  function applySemesterTheme(value) {
    const t = semesterTheme[value];
    semesterTrigger.style.background = t.bg;
    semesterTrigger.style.color = t.color;
    semesterTrigger.style.borderColor = t.border;
    semesterOptions.forEach(o => o.classList.toggle("active", o.dataset.value === String(value)));
  }

  semesterTrigger.addEventListener("click", () => {
    const isOpen = semesterPicker.classList.toggle("open");
    semesterTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  semesterOptions.forEach(option => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      semesterSelect.value = value;
      semesterSelectedText.textContent = option.textContent;
      applySemesterTheme(value);
      semesterPicker.classList.remove("open");
      semesterTrigger.setAttribute("aria-expanded", "false");
      loadSubjects();
    });
  });

  document.addEventListener("click", (e) => {
    if (!semesterPicker.contains(e.target)) {
      semesterPicker.classList.remove("open");
      semesterTrigger.setAttribute("aria-expanded", "false");
    }

    document.querySelectorAll(".grade-picker.open").forEach(picker => {
      if (!picker.contains(e.target)) picker.classList.remove("open");
    });
  });

  function gradeOptionsHTML() {
    return Object.keys(gradePoints)
      .map(g => `<button type="button" class="grade-option" data-grade="${g}">${g}</button>`)
      .join("");
  }

  function loadSubjects() {
    const sem = semesterSelect.value;
    subjectsDiv.innerHTML = "";

    semesterData[sem].forEach((s, index) => {
      const row = document.createElement("div");
      row.className = "subject";
      row.style.setProperty("--subject-color", subjectPalette[index % subjectPalette.length]);

      row.innerHTML = `
        <span class="subject-name">${s.name} (${s.credit})</span>
        <div class="grade-picker">
          <button type="button" class="grade-trigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="grade-text">A+</span>
            <span class="grade-arrow">▾</span>
          </button>
          <div class="grade-menu" role="listbox">
            ${gradeOptionsHTML()}
          </div>
          <select class="grade grade-native" aria-hidden="true" tabindex="-1">
            ${Object.keys(gradePoints).map(g=>`<option value="${g}">${g}</option>`).join("")}
          </select>
        </div>
        <span class="marks">${gradeMarks["A+"]}</span>`;

      const picker = row.querySelector(".grade-picker");
      const trigger = row.querySelector(".grade-trigger");
      const text = row.querySelector(".grade-text");
      const gradeSelect = row.querySelector(".grade");
      const marks = row.querySelector(".marks");
      const options = [...row.querySelectorAll(".grade-option")];

      applyGradeColor(gradeSelect, marks, trigger);

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".grade-picker.open").forEach(other => {
          if (other !== picker) {
            other.classList.remove("open");
            other.querySelector(".grade-trigger")?.setAttribute("aria-expanded", "false");
          }
        });
        const isOpen = picker.classList.toggle("open");
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      options.forEach(option => {
        option.addEventListener("click", (e) => {
          e.stopPropagation();
          const grade = option.dataset.grade;
          gradeSelect.value = grade;
          text.textContent = grade;
          marks.textContent = gradeMarks[grade];
          applyGradeColor(gradeSelect, marks, trigger);
          picker.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
        });
      });

      subjectsDiv.appendChild(row);
    });

    resultH2.innerText = "";
  }

  function calculateGPA(){
    const sem = semesterSelect.value;
    const grades = document.getElementsByClassName("grade");
    let totalC=0, totalP=0;

    semesterData[sem].forEach((s,i) => {
      const g = grades[i].value;
      totalC += s.credit;
      totalP += s.credit * gradePoints[g];
    });

    const gpa = (totalP/totalC).toFixed(3);
    resultH2.innerText = "GPA: " + gpa;
  }

  document.getElementById("calculateBtn").addEventListener("click", calculateGPA);
  applySemesterTheme(semesterSelect.value);
  loadSubjects();
});