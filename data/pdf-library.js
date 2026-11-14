/*
  NUCSEBD — PDF LIBRARY (Syllabus + Question Bank)
  =================================================
  এই একটি ফাইল থেকেই Syllabus আর Question Bank-এর সব PDF ম্যানেজ হয়।
  HTML / JS কোড বদলানোর দরকার নেই।

  ── Question Bank-এ নতুন PDF যোগ করার নিয়ম ──────────────────────
  1) PDF ফাইলটি GitHub-এ এই ফোল্ডারে আপলোড করুন:
        resources/question-bank/semester-7/      (সেমিস্টার অনুযায়ী ফোল্ডার)
     ফাইলের নামে space দেবেন না, যেমন:  artificial-intelligence-2023.pdf
  2) নিচে সেই সেমিস্টারের সেই সাবজেক্ট খুঁজে তার papers: [ ] এর ভেতরে এক লাইন যোগ করুন:

        { title: "Final Exam 2023", year: 2023, file: "resources/question-bank/semester-7/artificial-intelligence-2023.pdf" },

     - title : স্ক্রিনে যে নাম দেখাবে
     - year  : পরীক্ষার সাল (না চাইলে বাদ দিতে পারেন)
     - file  : PDF-এর পথ (path)। Google Drive ইত্যাদির পূর্ণ লিংকও দেওয়া যায়।
  3) প্রতিটি লাইনের শেষে কমা (,) রাখুন। তারপর GitHub-এ commit করুন।
     Cloudflare Pages নিজে থেকেই সাইট আপডেট করে দেবে।

  কোনো সাবজেক্টে papers: [ ] ফাঁকা থাকলে সেখানে "Coming Soon" দেখাবে।
  PDF ফাইল আপলোড না থাকলেও "Coming Soon" দেখাবে, ভাঙা লিংক দেখাবে না।

  ── সাবজেক্টের নাম বদলানো ──────────────────────────────────────
  নিচে name: "..." এর ভেতরের লেখা বদলালেই হবে।
  নতুন সাবজেক্ট লাগলে একটা পুরো লাইন কপি করে নাম বদলে দিন।
*/

window.NUCSEBD_LIBRARY = {

  /* ================= SYLLABUS =================
     PDF আপলোডের জায়গা: resources/syllabus/
     ফাইলের নাম নিচের file: এর সাথে মিলিয়ে দিলেই কাজ করবে।
     (ফাইল না থাকলে Coming Soon দেখাবে)
  */
  syllabus: [
    {
      id: "syllabus-2017-2018",
      title: "CSE Syllabus 2017–2018",
      curriculum: "2017–2018 Curriculum",
      description: "Syllabus PDF for the 2017–2018 curriculum.",
      file: "resources/syllabus/syllabus-2017-2018.pdf"
    },
    {
      id: "syllabus-new",
      title: "New CSE Syllabus",
      curriculum: "New Curriculum",
      description: "Syllabus PDF for the newer curriculum.",
      file: "resources/syllabus/new-syllabus.pdf"
    }
  ],

  /* ================= RESULT =================
     Result কার্ডে ক্লিক করলে এই লিংকগুলো দেখাবে (নতুন ট্যাবে খুলবে)।
     নতুন লিংক লাগলে একটা পুরো { ... } ব্লক কপি করে বদলে নিন।
  */
  results: [
    {
      title: "NU Result Portal",
      description: "Official National University result portal.",
      url: "https://results.nu.ac.bd/"
    },
    {
      title: "Professional Result",
      description: "Professional results page of the official NU result portal.",
      url: "https://results.nu.ac.bd/professional"
    }
  ],

  /* ================= QUESTION BANK =================
     Semester → Subject → Question PDF
  */
  questionBank: [
    {
      semester: 1,
      name: "Semester I",
      folder: "resources/question-bank/semester-1/",
      subjects: [
        { name: "Structured Programming Language", papers: [] },
        { name: "Structured Programming Language Lab", papers: [] },
        { name: "Electrical & Electronic Circuit", papers: [] },
        { name: "Electrical & Electronic Circuit Lab", papers: [] },
        { name: "Calculus", papers: [] },
        { name: "Physics", papers: [] },
        { name: "English", papers: [] }
      ]
    },
    {
      semester: 2,
      name: "Semester II",
      folder: "resources/question-bank/semester-2/",
      subjects: [
        { name: "Digital Systems Design", papers: [] },
        { name: "Digital Systems Lab", papers: [] },
        { name: "Discrete Mathematics", papers: [] },
        { name: "Linear Algebra", papers: [] },
        { name: "Statistics & Probability", papers: [] },
        { name: "History of Emergence of Independent Bangladesh", papers: [] }
      ]
    },
    {
      semester: 3,
      name: "Semester III",
      folder: "resources/question-bank/semester-3/",
      subjects: [
        { name: "Data Structure", papers: [] },
        { name: "Data Structure Lab", papers: [] },
        { name: "Object Oriented Programming", papers: [] },
        { name: "Object Oriented Programming Lab", papers: [] },
        { name: "Computer Architecture", papers: [] },
        { name: "Ordinary Differential Equation", papers: [] },
        { name: "Fundamental of Business Studies", papers: [] }
      ]
    },
    {
      semester: 4,
      name: "Semester IV",
      folder: "resources/question-bank/semester-4/",
      subjects: [
        { name: "Database Management System", papers: [] },
        { name: "Database Management System Lab", papers: [] },
        { name: "Microprocessor & Assembly Lang.", papers: [] },
        { name: "Microprocessor & Assembly Lang. Lab", papers: [] },
        { name: "Design & Analysis of Algorithms", papers: [] },
        { name: "Design & Analysis of Algorithms Lab", papers: [] },
        { name: "Numerical Analysis", papers: [] }
      ]
    },
    {
      semester: 5,
      name: "Semester V",
      folder: "resources/question-bank/semester-5/",
      subjects: [
        { name: "Peripheral & Interfacing", papers: [] },
        { name: "Peripheral & Interfacing Lab", papers: [] },
        { name: "Data & Telecom", papers: [] },
        { name: "Data & Telecom Lab", papers: [] },
        { name: "Operating System", papers: [] },
        { name: "Operating System Lab", papers: [] },
        { name: "Economics", papers: [] }
      ]
    },
    {
      semester: 6,
      name: "Semester VI",
      folder: "resources/question-bank/semester-6/",
      subjects: [
        { name: "Software Engineering", papers: [] },
        { name: "Software Engineering Lab", papers: [] },
        { name: "Computer Networking", papers: [] },
        { name: "Computer Networking Lab", papers: [] },
        { name: "Embedded System Programming", papers: [] },
        { name: "Embedded System Programming Lab", papers: [] },
        { name: "Theory of Computation", papers: [] }
      ]
    },
    {
      semester: 7,
      name: "Semester VII",
      folder: "resources/question-bank/semester-7/",
      subjects: [
        { name: "Artificial Intelligence", papers: [] },
        { name: "Artificial Intelligence Lab", papers: [] },
        { name: "Compiler Design & Construction", papers: [] },
        { name: "Compiler Design Lab", papers: [] },
        { name: "Computer Graphics", papers: [] },
        { name: "Computer Graphics Lab", papers: [] },
        { name: "E-Commerce & Web Eng.", papers: [] },
        { name: "E-Commerce & Web Eng. Lab", papers: [] }
      ]
    },
    {
      semester: 8,
      name: "Semester VIII",
      folder: "resources/question-bank/semester-8/",
      subjects: [
        { name: "Network & Info Security", papers: [] },
        { name: "Network & Info Security Lab", papers: [] },
        { name: "Information System Mgmt.", papers: [] },
        { name: "Project / Industry Attachment", papers: [] },
        { name: "Optional Subject", papers: [] },
        { name: "Optional Lab", papers: [] }
      ]
    }
  ]
};
