import React, { useEffect, useMemo, useState } from "react";

const courseData = [
  {
    courseCategory: "Mathematics",
    records: [
      { school: "WLSA", courseName: "Calculus BC", male: 19, female: 12, grade: "10", system: "AP", classCount: 2 },
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
      { school: "WLSA", courseName: "AP Physics", male: 41, female: 14, grade: "10", system: "AP", classCount: 2 },
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
      { school: "光华剑桥", courseName: "Business", male: 13, female: 39, grade: "10", system: "A-Level", classCount: null, noteKey: "guanghuaGradeBalance" },
    ],
  },
  {
    courseCategory: "Geography",
    records: [
      { school: "光华剑桥", courseName: "Geography", male: 8, female: 12, grade: null, system: "A-Level", classCount: null, noteKey: "guanghuaGradeBalance" },
    ],
  },
];

const navItems = [
  { id: "intro", labelKey: "navIntro" },
  { id: "data", labelKey: "navData" },
  { id: "simulator", labelKey: "navSimulator" },
  { id: "feedback", labelKey: "navFeedback" },
];

const translations = {
  en: {
    langButton: "中文",
    siteTitle: "Course Choice Equity",
    siteSubtitle: "Gender Bias in Course Selection",
    navIntro: "Project Introduction",
    navData: "Data Display",
    navSimulator: "Bias Simulator",
    navFeedback: "Feedback",
    welcome: "Welcome",
    gateTitle: "Before entering the website",
    gateDescription:
      "Please choose whether you would like to browse anonymously or first complete a short visitor form.",
    anonymousTitle: "Browse Anonymously",
    anonymousDesc: "Enter the website directly without providing any personal details.",
    formEntryTitle: "Fill in the Form",
    formEntryDesc: "Answer three quick questions, then continue browsing.",
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
    simulatorLabel: "Interactive Prototype",
    simulatorTitle: "Course Choice Bias Simulator",
    simulatorDesc:
      "This prototype shows how several social and academic factors may shape a student's willingness to choose a course. The result is not a real prediction yet; it will become more reliable after survey data is collected.",
    simulatorIndex: "Equitable Course Choice Index",
    simulatorLow: "Higher bias pressure",
    simulatorHigh: "More open course choice",
    simulatorNotice:
      "Prototype only: the current weights are illustrative. After collecting survey responses, this model can be recalibrated using real data.",
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
    simBiologyPlant: "Biology plant",
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
    navSimulator: "偏见模拟器",
    navFeedback: "反馈",
    welcome: "欢迎",
    gateTitle: "进入网站前",
    gateDescription: "请选择匿名浏览，或先填写一个简短问卷。",
    anonymousTitle: "匿名浏览",
    anonymousDesc: "不填写个人信息，直接进入网站。",
    formEntryTitle: "填写问卷",
    formEntryDesc: "回答三个简单问题后继续浏览。",
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
    simulatorLabel: "互动原型",
    simulatorTitle: "选课偏见模拟器",
    simulatorDesc:
      "这个原型展示多个学术与社会因素可能如何影响学生选择某门课程的意愿。当前结果还不是真实预测；等问卷数据收集后，可以用真实数据重新校准模型权重。",
    simulatorIndex: "公平选课倾向指数",
    simulatorLow: "偏见压力较高",
    simulatorHigh: "选课环境更开放",
    simulatorNotice:
      "原型说明：当前权重仅用于演示。收集问卷数据后，可以根据真实回答重新调整模型。",
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
    simBiologyPlant: "生物植物",
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

        <div className="flex flex-wrap gap-2">
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
  const brightRoom = openExploration >= 65;
  const pressureDominant = pressureScore > supportScore;

  const revealStyle = (score, threshold = 55, delay = 0) => {
    const visible = score >= threshold;
    return {
      opacity: visible ? 1 : 0.06,
      transform: visible
        ? "translate3d(0,0,0) scale(1)"
        : "translate3d(0,14px,0) scale(0.92)",
      filter: visible ? "blur(0px)" : "blur(4px)",
      transition:
        "opacity 700ms ease, transform 850ms cubic-bezier(0.22, 1, 0.36, 1), filter 800ms ease, box-shadow 700ms ease",
      transitionDelay: `${delay}ms`,
    };
  };

  const glowStyle = (score, threshold = 75) => ({
    boxShadow:
      score >= threshold
        ? "0 14px 28px rgba(120, 53, 15, 0.22)"
        : "0 6px 14px rgba(120, 53, 15, 0.10)",
  });

  const avatarPalette =
    scenarioGender === "female"
      ? {
          shirt: pressureDominant ? "bg-rose-500" : "bg-rose-400",
          hair: "bg-amber-950",
          accent: "bg-rose-200",
          bodyShape: "rounded-t-[2rem]",
        }
      : scenarioGender === "male"
        ? {
            shirt: pressureDominant ? "bg-sky-600" : "bg-sky-500",
            hair: "bg-neutral-800",
            accent: "bg-sky-200",
            bodyShape: "rounded-t-[1.25rem]",
          }
        : {
            shirt: pressureDominant ? "bg-violet-600" : "bg-violet-500",
            hair: "bg-neutral-700",
            accent: "bg-violet-200",
            bodyShape: "rounded-t-[1.5rem]",
          };

  return (
    <div className="rounded-3xl border border-orange-200 bg-white p-5 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
            {t.simSceneTitle}
          </p>
          <p className="mt-1 text-xs leading-6 text-neutral-500">{t.simSceneHint}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-900">
            {openExploration}/100
          </span>
          <span className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
            {scenarioGender === "female" ? t.female : scenarioGender === "male" ? t.male : t.nonBinary}
          </span>
        </div>
      </div>

      <div
        className={`relative mt-4 h-[540px] overflow-hidden rounded-2xl border border-orange-100 transition-all duration-700 ${
          brightRoom
            ? "bg-gradient-to-b from-amber-50 via-orange-50 to-orange-100"
            : "bg-gradient-to-b from-orange-100 via-orange-100 to-orange-200"
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-40 bg-orange-200" />
        <div className="absolute inset-x-0 bottom-40 h-[2px] bg-orange-300" />
        <div className="absolute inset-x-0 bottom-0 h-40 room-floor-grid opacity-60" />
        <div className="absolute bottom-8 left-16 right-16 h-16 rounded-full bg-orange-300/30 blur-2xl" />

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            pressureDominant ? "bg-orange-900/10" : "bg-transparent"
          }`}
        />

        <div className="absolute left-6 top-8 h-36 w-32 rounded-xl border-4 border-orange-200 bg-sky-100 shadow-inner">
          <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-orange-200" />
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-orange-200" />
          <div className="absolute -right-2 top-6 h-24 w-3 rounded-full bg-orange-100/90" />
          <div
            className="absolute left-4 top-5 h-10 w-10 rounded-full bg-yellow-300/80 blur-sm transition-all duration-700"
            style={{ opacity: brightRoom ? 1 : 0.3 }}
          />
        </div>

        <div
          className="absolute left-12 top-36 h-44 w-72 rotate-12 bg-yellow-100/60 blur-2xl transition-all duration-700"
          style={{ opacity: brightRoom ? 1 : 0.18 }}
        />

        <div className="absolute left-44 top-10 h-14 w-14 rounded-full border-4 border-orange-200 bg-white shadow">
          <div className="absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-full bg-orange-500" />
          <div className="absolute left-1/2 top-1/2 h-[2px] w-4 bg-orange-500" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500" />
        </div>

        <div className="absolute right-6 top-7 h-[8rem] w-[11rem] rounded-2xl border border-orange-200 bg-white/90 p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700">Board</span>
            <span className="h-2 w-2 rounded-full bg-orange-300" />
          </div>
          <div style={revealStyle(courseScores.physics, 48, 80)}>
            <div className="text-sm font-bold text-neutral-800">F = ma</div>
            <div className="mt-1 h-1.5 w-24 rounded bg-orange-200" />
          </div>
          <div className="mt-3" style={revealStyle(courseScores.mathematics, 48, 140)}>
            <div className="text-sm font-bold text-neutral-800">∫ f(x) dx</div>
            <div className="mt-1 h-1.5 w-20 rounded bg-orange-200" />
          </div>
          <div className="mt-3" style={revealStyle(courseScores.economics, 46, 220)}>
            <div className="h-1.5 w-16 rounded bg-green-200" />
            <div className="mt-1 flex h-7 items-end gap-1">
              <span className="h-2 w-2 rounded bg-orange-300" />
              <span className="h-4 w-2 rounded bg-orange-400" />
              <span className="h-6 w-2 rounded bg-green-500" />
              <span className="h-5 w-2 rounded bg-amber-500" />
            </div>
          </div>
        </div>

        <div className="absolute right-8 top-52 h-3 w-[12.5rem] rounded bg-orange-300 shadow-sm" />
        <div className="absolute right-[7.25rem] top-[13.2rem] h-11 w-14 rounded-lg border border-orange-200 bg-white shadow-sm" />

        <div
          className="absolute right-16 top-[8.8rem] flex items-end gap-1"
          style={{ ...revealStyle(courseScores.philosophy, 45, 120), ...glowStyle(courseScores.philosophy) }}
        >
          <div className="h-9 w-4 rounded bg-orange-400" />
          <div className="h-12 w-4 rounded bg-amber-500" />
          <div className="h-8 w-4 rounded bg-yellow-600" />
          <div className="h-11 w-4 rounded bg-stone-500" />
          <div className="h-10 w-4 rounded bg-orange-700" />
        </div>

        <div
          className="absolute right-14 top-[15.1rem] rounded-xl border border-orange-200 bg-white/85 px-3 py-2 text-xs font-semibold text-neutral-800"
          style={{ ...revealStyle(courseScores.geography, 50, 170), ...glowStyle(courseScores.geography) }}
        >
          <div className="text-[10px] text-neutral-500">{t.courseGeography}</div>
          <div className="mt-1 h-10 w-16 rounded-full border-2 border-sky-300 bg-sky-100">
            <div className="ml-2 mt-2 h-3 w-8 rounded-full bg-green-400" />
            <div className="ml-7 mt-1 h-2 w-5 rounded-full bg-green-500" />
          </div>
        </div>

        <div
          className="absolute left-8 top-[14rem] rounded-xl border border-orange-200 bg-white/85 px-3 py-2"
          style={{ ...revealStyle(courseScores.chemistry, 50, 150), ...glowStyle(courseScores.chemistry) }}
        >
          <div className="text-[10px] font-semibold text-neutral-500">{t.courseChemistry}</div>
          <div className="mt-2 flex items-end gap-2">
            <div className="h-10 w-5 rounded-b-full border border-orange-300 bg-amber-100" />
            <div className="h-8 w-5 rounded-b-full border border-orange-300 bg-green-100" />
            <div className="h-6 w-6 rounded-full border border-orange-300 bg-sky-100" />
          </div>
        </div>

        <div
          className="absolute left-[8.5rem] top-[14.4rem]"
          style={{ ...revealStyle(courseScores.biology, 48, 200), ...glowStyle(courseScores.biology) }}
        >
          <div className="relative mx-auto h-11 w-14">
            <div className="absolute left-2 top-4 h-5 w-8 -rotate-12 rounded-full bg-green-500" />
            <div className="absolute right-1 top-0 h-6 w-8 rotate-12 rounded-full bg-green-600" />
            <div className="absolute left-1/2 top-5 h-7 w-[3px] -translate-x-1/2 bg-green-800" />
          </div>
          <div className="mx-auto h-6 w-10 rounded-b-full bg-orange-500" />
        </div>

        <div
          className="absolute left-[3rem] top-[19rem] rounded-xl border border-orange-200 bg-white/85 px-3 py-2"
          style={{ ...revealStyle(courseScores.business, 46, 190), ...glowStyle(courseScores.business) }}
        >
          <div className="text-[10px] font-semibold text-neutral-500">{t.courseBusiness}</div>
          <div className="mt-2 h-8 w-14 rounded-md border border-orange-300 bg-amber-100 shadow-sm">
            <div className="ml-2 h-2.5 w-6 rounded-b bg-amber-200" />
            <div className="mx-2 mt-2 h-1 rounded bg-orange-300" />
            <div className="mx-2 mt-1 h-1 rounded bg-orange-200" />
          </div>
        </div>

        <div
          className="absolute left-[9.2rem] top-[18.7rem] rounded-xl border border-orange-200 bg-white/85 px-3 py-2"
          style={{ ...revealStyle(courseScores.economics, 48, 240), ...glowStyle(courseScores.economics) }}
        >
          <div className="text-[10px] font-semibold text-neutral-500">{t.courseEconomics}</div>
          <div className="mt-2 flex h-8 items-end gap-1">
            <span className="h-3 w-2 rounded bg-orange-300" />
            <span className="h-5 w-2 rounded bg-orange-500" />
            <span className="h-7 w-2 rounded bg-green-500" />
            <span className="h-6 w-2 rounded bg-amber-500" />
          </div>
        </div>

        <div className="absolute left-[2rem] bottom-[7.25rem] h-24 w-12 rounded-2xl border border-orange-300 bg-orange-100 shadow-sm">
          <div className="mt-5 h-7 w-7 rounded-full bg-orange-300/70 mx-auto" />
          <div className="mt-4 h-1.5 w-7 rounded-full bg-orange-200 mx-auto" />
        </div>

        <div className="absolute left-[4.75rem] bottom-[7.5rem] h-3 w-28 rounded bg-orange-300 shadow-sm" />
        <div className="absolute left-[6.6rem] bottom-[4.6rem] h-12 w-4 rounded bg-orange-400" />
        <div className="absolute left-[11.05rem] bottom-[4.6rem] h-12 w-4 rounded bg-orange-400" />

        <div className="absolute left-[15rem] bottom-[5.3rem] h-16 w-28 rounded-2xl border border-orange-200 bg-white/75 shadow-sm" />
        <div className="absolute left-[15.75rem] bottom-[6.7rem] flex gap-1">
          <span className="h-8 w-3 rounded bg-orange-300" />
          <span className="h-11 w-3 rounded bg-green-500" />
          <span className="h-9 w-3 rounded bg-amber-500" />
          <span className="h-10 w-3 rounded bg-stone-400" />
        </div>

        <div className="absolute right-[2.5rem] bottom-[6rem] h-20 w-16 rounded-b-3xl rounded-t-xl border border-orange-200 bg-white/80 shadow-sm" />
        <div className="absolute right-[3.2rem] bottom-[9.75rem] h-5 w-8 rounded-full bg-orange-100" />
        <div className="absolute right-[3.1rem] bottom-[7.8rem] h-1.5 w-10 rounded-full bg-orange-200" />
        <div className="absolute right-[3.5rem] bottom-[7rem] h-1.5 w-7 rounded-full bg-orange-200" />

        <div className="absolute left-1/2 bottom-40 h-5 w-[19rem] -translate-x-1/2 rounded bg-orange-400 shadow-md" />
        <div className="absolute left-[calc(50%-136px)] bottom-14 h-24 w-4 rounded bg-orange-400" />
        <div className="absolute left-[calc(50%+122px)] bottom-14 h-24 w-4 rounded bg-orange-400" />
        <div className="absolute left-1/2 bottom-16 h-12 w-20 -translate-x-1/2 rounded-t-xl bg-orange-300 shadow" />
        <div className="absolute left-[calc(50%-116px)] bottom-[11.1rem] h-4 w-20 rounded bg-white shadow" />
        <div className="absolute left-[calc(50%-108px)] bottom-[12.1rem] h-1.5 w-16 rounded bg-orange-200" />

        <div
          className="absolute left-[calc(50%+18px)] bottom-[11.1rem]"
          style={{ ...revealStyle(courseScores.computerScience, 48, 120), ...glowStyle(courseScores.computerScience) }}
        >
          <div className="h-14 w-20 rounded-t-md border border-neutral-500 bg-neutral-800 shadow">
            <div className="m-1 h-11 rounded bg-sky-200">
              <div className="mx-auto pt-3 text-center text-xs font-bold text-sky-900">CS</div>
            </div>
          </div>
          <div className="mx-auto h-2 w-[5.5rem] rounded-b bg-neutral-600" />
        </div>

        <div
          className="absolute left-[calc(50%-38px)] bottom-[11.6rem]"
          style={{ ...revealStyle(courseScores.mathematics, 52, 90), ...glowStyle(courseScores.mathematics) }}
        >
          <div className="h-9 w-[3.25rem] rounded-lg border border-orange-200 bg-white shadow-sm">
            <div className="grid grid-cols-3 gap-[2px] p-1.5">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="h-1.5 rounded bg-orange-200" />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 bottom-[12.2rem] -translate-x-1/2 transition-all duration-700">
          <div className="relative mx-auto h-[3.5rem] w-[3.5rem]">
            <div className={`absolute left-1/2 top-[0.2rem] h-[2.5rem] w-[2.8rem] -translate-x-1/2 rounded-full ${avatarPalette.accent}`} />
            <div className={`absolute left-1/2 top-0 h-[2.1rem] w-[3rem] -translate-x-1/2 rounded-t-full rounded-b-[1rem] ${avatarPalette.hair}`} />
            {scenarioGender === "female" && (
              <>
                <div className={`absolute left-1/2 top-[0.8rem] h-[2.7rem] w-[3.2rem] -translate-x-1/2 rounded-b-[1.4rem] rounded-t-[0.6rem] ${avatarPalette.hair}`} />
                <div className={`absolute left-[0.5rem] top-[1.2rem] h-[1.8rem] w-[0.55rem] rounded-full ${avatarPalette.hair}`} />
                <div className={`absolute right-[0.5rem] top-[1.2rem] h-[1.8rem] w-[0.55rem] rounded-full ${avatarPalette.hair}`} />
              </>
            )}
            {scenarioGender === "male" && (
              <>
                <div className={`absolute left-1/2 top-[0.2rem] h-[1.2rem] w-[2.8rem] -translate-x-1/2 rounded-t-full ${avatarPalette.hair}`} />
                <div className={`absolute left-1/2 top-[2.6rem] h-[0.45rem] w-[0.9rem] -translate-x-1/2 rounded-full bg-orange-200`} />
              </>
            )}
            {scenarioGender === "nonBinary" && (
              <>
                <div className={`absolute left-1/2 top-[0.35rem] h-[1.8rem] w-[2.9rem] -translate-x-1/2 rounded-t-full rounded-b-[0.8rem] ${avatarPalette.hair}`} />
                <div className={`absolute left-1/2 top-[1.7rem] h-[1rem] w-[2.2rem] -translate-x-1/2 rounded-b-[0.8rem] ${avatarPalette.hair}`} />
              </>
            )}
          </div>
          <div className="mx-auto -mt-1 h-2 w-4 rounded-full bg-orange-200" />
          <div className={`mx-auto mt-0.5 h-20 w-[4.3rem] ${avatarPalette.bodyShape} ${avatarPalette.shirt} transition-colors duration-700`} />
          <div className="mx-auto -mt-1 flex w-[5.2rem] justify-between">
            <span className="h-4 w-3 rounded-b-full bg-orange-300" />
            <span className="h-4 w-3 rounded-b-full bg-orange-300" />
          </div>
        </div>

        <div className="absolute left-[calc(50%+92px)] bottom-[11.1rem]"
          style={{ ...revealStyle(courseScores.economics, 50, 160), ...glowStyle(courseScores.economics) }}
        >
          <div className="h-14 w-16 rounded-xl border border-orange-200 bg-white p-2 shadow-sm">
            <div className="flex h-9 items-end gap-1">
              <div className="h-4 w-2 rounded bg-orange-300" />
              <div className="h-7 w-2 rounded bg-orange-500" />
              <div className="h-5 w-2 rounded bg-green-500" />
              <div className="h-9 w-2 rounded bg-amber-500" />
            </div>
          </div>
        </div>

        <div className="absolute left-[calc(50%+144px)] bottom-[11.1rem]"
          style={{ ...revealStyle(courseScores.business, 50, 190), ...glowStyle(courseScores.business) }}
        >
          <div className="h-10 w-16 rounded-md border border-orange-300 bg-amber-100 shadow-sm">
            <div className="ml-2 h-3 w-7 rounded-b bg-amber-200" />
            <div className="mx-2 mt-2 h-1 rounded bg-orange-300" />
            <div className="mx-2 mt-1 h-1 rounded bg-orange-200" />
          </div>
        </div>

        <div className="absolute right-28 bottom-44">
          <div className="relative h-[4.5rem] w-12">
            <div className="absolute bottom-0 left-3 h-2 w-8 rounded-full bg-neutral-500" />
            <div className="absolute bottom-2 left-6 h-9 w-[2px] bg-neutral-600" />
            <div className="absolute bottom-10 left-2 h-2 w-8 rotate-[-35deg] rounded bg-neutral-600" />
            <div className="absolute bottom-12 left-0 h-5 w-6 rounded-t-full rounded-b-md bg-neutral-700" />
            <div
              className="absolute bottom-7 left-0 h-12 w-12 rounded-full bg-yellow-100/70 blur-lg transition-all duration-700"
              style={{ opacity: brightRoom ? 0.62 : 0.24 }}
            />
          </div>
        </div>

        <div className="absolute left-5 bottom-40 max-w-[190px] rounded-2xl border border-orange-200 bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-800 shadow transition-all duration-700">
          {status}
        </div>

        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[10px] font-semibold text-neutral-700 md:grid-cols-5">
          <div className="rounded-full bg-white/75 px-2 py-1 text-center">CS: {courseScores.computerScience}%</div>
          <div className="rounded-full bg-white/75 px-2 py-1 text-center">Physics: {courseScores.physics}%</div>
          <div className="rounded-full bg-white/75 px-2 py-1 text-center">Bio: {courseScores.biology}%</div>
          <div className="rounded-full bg-white/75 px-2 py-1 text-center">Math: {courseScores.mathematics}%</div>
          <div className="rounded-full bg-white/75 px-2 py-1 text-center">Business: {courseScores.business}%</div>
        </div>
      </div>
    </div>
  );
}

function BiasSimulator({ t }) {
  const defaultInputs = {
    interest: 4,
    confidence: 3,
    entry: 3,
    peer: 3,
    stereotype: 3,
    school: 4,
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [scenarioGender, setScenarioGender] = useState("female");

  const sliderItems = [
    ["interest", t.simInterest, "positive"],
    ["confidence", t.simConfidence, "positive"],
    ["entry", t.simEntry, "negative"],
    ["peer", t.simPeer, "negative"],
    ["stereotype", t.simStereotype, "negative"],
    ["school", t.simSchool, "positive"],
  ];

  const genderOptions = [
    ["female", t.female],
    ["male", t.male],
    ["nonBinary", t.nonBinary],
  ];

  const presets = [
    {
      label: t.simPresetBalanced,
      values: { interest: 4, confidence: 3, entry: 3, peer: 3, stereotype: 3, school: 4 },
      gender: "female",
    },
    {
      label: t.simPresetPressure,
      values: { interest: 4, confidence: 2, entry: 5, peer: 4, stereotype: 5, school: 2 },
      gender: "female",
    },
    {
      label: t.simPresetSupport,
      values: { interest: 4, confidence: 4, entry: 2, peer: 2, stereotype: 2, school: 5 },
      gender: "male",
    },
    {
      label: t.simPresetStereotype,
      values: { interest: 3, confidence: 2, entry: 3, peer: 5, stereotype: 5, school: 2 },
      gender: "nonBinary",
    },
  ];

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const toPercent = (value) => Math.round((value / 15) * 100);

  const supportScore = toPercent(inputs.interest + inputs.confidence + inputs.school);
  const pressureScore = toPercent(inputs.entry + inputs.peer + inputs.stereotype);

  const openExploration = Math.round(
    clamp(52 + (supportScore - pressureScore) * 0.42, 8, 94),
  );

  const stemWillingness = Math.round(
    clamp(
      48 +
        (inputs.interest - 3) * 7 +
        (inputs.confidence - 3) * 8 +
        (inputs.school - 3) * 5 -
        (inputs.entry - 3) * 7 -
        (inputs.stereotype - 3) * 8 -
        (inputs.peer - 3) * 3,
      6,
      94,
    ),
  );

  const humanitiesWillingness = Math.round(
    clamp(
      54 +
        (inputs.interest - 3) * 5 +
        (inputs.confidence - 3) * 3 +
        (inputs.school - 3) * 4 -
        (inputs.peer - 3) * 2 -
        (inputs.stereotype - 3) * 3,
      8,
      92,
    ),
  );

  const status =
    openExploration >= 68
      ? t.simStatusSupported
      : openExploration >= 42
        ? t.simStatusMixed
        : t.simStatusBlocked;

  const explanation =
    openExploration >= 68
      ? t.simulatorExplanationStrong
      : openExploration >= 42
        ? t.simulatorExplanationMiddle
        : t.simulatorExplanationWeak;

  const courseOutlook = [
    {
      key: "mathematics",
      label: t.courseMathematics,
      score: stemWillingness + inputs.confidence * 3 - inputs.entry * 4,
    },
    {
      key: "physics",
      label: t.coursePhysics,
      score: stemWillingness - inputs.entry * 4 - inputs.stereotype * 2,
    },
    {
      key: "chemistry",
      label: t.courseChemistry,
      score: Math.round((stemWillingness + inputs.confidence * 12) / 2) - inputs.entry * 2,
    },
    {
      key: "computerScience",
      label: t.courseComputerScience,
      score: stemWillingness - inputs.stereotype * 4 - inputs.peer * 2,
    },
    {
      key: "biology",
      label: t.courseBiology,
      score: Math.round((stemWillingness + openExploration) / 2) + 6,
    },
    {
      key: "economics",
      label: t.courseEconomics,
      score: Math.round((humanitiesWillingness + stemWillingness) / 2) + inputs.interest * 2,
    },
    {
      key: "geography",
      label: t.courseGeography,
      score: humanitiesWillingness + inputs.school * 2 - inputs.peer,
    },
    {
      key: "philosophy",
      label: t.coursePhilosophy,
      score: humanitiesWillingness + inputs.school * 2 - inputs.peer,
    },
    {
      key: "business",
      label: t.courseBusiness,
      score: Math.round((humanitiesWillingness + openExploration) / 2),
    },
  ].map((course) => ({
    ...course,
    score: clamp(Math.round(course.score), 5, 95),
  }));

  const courseScores = Object.fromEntries(
    courseOutlook.map((course) => [course.key, course.score]),
  );

  const getCourseStatus = (score) => {
    if (score >= 66) return t.simLikelyChoose;
    if (score >= 38) return t.simMayHesitate;
    return t.simLikelyAvoid;
  };

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const ResultCard = ({ label, value }) => (
    <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-neutral-800">{label}</span>
        <span className="text-xl font-bold text-neutral-900">{value}%</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-600 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
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
        <h3 className="mt-3 text-3xl font-bold text-neutral-900">
          {t.simulatorTitle}
        </h3>
        <p className="mt-4 leading-8 text-neutral-800">{t.simulatorDesc}</p>
      </div>

      <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50/60 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-neutral-900">{t.simPresets}</p>
          <button
            type="button"
            onClick={() => {
              setInputs(defaultInputs);
              setScenarioGender("female");
            }}
            className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-900 transition hover:bg-orange-100"
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
              }}
              className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-orange-500 hover:bg-orange-100"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-neutral-800">{t.gender}</span>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-900">
                {scenarioGender === "female" ? t.female : scenarioGender === "male" ? t.male : t.nonBinary}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {genderOptions.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScenarioGender(value)}
                  className={`rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                    scenarioGender === value
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-orange-200 bg-orange-50 text-orange-900 hover:bg-orange-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {sliderItems.map(([key, label, direction]) => (
            <label
              key={key}
              className="block rounded-2xl border border-orange-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-neutral-800">{label}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    direction === "positive"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {inputs[key]}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={inputs[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="mt-3 w-full accent-orange-600"
              />
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <RoomScene
            t={t}
            status={status}
            openExploration={openExploration}
            supportScore={supportScore}
            pressureScore={pressureScore}
            courseScores={courseScores}
            scenarioGender={scenarioGender}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-green-800">
                <span>{t.simSupport}</span>
                <span>{supportScore}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-green-600 transition-all duration-500"
                  style={{ width: `${supportScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-orange-800">
                <span>{t.simPressure}</span>
                <span>{pressureScore}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-orange-600 transition-all duration-500"
                  style={{ width: `${pressureScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <ResultCard label={t.simStem} value={stemWillingness} />
            <ResultCard label={t.simHumanities} value={humanitiesWillingness} />
            <ResultCard label={t.simOpenExploration} value={openExploration} />
          </div>

          <div className="rounded-3xl border border-orange-200 bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">
              {t.simCourseOutlook}
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {courseOutlook.map((course) => (
                <div
                  key={course.key}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-neutral-900">{course.label}</span>
                      <span className="text-xs font-semibold text-neutral-500">{course.score}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-600 transition-all duration-500"
                        style={{ width: `${course.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-900">
                    {getCourseStatus(course.score)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm leading-7 text-neutral-800">
            {explanation}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-neutral-700">
            {t.simulatorNotice}
          </div>
        </div>
      </div>
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
  const [showGate, setShowGate] = useState(true);
  const [gateMode, setGateMode] = useState("choice");
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
    if (submitState !== "success") return;
    const timer = window.setTimeout(() => setSubmitState("idle"), 3000);
    return () => window.clearTimeout(timer);
  }, [submitState]);

  return (
    <div className="relative min-h-screen overflow-hidden gender-page-bg text-neutral-800">
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

        <BiasSimulator t={t} />

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
                            value={reflectionSurvey.factors[key]}
                            onChange={(e) => handleSurveyScaleChange("factors", key, e.target.value)}
                            className="mt-3 w-full accent-orange-600"
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
                            value={reflectionSurvey.statements[key]}
                            onChange={(e) => handleSurveyScaleChange("statements", key, e.target.value)}
                            className="mt-3 w-full accent-orange-600"
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
