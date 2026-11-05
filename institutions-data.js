/* 北大医疗医疗服务网络 · 机构数据 */

  window.PKU_TYPES = {
    general: { key: "general", name: "综合医院", icon: "hospital", color: "#2e6f96" },
    rehab: { key: "rehab", name: "康复医院", icon: "activity", color: "#2f7f78" },
    specialty: { key: "specialty", name: "专科医院", icon: "heart", color: "#9a5f6d" },
    center: { key: "center", name: "健康管理中心", icon: "building", color: "#b7864e" }
  };

  window.PKU_REGIONS = [
    { id: "beijing", name: "北京地区", short: "北京", city: "北京市", color: "#2c6e9b", summary: "综合 · 康复 · 健管" },
    { id: "tianjin", name: "天津地区", short: "天津", city: "天津市", color: "#3d86ad", summary: "滨海综合医疗" },
    { id: "shandong", name: "山东地区", short: "山东", city: "淄博市", color: "#2f7f78", summary: "淄博综合医疗" },
    { id: "shanxi", name: "山西地区", short: "山西", city: "长治市", color: "#557a96", summary: "长治综合医疗" },
    { id: "hunan", name: "湖南地区", short: "湖南", city: "株洲市", color: "#9a5f6d", summary: "心血管专科" },
    { id: "guangdong", name: "广东地区", short: "广东", city: "深圳市", color: "#b7864e", summary: "深圳康复医疗" }
  ];

  const TEAM_ROLES = [
    {
      key: "supervisor",
      name: "运营督导",
      icon: "eye",
      desc: "作为项目督导，查看所有营的运营情况，负责跨营期督导与质量把控。",
      members: [
        { name: "张伟", gender: "男", qualification: "项目督导 · 医院管理" }
      ]
    },
    {
      key: "operations",
      name: "运营管家",
      icon: "users",
      desc: "每个营期的负责人，统筹医师、健管师、营养师、康复师，组成营期服务团队，服务所负责营期。",
      members: [
        { name: "孙敏", gender: "女", qualification: "营期运营负责人 · 健康管理师" },
        { name: "何佳", gender: "女", qualification: "营期运营专员 · 健康管理师" }
      ]
    },
    {
      key: "doctor",
      name: "医师",
      icon: "stethoscope",
      desc: "负责健康评估、疾病筛查、诊疗方案与医学支持。",
      members: [
        { name: "李静", gender: "女", qualification: "副主任医师 · 全科医学" },
        { name: "周明", gender: "男", qualification: "主治医师 · 内科" }
      ]
    },
    {
      key: "health-manager",
      name: "健管师",
      icon: "clipboard",
      desc: "负责健康档案、营期计划执行、日常随访与健康指导。",
      members: [
        { name: "王琳", gender: "女", qualification: "健康管理师 · 健康管理" },
        { name: "赵倩", gender: "女", qualification: "健康管理师 · 慢病管理" }
      ]
    },
    {
      key: "nutritionist",
      name: "营养师",
      icon: "leaf",
      desc: "负责营养评估、膳食方案与营养干预。",
      members: [
        { name: "陈晓", gender: "女", qualification: "注册营养师 · 临床营养" }
      ]
    },
    {
      key: "rehab",
      name: "康复师",
      icon: "activity",
      desc: "负责康复评估、训练方案与功能恢复指导。",
      members: [
        { name: "刘洋", gender: "男", qualification: "康复治疗师 · 运动康复" }
      ]
    }
  ];

  window.PKU_INSTITUTIONS = [
    { id: "pku-international", region: "beijing", type: "general", name: "北京大学国际医院", fullName: "北京大学国际医院", subtitle: "", address: "北京市昌平区中关村生命科学园生命园路1号", phone: "010-69007777", aliases: "北大国际医院 PKU International Hospital" },
    { id: "pku-rehab-beijing", region: "beijing", type: "rehab", name: "北京北大医疗康复医院", fullName: "北京北大医疗康复医院", subtitle: "", address: "北京市昌平区中关村生命科学园生命园路8号院7号楼", phone: "010-60849596", aliases: "北大医疗康复医院" },
    { id: "fangyuan-center", region: "beijing", type: "center", name: "方园中心", fullName: "方园中心（北京怡健殿方园门诊部）", subtitle: "北京怡健殿方园门诊部", address: "北京市海淀区中关村南大街甲56号方园大厦商务楼4层", phone: "400-660-3886", aliases: "方园中心 北京怡健殿方园门诊部 怡健殿" },
    { id: "wangjing-center", region: "beijing", type: "center", name: "望京中心", fullName: "望京中心（北京怡健殿望京诊所）", subtitle: "北京怡健殿望京诊所", address: "北京市朝阳区广顺北大街33号福泰中心1-2层", phone: "400-660-3886", aliases: "望京中心 北京怡健殿望京诊所 怡健殿" },
    { id: "beisanhuan-center", region: "beijing", type: "center", name: "北三环中心", fullName: "北三环中心（北京怡健殿北三环门诊部）", subtitle: "北京怡健殿北三环门诊部", address: "北京市海淀区北太平庄18号城建大厦西门C座1-2层", phone: "400-660-3886", aliases: "北三环中心 北京怡健殿北三环门诊部 怡健殿" },
    { id: "financial-street-center", region: "beijing", type: "center", name: "金融街中心", fullName: "金融街中心（北京怡健殿诊所）", subtitle: "北京怡健殿诊所", address: "北京市西城区金融街5号新盛大厦B座1-3层", phone: "400-660-3886", aliases: "金融街中心 北京怡健殿诊所 怡健殿" },
    { id: "ocean-oil-hospital", region: "tianjin", type: "general", name: "北大医疗海洋石油医院", fullName: "北大医疗海洋石油医院", subtitle: "", address: "天津市滨海新区中心商务区渤海石油路10号", phone: "022-25805500", aliases: "北大医疗海洋石油医院 海洋石油医院" },
    { id: "luzhong-hospital", region: "shandong", type: "general", name: "北大医疗鲁中医院", fullName: "北大医疗鲁中医院", subtitle: "", address: "山东省淄博市临淄区太公路65号", phone: "0533-7698050", aliases: "北大医疗鲁中医院 鲁中医院" },
    { id: "zibo-hospital", region: "shandong", type: "general", name: "北大医疗淄博医院", fullName: "北大医疗淄博医院", subtitle: "", address: "山东省淄博市张店区山铝宿舍西山五街2号", phone: "0533-2344485", aliases: "北大医疗淄博医院 淄博医院" },
    { id: "luan-hospital", region: "shanxi", type: "general", name: "北大医疗潞安医院", fullName: "北大医疗潞安医院", subtitle: "含长治分院区", address: "山西省长治市襄垣县侯堡镇北大医疗潞安医院", branch: "长治分院区：长治市威远门北路37号国税大厦旁", phone: "0355-5922495", aliases: "北大医疗潞安医院 潞安医院 长治分院区" },
    { id: "kaide-hospital", region: "hunan", type: "specialty", name: "北大医疗恺德心血管病医院", fullName: "北大医疗恺德心血管病医院", subtitle: "", address: "湖南省株洲市荷塘区茨菇塘街道恺德路99号", phone: "0731-22222100", aliases: "北大医疗恺德心血管病医院 恺德心血管病医院" },
    { id: "shenzhen-rehab", region: "guangdong", type: "rehab", name: "深圳北医康复医院", fullName: "深圳北医康复医院", subtitle: "", address: "深圳市宝安区西乡街道铁岗社区鸿鹏大厦1栋101及整栋", phone: "0755-33269799", aliases: "深圳北医康复医院 北医康复医院" }
  ];


window.PKU_NETWORK = { TYPES: window.PKU_TYPES, REGIONS: window.PKU_REGIONS, INSTITUTIONS: window.PKU_INSTITUTIONS };
