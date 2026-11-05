/* =========================================================
   北医健康营 · 当期项目数据（演示）
   人员所属医院为演示配置，可在本文件内直接替换
   ========================================================= */

window.HEALTH_CAMP = {
  id: "camp-2026-autumn",
  name: "北医健康营",
  edition: "第 7 期",
  theme: "28 天代谢重塑计划",
  status: "进行中",
  statusKey: "live",
  startDate: "2026-10-19",
  endDate: "2026-11-15",
  day: 18,
  totalDays: 28,
  location: "北京 · 昌平 · 北京大学国际医院",
  host: "北京大学国际医院",
  summary:
    "由北医系统专家与健康管理团队联合带队，围绕营养、运动、睡眠与慢病风险，为学员提供 28 天陪跑式健康管理。",
  highlights: [
    { label: "医学评估", value: "入营基线 + 结营复评" },
    { label: "营养干预", value: "一对一定制膳食方案" },
    { label: "运动康复", value: "每周 3 次带练与纠姿" },
    { label: "全程陪跑", value: "健管师每日跟进" }
  ],
  roles: [
    { key: "lead", name: "项目负责人", short: "项目", icon: "flag", desc: "统筹营期计划、跨角色排期与学员服务体验。" },
    { key: "doctor", name: "医师", short: "医师", icon: "stethoscope", desc: "负责入营评估、风险筛查与医学支持。" },
    { key: "nutrition", name: "营养师", short: "营养", icon: "leaf", desc: "负责营养评估、膳食方案与全程营养干预。" },
    { key: "rehab", name: "康复师（教练）", short: "教练", icon: "activity", desc: "负责运动评估、带练与动作纠正。" },
    { key: "health", name: "健管师", short: "健管", icon: "clipboard", desc: "负责健康档案、每日随访与计划执行。" },
    { key: "supervisor", name: "运营督导", short: "督导", icon: "eye", desc: "负责服务质量巡查与跨营期标准落地。" }
  ],
  roster: [
    {
      id: "op-04", name: "孙敏", gender: "女", roleKey: "lead", role: "项目负责人",
      qualification: "营期运营负责人 · 健康管理师",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      tags: ["第 7 期营期负责人", "8 年健康管理"],
      duty: "统筹本期医师、营养师、康复师与健管师的排期，对营期进度和学员体验负责。"
    },
    {
      id: "op-05", name: "何佳", gender: "女", roleKey: "lead", role: "项目运营",
      qualification: "营期运营专员 · 健康管理师",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      tags: ["学员服务", "营期排期"],
      duty: "负责学员接待、课程与评估预约、健康档案更新和营期数据整理。"
    },
    {
      id: "op-06", name: "林珊", gender: "女", roleKey: "lead", role: "客户服务主管",
      qualification: "客户服务主管 · 健康管理",
      hospital: "北大医疗海洋石油医院", hospitalId: "ocean-oil-hospital",
      tags: ["客户沟通", "问题闭环"],
      duty: "负责重点学员跟进与跨团队沟通，推动服务问题在营期内闭环。"
    },
    {
      id: "1180", name: "丁嘉祥", gender: "男", roleKey: "doctor", role: "主任医师",
      qualification: "肾脏内科 · 主任医师",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      photo: "./assets/team/1180.webp",
      tags: ["肾内科", "慢病管理"],
      duty: "负责入营医学评估、肾功能相关风险筛查与营期医学支持。"
    },
    {
      id: "1181", name: "于峰", gender: "男", roleKey: "doctor", role: "教授 · 主任医师",
      qualification: "肾脏内科 · 教授",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      photo: "./assets/team/1181.webp",
      tags: ["免疫相关肾病", "专家查房"],
      duty: "负责复杂病例的医学评估与营期专家查房。"
    },
    {
      id: "op-10", name: "陈晓", gender: "女", roleKey: "nutrition", role: "注册营养师",
      qualification: "注册营养师 · 临床营养",
      hospital: "北京大学第一医院", hospitalId: "pku-first",
      tags: ["临床营养", "膳食方案"],
      duty: "负责学员营养评估、个性化膳食处方与每周营养复盘。"
    },
    {
      id: "op-11", name: "罗雯", gender: "女", roleKey: "nutrition", role: "营养师",
      qualification: "注册营养师 · 公共营养",
      hospital: "北京大学人民医院", hospitalId: "pku-people",
      tags: ["体重管理", "食堂带教"],
      duty: "负责营期食堂带教、外食场景选择与营养科普内容。"
    },
    {
      id: "op-12", name: "宋妍", gender: "女", roleKey: "nutrition", role: "营养师",
      qualification: "注册营养师 · 慢病营养",
      hospital: "北京大学第三医院", hospitalId: "pku-third",
      tags: ["慢病营养", "血糖管理"],
      duty: "负责糖代谢异常学员的营养干预与指标跟踪。"
    },
    {
      id: "op-13", name: "刘洋", gender: "男", roleKey: "rehab", role: "康复治疗师 · 教练",
      qualification: "康复治疗师 · 运动康复",
      hospital: "北京大学第三医院", hospitalId: "pku-third",
      tags: ["运动康复", "带练教练"],
      duty: "负责运动风险评估、每周带练与学员动作纠正。"
    },
    {
      id: "op-14", name: "高远", gender: "男", roleKey: "rehab", role: "康复治疗师 · 教练",
      qualification: "康复治疗师 · 肌骨康复",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      tags: ["肌骨康复", "体态评估"],
      duty: "负责肌骨与体态评估，为膝肩不适学员调整训练动作。"
    },
    {
      id: "op-15", name: "宋宁", gender: "女", roleKey: "rehab", role: "康复治疗师",
      qualification: "康复治疗师 · 心肺康复",
      hospital: "北大医疗康复医院", hospitalId: "pku-rehab-beijing",
      tags: ["心肺康复", "耐力训练"],
      duty: "负责心肺耐力评估与低强度有氧处方。"
    },
    {
      id: "op-07", name: "王琳", gender: "女", roleKey: "health", role: "健康管理师",
      qualification: "健康管理师 · 健康管理",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      tags: ["健康档案", "每日随访"],
      duty: "负责学员健康档案、每日打卡跟进与异常指标提醒。"
    },
    {
      id: "op-08", name: "赵倩", gender: "女", roleKey: "health", role: "健康管理师",
      qualification: "健康管理师 · 慢病管理",
      hospital: "北大医疗康复医院", hospitalId: "pku-rehab-beijing",
      tags: ["慢病随访", "用药提醒"],
      duty: "负责慢病学员的随访、用药依从性跟踪与复诊提醒。"
    },
    {
      id: "op-09", name: "许安", gender: "男", roleKey: "health", role: "健康管理师",
      qualification: "健康管理师 · 运动管理",
      hospital: "北大医疗淄博医院", hospitalId: "zibo-hospital",
      tags: ["运动打卡", "数据复盘"],
      duty: "负责运动与睡眠打卡数据复盘，协助教练调整训练量。"
    },
    {
      id: "op-01", name: "张伟", gender: "男", roleKey: "supervisor", role: "运营督导",
      qualification: "项目督导 · 医院管理",
      hospital: "北京大学国际医院", hospitalId: "pku-international",
      tags: ["质量督导", "流程标准"],
      duty: "负责营期服务质量巡查、满意度跟进与重点事项督办。"
    },
    {
      id: "op-02", name: "周岚", gender: "女", roleKey: "supervisor", role: "运营督导",
      qualification: "区域督导 · 医疗运营",
      hospital: "北京大学第三医院", hospitalId: "pku-third",
      tags: ["区域督导", "服务体验"],
      duty: "负责区域营期运营督导与跨团队协同问题闭环。"
    },
    {
      id: "op-03", name: "高成", gender: "男", roleKey: "supervisor", role: "质量督导",
      qualification: "质量督导 · 服务管理",
      hospital: "北大医疗鲁中医院", hospitalId: "luzhong-hospital",
      tags: ["安全管理", "满意度"],
      duty: "负责服务规范检查、安全管理与满意度回访。"
    }
  ],
  hospitals: [
    { id: "pku-international", name: "北京大学国际医院", short: "北大国际", city: "北京", tone: "#0b63e5" },
    { id: "pku-third", name: "北京大学第三医院", short: "北医三院", city: "北京", tone: "#0aa39a" },
    { id: "pku-first", name: "北京大学第一医院", short: "北大医院", city: "北京", tone: "#7c6cf0" },
    { id: "pku-people", name: "北京大学人民医院", short: "人民医院", city: "北京", tone: "#e07a3f" },
    { id: "pku-rehab-beijing", name: "北京北大医疗康复医院", short: "北大医疗康复", city: "北京", tone: "#2f9e83" },
    { id: "ocean-oil-hospital", name: "北大医疗海洋石油医院", short: "海洋石油医院", city: "天津", tone: "#3f8cff" },
    { id: "luzhong-hospital", name: "北大医疗鲁中医院", short: "鲁中医院", city: "淄博", tone: "#c46a5a" },
    { id: "zibo-hospital", name: "北大医疗淄博医院", short: "淄博医院", city: "淄博", tone: "#8a6ad4" }
  ],
  timeline: [
    { date: "10.19", title: "开营 · 基线评估", desc: "体成分、代谢指标、运动能力与膳食习惯基线采集", state: "done" },
    { date: "10.26", title: "适应期 · 习惯重建", desc: "膳食结构切换、每日步数与睡眠节律打卡", state: "done" },
    { date: "11.02", title: "强化期 · 代谢冲刺", desc: "营养密度提升、力量训练加量、周中专家复盘", state: "now" },
    { date: "11.09", title: "巩固期 · 场景迁移", desc: "外食与差旅场景演练，建立可持续方案", state: "next" },
    { date: "11.15", title: "结营 · 复评与方案交付", desc: "复测指标、个人维持方案与 90 天随访计划", state: "next" }
  ]
};
