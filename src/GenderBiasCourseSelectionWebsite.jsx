import React, { useEffect, useMemo, useState } from "react";

const courseData = [
  {
    courseCategory: "Mathematics",
    records: [
      { school: "WLSA", courseName: "Calculus BC", male: 19, female: 12, grade: "10", system: "AP", classCount: 2, noteKey: "wlsaPlacementSystem" },
    ],
  },
  {
    courseCategory: "Computer Science",
    records: [
      { school: "WLSA", courseName: "CSP", male: 22, female: 9, grade: "10", system: "AP", classCount: 2 },
      { school: "平和", courseName: "CS", male: 12, female: 12, grade: "10", system: "IB", classCount: 1 },
    ],
  },
  {
    courseCategory: "Philosophy",
    records: [
      { school: "平和", courseName: "Philosophy", male: 12, female: 15, grade: "10", system: "IB", classCount: 1 },
    ],
  },
  {
    courseCategory: "Biology",
    records: [
      { school: "WLSA", courseName: "Biology", male: 12, female: 31, grade: "10", system: "AP", classCount: 2 },
      { school: "七宝德怀特", courseName: "Biology Competition", male: 6, female: 2, grade: "10", system: "IB", classCount: 1 },
    ],
  },
  {
    courseCategory: "Physics",
    records: [
      { school: "WLSA", courseName: "AP Physics 1", male: 41, female: 14, grade: "10", system: "AP", classCount: 2, noteKey: "wlsaPlacementSystem" },
    ],
  },
  {
    courseCategory: "Chemistry",
    records: [
      { school: "WLSA", courseName: "Chemistry", male: 11, female: 13, grade: "10", system: "AP", classCount: 2 },
    ],
  },
  {
    courseCategory: "Economics",
    records: [
      { school: "WLSA", courseName: "Micro economics", male: 34, female: 47, grade: "10", system: "AP", classCount: 4 },
      { school: "WLSA", courseName: "Macro economics", male: 13, female: 7, grade: "10", system: "AP", classCount: 1 },
    ],
  },
  {
    courseCategory: "Business",
    records: [
      { school: "光华剑桥", courseName: "Business", male: 13, female: 39, grade: "10", system: "IG", classCount: null, noteKey: "guanghuaGradeBalance" },
    ],
  },
  {
    courseCategory: "Geography",
    records: [
      { school: "光华剑桥", courseName: "Geography", male: 8, female: 12, grade: null, system: "IG", classCount: null, noteKey: "guanghuaGradeBalance" },
    ],
  },
];

const navItems = [
  { id: "intro", labelKey: "navIntro" },
  { id: "data", labelKey: "navData" },
  { id: "news", labelKey: "navNews" },
  { id: "simulator", labelKey: "navSimulator" },
  { id: "feedback", labelKey: "navFeedback" },
];

const genderAvatarIcons = {
  female: "/gender-icons/female-avatar.png",
  male: "/gender-icons/male-avatar.png",
  nonBinary: "/gender-icons/nonbinary-avatar.png",
};

const translations = {
  en: {
    langButton: "中文",
    siteTitle: "Course Choice Equity",
    siteSubtitle: "Gender Bias in Course Selection",
    navIntro: "Project Introduction",
    navData: "Data Display",
    navNews: "News Evidence",
    navSimulator: "Bias Simulator",
    navFeedback: "Feedback",
    welcome: "Welcome",
    gateTitle: "Before continuing",
    gateDescription:
      "You have explored the simulator and the model formulas. You may continue browsing anonymously or complete a short visitor form to support the project data.",
    anonymousTitle: "Continue Anonymously",
    anonymousDesc: "Keep browsing without providing any personal details.",
    formEntryTitle: "Fill in the Visitor Form",
    formEntryDesc: "Answer three quick questions, then continue exploring the website.",
    back: "Back",
    visitorForm: "Visitor Form",
    formTitle: "Please complete this short form",
    formDesc:
      "Fill in your school, grade, and gender. After that, you can continue to browse the website.",
    privacyTitle: "Privacy Notice:",
    privacyText:
      "The information you provide will only be used for this school project to analyze general patterns in course selection. No personal identities will be recorded, shared, or used for any other purpose. All responses will remain anonymous and confidential.",
    school: "School",
    schoolPlaceholder: "Enter your school",
    grade: "Grade",
    gradePlaceholder: "Enter your grade",
    curriculum: "Curriculum System",
    curriculumPlaceholder: "Select your curriculum system",
    ap: "AP",
    ib: "IB",
    ig: "IG",
    alevel: "A-Level",
    other: "Other",
    gender: "Gender",
    genderPlaceholder: "Select your gender",
    female: "Female",
    male: "Male",
    nonBinary: "Non-binary",
    preferNotSay: "Prefer not to say",
    consent:
      "I understand this privacy notice and agree to submit the information above for this school project.",
    continueBrowsing: "Continue Browsing",
    heroTitle:
      "Raising awareness of how stereotypes may shape students’ course choices.",
    heroDesc:
      "This website explores whether gender stereotypes may influence course selection in international schools. By presenting data and key explanations, the project encourages students to choose courses based on interest and potential rather than assumptions.",
    exploreProject: "Explore the Project",
    viewData: "View the Data",
    dataLabel: "Data Display",
    dataTitle: "Course gender ratio by subject",
    dataDesc:
      "Each card shows one subject area. Inside each card, records from different schools are listed for comparison. Muted terracotta represents female students and sage green represents male students. All data comes from elective courses at the corresponding schools.",
    swipeHint: "Use the arrows to switch between cards.",
    filterLabel: "View data by",
    viewBySubject: "Subject",
    viewBySchool: "School",
    viewBySystem: "Curriculum System",
    viewByCategory: "Course Category",
    categoryStem: "STEM",
    categoryHumanities: "Humanities",
    categorySocialScience: "Social Science",
    categoryBusiness: "Business",
    cardsShown: "cards shown",
    keyFindingsLabel: "Key Findings",
    keyFindingsTitle: "What the current data suggests",
    keyFindingsDesc:
      "These findings are based on the current elective-course dataset and should be interpreted as exploratory patterns rather than final conclusions.",
    datasetLimitationLabel: "Dataset Limitation",
    datasetLimitationTitle: "How to interpret this dataset carefully",
    datasetLimitationDesc:
      "This dataset is based on selected elective courses from several international schools. It does not include all courses, all grades, or all students. Therefore, the data should not be interpreted as final proof of gender bias. Instead, it should be used as exploratory evidence to identify possible patterns and raise better questions.",
    newsLabel: "News & Research Evidence",
    newsTitle: "10 cases showing how gender stereotypes shape education choices",
    newsDesc:
      "These cases were selected from the news and studies provided by the project list. Each row summarizes the phenomenon, the result, and a source link when a reliable link could be found.",
    newsSourceLink: "Read source",
    newsItems: [
      {
        title: "Brown University study",
        tag: "United States · 2025",
        summary:
          "First-year students tended to implicitly associate men with STEM and women with humanities.",
        result:
          "The study links stronger implicit stereotypes to intended majors and observed STEM course-taking.",
        source: "ERIC / working paper",
        href: "https://eric.ed.gov/default.aspx?id=ED674056",
      },
      {
        title: "Junior high students in Japan",
        tag: "Japan · 2025",
        summary:
          "Boys were more likely to see themselves as STEM-type students, while girls were more likely to see themselves as humanities-type students.",
        result:
          "The split appears before high-school entrance and is not simply explained by ability differences.",
        source: "ERIC full text",
        href: "https://files.eric.ed.gov/fulltext/EJ1475597.pdf",
      },
      {
        title: "Dutch guidance counsellor stereotypes",
        tag: "Netherlands · 2025",
        summary:
          "Tutors and counsellors associated culture and social science more with girls and science and technology more with boys.",
        result:
          "Guidance stereotypes can shape how students understand suitable study tracks.",
        source: "Cogent Education / Taylor & Francis",
        href: "https://www.tandfonline.com/doi/full/10.1080/2331186X.2025.2586266",
      },
      {
        title: "Gender balancing in elite college admissions",
        tag: "United States · admissions",
        summary:
          "Reports discuss how some colleges have admitted men at higher rates when female applicants greatly outnumber male applicants.",
        result:
          "Gender can become an admissions consideration when schools try to balance enrollment.",
        source: "Washington Post / Hechinger Report",
        href: "https://hechingerreport.org/an-unexpected-target-of-federal-college-admissions-scrutiny-men/",
      },
      {
        title: "UNESCO global mathematics warning",
        tag: "Global · 2026",
        summary:
          "In 2023, 81% of surveyed education systems showed significant fourth-grade mathematics gaps favoring boys.",
        result:
          "The gap was larger than in 2019 and 2015, suggesting early mathematics inequality needs attention.",
        source: "UNESCO",
        href: "https://www.unesco.org/en/articles/what-you-need-know-about-why-girls-are-losing-ground-mathematics",
      },
      {
        title: "OECD gender, education and skills report",
        tag: "OECD · 2023",
        summary:
          "The OECD report examines persistent gender gaps in reading, mathematics, science, and later skill investment.",
        result:
          "High-performing girls are less likely than high-performing boys to keep investing in mathematics and science pathways.",
        source: "OECD",
        href: "https://www.oecd.org/en/publications/gender-education-and-skills_34680dd5-en.html",
      },
      {
        title: "British foreign-language gender gap",
        tag: "United Kingdom",
        summary:
          "Language subjects show persistent gaps, with boys less likely to take and pass GCSE languages.",
        result:
          "The British Council and EPI report notes that gender is a strong predictor of language outcomes.",
        source: "British Council / EPI",
        href: "https://www.britishcouncil.org/contact/press/new-report-reveals-stark-gender-gap-foreign-languages",
      },
      {
        title: "Six-year-olds and the “brilliance” stereotype",
        tag: "United States · early childhood",
        summary:
          "Girls as young as six become less likely than boys to associate brilliance with their own gender.",
        result:
          "Girls also showed less interest in activities described as being for very smart children.",
        source: "NYU / Science",
        href: "https://www.nyu.edu/about/news-publications/news/2017/january/stereotypes-about-brilliance-affect-girls-interests-as-early-as-.html",
      },
      {
        title: "Italian teacher bias in mathematics",
        tag: "Italy · middle school",
        summary:
          "When teachers hold stronger gender stereotypes, girls’ mathematics performance and confidence are harmed.",
        result:
          "Girls exposed to biased teachers were more likely to select less demanding high-school tracks.",
        source: "Quarterly Journal of Economics",
        href: "https://academic.oup.com/qje/article/134/3/1163/5368349",
      },
      {
        title: "Australian career guidance in construction",
        tag: "Australia · career guidance",
        summary:
          "Career counsellors perceived construction as more suitable for young men than young women.",
        result:
          "Gendered vocational guidance can reduce girls’ exposure to engineering, manufacturing, and construction pathways.",
        source: "UTS conference paper",
        href: "https://epress.lib.uts.edu.au/journals/index.php/AJCEB-Conference-Series/article/view/3157",
      },
    ],
    simulatorLabel: "Interactive Prototype",
    simulatorTitle: "Course Choice Bias Simulator",
    simulatorDesc:
      "This prototype shows how several social and academic factors may shape a student's willingness to choose a course. The result is not a real prediction yet; it will become more reliable after survey data is collected.",
    simulatorIndex: "Equitable Course Choice Index",
    simulatorLow: "Higher bias pressure",
    simulatorHigh: "More open course choice",
    simulatorNotice:
      "This simulator is calibrated with 31 anonymous questionnaire responses. Because the sample is still small, the result should be read as an exploratory estimate rather than a final prediction.",
    modelSectionLabel: "Mathematical Model",
    modelSectionTitle: "How the survey-based simulator works",
    modelSectionIntro:
      "The simulator uses anonymized individual-level survey records rather than only overall averages. Each respondent becomes one data point, and the model estimates course-choice tendency from support forces, pressure forces, bias exposure, and bias resistance.",
    modelToggleOpen: "Expand model explanation",
    modelToggleClose: "Collapse model explanation",
    modelDataTitle: "1. Individual-level data",
    modelDataText:
      "The model uses 31 cleaned questionnaire records. Personal identifiers, IP addresses, submission time, school names, and open-ended comments are not embedded in the public code; only anonymous numerical features are used.",
    modelIndexTitle: "2. Index construction",
    modelIndexText:
      "Interest, confidence, grades, major planning, teacher advice, and school encouragement form a Support Index. Entry pressure, difficulty, family expectation, peer influence, and stereotype influence form a Pressure Index. Two additional indices measure Bias Exposure and Bias Resistance.",
    modelChoiceTitle: "3. Course probability model",
    modelChoiceText:
      "For each course, the model starts from a Laplace-smoothed baseline probability, then adjusts it using the simulated student's indices, gender, curriculum system, and course direction. This creates a multi-label logistic prediction instead of forcing one single course choice.",
    modelAvoidTitle: "4. Hesitation adjustment",
    modelAvoidText:
      "The answer to the avoidance question is used to estimate a category-level hesitation risk. A higher pressure score and higher bias exposure can reduce the final course score, while bias resistance can buffer that penalty.",
    modelFormulaTitle: "Core formulas",
    modelFormulaOne: "x' = (x − 1) / 4",
    modelFormulaTwo: "S = 0.22I + 0.18C + 0.17G + 0.17M + 0.10T + 0.16E_school",
    modelFormulaThree: "P = 0.23Entry + 0.23Difficulty + 0.16Parent + 0.16Peer + 0.22Stereotype",
    modelFormulaFour: "BE = 0.52Heard + 0.48ConfidenceEffect; BR = 0.45MinorityComfort + 0.55EqualEncouragement",
    modelFormulaFive: "p_c = σ(b_c + Σ w_{c,k}(x_k − μ_k) + 0.38G_c + 0.26Sys_c + 0.38Dir_c)",
    modelFormulaSix: "Final_c = 100 × p_c × (1 − 0.25A_category); ECCI = 100 × σ(0.18 + 2.45(S−P) − 0.48(BE−μ_BE) + 0.76(BR−μ_BR))",
    modelSampleNote: "Current sample size: 31 responses. The model is intentionally regularized and conservative to avoid overfitting.",
    simAcademicPerformance: "Past grades / performance",
    simMajorPlan: "University or career plan",
    simDifficulty: "Perceived course difficulty",
    simParent: "Family expectation",
    simTeacher: "Teacher advice",
    simBiasHeard: "Heard gendered subject comments",
    simBiasConfidence: "Stereotypes affect confidence",
    simMinorityComfort: "Comfort as gender minority",
    simEqualEncouragement: "Equal school encouragement",
    simSupportControls: "Support forces",
    simPressureControls: "Pressure forces",
    simBiasControls: "Bias perception",
    simProfileControls: "Student profile",
    simCurriculumSystem: "Curriculum system",
    simDirection: "Current course direction",
    simDirectionStem: "STEM",
    simDirectionHumanities: "Humanities",
    simDirectionSocialScience: "Social Science",
    simDirectionBusiness: "Business",
    simDirectionMixed: "Mixed / Not sure",
    simBiasExposure: "Bias exposure",
    simBiasResistance: "Bias resistance",
    simulatorExplanationStrong:
      "The simulated environment looks relatively supportive. Interest, confidence, and school encouragement are strong enough to reduce the effect of stereotype pressure.",
    simulatorExplanationMiddle:
      "The simulated environment is mixed. Course choice may still be shaped by both personal interest and social pressure.",
    simulatorExplanationWeak:
      "The simulated environment shows stronger barriers. High stereotype pressure, entry pressure, or low confidence may discourage students from choosing certain courses.",
    simInterest: "Personal interest",
    simConfidence: "Academic confidence",
    simEntry: "Entry requirement pressure",
    simPeer: "Peer influence pressure",
    simStereotype: "Gender stereotype pressure",
    simSchool: "School encouragement",
    simPresets: "Preset scenarios",
    simPresetBalanced: "Balanced student",
    simPresetPressure: "High-pressure STEM student",
    simPresetSupport: "Strong school support",
    simPresetStereotype: "Stereotype-heavy environment",
    simReset: "Reset",
    simSupport: "Support Forces",
    simPressure: "Pressure Forces",
    simProfile: "Student Scenario",
    simStatus: "Current status",
    simStatusSupported: "Confident explorer",
    simStatusMixed: "Interested but pressured",
    simStatusBlocked: "Hesitant under pressure",
    simStem: "STEM willingness",
    simHumanities: "Humanities willingness",
    simOpenExploration: "Open exploration",
    simCourseOutlook: "Course choice outlook",
    simSceneTitle: "Visual Scenario",
    simSceneHint:
      "Objects appear in the room when the likelihood of choosing related subjects becomes higher.",
    simDeskComputer: "Computer",
    simPhysicsPoster: "Physics poster",
    simBiologyPlant: "Biology cell diagram",
    simBooks: "Books",
    simBusinessFolder: "Business folder",
    simSunlight: "Open atmosphere",
    courseMathematics: "Mathematics",
    coursePhysics: "Physics",
    courseChemistry: "Chemistry",
    courseBiology: "Biology",
    courseComputerScience: "Computer Science",
    courseEconomics: "Economics",
    courseBusiness: "Business",
    courseGeography: "Geography",
    coursePhilosophy: "Philosophy",
    courseOther: "Other",
    simLikelyChoose: "Likely to choose",
    simMayHesitate: "May hesitate",
    simLikelyAvoid: "Likely to avoid",
    keyFindings: [
      {
        title: "STEM subjects are not uniform",
        text: "Physics and Computer Science show stronger male participation in some records, while Biology has higher female participation in the WLSA sample. This suggests that STEM should not be treated as one single category."
      },
      {
        title: "School context matters",
        text: "The same subject area can show different gender patterns across schools. This means school culture, entry systems, peer expectations, and grade-level demographics may all affect course choice."
      },
      {
        title: "Gender imbalance is not proof of ability difference",
        text: "The data shows enrollment patterns, not natural ability. These patterns should be used to ask better questions about stereotypes, confidence, and opportunity."
      }
    ],
    recordsCount: "Records",
    schoolsCount: "Schools",
    coursesCount: "Courses",
    studentsCount: "Students",
    femaleShort: "F",
    maleShort: "M",
    gradeLabel: "Grade",
    classCount: "Classes",
    courseSystem: "System",
    subjectLabel: "Subject",
    schoolLabel: "School",
    dataNoteLabel: "Data note",
    notes: {
      guanghuaGradeBalance:
        "Grade 10 at Guanghua Cambridge has more female students overall, so the higher female ratio in this record may partly reflect the grade-level population rather than only course-specific preference.",
      wlsaPlacementSystem:
        "WLSA Grade 10 Mathematics is divided into Algebra 2, Precalculus, and two Calculus BC classes. Physics is also divided into Intro to Physics and AP Physics 1. Calculus BC and AP Physics 1 require a placement test, so this ratio may be affected by course-entry placement rather than only student preference.",
    },
    notSpecified: "Not specified",
    introLabel: "Project Introduction",
    introTitle: "What causes gender imbalance in course selection?",
    introP1:
      "Gender imbalance in course selection is visible among international students in China, especially in STEM-related subjects. However, the cause of this imbalance should not be explained too quickly.",
    introP2:
      "A common explanation is that female students are less naturally suited to STEM subjects, which supposedly leads to lower enrollment in courses such as AP Calculus BC, AP Physics, or Computer Science. This explanation may appear convincing when these courses have entry requirements.",
    introBackgroundTitle: "Project Background",
    introBackgroundText:
      "This project begins from an observed pattern: different courses often show different gender ratios. The key issue is not only whether imbalance exists, but why it appears.",
    introCommonTitle: "Common Explanation: Ability",
    introCommonText:
      "Some people explain lower female participation in STEM by claiming that female students have weaker natural aptitude for these subjects. In schools with entry requirements, this explanation may seem especially persuasive.",
    introLimitTitle: "Why This Explanation Is Limited",
    introLimitText:
      "Psychological research challenges the idea that academic choices can be explained mainly by innate gender ability. Hyde’s gender similarities hypothesis suggests that males and females are similar on most psychological variables, and many observed differences are small or context-dependent.",
    introQuestionTitle: "Our Research Question",
    introQuestionText:
      "How might stereotypes, confidence, peer expectations, school culture, and course-entry systems influence students’ course choices? This website uses school-based data to encourage reflection instead of treating gender imbalance as proof of natural ability differences.",
    introCitation:
      "Reference: Hyde, J. S. (2005). The gender similarities hypothesis. American Psychologist, 60(6), 581–592.",
    problem: "Problem",
    problemText:
      "Course enrollment patterns may reflect social expectations as much as personal interest.",
    audience: "Audience",
    audienceText:
      "Students, classmates, and others interested in fairness in educational choices.",
    method: "Method",
    methodText:
      "Combine school-based examples and visual data to encourage reflection on bias in course selection.",
    feedbackLabel: "Feedback & Contribution",
    feedbackTitle: "Share your thoughts or provide data",
    feedbackDesc:
      "You can either leave a quick comment or complete a reflection survey about course choice and gender stereotypes. Submissions are optional and can be anonymous.",
    commentMode: "Leave a Comment",
    surveyMode: "Reflection Survey",
    selectedCourses: "Courses you are taking or planning to take",
    selectedCoursesHelp: "Select all that apply.",
    influencingFactors: "How much did each factor influence your course choice?",
    biasPerception: "Gender bias perception",
    openReflection: "Open reflection",
    openReflectionPlaceholder:
      "Have you ever changed, avoided, or hesitated about a course because of stereotypes, peer pressure, or confidence?",
    factorInterest: "Personal interest",
    factorGrades: "Grades or academic performance",
    factorUniversity: "University major plan",
    factorParents: "Parents' advice",
    factorTeachers: "Teachers' advice",
    factorFriends: "Friends or classmates",
    factorDifficulty: "Course difficulty",
    factorEntry: "Entry requirements",
    factorStereotype: "Gender stereotype",
    statementSubjectGender: "I have heard people describe some subjects as more suitable for boys or girls.",
    statementConfidence: "Gender stereotypes may affect students' confidence when choosing courses.",
    statementMinority: "I would feel comfortable choosing a course where my gender is the minority.",
    statementEqualEncouragement: "Students in my school are encouraged equally to choose STEM and humanities subjects.",
    scaleLow: "Low",
    scaleHigh: "High",
    stronglyDisagree: "Strongly disagree",
    stronglyAgree: "Strongly agree",
    commentLabel: "Comment or data contribution",
    commentPlaceholder:
      "Example: In my school, AP Biology has around 65% girls and 35% boys. I also think some students are influenced by stereotypes when choosing STEM subjects.",
    commentHelp:
      "You may share a comment, a personal observation, or course data such as the course name and approximate gender ratio.",
    anonymousFeedback:
      "Submit anonymously. When this option is selected, school and grade fields will stay hidden.",
    schoolName: "School name",
    gradeLevel: "Grade level",
    submit: "Submit",
    submitted: "Submission received. Thank you for contributing.",
    courses: {
      biology: "Biology",
      computerScience: "Computer Science",
      chemistry: "Chemistry",
      economics: "Economics",
    },
  },
  zh: {
    langButton: "English",
    siteTitle: "课程选择公平性",
    siteSubtitle: "选课中的性别偏见",
    navIntro: "项目介绍",
    navData: "数据展示",
    navNews: "新闻证据",
    navSimulator: "偏见模拟器",
    navFeedback: "反馈",
    welcome: "欢迎",
    gateTitle: "继续浏览前",
    gateDescription: "你已经浏览了模拟器和模型公式。你可以选择继续匿名浏览，或填写一个简短访客问卷来支持项目数据。",
    anonymousTitle: "继续匿名浏览",
    anonymousDesc: "不填写个人信息，继续浏览网站。",
    formEntryTitle: "填写访客问卷",
    formEntryDesc: "回答三个简单问题后继续浏览网站。",
    back: "返回",
    visitorForm: "访客问卷",
    formTitle: "请完成这个简短问卷",
    formDesc: "填写你的学校、年级和性别后，即可继续浏览网站。",
    privacyTitle: "隐私声明：",
    privacyText:
      "你提供的信息只会用于本校项目，以分析选课中的整体趋势。我们不会记录、分享或用于其他目的的个人身份信息，所有回答都会保持匿名和保密。",
    school: "学校",
    schoolPlaceholder: "请输入你的学校",
    grade: "年级",
    gradePlaceholder: "请输入你的年级",
    curriculum: "课程体系",
    curriculumPlaceholder: "请选择你的课程体系",
    ap: "AP",
    ib: "IB",
    ig: "IG",
    alevel: "A-Level",
    other: "其他",
    gender: "性别",
    genderPlaceholder: "请选择你的性别",
    female: "女",
    male: "男",
    nonBinary: "非二元性别",
    preferNotSay: "不愿透露",
    consent: "我已理解隐私声明，并同意为本校项目提交以上信息。",
    continueBrowsing: "继续浏览",
    heroTitle: "提高人们对刻板印象如何影响学生选课的认识。",
    heroDesc:
      "本网站探讨性别刻板印象是否会影响国际学校学生的课程选择。通过展示数据和关键解释，本项目鼓励学生基于兴趣和潜力选课，而不是基于性别假设。",
    exploreProject: "查看项目",
    viewData: "查看数据",
    dataLabel: "数据展示",
    dataTitle: "按课程展示性别比例",
    dataDesc:
      "每一个卡片展示一个学科类别，卡片内部列出不同学校在该课程上的数据，便于横向比较。柔和陶土色代表女生比例，鼠尾草绿色代表男生比例。所有数据均来自对应学校的选修课程。",
    swipeHint: "点击左右箭头切换不同卡片。",
    filterLabel: "数据分类方式",
    viewBySubject: "按学科",
    viewBySchool: "按学校",
    viewBySystem: "按课程体系",
    viewByCategory: "按课程类别",
    categoryStem: "STEM",
    categoryHumanities: "人文学科",
    categorySocialScience: "社会科学",
    categoryBusiness: "商科",
    cardsShown: "个卡片",
    keyFindingsLabel: "主要发现",
    keyFindingsTitle: "当前数据说明了什么",
    keyFindingsDesc:
      "以下发现基于当前选修课数据，应被理解为探索性趋势，而不是最终结论。",
    datasetLimitationLabel: "数据局限性",
    datasetLimitationTitle: "如何更谨慎地理解这些数据",
    datasetLimitationDesc:
      "本数据来自几所国际学校的部分选修课程，并不包括所有课程、所有年级或所有学生。因此，这些数据不应被理解为性别偏见的最终证明，而应被视为探索性证据，用来发现可能的趋势并提出更深入的问题。",
    newsLabel: "新闻与研究证据",
    newsTitle: "10 个关于性别刻板印象如何影响教育选择的案例",
    newsDesc:
      "这些案例从你提供的新闻与研究列表中筛选而来。每一行概括一个现象、结果，并在能找到可靠来源时提供链接。",
    newsSourceLink: "查看来源",
    newsItems: [
      {
        title: "美国布朗大学研究",
        tag: "美国 · 2025",
        summary:
          "大一新生普遍存在“男性与 STEM 关联、女性与人文学科关联”的隐性刻板印象。",
        result:
          "研究发现，隐性刻板印象会预测专业意向和实际 STEM 课程选择。",
        source: "ERIC / working paper",
        href: "https://eric.ed.gov/default.aspx?id=ED674056",
      },
      {
        title: "日本初中生研究",
        tag: "日本 · 2025",
        summary:
          "初中男生更倾向把自己看成“理科型”，女生更倾向把自己看成“文科型”。",
        result:
          "这种差异在高中入学前已经出现，并不只是由学习能力差异解释。",
        source: "ERIC full text",
        href: "https://files.eric.ed.gov/fulltext/EJ1475597.pdf",
      },
      {
        title: "荷兰升学指导研究",
        tag: "荷兰 · 2025",
        summary:
          "指导老师更容易把文化与社科方向和女生联系起来，把科学与技术方向和男生联系起来。",
        result:
          "老师和升学指导中的刻板印象可能影响学生对“适合自己的课程”的判断。",
        source: "Cogent Education / Taylor & Francis",
        href: "https://www.tandfonline.com/doi/full/10.1080/2331186X.2025.2586266",
      },
      {
        title: "美国大学招生性别平衡",
        tag: "美国 · 大学招生",
        summary:
          "报道讨论了在女生申请者明显多于男生时，一些大学会以更高比例录取男生以平衡性别比例。",
        result:
          "这说明在实际录取中，理性别有时会成为招生结构的一部分。",
        source: "Washington Post / Hechinger Report",
        href: "https://hechingerreport.org/an-unexpected-target-of-federal-college-admissions-scrutiny-men/",
      },
      {
        title: "UNESCO 全球数学报告",
        tag: "全球 · 2026",
        summary:
          "2023 年四年级学生中，81% 的受调查教育体系存在男生数学成绩显著优于女生的差距。",
        result:
          "这一比例高于 2019 年和 2015 年，说明数学性别差距在小学阶段已经值得关注。",
        source: "UNESCO",
        href: "https://www.unesco.org/en/articles/what-you-need-know-about-why-girls-are-losing-ground-mathematics",
      },
      {
        title: "OECD 教育与技能报告",
        tag: "OECD · 2023",
        summary:
          "OECD 报告分析了阅读、数学、科学和后续技能投入中的持续性性别差距。",
        result:
          "高绩效女生相比高绩效男生更少继续投入数学和科学相关路径。",
        source: "OECD",
        href: "https://www.oecd.org/en/publications/gender-education-and-skills_34680dd5-en.html",
      },
      {
        title: "英国现代外语性别差距",
        tag: "英国",
        summary:
          "语言类科目中男生的参与率和通过率持续低于女生。",
        result:
          "British Council 与 EPI 的报告指出，性别是语言类科目结果的重要预测因素。",
        source: "British Council / EPI",
        href: "https://www.britishcouncil.org/contact/press/new-report-reveals-stark-gender-gap-foreign-languages",
      },
      {
        title: "6 岁儿童的“聪明=男性”刻板印象",
        tag: "美国 · 儿童早期",
        summary:
          "6 岁女孩已经比男孩更不容易把“非常聪明”与自己的性别联系起来。",
        result:
          "她们对被描述为“给非常聪明的孩子玩”的活动兴趣也更低。",
        source: "NYU / Science",
        href: "https://www.nyu.edu/about/news-publications/news/2017/january/stereotypes-about-brilliance-affect-girls-interests-as-early-as-.html",
      },
      {
        title: "意大利数学教师隐性偏见",
        tag: "意大利 · 中学",
        summary:
          "当教师持有更强的性别刻板印象时，女生的数学表现和自信会受到影响。",
        result:
          "这些女生之后更可能选择挑战性较低的高中轨道。",
        source: "Quarterly Journal of Economics",
        href: "https://academic.oup.com/qje/article/134/3/1163/5368349",
      },
      {
        title: "澳大利亚职业辅导与建筑行业",
        tag: "澳大利亚 · 职业指导",
        summary:
          "职业辅导老师更倾向认为建筑行业适合男生，而不是女生。",
        result:
          "这种职业指导中的性别化判断可能减少女生接触工程、制造和建筑领域的机会。",
        source: "UTS conference paper",
        href: "https://epress.lib.uts.edu.au/journals/index.php/AJCEB-Conference-Series/article/view/3157",
      },
    ],
    simulatorLabel: "互动原型",
    simulatorTitle: "选课偏见模拟器",
    simulatorDesc:
      "这个原型展示多个学术与社会因素可能如何影响学生选择某门课程的意愿。当前结果还不是真实预测；等问卷数据收集后，可以用真实数据重新校准模型权重。",
    simulatorIndex: "公平选课倾向指数",
    simulatorLow: "偏见压力较高",
    simulatorHigh: "选课环境更开放",
    simulatorNotice:
      "本模拟器已根据 31 份匿名问卷回答进行校准。由于样本量仍然较小，结果应被理解为探索性估计，而不是最终预测。",
    modelSectionLabel: "数学模型",
    modelSectionTitle: "这个问卷模拟器如何计算结果",
    modelSectionIntro:
      "模拟器使用匿名化后的个体问卷数据，而不是只使用整体平均值。每一位答卷者都会成为一条数据记录，模型根据支持力量、压力力量、偏见暴露和偏见抵抗来估计不同课程的选择倾向。",
    modelToggleOpen: "展开模型说明",
    modelToggleClose: "收起模型说明",
    modelDataTitle: "1. 个体层面数据",
    modelDataText:
      "模型使用 31 条清洗后的问卷记录。公开代码中不会嵌入个人标识、IP、提交时间、学校名称或开放题回答，只保留匿名数字特征。",
    modelIndexTitle: "2. 指数构建",
    modelIndexText:
      "个人兴趣、自信心、成绩、大学规划、老师建议和学校鼓励构成支持指数；入门门槛、课程难度、家长期待、同伴影响和性别刻板印象影响构成压力指数；另外两个指数衡量偏见暴露和偏见抵抗。",
    modelChoiceTitle: "3. 课程概率模型",
    modelChoiceText:
      "每一门课都先使用 Laplace 平滑得到基础概率，再根据模拟学生的指数、性别、课程体系和选课方向进行调整。这样模型输出的是多标签逻辑预测，而不是强制只选择一门课程。",
    modelAvoidTitle: "4. 犹豫修正",
    modelAvoidText:
      "第 7 题关于是否犹豫或避免某类课程的回答被用于估计课程类别层面的犹豫风险。压力和偏见暴露较高会降低最终课程分数，而偏见抵抗可以缓冲这种影响。",
    modelFormulaTitle: "核心公式",
    modelFormulaOne: "x' = (x − 1) / 4，把 1–5 分量表归一化到 0–1",
    modelFormulaTwo: "S = 0.22I + 0.18C + 0.17G + 0.17M + 0.10T + 0.16E_school",
    modelFormulaThree: "P = 0.23Entry + 0.23Difficulty + 0.16Parent + 0.16Peer + 0.22Stereotype",
    modelFormulaFour: "BE = 0.52Heard + 0.48ConfidenceEffect；BR = 0.45MinorityComfort + 0.55EqualEncouragement",
    modelFormulaFive: "p_c = σ(b_c + Σ w_{c,k}(x_k − μ_k) + 0.38G_c + 0.26Sys_c + 0.38Dir_c)",
    modelFormulaSix: "Final_c = 100 × p_c × (1 − 0.25A_category)；ECCI = 100 × σ(0.18 + 2.45(S−P) − 0.48(BE−μ_BE) + 0.76(BR−μ_BR))",
    modelSampleNote: "当前样本量：31 份。为了避免过拟合，模型故意采用保守的正则化调整。",
    simAcademicPerformance: "过去成绩 / 学术表现",
    simMajorPlan: "大学或职业规划",
    simDifficulty: "课程难度判断",
    simParent: "家长期待",
    simTeacher: "老师建议",
    simBiasHeard: "听过学科性别化说法",
    simBiasConfidence: "刻板印象影响自信",
    simMinorityComfort: "作为性别少数时的舒适度",
    simEqualEncouragement: "学校平等鼓励",
    simSupportControls: "支持力量",
    simPressureControls: "压力力量",
    simBiasControls: "偏见感知",
    simProfileControls: "学生画像",
    simCurriculumSystem: "课程体系",
    simDirection: "当前选课方向",
    simDirectionStem: "STEM",
    simDirectionHumanities: "人文学科",
    simDirectionSocialScience: "社会科学",
    simDirectionBusiness: "商科",
    simDirectionMixed: "混合 / 不确定",
    simBiasExposure: "偏见暴露",
    simBiasResistance: "偏见抵抗",
    simulatorExplanationStrong:
      "模拟环境相对支持学生自由选课。兴趣、自信和学校鼓励较强，能够削弱刻板印象压力的影响。",
    simulatorExplanationMiddle:
      "模拟环境较为混合。学生选课可能同时受到个人兴趣和社会压力的影响。",
    simulatorExplanationWeak:
      "模拟环境显示出较强阻碍。较高的刻板印象压力、选课门槛压力或较低自信可能会让学生回避某些课程。",
    simInterest: "个人兴趣",
    simConfidence: "学术自信",
    simEntry: "选课门槛压力",
    simPeer: "同伴影响压力",
    simStereotype: "性别刻板印象压力",
    simSchool: "学校鼓励程度",
    simPresets: "预设情境",
    simPresetBalanced: "平衡型学生",
    simPresetPressure: "高压力 STEM 学生",
    simPresetSupport: "强学校支持",
    simPresetStereotype: "刻板印象较强环境",
    simReset: "重置",
    simSupport: "支持力量",
    simPressure: "压力力量",
    simProfile: "学生情境",
    simStatus: "当前状态",
    simStatusSupported: "自信探索者",
    simStatusMixed: "有兴趣但有压力",
    simStatusBlocked: "在压力下犹豫",
    simStem: "STEM 选择意愿",
    simHumanities: "人文选择意愿",
    simOpenExploration: "开放探索程度",
    simCourseOutlook: "课程选择状态",
    simSceneTitle: "可视化场景",
    simSceneHint:
      "随着不同课程选择可能性的变化，房间中会逐渐出现对应物品。",
    simDeskComputer: "电脑",
    simPhysicsPoster: "物理海报",
    simBiologyPlant: "生物细胞结构图",
    simBooks: "书籍",
    simBusinessFolder: "商科文件夹",
    simSunlight: "开放氛围",
    courseMathematics: "数学",
    coursePhysics: "物理",
    courseChemistry: "化学",
    courseBiology: "生物",
    courseComputerScience: "计算机科学",
    courseEconomics: "经济学",
    courseBusiness: "商科",
    courseGeography: "地理",
    coursePhilosophy: "哲学",
    courseOther: "其他",
    simLikelyChoose: "较可能选择",
    simMayHesitate: "可能犹豫",
    simLikelyAvoid: "较可能回避",
    keyFindings: [
      {
        title: "STEM 学科内部并不完全相同",
        text: "Physics 和 Computer Science 在部分数据中男生比例更高，但 WLSA 的 Biology 样本中女生比例更高。这说明 STEM 不应该被简单看作一个统一类别。"
      },
      {
        title: "学校环境会影响数据表现",
        text: "同一类学科在不同学校中可能呈现不同性别比例，因此学校文化、选课门槛、同伴期待和年级整体男女比例都可能影响选课。"
      },
      {
        title: "性别比例差异不等于能力差异",
        text: "这些数据展示的是选课模式，而不是先天能力。因此它更适合用来提出关于刻板印象、自信心和机会的问题。"
      }
    ],
    recordsCount: "数据项",
    schoolsCount: "学校数",
    coursesCount: "课程数",
    studentsCount: "学生数",
    femaleShort: "女",
    maleShort: "男",
    gradeLabel: "年级",
    classCount: "班级数",
    courseSystem: "课程体系",
    subjectLabel: "学科",
    schoolLabel: "学校",
    dataNoteLabel: "数据说明",
    notes: {
      guanghuaGradeBalance:
        "光华剑桥 10 年级女生本身多于男生，因此该数据中较高的女生比例可能部分来自年级整体性别结构，而不完全代表课程本身的偏好差异。",
      wlsaPlacementSystem:
        "WLSA 10 年级数学分为 Algebra 2、Precalculus 和两个 Calculus BC 班；物理也分为 Intro to Physics 和 AP Physics 1。Calculus BC 和 AP Physics 1 需要参加分班考，因此该数据可能受到课程门槛或分班机制影响，而不只是学生偏好。",
    },
    notSpecified: "未注明",
    introLabel: "项目介绍",
    introTitle: "选课中的性别比例差异究竟来自什么？",
    introP1:
      "中国国际学校学生选课中确实存在一定的性别比例差异，尤其是在 STEM 相关课程中。但是，这种差异的原因不能被过快、过简单地解释。",
    introP2:
      "一种常见解释是：女生在 STEM 学科上的天赋较弱，所以相关课程中的女生比例较低。尤其当这些课程存在入门门槛时，例如 AP Calculus BC、AP Physics 或 Computer Science，这种解释看起来似乎更有说服力。",
    introBackgroundTitle: "项目背景",
    introBackgroundText:
      "本项目从一个可观察到的现象出发：不同课程中常常呈现不同的男女比例。真正重要的问题不仅是是否存在差异，而是这种差异为什么会出现。",
    introCommonTitle: "常见解释：能力差异",
    introCommonText:
      "一些观点会把 STEM 课程中女生比例较低解释为女生天生不擅长相关学科。在存在选课门槛的学校中，这种解释可能显得更有说服力。",
    introLimitTitle: "为什么这种解释有限",
    introLimitText:
      "心理学研究对这种能力决定论提出了质疑。Hyde 的 gender similarities hypothesis 指出，男女在大多数心理变量上更相似而不是截然不同，许多观察到的差异是较小的、受情境影响的。",
    introQuestionTitle: "我们的研究问题",
    introQuestionText:
      "刻板印象、自信心、同伴期待、学校文化和选课制度是否会影响学生的课程选择？本网站通过校内数据引导反思，而不是把性别比例差异直接当作先天能力差异的证明。",
    introCitation:
      "参考文献：Hyde, J. S. (2005). The gender similarities hypothesis. American Psychologist, 60(6), 581–592.",
    problem: "问题",
    problemText: "课程选择中的性别比例差异可能不仅反映个人兴趣，也可能反映社会期待。",
    audience: "受众",
    audienceText: "学生、同学，以及关注教育选择公平性的人。",
    method: "方法",
    methodText: "结合校内案例和可视化数据，帮助人们反思选课中的偏见。",
    feedbackLabel: "反馈与数据补充",
    feedbackTitle: "分享你的想法或补充数据",
    feedbackDesc: "你可以选择留下简短评论，也可以填写关于选课与性别刻板印象的反思问卷。提交是自愿的，也可以匿名。",
    commentMode: "留下评论",
    surveyMode: "反思问卷",
    selectedCourses: "你正在学习或计划选择的课程",
    selectedCoursesHelp: "可多选。",
    influencingFactors: "以下因素在多大程度上影响了你的选课？",
    biasPerception: "性别偏见感知",
    openReflection: "开放反思",
    openReflectionPlaceholder:
      "你是否曾因为刻板印象、同伴压力或自信问题而犹豫、避免或改变某门课程选择？",
    factorInterest: "个人兴趣",
    factorGrades: "成绩表现",
    factorUniversity: "大学专业规划",
    factorParents: "家长建议",
    factorTeachers: "老师建议",
    factorFriends: "同学影响",
    factorDifficulty: "课程难度",
    factorEntry: "入门门槛",
    factorStereotype: "性别刻板印象",
    statementSubjectGender: "我听过有人说某些学科更适合男生或女生。",
    statementConfidence: "性别刻板印象可能会影响学生选课时的自信。",
    statementMinority: "如果我的性别在某门课中是少数，我仍然会感到自在。",
    statementEqualEncouragement: "我认为学校中不同性别的学生都被平等鼓励去选择 STEM 和人文学科。",
    scaleLow: "低",
    scaleHigh: "高",
    stronglyDisagree: "非常不同意",
    stronglyAgree: "非常同意",
    commentLabel: "评论或数据补充",
    commentPlaceholder:
      "例如：在我的学校，AP Biology 大约有 65% 女生和 35% 男生。我也认为一些学生在选择 STEM 课程时会受到刻板印象影响。",
    commentHelp: "你可以分享评论、个人观察，或课程名称和大致性别比例等数据。",
    anonymousFeedback: "匿名提交。选择此选项后，学校和年级输入框会被隐藏。",
    schoolName: "学校名称",
    gradeLevel: "年级",
    submit: "提交",
    submitted: "提交成功，感谢你的贡献。",
    courses: {
      biology: "生物",
      computerScience: "计算机科学",
      chemistry: "化学",
      economics: "经济学",
    },
  },
};

function LanguageToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="rounded-full border border-orange-300 bg-white/90 px-4 py-2 text-sm font-semibold text-orange-900 shadow-sm transition hover:bg-orange-50"
    >
      {translations[lang].langButton}
    </button>
  );
}

function DotIcon({ colorClass }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${colorClass}`} />;
}

function DataBarCompact({ female, male, t }) {
  const total = female + male;
  const safeFemale = total > 0 ? Math.round((female / total) * 100) : 0;
  const safeMale = 100 - safeFemale;

  return (
    <div className="relative h-5 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className="bar-female absolute inset-y-0 left-0 flex items-center justify-end pr-2"
        style={{ width: `${safeFemale}%` }}
      >
        {safeFemale >= 18 && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
            <DotIcon colorClass="bg-white" />
            {t.femaleShort} {safeFemale}%
          </span>
        )}
      </div>

      <div
        className="bar-male absolute inset-y-0 right-0 flex items-center justify-start pl-2"
        style={{ width: `${safeMale}%` }}
      >
        {safeMale >= 18 && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
            <DotIcon colorClass="bg-white" />
            {t.maleShort} {safeMale}%
          </span>
        )}
      </div>
    </div>
  );
}

function CourseDataCard({ title, label, records, t }) {
  const systems = Array.from(new Set(records.map((record) => record.system).filter(Boolean)));
  const schools = Array.from(new Set(records.map((record) => record.school).filter(Boolean)));
  const totalMale = records.reduce((sum, record) => sum + record.male, 0);
  const totalFemale = records.reduce((sum, record) => sum + record.female, 0);
  const totalStudents = totalMale + totalFemale;
  const femalePercent = totalStudents > 0 ? Math.round((totalFemale / totalStudents) * 100) : 0;
  const malePercent = 100 - femalePercent;

  return (
    <article className="relative school-card-size overflow-hidden rounded-2xl border border-orange-200/80 bg-white/92 p-4 shadow-xl backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-700">
            {label}
          </p>
          <h3 className="mt-1 text-xl font-bold text-neutral-900">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {systems.map((system) => (
            <span
              key={system}
              className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-900"
            >
              {system}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-orange-50 px-2 py-2">
          <div className="text-base font-bold text-neutral-900">{records.length}</div>
          <div className="text-xs font-medium text-neutral-600">{t.recordsCount}</div>
        </div>
        <div className="rounded-xl bg-orange-50 px-2 py-2">
          <div className="text-base font-bold text-neutral-900">{schools.length}</div>
          <div className="text-xs font-medium text-neutral-600">{t.schoolsCount}</div>
        </div>
        <div className="rounded-xl bg-orange-50 px-2 py-2">
          <div className="text-base font-bold text-neutral-900">
            {femalePercent}% / {malePercent}%
          </div>
          <div className="text-xs font-medium text-neutral-600">
            {t.femaleShort} / {t.maleShort}
          </div>
        </div>
      </div>

      <div className="data-course-list mt-4 space-y-2 overflow-y-auto pr-1">
        {records.map((record) => (
          <div
            key={`${title}-${record.school}-${record.courseName}`}
            className="rounded-xl border border-orange-100 bg-white p-3"
          >
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">{record.school}</h4>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {record.courseName} · {record.system} · {t.gradeLabel}: {record.grade ?? t.notSpecified}
                  {record.classCount ? ` · ${t.classCount}: ${record.classCount}` : ""}
                </p>
              </div>
              <div className="text-xs font-medium text-neutral-500">
                {record.male + record.female} {t.studentsCount}
              </div>
            </div>
            <DataBarCompact female={record.female} male={record.male} t={t} />
            {record.noteKey && (
              <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-neutral-700">
                <span className="font-semibold text-orange-800">{t.dataNoteLabel}: </span>
                {t.notes[record.noteKey]}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function CourseDataCarousel({ cards, t }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = cards.length;

  const goToCard = (direction) => {
    setActiveIndex((prev) => (prev + direction + total) % total);
  };

  const getRelativePosition = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [cards]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-orange-200/70 bg-white/20 p-3 shadow-inner backdrop-blur-sm md:p-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 carousel-glow" />

      <button
        type="button"
        onClick={() => goToCard(-1)}
        aria-label="Previous subject"
        className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 text-2xl font-light text-orange-900 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => goToCard(1)}
        aria-label="Next subject"
        className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 text-2xl font-light text-orange-900 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white"
      >
        ›
      </button>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-white/70 via-white/35 to-transparent backdrop-blur-sm" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-gradient-to-l from-white/70 via-white/35 to-transparent backdrop-blur-sm" />

      <div className="carousel-stage relative z-10 mx-auto">
        {cards.map((card, index) => {
          const position = getRelativePosition(index);
          const isHidden = Math.abs(position) > 1;
          const positionClass =
            position === 0
              ? "carousel-card-active"
              : position < 0
                ? "carousel-card-left"
                : "carousel-card-right";

          return (
            <div
              key={card.title}
              className={`carousel-card-position ${positionClass} ${isHidden ? "carousel-card-hidden" : ""}`}
              aria-hidden={position !== 0}
            >
              <CourseDataCard
                title={card.title}
                label={card.label}
                records={card.records}
                t={t}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-30 mt-3 flex items-center justify-center gap-2">
        {cards.map((card, index) => (
          <button
            key={card.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${card.title}`}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index ? "w-6 bg-orange-700" : "w-2 bg-orange-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


function RoomScene({
  t,
  status,
  openExploration,
  supportScore,
  pressureScore,
  courseScores,
  scenarioGender,
}) {
  const pressureDominant = pressureScore > supportScore;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const nodeTone = (score) => {
    if (score >= 70) return "high";
    if (score >= 48) return "mid";
    return "low";
  };

  const statusTone =
    openExploration >= 68
      ? "Explorer Mode"
      : openExploration >= 42
        ? "Mixed Path"
        : "Pressure Zone";

  const scenarioNodes = [
    {
      key: "mathematics",
      label: t.courseMathematics,
      short: "Σ",
      score: courseScores.mathematics,
      x: 50,
      y: 15,
      color: "#f97316",
      description: "logic path",
    },
    {
      key: "physics",
      label: t.coursePhysics,
      short: "F",
      score: courseScores.physics,
      x: 74,
      y: 20,
      color: "#ea580c",
      description: "force lab",
    },
    {
      key: "computerScience",
      label: t.courseComputerScience,
      short: "CS",
      score: courseScores.computerScience,
      x: 84,
      y: 48,
      color: "#2563eb",
      description: "code base",
    },
    {
      key: "biology",
      label: t.courseBiology,
      short: "CELL",
      score: courseScores.biology,
      x: 70,
      y: 78,
      color: "#059669",
      description: "life unit",
    },
    {
      key: "chemistry",
      label: t.courseChemistry,
      short: "⚗",
      score: courseScores.chemistry,
      x: 30,
      y: 78,
      color: "#0f766e",
      description: "reaction lab",
    },
    {
      key: "economics",
      label: t.courseEconomics,
      short: "$",
      score: courseScores.economics,
      x: 16,
      y: 50,
      color: "#ca8a04",
      description: "market route",
    },
    {
      key: "geography",
      label: t.courseGeography,
      short: "MAP",
      score: courseScores.geography,
      x: 25,
      y: 23,
      color: "#0284c7",
      description: "world tile",
    },
    {
      key: "philosophy",
      label: t.coursePhilosophy,
      short: "?",
      score: courseScores.philosophy,
      x: 16,
      y: 74,
      color: "#7c3aed",
      description: "idea tower",
    },
    {
      key: "business",
      label: t.courseBusiness,
      short: "BIZ",
      score: courseScores.business,
      x: 86,
      y: 74,
      color: "#b45309",
      description: "venture hub",
    },
  ];

  const topCourses = [...scenarioNodes]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const supportArc = clamp(supportScore, 0, 100);
  const pressureArc = clamp(pressureScore, 0, 100);

  return (
    <div className="rounded-2xl border border-orange-200 bg-white p-3 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-800">
            {t.simSceneTitle}
          </p>
          <p className="mt-0.5 text-[11px] leading-5 text-neutral-500">
            Strategic course-choice map driven by the survey model.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-900">
            ECCI {openExploration}/100
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            pressureDominant ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
          }`}>
            {pressureDominant ? "Pressure lead" : "Support lead"}
          </span>
        </div>
      </div>

      <div className="scenario-map-field relative mt-2 h-[430px] overflow-hidden rounded-2xl border border-orange-100">
        <div className="absolute inset-0 scenario-map-grid" />
        <div className="absolute inset-0 scenario-map-vignette" />
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: pressureDominant ? 0.42 : 0.16 }}
        >
          <div className="absolute -left-24 top-20 h-60 w-60 rounded-full bg-red-300/20 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
        </div>

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {scenarioNodes.map((node) => (
            <line
              key={`line-${node.key}`}
              x1="50"
              y1="53"
              x2={node.x}
              y2={node.y}
              stroke={node.color}
              strokeWidth={0.22 + node.score / 120}
              strokeLinecap="round"
              strokeOpacity={0.16 + node.score / 145}
              className="scenario-map-link"
            />
          ))}
          <circle
            cx="50"
            cy="53"
            r="19"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="0.55"
            strokeDasharray="2 2"
            strokeOpacity="0.8"
          />
          <circle
            cx="50"
            cy="53"
            r="24"
            fill="none"
            stroke="#fdba74"
            strokeWidth="0.35"
            strokeDasharray="1.2 2.6"
            strokeOpacity="0.55"
          />
        </svg>

        <div className="pointer-events-none absolute left-1/2 top-[53%] z-30 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/78 text-center shadow-xl backdrop-blur-xl">
          <div className="absolute inset-2 rounded-full border border-orange-200/80" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/14 via-white/40 to-amber-300/16" />
          <div className="relative z-10">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-700">Core</p>
            <div className="mt-0.5 text-2xl font-black text-neutral-900">{openExploration}</div>
            <p className="text-[8px] font-bold uppercase tracking-wider text-neutral-500">ECCI</p>
          </div>
        </div>

        {scenarioNodes.map((node) => {
          const tone = nodeTone(node.score);
          const active = node.score >= 55;
          return (
            <div
              key={node.key}
              className={`scenario-node scenario-node-${tone}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                "--node-color": node.color,
                "--node-score": `${node.score}%`,
                "--node-glow": 0.12 + node.score / 150,
              }}
            >
              <div className="scenario-node-glow" />
              <div className="relative z-10 flex items-center gap-2">
                <div className="scenario-node-token">{node.short}</div>
                <div className="min-w-0 text-left">
                  <p className="truncate text-[11px] font-black text-neutral-900">{node.label}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">{node.description}</p>
                </div>
              </div>
              <div className="relative z-10 mt-2 h-1.5 overflow-hidden rounded-full bg-white/70">
                <div className="h-full rounded-full" style={{ width: `${node.score}%`, background: node.color }} />
              </div>
              <div className="relative z-10 mt-1 flex items-center justify-between text-[10px] font-black">
                <span className={active ? "text-emerald-700" : "text-neutral-500"}>{active ? "ACTIVE" : "LOCKED"}</span>
                <span style={{ color: node.color }}>{node.score}%</span>
              </div>
            </div>
          );
        })}

      </div>

      <div className="mt-3 grid gap-2 lg:grid-cols-[0.9fr_1.15fr_1fr]">
        <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-3 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-700">Decision Core</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-neutral-900">{status}</h4>
              <p className="mt-0.5 text-[10px] font-semibold text-neutral-500">{statusTone}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
              pressureDominant ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
            }`}>
              {pressureDominant ? "Pressure lead" : "Support lead"}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white px-2.5 py-2">
              <div className="flex items-center justify-between text-[10px] font-black text-emerald-700">
                <span>Support</span><span>{supportScore}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-emerald-50">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${supportArc}%` }} />
              </div>
            </div>
            <div className="rounded-xl bg-white px-2.5 py-2">
              <div className="flex items-center justify-between text-[10px] font-black text-orange-700">
                <span>Pressure</span><span>{pressureScore}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-orange-50">
                <div className="h-full rounded-full bg-orange-500" style={{ width: `${pressureArc}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-700">Top unlocked paths</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {topCourses.map((course, index) => (
              <span
                key={course.key}
                className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-neutral-800"
              >
                #{index + 1} {course.label} · {course.score}%
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-700">Scenario logic</p>
          <p className="mt-1.5 text-[11px] leading-5 text-neutral-600">
            Each zone is a course path. Higher model probability strengthens the route from the core and activates the zone.
          </p>
        </div>
      </div>
    </div>
  );
}

function NewsEvidenceSection({ t }) {
  const columns = [t.newsItems.slice(0, 5), t.newsItems.slice(5, 10)];

  return (
    <section
      id="news"
      className="scroll-mt-24 rounded-3xl border border-orange-300/80 bg-white/90 p-5 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-6"
    >
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
          {t.newsLabel}
        </p>
        <h3 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
          {t.newsTitle}
        </h3>
        <p className="mt-4 leading-8 text-neutral-800">{t.newsDesc}</p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="grid grid-rows-5 gap-3">
            {column.map((item, index) => {
              const number = columnIndex * 5 + index + 1;
              return (
                <article
                  key={item.title}
                  className="grid min-h-[154px] grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-orange-200 bg-orange-50/75 p-4 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-sm font-bold text-white shadow-sm">
                    {String(number).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="text-base font-bold text-neutral-900">{item.title}</h4>
                      <span className="rounded-full border border-orange-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-orange-900">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">{item.summary}</p>
                    <p className="mt-2 text-xs leading-5 text-neutral-600">
                      <span className="font-semibold text-orange-800">Result: </span>
                      {item.result}
                    </p>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center rounded-full border border-orange-300 bg-white px-3 py-1.5 text-xs font-semibold text-orange-900 transition hover:bg-orange-100"
                      >
                        {t.newsSourceLink} · {item.source}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}


const surveyModelResponses = [
  {
    "grade": "10",
    "gender": "male",
    "system": "AP",
    "direction": "socialScience",
    "avoided": "business",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 5,
    "entry": 3,
    "difficulty": 4,
    "parent": 2,
    "teacher": 2,
    "peer": 2,
    "stereotype": 3,
    "school": 1,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 2,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "A-Level",
    "direction": "mixed",
    "avoided": "business",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 1,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 3,
    "grades": 4,
    "majorPlan": 4,
    "entry": 3,
    "difficulty": 5,
    "parent": 2,
    "teacher": 2,
    "peer": 3,
    "stereotype": 3,
    "school": 3,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 3,
    "equalEncouragement": 3
  },
  {
    "grade": "10",
    "gender": "nonBinary",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "socialScience",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 1,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 5,
    "entry": 2,
    "difficulty": 1,
    "parent": 5,
    "teacher": 1,
    "peer": 5,
    "stereotype": 5,
    "school": 5,
    "stereotypeHeard": 2,
    "stereotypeConfidence": 5,
    "minorityComfort": 2,
    "equalEncouragement": 5
  },
  {
    "grade": "12",
    "gender": "female",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "business",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 1
    },
    "interest": 5,
    "confidence": 4,
    "grades": 3,
    "majorPlan": 2,
    "entry": 2,
    "difficulty": 3,
    "parent": 3,
    "teacher": 2,
    "peer": 2,
    "stereotype": 1,
    "school": 3,
    "stereotypeHeard": 2,
    "stereotypeConfidence": 1,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "11",
    "gender": "male",
    "system": "A-Level",
    "direction": "mixed",
    "avoided": "stem",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 2,
    "confidence": 3,
    "grades": 5,
    "majorPlan": 3,
    "entry": 5,
    "difficulty": 4,
    "parent": 2,
    "teacher": 4,
    "peer": 2,
    "stereotype": 1,
    "school": 1,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 3,
    "minorityComfort": 4,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 1,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 4,
    "entry": 1,
    "difficulty": 5,
    "parent": 1,
    "teacher": 4,
    "peer": 3,
    "stereotype": 2,
    "school": 1,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 2,
    "minorityComfort": 4,
    "equalEncouragement": 5
  },
  {
    "grade": "9",
    "gender": "nonBinary",
    "system": "Other",
    "direction": "humanities",
    "avoided": "humanities",
    "courses": {
      "mathematics": 0,
      "physics": 0,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 1
    },
    "interest": 5,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 5,
    "entry": 1,
    "difficulty": 1,
    "parent": 1,
    "teacher": 1,
    "peer": 5,
    "stereotype": 5,
    "school": 1,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 1,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 2,
    "confidence": 4,
    "grades": 5,
    "majorPlan": 1,
    "entry": 1,
    "difficulty": 5,
    "parent": 3,
    "teacher": 3,
    "peer": 1,
    "stereotype": 1,
    "school": 1,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 5,
    "entry": 5,
    "difficulty": 5,
    "parent": 5,
    "teacher": 5,
    "peer": 5,
    "stereotype": 5,
    "school": 5,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 4,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "nonBinary",
    "system": "AP",
    "direction": "stem",
    "avoided": "other",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 1,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 3,
    "grades": 5,
    "majorPlan": 5,
    "entry": 3,
    "difficulty": 3,
    "parent": 5,
    "teacher": 4,
    "peer": 2,
    "stereotype": 1,
    "school": 4,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "AP",
    "direction": "stem",
    "avoided": "humanities",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 5,
    "entry": 3,
    "difficulty": 3,
    "parent": 4,
    "teacher": 4,
    "peer": 4,
    "stereotype": 4,
    "school": 4,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 3,
    "equalEncouragement": 5
  },
  {
    "grade": "11",
    "gender": "male",
    "system": "AP",
    "direction": "stem",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 1,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 4,
    "entry": 1,
    "difficulty": 3,
    "parent": 2,
    "teacher": 2,
    "peer": 4,
    "stereotype": 2,
    "school": 3,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 3,
    "equalEncouragement": 3
  },
  {
    "grade": "10",
    "gender": "nonBinary",
    "system": "IB",
    "direction": "stem",
    "avoided": "stem",
    "courses": {
      "mathematics": 0,
      "physics": 0,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 5,
    "entry": 5,
    "difficulty": 5,
    "parent": 5,
    "teacher": 5,
    "peer": 5,
    "stereotype": 5,
    "school": 5,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "AP",
    "direction": "mixed",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 1,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 4,
    "grades": 3,
    "majorPlan": 5,
    "entry": 1,
    "difficulty": 3,
    "parent": 1,
    "teacher": 2,
    "peer": 1,
    "stereotype": 1,
    "school": 3,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "nonBinary",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "socialScience",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 1,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 4,
    "entry": 3,
    "difficulty": 5,
    "parent": 2,
    "teacher": 4,
    "peer": 3,
    "stereotype": 4,
    "school": 4,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "AP",
    "direction": "stem",
    "avoided": "humanities",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 3,
    "grades": 5,
    "majorPlan": 4,
    "entry": 3,
    "difficulty": 2,
    "parent": 3,
    "teacher": 2,
    "peer": 3,
    "stereotype": 1,
    "school": 1,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "IB",
    "direction": "stem",
    "avoided": "stem",
    "courses": {
      "mathematics": 0,
      "physics": 0,
      "chemistry": 1,
      "biology": 1,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 1,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 4,
    "grades": 5,
    "majorPlan": 4,
    "entry": 2,
    "difficulty": 3,
    "parent": 2,
    "teacher": 2,
    "peer": 2,
    "stereotype": 3,
    "school": 5,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 4,
    "minorityComfort": 2,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "IB",
    "direction": "socialScience",
    "avoided": "business",
    "courses": {
      "mathematics": 1,
      "physics": 0,
      "chemistry": 1,
      "biology": 1,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 3,
    "confidence": 2,
    "grades": 4,
    "majorPlan": 4,
    "entry": 4,
    "difficulty": 3,
    "parent": 4,
    "teacher": 4,
    "peer": 3,
    "stereotype": 1,
    "school": 3,
    "stereotypeHeard": 3,
    "stereotypeConfidence": 3,
    "minorityComfort": 3,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "A-Level",
    "direction": "socialScience",
    "avoided": "humanities",
    "courses": {
      "mathematics": 1,
      "physics": 0,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 4,
    "grades": 2,
    "majorPlan": 4,
    "entry": 3,
    "difficulty": 2,
    "parent": 2,
    "teacher": 2,
    "peer": 2,
    "stereotype": 2,
    "school": 3,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 2,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "humanities",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 1,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 5,
    "grades": 4,
    "majorPlan": 5,
    "entry": 2,
    "difficulty": 4,
    "parent": 1,
    "teacher": 2,
    "peer": 3,
    "stereotype": 2,
    "school": 4,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 2,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "AP",
    "direction": "socialScience",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 0,
      "chemistry": 0,
      "biology": 1,
      "computerScience": 0,
      "economics": 1,
      "business": 1,
      "geography": 1,
      "philosophy": 1
    },
    "interest": 5,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 5,
    "entry": 2,
    "difficulty": 3,
    "parent": 2,
    "teacher": 2,
    "peer": 2,
    "stereotype": 5,
    "school": 5,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 1,
    "equalEncouragement": 5
  },
  {
    "grade": "11",
    "gender": "male",
    "system": "A-Level",
    "direction": "stem",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 4,
    "grades": 3,
    "majorPlan": 5,
    "entry": 1,
    "difficulty": 1,
    "parent": 3,
    "teacher": 2,
    "peer": 1,
    "stereotype": 1,
    "school": 4,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 4,
    "minorityComfort": 5,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "AP",
    "direction": "stem",
    "avoided": "stem",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 1,
      "computerScience": 1,
      "economics": 1,
      "business": 0,
      "geography": 1,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 4,
    "entry": 2,
    "difficulty": 2,
    "parent": 3,
    "teacher": 4,
    "peer": 2,
    "stereotype": 1,
    "school": 2,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "IB",
    "direction": "mixed",
    "avoided": "other",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 5,
    "grades": 5,
    "majorPlan": 5,
    "entry": 2,
    "difficulty": 3,
    "parent": 1,
    "teacher": 1,
    "peer": 1,
    "stereotype": 1,
    "school": 5,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 1,
    "minorityComfort": 4,
    "equalEncouragement": 5
  },
  {
    "grade": "11",
    "gender": "male",
    "system": "IB",
    "direction": "humanities",
    "avoided": "stem",
    "courses": {
      "mathematics": 1,
      "physics": 0,
      "chemistry": 0,
      "biology": 1,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 5,
    "entry": 2,
    "difficulty": 3,
    "parent": 3,
    "teacher": 1,
    "peer": 2,
    "stereotype": 2,
    "school": 3,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "AP",
    "direction": "mixed",
    "avoided": "other",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 1,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 5,
    "entry": 3,
    "difficulty": 4,
    "parent": 5,
    "teacher": 4,
    "peer": 3,
    "stereotype": 1,
    "school": 3,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 4,
    "minorityComfort": 5,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "IB",
    "direction": "socialScience",
    "avoided": "humanities",
    "courses": {
      "mathematics": 1,
      "physics": 0,
      "chemistry": 0,
      "biology": 1,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 5,
    "grades": 3,
    "majorPlan": 4,
    "entry": 2,
    "difficulty": 4,
    "parent": 2,
    "teacher": 3,
    "peer": 2,
    "stereotype": 1,
    "school": 3,
    "stereotypeHeard": 4,
    "stereotypeConfidence": 1,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "11",
    "gender": "male",
    "system": "A-Level",
    "direction": "socialScience",
    "avoided": "none",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 5,
    "grades": 3,
    "majorPlan": 4,
    "entry": 2,
    "difficulty": 2,
    "parent": 1,
    "teacher": 3,
    "peer": 3,
    "stereotype": 1,
    "school": 4,
    "stereotypeHeard": 5,
    "stereotypeConfidence": 5,
    "minorityComfort": 5,
    "equalEncouragement": 5
  },
  {
    "grade": "10",
    "gender": "female",
    "system": "IB",
    "direction": "socialScience",
    "avoided": "business",
    "courses": {
      "mathematics": 1,
      "physics": 0,
      "chemistry": 0,
      "biology": 1,
      "computerScience": 0,
      "economics": 1,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 4,
    "confidence": 2,
    "grades": 4,
    "majorPlan": 4,
    "entry": 3,
    "difficulty": 4,
    "parent": 3,
    "teacher": 4,
    "peer": 3,
    "stereotype": 2,
    "school": 4,
    "stereotypeHeard": 1,
    "stereotypeConfidence": 2,
    "minorityComfort": 4,
    "equalEncouragement": 4
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "Other",
    "direction": "mixed",
    "avoided": "business",
    "courses": {
      "mathematics": 0,
      "physics": 0,
      "chemistry": 0,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 1
    },
    "interest": 4,
    "confidence": 3,
    "grades": 3,
    "majorPlan": 2,
    "entry": 2,
    "difficulty": 2,
    "parent": 3,
    "teacher": 2,
    "peer": 2,
    "stereotype": 2,
    "school": 3,
    "stereotypeHeard": 3,
    "stereotypeConfidence": 3,
    "minorityComfort": 3,
    "equalEncouragement": 3
  },
  {
    "grade": "10",
    "gender": "male",
    "system": "AP",
    "direction": "mixed",
    "avoided": "other",
    "courses": {
      "mathematics": 1,
      "physics": 1,
      "chemistry": 1,
      "biology": 0,
      "computerScience": 0,
      "economics": 0,
      "business": 0,
      "geography": 0,
      "philosophy": 0
    },
    "interest": 5,
    "confidence": 4,
    "grades": 4,
    "majorPlan": 2,
    "entry": 2,
    "difficulty": 2,
    "parent": 1,
    "teacher": 2,
    "peer": 3,
    "stereotype": 3,
    "school": 4,
    "stereotypeHeard": 2,
    "stereotypeConfidence": 3,
    "minorityComfort": 4,
    "equalEncouragement": 5
  }
];

const surveyCourseModels = [
  { key: "mathematics", labelKey: "courseMathematics", category: "stem" },
  { key: "physics", labelKey: "coursePhysics", category: "stem" },
  { key: "chemistry", labelKey: "courseChemistry", category: "stem" },
  { key: "biology", labelKey: "courseBiology", category: "stem" },
  { key: "computerScience", labelKey: "courseComputerScience", category: "stem" },
  { key: "economics", labelKey: "courseEconomics", category: "socialScience" },
  { key: "business", labelKey: "courseBusiness", category: "business" },
  { key: "geography", labelKey: "courseGeography", category: "socialScience" },
  { key: "philosophy", labelKey: "coursePhilosophy", category: "humanities" },
];

const surveyModelFeatureKeys = ["support", "pressure", "biasExposure", "biasResistance"];

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function safeMean(values, fallback = 0) {
  if (!values.length) return fallback;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function logit(probability) {
  const safeProbability = clampNumber(probability, 0.001, 0.999);
  return Math.log(safeProbability / (1 - safeProbability));
}

function normalizeSurveyRating(value) {
  return clampNumber((Number(value) - 1) / 4, 0, 1);
}

function weightedFeatureAverage(pairs) {
  const totalWeight = pairs.reduce((sum, [, weight]) => sum + weight, 0);
  if (!totalWeight) return 0;
  return pairs.reduce((sum, [value, weight]) => sum + normalizeSurveyRating(value) * weight, 0) / totalWeight;
}

function getSurveyFeatureVector(record) {
  const support = weightedFeatureAverage([
    [record.interest, 0.22],
    [record.confidence, 0.18],
    [record.grades, 0.17],
    [record.majorPlan, 0.17],
    [record.teacher, 0.10],
    [record.school, 0.16],
  ]);

  const pressure = weightedFeatureAverage([
    [record.entry, 0.23],
    [record.difficulty, 0.23],
    [record.parent, 0.16],
    [record.peer, 0.16],
    [record.stereotype, 0.22],
  ]);

  const biasExposure = weightedFeatureAverage([
    [record.stereotypeHeard, 0.52],
    [record.stereotypeConfidence, 0.48],
  ]);

  const biasResistance = weightedFeatureAverage([
    [record.minorityComfort, 0.45],
    [record.equalEncouragement, 0.55],
  ]);

  return { support, pressure, biasExposure, biasResistance };
}

function smoothedGroupLogit(records, predicate, selectedCourseKey, baselineLogitValue) {
  const group = records.filter(predicate);
  if (!group.length) return 0;
  const chosen = group.filter((record) => record.courses[selectedCourseKey] === 1).length;
  const probability = (chosen + 1) / (group.length + 2);
  return (logit(probability) - baselineLogitValue) * Math.min(0.42, group.length / records.length);
}

function buildSurveyChoiceModel(records) {
  const enriched = records.map((record) => ({
    ...record,
    features: getSurveyFeatureVector(record),
  }));

  const means = Object.fromEntries(
    surveyModelFeatureKeys.map((key) => [key, safeMean(enriched.map((record) => record.features[key]))]),
  );

  const deviations = Object.fromEntries(
    surveyModelFeatureKeys.map((key) => [
      key,
      Math.sqrt(safeMean(enriched.map((record) => (record.features[key] - means[key]) ** 2), 0.08 ** 2)) || 0.08,
    ]),
  );

  const avoidedCategories = ["stem", "humanities", "socialScience", "business", "other"];
  const avoidanceModels = Object.fromEntries(
    avoidedCategories.map((category) => {
      const avoidedCount = enriched.filter((record) => record.avoided === category).length;
      const probability = (avoidedCount + 1) / (enriched.length + 2);
      return [category, { baseLogit: logit(probability), observedProbability: probability }];
    }),
  );

  const courses = Object.fromEntries(
    surveyCourseModels.map((course) => {
      const selected = enriched.filter((record) => record.courses[course.key] === 1);
      const notSelected = enriched.filter((record) => record.courses[course.key] !== 1);
      const probability = (selected.length + 1) / (enriched.length + 2);
      const baseline = logit(probability);
      const balanceShrink = Math.min(selected.length, notSelected.length) / Math.max(1, enriched.length / 2);
      const shrinkage = clampNumber(balanceShrink * 0.56, 0.08, 0.56);

      const featureWeights = Object.fromEntries(
        surveyModelFeatureKeys.map((key) => {
          if (!selected.length || !notSelected.length) return [key, 0];
          const selectedMean = safeMean(selected.map((record) => record.features[key]), means[key]);
          const notSelectedMean = safeMean(notSelected.map((record) => record.features[key]), means[key]);
          const standardizedDifference = (selectedMean - notSelectedMean) / (deviations[key] + 0.15);
          return [key, clampNumber(standardizedDifference * shrinkage, -0.85, 0.85)];
        }),
      );

      const genderEffects = Object.fromEntries(
        ["male", "female", "nonBinary"].map((gender) => [
          gender,
          smoothedGroupLogit(enriched, (record) => record.gender === gender, course.key, baseline),
        ]),
      );

      const systemEffects = Object.fromEntries(
        ["AP", "IB", "A-Level", "Other"].map((system) => [
          system,
          smoothedGroupLogit(enriched, (record) => record.system === system, course.key, baseline),
        ]),
      );

      const directionEffects = Object.fromEntries(
        ["stem", "humanities", "socialScience", "business", "mixed"].map((direction) => [
          direction,
          smoothedGroupLogit(enriched, (record) => record.direction === direction, course.key, baseline),
        ]),
      );

      return [
        course.key,
        {
          ...course,
          selectedCount: selected.length,
          observedProbability: selected.length / enriched.length,
          baseline,
          featureWeights,
          genderEffects,
          systemEffects,
          directionEffects,
        },
      ];
    }),
  );

  return {
    sampleSize: enriched.length,
    means,
    deviations,
    courses,
    avoidanceModels,
  };
}

function predictSurveyCourseScores(model, inputs, profile) {
  const featureVector = getSurveyFeatureVector(inputs);
  const supportScore = Math.round(featureVector.support * 100);
  const pressureScore = Math.round(featureVector.pressure * 100);
  const biasExposureScore = Math.round(featureVector.biasExposure * 100);
  const biasResistanceScore = Math.round(featureVector.biasResistance * 100);

  const getAvoidanceRisk = (category) => {
    const modelForCategory = model.avoidanceModels[category] || model.avoidanceModels.other;
    const z =
      modelForCategory.baseLogit +
      1.05 * (featureVector.pressure - model.means.pressure) +
      0.68 * (featureVector.biasExposure - model.means.biasExposure) -
      0.78 * (featureVector.biasResistance - model.means.biasResistance);
    return sigmoid(z);
  };

  const courseOutlook = surveyCourseModels.map((course) => {
    const courseModel = model.courses[course.key];
    const empiricalAdjustment = surveyModelFeatureKeys.reduce((sum, key) => {
      return sum + courseModel.featureWeights[key] * (featureVector[key] - model.means[key]);
    }, 0);

    const interactionAdjustment =
      (courseModel.genderEffects[profile.gender] || 0) * 0.38 +
      (courseModel.systemEffects[profile.system] || 0) * 0.26 +
      (courseModel.directionEffects[profile.direction] || 0) * 0.38;

    const rawProbability = sigmoid(courseModel.baseline + empiricalAdjustment + interactionAdjustment);
    const avoidanceRisk = getAvoidanceRisk(course.category);
    const finalProbability = clampNumber(rawProbability * (1 - 0.25 * avoidanceRisk), 0.03, 0.97);

    return {
      ...course,
      score: Math.round(finalProbability * 100),
      observedProbability: courseModel.observedProbability,
      selectedCount: courseModel.selectedCount,
      avoidanceRisk: Math.round(avoidanceRisk * 100),
    };
  });

  const ecci = Math.round(
    clampNumber(
      sigmoid(
        0.18 +
          2.45 * (featureVector.support - featureVector.pressure) -
          0.48 * (featureVector.biasExposure - model.means.biasExposure) +
          0.76 * (featureVector.biasResistance - model.means.biasResistance),
      ) * 100,
      6,
      94,
    ),
  );

  const stemCourses = courseOutlook.filter((course) => course.category === "stem");
  const humanitiesCourses = courseOutlook.filter((course) => course.category === "humanities");
  const socialScienceCourses = courseOutlook.filter((course) => course.category === "socialScience");

  return {
    supportScore,
    pressureScore,
    biasExposureScore,
    biasResistanceScore,
    openExploration: ecci,
    stemWillingness: Math.round(safeMean(stemCourses.map((course) => course.score), ecci)),
    humanitiesWillingness: Math.round(safeMean(humanitiesCourses.map((course) => course.score), ecci)),
    socialScienceWillingness: Math.round(safeMean(socialScienceCourses.map((course) => course.score), ecci)),
    courseOutlook,
  };
}

function BiasSimulator({ t }) {
  const defaultInputs = {
    interest: 4,
    confidence: 4,
    grades: 4,
    majorPlan: 4,
    entry: 3,
    difficulty: 3,
    parent: 2,
    teacher: 3,
    peer: 3,
    stereotype: 2,
    school: 4,
    stereotypeHeard: 4,
    stereotypeConfidence: 4,
    minorityComfort: 4,
    equalEncouragement: 4,
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [scenarioGender, setScenarioGender] = useState("female");
  const [scenarioSystem, setScenarioSystem] = useState("AP");
  const [scenarioDirection, setScenarioDirection] = useState("stem");

  const surveyChoiceModel = useMemo(
    () => buildSurveyChoiceModel(surveyModelResponses),
    [],
  );

  const prediction = useMemo(
    () =>
      predictSurveyCourseScores(surveyChoiceModel, inputs, {
        gender: scenarioGender,
        system: scenarioSystem,
        direction: scenarioDirection,
      }),
    [inputs, scenarioGender, scenarioSystem, scenarioDirection, surveyChoiceModel],
  );

  const sliderGroups = [
    {
      title: t.simSupportControls,
      direction: "positive",
      icon: "▲",
      signal: "+ RESOURCE",
      items: [
        ["interest", t.simInterest],
        ["confidence", t.simConfidence],
        ["grades", t.simAcademicPerformance],
        ["majorPlan", t.simMajorPlan],
        ["teacher", t.simTeacher],
        ["school", t.simSchool],
      ],
    },
    {
      title: t.simPressureControls,
      direction: "negative",
      icon: "◆",
      signal: "- THREAT",
      items: [
        ["entry", t.simEntry],
        ["difficulty", t.simDifficulty],
        ["parent", t.simParent],
        ["peer", t.simPeer],
        ["stereotype", t.simStereotype],
      ],
    },
    {
      title: t.simBiasControls,
      direction: "mixed",
      icon: "◈",
      signal: "AWARENESS",
      items: [
        ["stereotypeHeard", t.simBiasHeard],
        ["stereotypeConfidence", t.simBiasConfidence],
        ["minorityComfort", t.simMinorityComfort],
        ["equalEncouragement", t.simEqualEncouragement],
      ],
    },
  ];

  const genderOptions = [
    ["female", t.female],
    ["male", t.male],
    ["nonBinary", t.nonBinary],
  ];

  const systemOptions = [
    ["AP", t.ap],
    ["IB", t.ib],
    ["IG", t.ig],
    ["A-Level", t.alevel],
    ["Other", t.other],
  ];

  const directionOptions = [
    ["stem", t.simDirectionStem],
    ["humanities", t.simDirectionHumanities],
    ["socialScience", t.simDirectionSocialScience],
    ["business", t.simDirectionBusiness],
    ["mixed", t.simDirectionMixed],
  ];

  const presets = [
    {
      label: t.simPresetBalanced,
      values: { ...defaultInputs, interest: 4, confidence: 4, grades: 4, majorPlan: 4, entry: 3, difficulty: 3, peer: 3, stereotype: 2, school: 4 },
      gender: "female",
      system: "AP",
      direction: "mixed",
    },
    {
      label: t.simPresetPressure,
      values: { ...defaultInputs, interest: 4, confidence: 2, grades: 3, majorPlan: 4, entry: 5, difficulty: 5, parent: 4, peer: 4, stereotype: 5, school: 2, stereotypeHeard: 5, stereotypeConfidence: 5, minorityComfort: 2, equalEncouragement: 2 },
      gender: "female",
      system: "AP",
      direction: "stem",
    },
    {
      label: t.simPresetSupport,
      values: { ...defaultInputs, interest: 5, confidence: 5, grades: 5, majorPlan: 5, entry: 2, difficulty: 2, parent: 2, peer: 2, stereotype: 1, school: 5, stereotypeHeard: 3, stereotypeConfidence: 2, minorityComfort: 5, equalEncouragement: 5 },
      gender: "male",
      system: "IB",
      direction: "stem",
    },
    {
      label: t.simPresetStereotype,
      values: { ...defaultInputs, interest: 3, confidence: 2, grades: 3, majorPlan: 3, entry: 3, difficulty: 4, parent: 4, peer: 5, stereotype: 5, school: 2, stereotypeHeard: 5, stereotypeConfidence: 5, minorityComfort: 2, equalEncouragement: 3 },
      gender: "nonBinary",
      system: "A-Level",
      direction: "humanities",
    },
  ];

  const {
    supportScore,
    pressureScore,
    biasExposureScore,
    biasResistanceScore,
    openExploration,
    stemWillingness,
    humanitiesWillingness,
    socialScienceWillingness,
    courseOutlook,
  } = prediction;

  const courseScores = Object.fromEntries(
    courseOutlook.map((course) => [course.key, course.score]),
  );

  const status =
    openExploration >= 70
      ? t.simStatusSupported
      : pressureScore > supportScore + 18
        ? t.simStatusBlocked
        : t.simStatusMixed;

  const explanation =
    openExploration >= 70
      ? t.simulatorExplanationStrong
      : pressureScore > supportScore + 18
        ? t.simulatorExplanationWeak
        : t.simulatorExplanationMiddle;

  const getCourseStatus = (score) => {
    if (score >= 66) return t.simLikelyChoose;
    if (score >= 38) return t.simMayHesitate;
    return t.simLikelyAvoid;
  };

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const formatSliderValue = (value) => Number(value).toFixed(2);
  const getSliderLevel = (value) => {
    const numericValue = Number(value);
    if (numericValue >= 4.35) return "S";
    if (numericValue >= 3.65) return "A";
    if (numericValue >= 2.85) return "B";
    if (numericValue >= 2.05) return "C";
    return "D";
  };
  const getSliderPercent = (value) => `${((Number(value) - 1) / 4) * 100}%`;
  const getGroupAverage = (items) =>
    items.reduce((sum, [key]) => sum + Number(inputs[key]), 0) / items.length;

  const ResultCard = ({ label, value }) => (
    <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-orange-800">{label}</span>
      <div className="mt-1 flex items-end gap-1">
        <span className="text-xl font-bold text-neutral-900">{value}</span>
        <span className="mb-0.5 text-xs font-semibold text-neutral-500">%</span>
      </div>
    </div>
  );

  const ProfileSelect = ({ label, value, onChange, options }) => (
    <label className="block rounded-lg border border-orange-100 bg-white p-2 shadow-sm">
      <span className="text-[10px] font-semibold text-neutral-800">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50 px-1.5 py-1 text-[10px] font-semibold text-neutral-800 outline-none transition focus:border-orange-500"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <section
      id="simulator"
      className="scroll-mt-28 rounded-3xl border border-orange-300/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-10"
    >
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
          {t.simulatorLabel}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl">
          {t.simulatorTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-neutral-800">{t.simulatorDesc}</p>
      </div>

      <div className="strategy-command-card mt-3 rounded-2xl border border-orange-200 bg-orange-50/60 p-2.5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-neutral-900">{t.simPresets}</p>
            <p className="mt-0.5 text-[10px] leading-4 text-neutral-500">
              {t.modelSampleNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setInputs(defaultInputs);
              setScenarioGender("female");
              setScenarioSystem("AP");
              setScenarioDirection("stem");
            }}
            className="rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-orange-900 transition hover:bg-orange-100"
          >
            {t.simReset}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setInputs(preset.values);
                setScenarioGender(preset.gender);
                setScenarioSystem(preset.system);
                setScenarioDirection(preset.direction);
              }}
              className="strategy-preset rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700 transition hover:border-orange-500 hover:bg-orange-100"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[0.58fr_1.42fr] 2xl:grid-cols-[0.52fr_1.48fr]">
        <div className="min-w-0 space-y-2">
          <div className="strategy-profile-card rounded-xl border border-orange-100 bg-white p-2 shadow-sm">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-neutral-800">{t.simProfileControls}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-900">
                <img
                  src={genderAvatarIcons[scenarioGender]}
                  alt=""
                  className="h-4 w-4 rounded-full object-cover ring-1 ring-orange-100"
                />
                {scenarioGender === "female" ? t.female : scenarioGender === "male" ? t.male : t.nonBinary}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {genderOptions.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScenarioGender(value)}
                  className={`strategy-token group rounded-lg border px-1.5 py-1.5 text-[10px] font-semibold transition ${
                    scenarioGender === value
                      ? "border-orange-600 bg-orange-600 text-white shadow-md"
                      : "border-orange-200 bg-orange-50 text-orange-900 hover:border-orange-400 hover:bg-orange-100"
                  }`}
                >
                  <img
                    src={genderAvatarIcons[value]}
                    alt=""
                    className={`mx-auto mb-1 h-6 w-6 rounded-full object-cover transition ${
                      scenarioGender === value
                        ? "ring-2 ring-white"
                        : "ring-1 ring-orange-200 group-hover:ring-orange-400"
                    }`}
                  />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ProfileSelect
              label={t.simCurriculumSystem}
              value={scenarioSystem}
              onChange={setScenarioSystem}
              options={systemOptions}
            />
            <ProfileSelect
              label={t.simDirection}
              value={scenarioDirection}
              onChange={setScenarioDirection}
              options={directionOptions}
            />
          </div>

          {sliderGroups.map((group) => {
            const groupAverage = getGroupAverage(group.items);
            return (
              <div key={group.title} className={`strategy-control-bank strategy-${group.direction} rounded-xl border border-orange-100 bg-white p-2 shadow-sm`}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="strategy-bank-icon flex h-7 w-7 items-center justify-center rounded-lg text-sm font-black">
                      {group.icon}
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-neutral-900">{group.title}</p>
                      <p className="text-[9px] font-bold tracking-[0.18em] text-neutral-500">{group.signal}</p>
                    </div>
                  </div>
                  <span className="strategy-bank-level rounded-full px-2 py-0.5 text-[10px] font-black">
                    LV {formatSliderValue(groupAverage)}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-2">
                  {group.items.map(([key, label]) => {
                    const currentValue = inputs[key];
                    const sliderPercent = getSliderPercent(currentValue);
                    return (
                      <label key={key} className="strategy-slider-card block rounded-lg border border-orange-100 bg-orange-50/50 px-1.5 py-1.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="min-w-0">
                            <span className="block truncate text-[11px] font-black leading-3.5 text-neutral-800">{label}</span>
                            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/80">
                              <div
                                className="strategy-mini-energy h-full rounded-full transition-all duration-300"
                                style={{ width: sliderPercent }}
                              />
                            </div>
                          </div>
                          <span className="strategy-level-badge shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-black">
                            {getSliderLevel(currentValue)} · {formatSliderValue(currentValue)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="0.01"
                          value={currentValue}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="survey-range strategy-range mt-1.5 w-full"
                          style={{ "--value": sliderPercent }}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="min-w-0 space-y-2">
          <RoomScene
            t={t}
            status={status}
            openExploration={openExploration}
            supportScore={supportScore}
            pressureScore={pressureScore}
            courseScores={courseScores}
            scenarioGender={scenarioGender}
          />

          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-green-100 bg-green-50 p-2.5">
              <div className="flex items-center justify-between text-sm font-semibold text-green-800">
                <span>{t.simSupport}</span>
                <span>{supportScore}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-green-600 transition-all duration-500"
                  style={{ width: `${supportScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-2.5">
              <div className="flex items-center justify-between text-sm font-semibold text-orange-800">
                <span>{t.simPressure}</span>
                <span>{pressureScore}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-orange-600 transition-all duration-500"
                  style={{ width: `${pressureScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-sky-100 bg-sky-50 p-2.5">
              <div className="flex items-center justify-between text-sm font-semibold text-sky-800">
                <span>{t.simBiasExposure}</span>
                <span>{biasExposureScore}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-sky-600 transition-all duration-500"
                  style={{ width: `${biasExposureScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2.5">
              <div className="flex items-center justify-between text-sm font-semibold text-emerald-800">
                <span>{t.simBiasResistance}</span>
                <span>{biasResistanceScore}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${biasResistanceScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <ResultCard label={t.simStem} value={stemWillingness} />
            <ResultCard label={t.simHumanities} value={humanitiesWillingness} />
            <ResultCard label={t.categorySocialScience} value={socialScienceWillingness} />
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <ResultCard label={t.simOpenExploration} value={openExploration} />
            <ResultCard label={t.simBiasExposure} value={biasExposureScore} />
            <ResultCard label={t.simBiasResistance} value={biasResistanceScore} />
          </div>

          <div className="rounded-2xl border border-orange-200 bg-white p-3 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
              {t.simCourseOutlook}
            </p>
            <div className="mt-2 grid max-h-[205px] gap-1.5 overflow-y-auto pr-1 md:grid-cols-2">
              {courseOutlook.map((course) => (
                <div
                  key={course.key}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl border border-orange-100 bg-orange-50/60 px-2.5 py-2"
                >
                  <div>
                    <span className="text-xs font-semibold text-neutral-900">{t[course.labelKey]}</span>
                    <p className="mt-0.5 text-[10px] font-medium text-neutral-500">
                      {getCourseStatus(course.score)} · {course.selectedCount}/{surveyChoiceModel.sampleSize}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-orange-900">
                    {course.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-orange-100 bg-orange-50 p-2.5 text-xs leading-5 text-neutral-800">
            {explanation}
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-[10px] leading-5 text-neutral-700">
            {t.simulatorNotice}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModelExplanationSection({ t }) {
  const [isOpen, setIsOpen] = useState(true);
  const isZh = t.langButton === "English";

  const modelCards = [
    [t.modelDataTitle, t.modelDataText],
    [t.modelIndexTitle, t.modelIndexText],
    [t.modelChoiceTitle, t.modelChoiceText],
    [t.modelAvoidTitle, t.modelAvoidText],
  ];

  const FormulaBlock = ({ title, children, note }) => (
    <article className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h5 className="text-xs font-bold uppercase tracking-[0.18em] text-orange-800">{title}</h5>
        <span className="h-2 w-2 rounded-full bg-orange-400" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-orange-100 bg-white px-4 py-3">
        <div className="min-w-max whitespace-nowrap font-serif text-[1.05rem] leading-8 text-neutral-900">
          {children}
        </div>
      </div>
      {note && <p className="mt-3 text-xs leading-6 text-neutral-600">{note}</p>}
    </article>
  );

  return (
    <section id="model-explanation" className="scroll-mt-28 rounded-3xl border border-orange-300/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
            {t.modelSectionLabel}
          </p>
          <h3 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
            {t.modelSectionTitle}
          </h3>
          <p className="mt-4 leading-8 text-neutral-800">{t.modelSectionIntro}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-900 transition hover:bg-orange-100"
        >
          {isOpen ? t.modelToggleClose : t.modelToggleOpen}
        </button>
      </div>

      {isOpen && (
        <div className="mt-7 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            {modelCards.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
                <h4 className="text-base font-bold text-neutral-900">{title}</h4>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{text}</p>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-orange-200 bg-white p-5">
            <h4 className="text-base font-bold text-neutral-900">{t.modelFormulaTitle}</h4>
            <p className="mt-2 text-sm leading-7 text-neutral-600">
              {isZh
                ? "下面的公式已经改成网页可直接阅读的数学表达，不再显示 LaTeX 源码。"
                : "The formulas below are rendered as readable web math instead of raw LaTeX source."}
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <FormulaBlock
                title={isZh ? "1. 量表归一化" : "1. Scale normalization"}
                note={isZh ? "把所有 1–5 分量表转成 0–1 区间，方便不同变量放在同一模型中比较。" : "Converts every 1–5 survey scale into a 0–1 range."}
              >
                <span>x<sup>′</sup> = </span>
                <span className="inline-flex flex-col items-center align-middle">
                  <span className="border-b border-neutral-800 px-2">x − 1</span>
                  <span className="px-2">4</span>
                </span>
              </FormulaBlock>

              <FormulaBlock
                title={isZh ? "2. 支持指数" : "2. Support Index"}
                note={isZh ? "I=兴趣，C=自信，G=成绩，M=规划，T=老师建议，Eschool=学校鼓励。" : "I=interest, C=confidence, G=grades, M=major plan, T=teacher advice, Eschool=school encouragement."}
              >
                <span>S = 0.22I + 0.18C + 0.17G + 0.17M + 0.10T + 0.16E<sub>school</sub></span>
              </FormulaBlock>

              <FormulaBlock
                title={isZh ? "3. 压力指数" : "3. Pressure Index"}
                note={isZh ? "Entry=入门门槛，Difficulty=难度，Parent=家长期待，Peer=同伴影响，Stereotype=性别刻板印象。" : "Entry, difficulty, family expectation, peer influence, and stereotype pressure form the pressure side."}
              >
                <span>P = 0.23Entry + 0.23Difficulty + 0.16Parent + 0.16Peer + 0.22Stereotype</span>
              </FormulaBlock>

              <FormulaBlock
                title={isZh ? "4. 偏见暴露与抵抗" : "4. Bias Exposure and Resistance"}
                note={isZh ? "BE 衡量接触到偏见的程度；BR 衡量学生和学校环境抵抗偏见的能力。" : "BE measures exposure to stereotypes; BR measures resistance from confidence and school support."}
              >
                <div>BE = 0.52Heard + 0.48ConfidenceEffect</div>
                <div>BR = 0.45MinorityComfort + 0.55EqualEncouragement</div>
              </FormulaBlock>

              <FormulaBlock
                title={isZh ? "5. 课程选择概率" : "5. Course-choice probability"}
                note={isZh ? "每一门课都有自己的基础概率和权重，输出为选择该课程的概率。" : "Each course has its own baseline and weights, producing a probability of choosing that course."}
              >
                <span>p<sub>c</sub> = σ( b<sub>c</sub> + Σ w<sub>c,k</sub>(x<sub>k</sub> − μ<sub>k</sub>) + 0.38G<sub>c</sub> + 0.26Sys<sub>c</sub> + 0.38Dir<sub>c</sub> )</span>
              </FormulaBlock>

              <FormulaBlock
                title={isZh ? "6. 最终课程分数与 ECCI" : "6. Final score and ECCI"}
                note={isZh ? "最终课程分数会受到犹豫/避免风险修正；ECCI 用于表示整体开放选课程度。" : "Final course score is adjusted by avoidance risk; ECCI summarizes overall openness of course choice."}
              >
                <div>Final<sub>c</sub> = 100 × p<sub>c</sub> × (1 − 0.25A<sub>category</sub>)</div>
                <div>ECCI = 100 × σ(0.18 + 2.45(S − P) − 0.48(BE − μ<sub>BE</sub>) + 0.76(BR − μ<sub>BR</sub>))</div>
              </FormulaBlock>
            </div>

            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-neutral-700">
              {t.modelSampleNote}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function VisitorChoice({ t, onAnonymous, onSurvey }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
        {t.welcome}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
        {t.gateTitle}
      </h2>
      <p className="mt-4 leading-8 text-neutral-800">{t.gateDescription}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          onClick={onAnonymous}
          className="rounded-3xl border border-orange-300 bg-white px-5 py-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50"
        >
          <div className="text-lg font-semibold text-neutral-900">{t.anonymousTitle}</div>
          <p className="mt-2 text-sm leading-7 text-neutral-700">{t.anonymousDesc}</p>
        </button>

        <button
          onClick={onSurvey}
          className="rounded-3xl border border-orange-500 bg-orange-600 px-5 py-5 text-left text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <div className="text-lg font-semibold">{t.formEntryTitle}</div>
          <p className="mt-2 text-sm leading-7 text-orange-50">{t.formEntryDesc}</p>
        </button>
      </div>
    </div>
  );
}

function VisitorForm({ t, visitorInfo, onChange, canContinue, onBack, onContinue }) {
  return (
    <div className="visitor-form-panel flex flex-col">
      <div className="sticky top-0 z-10 -mx-5 -mt-5 mb-4 gate-card-bg px-5 pb-3 pt-5 md:-mx-6 md:-mt-6 md:px-6 md:pt-6">
        <button
          onClick={onBack}
          className="rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-medium text-orange-900 shadow-sm transition hover:bg-orange-50"
        >
          {t.back}
        </button>
      </div>

      <div className="overflow-y-auto pr-1">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
          {t.visitorForm}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
          {t.formTitle}
        </h2>
        <p className="mt-4 leading-8 text-neutral-800">{t.formDesc}</p>

        <div className="mt-4 rounded-xl bg-orange-100 p-4 text-sm leading-7 text-neutral-800">
          <strong>{t.privacyTitle}</strong> {t.privacyText}
        </div>

        <div className="mt-6 space-y-3 pb-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">{t.school}</label>
            <input
              value={visitorInfo.school}
              onChange={(e) => onChange("school", e.target.value)}
              placeholder={t.schoolPlaceholder}
              className="w-full rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">{t.grade}</label>
            <input
              value={visitorInfo.grade}
              onChange={(e) => onChange("grade", e.target.value)}
              placeholder={t.gradePlaceholder}
              className="w-full rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">{t.curriculum}</label>
            <select
              value={visitorInfo.curriculum}
              onChange={(e) => onChange("curriculum", e.target.value)}
              className="w-full rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
            >
              <option value="">{t.curriculumPlaceholder}</option>
              <option value="AP">{t.ap}</option>
              <option value="IB">{t.ib}</option>
              <option value="IG">{t.ig}</option>
              <option value="A-Level">{t.alevel}</option>
              <option value="Other">{t.other}</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">{t.gender}</label>
            <select
              value={visitorInfo.gender}
              onChange={(e) => onChange("gender", e.target.value)}
              className="w-full rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
            >
              <option value="">{t.genderPlaceholder}</option>
              <option value="Female">{t.female}</option>
              <option value="Male">{t.male}</option>
              <option value="Non-binary">{t.nonBinary}</option>
                          </select>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-white/70 p-4 text-sm leading-7 text-neutral-800">
            <input
              type="checkbox"
              checked={visitorInfo.consent}
              onChange={(e) => onChange("consent", e.target.checked)}
              className="mt-1 h-4 w-4 accent-orange-600"
            />
            <span>{t.consent}</span>
          </label>
        </div>
      </div>

      <div className="mt-4 border-t border-orange-200 pt-4">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {t.continueBrowsing}
        </button>
      </div>
    </div>
  );
}

function FloatingBackground() {
  const orbs = useMemo(
    () => [
      { className: "orb-one" },
      { className: "orb-two" },
      { className: "orb-three" },
      { className: "orb-four" },
    ],
    [],
  );

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 floating-base-bg" />
        <div className="absolute inset-0 floating-grid-bg opacity-20" />
        {orbs.map((orb, index) => (
          <div key={index} className={`absolute rounded-full blur-3xl ${orb.className}`} />
        ))}
      </div>
      <style>{`
        .gender-page-bg {
          background: linear-gradient(to bottom, #ffe0b2, #ffcc80);
        }

        .gate-card-bg {
          background: linear-gradient(to bottom, #fff4df, #ffe1b8);
        }

        .hero-title-gradient {
          background: linear-gradient(90deg, #7c2d12, #c2410c, #ea580c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .floating-base-bg {
          background:
            radial-gradient(circle at top, rgba(255,255,255,0.38), transparent 38%),
            radial-gradient(circle at 80% 20%, rgba(255,244,214,0.42), transparent 24%),
            linear-gradient(to bottom, #ffe0b2, #ffcc80);
        }

        .floating-grid-bg {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .room-floor-grid {
          background-image:
            linear-gradient(to right, rgba(194,65,12,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(194,65,12,0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .orb-one {
          left: -8rem;
          top: 8rem;
          height: 18rem;
          width: 18rem;
          background: rgba(253, 186, 116, 0.35);
          animation: floatOrb1 16s ease-in-out infinite;
        }

        .orb-two {
          right: 6%;
          top: 7rem;
          height: 14rem;
          width: 14rem;
          background: rgba(253, 230, 138, 0.45);
          animation: floatOrb2 18s ease-in-out infinite;
        }

        .orb-three {
          left: 12%;
          bottom: 18%;
          height: 16rem;
          width: 16rem;
          background: rgba(254, 215, 170, 0.30);
          animation: floatOrb3 20s ease-in-out infinite;
        }

        .orb-four {
          right: -5rem;
          bottom: 10%;
          height: 20rem;
          width: 20rem;
          background: rgba(254, 240, 138, 0.30);
          animation: floatOrb1 22s ease-in-out infinite;
        }

        .animate-fade-up-custom {
          animation: fadeUp 0.9s ease-out both;
        }

        .animate-pulse-glow-custom {
          animation: pulseGlow 3.2s ease-in-out infinite;
        }

        .carousel-glow {
          background:
            radial-gradient(circle at 15% 20%, rgba(251,146,60,0.26), transparent 28%),
            radial-gradient(circle at 85% 65%, rgba(253,224,71,0.22), transparent 30%);
          filter: blur(24px);
        }

        .bar-female {
          background: #b87963;
        }

        .bar-male {
          background: #6f7f5f;
        }

        .school-card-size {
          width: min(100%, 440px);
        }

        .carousel-stage {
          height: 500px;
          max-width: 760px;
        }

        .carousel-card-position {
          position: absolute;
          left: 50%;
          top: 0;
          width: min(100%, 440px);
          transform-origin: center center;
          transition:
            transform 520ms ease,
            opacity 520ms ease,
            filter 520ms ease;
        }

        .carousel-card-active {
          z-index: 20;
          opacity: 1;
          filter: blur(0);
          pointer-events: auto;
          transform: translateX(-50%) scale(1);
        }

        .carousel-card-left {
          z-index: 10;
          opacity: 0.42;
          filter: blur(3px);
          pointer-events: none;
          transform: translateX(-118%) scale(0.88);
        }

        .carousel-card-right {
          z-index: 10;
          opacity: 0.42;
          filter: blur(3px);
          pointer-events: none;
          transform: translateX(18%) scale(0.88);
        }

        .carousel-card-hidden {
          opacity: 0;
          pointer-events: none;
          filter: blur(6px);
          transform: translateX(-50%) scale(0.82);
        }

        .data-course-list {
          max-height: 300px;
        }

        @media (min-width: 768px) {
          .school-card-size {
            width: 440px;
          }
        }

        @media (max-width: 640px) {
          .carousel-stage {
            height: 520px;
          }

          .carousel-card-left {
            transform: translateX(-106%) scale(0.84);
          }

          .carousel-card-right {
            transform: translateX(6%) scale(0.84);
          }
        }


        .site-zoom-90 {
          zoom: 0.9;
        }

        @supports not (zoom: 0.9) {
          .site-zoom-90 {
            transform: scale(0.9);
            transform-origin: top center;
            width: 111.111%;
            margin-left: -5.555%;
          }
        }

        .strategy-command-card,
        .strategy-profile-card,
        .strategy-control-bank {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255, 247, 237, 0.96), rgba(255, 255, 255, 0.94)),
            radial-gradient(circle at 12% 0%, rgba(251, 146, 60, 0.18), transparent 34%);
        }

        .strategy-command-card::before,
        .strategy-profile-card::before,
        .strategy-control-bank::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(154, 52, 18, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 52, 18, 0.055) 1px, transparent 1px);
          background-size: 18px 18px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 84%);
        }

        .strategy-preset,
        .strategy-reset,
        .strategy-token {
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 3px 10px rgba(154, 52, 18, 0.08);
        }

        .strategy-preset::after,
        .strategy-reset::after,
        .strategy-token::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: translateX(-120%);
          transition: transform 500ms ease;
        }

        .strategy-preset:hover::after,
        .strategy-reset:hover::after,
        .strategy-token:hover::after {
          transform: translateX(120%);
        }

        .strategy-control-bank {
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.55), 0 8px 18px rgba(154, 52, 18, 0.07);
        }

        .strategy-bank-icon {
          color: #ffffff;
          background: linear-gradient(135deg, #f97316, #9a3412);
          box-shadow: 0 5px 12px rgba(154, 52, 18, 0.18);
        }

        .strategy-positive .strategy-bank-icon,
        .strategy-positive .strategy-mini-energy {
          background: linear-gradient(135deg, #22c55e, #15803d);
        }

        .strategy-negative .strategy-bank-icon,
        .strategy-negative .strategy-mini-energy {
          background: linear-gradient(135deg, #fb923c, #c2410c);
        }

        .strategy-mixed .strategy-bank-icon,
        .strategy-mixed .strategy-mini-energy {
          background: linear-gradient(135deg, #38bdf8, #0369a1);
        }

        .strategy-bank-level,
        .strategy-level-badge {
          color: #7c2d12;
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(251, 146, 60, 0.32);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .strategy-slider-card {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255, 247, 237, 0.88), rgba(255, 255, 255, 0.86));
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .strategy-slider-card:hover {
          transform: translateY(-1px);
          border-color: rgba(249, 115, 22, 0.45);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 6px 16px rgba(154, 52, 18, 0.10);
        }

        .survey-range {
          -webkit-appearance: none;
          appearance: none;
          height: 0.76rem;
          cursor: pointer;
          background: transparent;
          accent-color: #ea580c;
          --value: 50%;
        }

        .survey-range::-webkit-slider-runnable-track {
          height: 0.3rem;
          border-radius: 999px;
          background:
            linear-gradient(90deg, #f97316 0%, #fb923c var(--value), #fed7aa var(--value), #ffedd5 100%);
          box-shadow: inset 0 1px 2px rgba(154, 52, 18, 0.18), 0 0 0 1px rgba(251, 146, 60, 0.16);
        }

        .survey-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 0.68rem;
          width: 0.98rem;
          margin-top: -0.19rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #fff7ed, #f97316 45%, #9a3412);
          border: 1.5px solid #ffffff;
          box-shadow: 0 2px 6px rgba(154, 52, 18, 0.35), 0 0 0 2px rgba(251, 146, 60, 0.12);
        }

        .survey-range::-moz-range-track {
          height: 0.3rem;
          border-radius: 999px;
          background:
            linear-gradient(90deg, #f97316 0%, #fb923c var(--value), #fed7aa var(--value), #ffedd5 100%);
          box-shadow: inset 0 1px 2px rgba(154, 52, 18, 0.18), 0 0 0 1px rgba(251, 146, 60, 0.16);
        }

        .survey-range::-moz-range-thumb {
          height: 0.68rem;
          width: 0.98rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #fff7ed, #f97316 45%, #9a3412);
          border: 1.5px solid #ffffff;
          box-shadow: 0 2px 6px rgba(154, 52, 18, 0.35), 0 0 0 2px rgba(251, 146, 60, 0.12);
        }


        .scenario-map-field {
          background:
            radial-gradient(circle at 50% 48%, rgba(255,255,255,0.88), rgba(255,247,237,0.52) 28%, transparent 48%),
            radial-gradient(circle at 72% 22%, rgba(255, 237, 213, 0.95), transparent 30%),
            linear-gradient(135deg, #fff7ed, #fed7aa 48%, #ffedd5);
        }

        .scenario-map-grid {
          background-image:
            linear-gradient(to right, rgba(154, 52, 18, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(154, 52, 18, 0.08) 1px, transparent 1px),
            radial-gradient(circle, rgba(154,52,18,0.12) 1px, transparent 1.2px);
          background-size: 34px 34px, 34px 34px, 18px 18px;
          mask-image: radial-gradient(circle at 50% 52%, black 0%, black 72%, transparent 100%);
        }

        .scenario-map-vignette {
          background:
            linear-gradient(to bottom, rgba(255,255,255,0.22), transparent 22%, rgba(154,52,18,0.08)),
            radial-gradient(circle at 50% 55%, transparent 0%, transparent 48%, rgba(124,45,18,0.12) 100%);
        }

        .scenario-map-link {
          filter: drop-shadow(0 2px 4px rgba(154, 52, 18, 0.16));
          transition: stroke-opacity 500ms ease, stroke-width 500ms ease;
        }

        .scenario-node {
          position: absolute;
          z-index: 20;
          width: 8.6rem;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,255,255,0.72);
          border-radius: 1.25rem;
          padding: 0.5rem;
          background: rgba(255,255,255,0.82);
          box-shadow: 0 10px 24px rgba(154, 52, 18, 0.12), inset 0 1px 0 rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          transition: transform 240ms ease, box-shadow 240ms ease, opacity 240ms ease, filter 240ms ease;
        }

        .scenario-node:hover {
          transform: translate(-50%, -50%) scale(1.04);
          box-shadow: 0 14px 30px rgba(154, 52, 18, 0.18), 0 0 0 1px rgba(249,115,22,0.16);
        }

        .scenario-node-low {
          opacity: 0.58;
          filter: saturate(0.72);
        }

        .scenario-node-mid {
          opacity: 0.88;
        }

        .scenario-node-high {
          opacity: 1;
          box-shadow: 0 16px 34px rgba(154, 52, 18, 0.18), 0 0 24px rgba(249, 115, 22, 0.22);
        }

        .scenario-node-token {
          display: flex;
          height: 2.2rem;
          min-width: 2.2rem;
          align-items: center;
          justify-content: center;
          border-radius: 0.85rem;
          color: white;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--node-color), #7c2d12);
          box-shadow: 0 6px 14px rgba(154, 52, 18, 0.18);
        }

        .scenario-node-glow {
          position: absolute;
          inset: -1rem;
          z-index: 0;
          border-radius: 1.6rem;
          background: radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.24), transparent 66%);
          opacity: var(--node-glow, 0.42);
          pointer-events: none;
        }

        .visitor-form-panel {
          max-height: 80vh;
        }

        .hide-scrollbar {
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes floatOrb1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(24px, -18px, 0) scale(1.08); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-28px, 20px, 0) scale(0.94); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(18px, 26px, 0) scale(1.06); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(22px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(234, 88, 12, 0.18); }
          50% { box-shadow: 0 0 30px rgba(234, 88, 12, 0.18); }
        }
      `}</style>
    </>
  );
}

export default function GenderBiasCourseSelectionWebsite() {
  const [lang, setLang] = useState("en");
  const [showGate, setShowGate] = useState(false);
  const [gateMode, setGateMode] = useState("choice");
  const [visitorPromptTriggered, setVisitorPromptTriggered] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState({
    school: "",
    grade: "",
    curriculum: "",
    gender: "",
    consent: false,
  });
  const [feedbackMode, setFeedbackMode] = useState("comment");
  const [feedbackForm, setFeedbackForm] = useState({
    message: "",
    school: "",
    grade: "",
    anonymous: true,
  });
  const [reflectionSurvey, setReflectionSurvey] = useState({
    selectedCourses: [],
    factors: {
      interest: 3,
      grades: 3,
      university: 3,
      parents: 3,
      teachers: 3,
      friends: 3,
      difficulty: 3,
      entry: 3,
      stereotype: 3,
    },
    statements: {
      subjectGender: 3,
      confidence: 3,
      minority: 3,
      equalEncouragement: 3,
    },
    reflection: "",
  });
  const [submitState, setSubmitState] = useState("idle");
  const [dataView, setDataView] = useState("subject");

  const t = translations[lang];
  const toggleLanguage = () => setLang((prev) => (prev === "en" ? "zh" : "en"));

  const allCourseRecords = useMemo(
    () =>
      courseData.flatMap((course) =>
        course.records.map((record) => ({
          ...record,
          subject: course.courseCategory,
        })),
      ),
    [],
  );

  const groupRecordsBy = (records, key) => {
    const grouped = records.reduce((acc, record) => {
      const value = record[key] || t.notSpecified;
      if (!acc[value]) acc[value] = [];
      acc[value].push(record);
      return acc;
    }, {});

    return Object.entries(grouped).map(([title, records]) => ({ title, records }));
  };

  const dataViewOptions = [
    { id: "subject", label: t.viewBySubject },
    { id: "school", label: t.viewBySchool },
    { id: "system", label: t.viewBySystem },
    { id: "category", label: t.viewByCategory },
  ];

  const getSubjectCategory = (subject) => {
    if (["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"].includes(subject)) {
      return t.categoryStem;
    }
    if (["Philosophy", "Geography"].includes(subject)) {
      return t.categoryHumanities;
    }
    if (["Economics"].includes(subject)) {
      return t.categorySocialScience;
    }
    if (["Business"].includes(subject)) {
      return t.categoryBusiness;
    }
    return t.notSpecified;
  };

  const dataCards = useMemo(() => {
    if (dataView === "school") {
      return groupRecordsBy(allCourseRecords, "school").map((group) => ({
        ...group,
        label: t.schoolLabel,
      }));
    }

    if (dataView === "system") {
      return groupRecordsBy(allCourseRecords, "system").map((group) => ({
        ...group,
        label: t.courseSystem,
      }));
    }

    if (dataView === "category") {
      const recordsWithCategory = allCourseRecords.map((record) => ({
        ...record,
        category: getSubjectCategory(record.subject),
      }));
      return groupRecordsBy(recordsWithCategory, "category").map((group) => ({
        ...group,
        label: t.viewByCategory,
      }));
    }

    return courseData.map((course) => ({
      title: course.courseCategory,
      label: t.subjectLabel,
      records: course.records,
    }));
  }, [allCourseRecords, dataView, t]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleVisitorInfoChange = (field, value) => {
    setVisitorInfo((prev) => ({ ...prev, [field]: value }));
  };

  const canContinue =
    visitorInfo.school.trim() !== "" &&
    visitorInfo.grade.trim() !== "" &&
    visitorInfo.curriculum.trim() !== "" &&
    visitorInfo.gender.trim() !== "" &&
    visitorInfo.consent;

  const maxFeedbackLength = 280;
  const feedbackLength = feedbackForm.message.length;
  const feedbackRemaining = maxFeedbackLength - feedbackLength;
  const canSubmitComment = feedbackLength > 0 && feedbackLength <= maxFeedbackLength;
  const canSubmitSurvey = reflectionSurvey.selectedCourses.length > 0 || reflectionSurvey.reflection.trim() !== "";
  const canSubmitFeedback = feedbackMode === "comment" ? canSubmitComment : canSubmitSurvey;

  const surveyCourseOptions = [
    { id: "mathematics", label: t.courseMathematics },
    { id: "physics", label: t.coursePhysics },
    { id: "chemistry", label: t.courseChemistry },
    { id: "biology", label: t.courseBiology },
    { id: "computerScience", label: t.courseComputerScience },
    { id: "economics", label: t.courseEconomics },
    { id: "business", label: t.courseBusiness },
    { id: "geography", label: t.courseGeography },
    { id: "philosophy", label: t.coursePhilosophy },
    { id: "other", label: t.courseOther },
  ];

  const factorItems = [
    ["interest", t.factorInterest],
    ["grades", t.factorGrades],
    ["university", t.factorUniversity],
    ["parents", t.factorParents],
    ["teachers", t.factorTeachers],
    ["friends", t.factorFriends],
    ["difficulty", t.factorDifficulty],
    ["entry", t.factorEntry],
    ["stereotype", t.factorStereotype],
  ];

  const statementItems = [
    ["subjectGender", t.statementSubjectGender],
    ["confidence", t.statementConfidence],
    ["minority", t.statementMinority],
    ["equalEncouragement", t.statementEqualEncouragement],
  ];

  const toggleSurveyCourse = (course) => {
    setReflectionSurvey((prev) => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(course)
        ? prev.selectedCourses.filter((item) => item !== course)
        : [...prev.selectedCourses, course],
    }));
  };

  const handleSurveyScaleChange = (section, field, value) => {
    setReflectionSurvey((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: Number(value),
      },
    }));
  };

  const handleFeedbackChange = (field, value) => {
    setFeedbackForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "anonymous" && value ? { school: "", grade: "" } : {}),
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!canSubmitFeedback) return;

    setSubmitState("success");
    setFeedbackForm({
      message: "",
      school: "",
      grade: "",
      anonymous: true,
    });
    setReflectionSurvey({
      selectedCourses: [],
      factors: {
        interest: 3,
        grades: 3,
        university: 3,
        parents: 3,
        teachers: 3,
        friends: 3,
        difficulty: 3,
        entry: 3,
        stereotype: 3,
      },
      statements: {
        subjectGender: 3,
        confidence: 3,
        minority: 3,
        equalEncouragement: 3,
      },
      reflection: "",
    });
  };

  useEffect(() => {
    if (visitorPromptTriggered) return;

    const triggerVisitorPromptAfterModelSection = () => {
      const modelSection = document.getElementById("model-explanation");
      if (!modelSection) return;

      const rect = modelSection.getBoundingClientRect();
      const hasFinishedModelSection = rect.bottom < window.innerHeight * 0.78;

      if (hasFinishedModelSection) {
        setGateMode("choice");
        setShowGate(true);
        setVisitorPromptTriggered(true);
      }
    };

    window.addEventListener("scroll", triggerVisitorPromptAfterModelSection, { passive: true });
    window.addEventListener("resize", triggerVisitorPromptAfterModelSection);
    triggerVisitorPromptAfterModelSection();

    return () => {
      window.removeEventListener("scroll", triggerVisitorPromptAfterModelSection);
      window.removeEventListener("resize", triggerVisitorPromptAfterModelSection);
    };
  }, [visitorPromptTriggered]);

  useEffect(() => {
    if (submitState !== "success") return;
    const timer = window.setTimeout(() => setSubmitState("idle"), 3000);
    return () => window.clearTimeout(timer);
  }, [submitState]);

  return (
    <div className="site-zoom-90 relative min-h-screen overflow-hidden gender-page-bg text-neutral-800">
      <FloatingBackground />

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-orange-200 gate-card-bg p-5 shadow-2xl md:p-6">
            <div className="mb-4 flex justify-end">
              <LanguageToggle lang={lang} onToggle={toggleLanguage} />
            </div>
            {gateMode === "choice" ? (
              <VisitorChoice
                t={t}
                onAnonymous={() => setShowGate(false)}
                onSurvey={() => setGateMode("survey")}
              />
            ) : (
              <VisitorForm
                t={t}
                visitorInfo={visitorInfo}
                onChange={handleVisitorInfoChange}
                canContinue={canContinue}
                onBack={() => setGateMode("choice")}
                onContinue={() => setShowGate(false)}
              />
            )}
          </div>
        </div>
      )}

      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-orange-300/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">
              {t.siteTitle}
            </h1>
            <p className="text-sm text-neutral-600">{t.siteSubtitle}</p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-orange-200 hover:text-orange-900"
              >
                {t[item.labelKey]}
              </button>
            ))}
            <LanguageToggle lang={lang} onToggle={toggleLanguage} />
          </div>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-32 md:pb-24 md:pt-36">
        <div className="flex items-start justify-center animate-fade-up-custom">
          <div className="flex flex-col justify-center">
            <h2 className="max-w-3xl text-4xl font-bold leading-tight text-neutral-900 md:text-6xl">
              <span className="hero-title-gradient">
                {t.heroTitle}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-800">
              {t.heroDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("intro")}
                className="animate-pulse-glow-custom rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                {t.exploreProject}
              </button>
              <button
                onClick={() => scrollToSection("data")}
                className="rounded-2xl border border-orange-400 bg-white px-6 py-3 text-sm font-semibold text-orange-900 transition hover:bg-orange-100"
              >
                {t.viewData}
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-7xl space-y-10 px-6 pb-16 md:space-y-14 md:pb-24">
        <section
          id="intro"
          className="scroll-mt-28 rounded-3xl border border-orange-300/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-10"
        >
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
              {t.introLabel}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
              {t.introTitle}
            </h3>
            <p className="mt-5 leading-8 text-neutral-800">{t.introP1}</p>
            <p className="mt-4 leading-8 text-neutral-800">{t.introP2}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                1
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">{t.introBackgroundTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-neutral-800">{t.introBackgroundText}</p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                2
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">{t.introCommonTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-neutral-800">{t.introCommonText}</p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-700 text-sm font-bold text-white">
                3
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">{t.introLimitTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-neutral-800">{t.introLimitText}</p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-700 text-sm font-bold text-white">
                4
              </div>
              <h4 className="text-lg font-semibold text-neutral-900">{t.introQuestionTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-neutral-800">{t.introQuestionText}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-orange-200 bg-white/80 px-5 py-4 text-xs leading-6 text-neutral-600">
            {t.introCitation}
          </div>
        </section>

        <section
          id="data"
          className="scroll-mt-28 rounded-3xl border border-orange-300/70 bg-white/40 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-10"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
              {t.dataLabel}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-neutral-900">{t.dataTitle}</h3>
            <p className="mt-4 leading-8 text-neutral-800">{t.dataDesc}</p>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-white/70 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-800">
                {t.filterLabel}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {dataCards.length} {t.cardsShown}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {dataViewOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDataView(option.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    dataView === option.id
                      ? "border-orange-600 bg-orange-600 text-white shadow-sm"
                      : "border-orange-200 bg-white text-orange-900 hover:bg-orange-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <CourseDataCarousel cards={dataCards} t={t} />

          <p className="mt-4 text-xs font-medium text-neutral-600">{t.swipeHint}</p>
        </section>

        <section
          id="findings"
          className="scroll-mt-28 rounded-3xl border border-orange-300/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-10"
        >
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
              {t.keyFindingsLabel}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-neutral-900">
              {t.keyFindingsTitle}
            </h3>
            <p className="mt-4 leading-8 text-neutral-800">{t.keyFindingsDesc}</p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {t.keyFindings.map((finding, index) => (
              <div
                key={finding.title}
                className="rounded-2xl border border-orange-200 bg-orange-50/80 p-5"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">{finding.title}</h4>
                <p className="mt-2 text-sm leading-7 text-neutral-800">{finding.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="limitation"
          className="scroll-mt-28 rounded-3xl border border-orange-300/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
                {t.datasetLimitationLabel}
              </p>
              <h3 className="mt-3 text-3xl font-bold text-neutral-900">
                {t.datasetLimitationTitle}
              </h3>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-5 text-sm leading-7 text-neutral-800">
              {t.datasetLimitationDesc}
            </div>
          </div>
        </section>

        <NewsEvidenceSection t={t} />

        <BiasSimulator t={t} />

        <ModelExplanationSection t={t} />

        <section
          id="feedback"
          className="scroll-mt-28 rounded-3xl border border-orange-300/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:p-10"
        >
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
              {t.feedbackLabel}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-neutral-900">
              {t.feedbackTitle}
            </h3>
            <p className="mt-4 leading-8 text-neutral-800">{t.feedbackDesc}</p>

            <div className="mt-6 inline-flex rounded-2xl border border-orange-200 bg-orange-50 p-1">
              <button
                type="button"
                onClick={() => setFeedbackMode("comment")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  feedbackMode === "comment"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-orange-900 hover:bg-white"
                }`}
              >
                {t.commentMode}
              </button>
              <button
                type="button"
                onClick={() => setFeedbackMode("survey")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  feedbackMode === "survey"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-orange-900 hover:bg-white"
                }`}
              >
                {t.surveyMode}
              </button>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleFeedbackSubmit}>
              {feedbackMode === "comment" ? (
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label className="block text-sm font-semibold text-neutral-800">
                      {t.commentLabel}
                    </label>
                    <span
                      className={`text-xs font-medium ${
                        feedbackRemaining < 0 ? "text-red-600" : "text-neutral-500"
                      }`}
                    >
                      {feedbackLength}/{maxFeedbackLength}
                    </span>
                  </div>
                  <textarea
                    value={feedbackForm.message}
                    onChange={(e) => handleFeedbackChange("message", e.target.value)}
                    placeholder={t.commentPlaceholder}
                    className="w-full min-h-[120px] rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
                  />
                  <p className="mt-2 text-xs leading-6 text-neutral-500">{t.commentHelp}</p>
                </div>
              ) : (
                <div className="space-y-6 rounded-3xl border border-orange-200 bg-orange-50/60 p-5">
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900">{t.selectedCourses}</h4>
                    <p className="mt-1 text-xs text-neutral-500">{t.selectedCoursesHelp}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {surveyCourseOptions.map((course) => {
                        const selected = reflectionSurvey.selectedCourses.includes(course.id);
                        return (
                          <button
                            key={course.id}
                            type="button"
                            onClick={() => toggleSurveyCourse(course.id)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                              selected
                                ? "border-orange-600 bg-orange-600 text-white"
                                : "border-orange-200 bg-white text-neutral-700 hover:bg-orange-100"
                            }`}
                          >
                            {course.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-neutral-900">{t.influencingFactors}</h4>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {factorItems.map(([key, label]) => (
                        <label key={key} className="rounded-2xl border border-orange-100 bg-white p-3">
                          <div className="flex items-center justify-between gap-3 text-sm font-medium text-neutral-800">
                            <span>{label}</span>
                            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-900">
                              {reflectionSurvey.factors[key]}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.01"
                            value={reflectionSurvey.factors[key]}
                            onChange={(e) => handleSurveyScaleChange("factors", key, e.target.value)}
                            className="survey-range mt-1.5 w-full"
                          />
                          <div className="mt-1 flex justify-between text-[11px] text-neutral-500">
                            <span>{t.scaleLow}</span>
                            <span>{t.scaleHigh}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-neutral-900">{t.biasPerception}</h4>
                    <div className="mt-3 space-y-3">
                      {statementItems.map(([key, label]) => (
                        <label key={key} className="block rounded-2xl border border-orange-100 bg-white p-3">
                          <div className="flex items-start justify-between gap-3 text-sm font-medium text-neutral-800">
                            <span>{label}</span>
                            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-900">
                              {reflectionSurvey.statements[key]}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.01"
                            value={reflectionSurvey.statements[key]}
                            onChange={(e) => handleSurveyScaleChange("statements", key, e.target.value)}
                            className="survey-range mt-1.5 w-full"
                          />
                          <div className="mt-1 flex justify-between text-[11px] text-neutral-500">
                            <span>{t.stronglyDisagree}</span>
                            <span>{t.stronglyAgree}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-800">
                      {t.openReflection}
                    </label>
                    <textarea
                      value={reflectionSurvey.reflection}
                      onChange={(e) =>
                        setReflectionSurvey((prev) => ({ ...prev, reflection: e.target.value }))
                      }
                      placeholder={t.openReflectionPlaceholder}
                      className="w-full min-h-[110px] rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              <label className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm leading-7 text-neutral-800">
                <input
                  type="checkbox"
                  checked={feedbackForm.anonymous}
                  onChange={(e) => handleFeedbackChange("anonymous", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-orange-600"
                />
                <span>{t.anonymousFeedback}</span>
              </label>

              {!feedbackForm.anonymous && (
                <div className="flex flex-wrap gap-4">
                  <input
                    value={feedbackForm.school}
                    onChange={(e) => handleFeedbackChange("school", e.target.value)}
                    placeholder={t.schoolName}
                    className="min-w-[200px] flex-1 rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
                  />
                  <input
                    value={feedbackForm.grade}
                    onChange={(e) => handleFeedbackChange("grade", e.target.value)}
                    placeholder={t.gradeLevel}
                    className="min-w-[120px] flex-1 rounded-2xl border border-orange-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-orange-500"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={!canSubmitFeedback}
                  className="rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-orange-300"
                >
                  {t.submit}
                </button>
                {submitState === "success" && (
                  <div className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                    {t.submitted}
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
