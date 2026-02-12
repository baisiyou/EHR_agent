/**
 * EHR Agent - i18n 英/中/法 翻译
 */

const translations = {
  en: {
    appTitle: 'EHR Agent - Electronic Health Record Assistant',
    appSubtitle: 'Intelligent consultation recording and medical record generation',
    patientInfo: 'Patient Information',
    patientName: 'Patient Name',
    patientNamePlaceholder: 'Enter patient name',
    patientAge: 'Age',
    patientAgePlaceholder: 'Enter age',
    patientGender: 'Gender',
    patientGenderPlaceholder: 'Select',
    patientGenderMale: 'Male',
    patientGenderFemale: 'Female',
    patientGenderOther: 'Other',
    patientHistory: 'Medical History',
    patientHistoryPlaceholder: "Enter medical history, or 'None'",
    patientAllergies: 'Allergies',
    patientAllergiesPlaceholder: "Enter allergies, or 'None'",
    patientMeds: 'Current Medications',
    patientMedsPlaceholder: "Enter medications (comma-separated), or 'None'",
    consultation: 'Consultation Record',
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    clear: 'Clear',
    consultationPlaceholder: "Click 'Start Recording' for voice input, or type here...",
    charCount: 'Characters: ',
    generateSOAP: 'Generate SOAP Note',
    recommendExams: 'Recommend Examinations',
    checkDrugs: 'Check Drug Conflicts',
    saveReport: 'Save Report',
    loading: 'Processing, please wait...',
    soapNote: 'SOAP Note',
    recommendedExams: 'Recommended Examinations',
    drugCheck: 'Drug Conflict Check',
    chiefComplaint: 'Chief Complaint',
    subjective: 'Subjective (S)',
    objective: 'Objective (O)',
    assessment: 'Assessment (A)',
    plan: 'Plan (P)',
    preliminaryDiagnosis: 'Preliminary Diagnosis',
    priorityHigh: 'High Priority',
    priorityMedium: 'Medium Priority',
    priorityLow: 'Low Priority',
    reason: 'Reason',
    detectedDrugs: 'Detected Drugs',
    overallAssessment: 'Overall Assessment',
    allergyWarnings: 'Allergy Warnings',
    drugInteractions: 'Drug Interactions',
    contraindications: 'Contraindications',
    dosageWarnings: 'Dosage Warnings',
    recommendations: 'Recommendations',
    noRisk: 'No significant drug conflicts or safety risks detected.',
    severityHigh: 'High Risk',
    severityMedium: 'Medium Risk',
    severityLow: 'Low Risk',
    severityNone: 'No Risk',
    severityUnknown: 'Unknown',
    enterTranscript: 'Please enter consultation record first',
    generateFirst: 'Please generate SOAP note first',
    generateSOAPFailed: 'Failed to generate SOAP note: ',
    recommendFailed: 'Failed to recommend examinations: ',
    checkFailed: 'Failed to check drug conflicts: ',
    requestFailed: 'Request failed: ',
    saveFailed: 'Failed to save: ',
    recording: 'Recording...',
    recordingStopped: 'Recording stopped',
    recordingError: 'Speech recognition error: ',
    startFailed: 'Failed to start recording, check microphone permission',
    notSupported: 'Browser does not support speech recognition',
    confirmClear: 'Clear consultation record?',
    reportSaved: 'Report saved: ',
    noExams: 'No examinations recommended',
    error: 'Error: ',
    notProvided: 'Not provided',
    none: 'None',
    reportPatientInfo: '【Patient Info】',
    reportConsultation: '【Consultation】',
    reportSOAP: '【SOAP Note】',
    reportName: 'Name',
    reportAge: 'Age',
    reportGender: 'Gender',
    reportHistory: 'History',
    reportAllergies: 'Allergies',
    reportMeds: 'Medications',
    reportChiefComplaint: 'Chief Complaint',
    reportDiagnosis: 'Diagnosis'
  },
  zh: {
    appTitle: 'EHR Agent - 电子病历辅助系统',
    appSubtitle: '智能问诊记录与病历生成系统',
    patientInfo: '患者基本信息',
    patientName: '患者姓名',
    patientNamePlaceholder: '请输入患者姓名',
    patientAge: '年龄',
    patientAgePlaceholder: '请输入年龄',
    patientGender: '性别',
    patientGenderPlaceholder: '请选择',
    patientGenderMale: '男',
    patientGenderFemale: '女',
    patientGenderOther: '其他',
    patientHistory: '既往史',
    patientHistoryPlaceholder: "请输入既往史，无则填'无'",
    patientAllergies: '过敏史',
    patientAllergiesPlaceholder: "请输入过敏史，无则填'无'",
    patientMeds: '当前用药',
    patientMedsPlaceholder: "请输入当前用药，用逗号分隔，无则填'无'",
    consultation: '问诊记录',
    startRecording: '开始录音',
    stopRecording: '停止录音',
    clear: '清空',
    consultationPlaceholder: "点击'开始录音'进行语音输入，或直接在此输入问诊记录...",
    charCount: '字数: ',
    generateSOAP: '生成 SOAP 病历',
    recommendExams: '推荐检查项目',
    checkDrugs: '检查药物冲突',
    saveReport: '保存报告',
    loading: '处理中，请稍候...',
    soapNote: 'SOAP 病历',
    recommendedExams: '推荐检查项目',
    drugCheck: '药物冲突检查',
    chiefComplaint: '主诉',
    subjective: '主观资料 (S - Subjective)',
    objective: '客观资料 (O - Objective)',
    assessment: '评估 (A - Assessment)',
    plan: '计划 (P - Plan)',
    preliminaryDiagnosis: '初步诊断',
    priorityHigh: '高优先级',
    priorityMedium: '中优先级',
    priorityLow: '低优先级',
    reason: '理由',
    detectedDrugs: '检测到的药物',
    overallAssessment: '总体评估',
    allergyWarnings: '过敏警告',
    drugInteractions: '药物相互作用',
    contraindications: '禁忌症',
    dosageWarnings: '剂量警告',
    recommendations: '建议',
    noRisk: '未发现明显的药物冲突或安全风险。',
    severityHigh: '高风险',
    severityMedium: '中等风险',
    severityLow: '低风险',
    severityNone: '无风险',
    severityUnknown: '未知',
    enterTranscript: '请先输入问诊记录',
    generateFirst: '请先生成 SOAP 病历',
    generateSOAPFailed: '生成 SOAP 病历失败: ',
    recommendFailed: '推荐检查项目失败: ',
    checkFailed: '检查药物冲突失败: ',
    requestFailed: '请求失败: ',
    saveFailed: '保存失败: ',
    recording: '正在录音...',
    recordingStopped: '录音已停止',
    recordingError: '语音识别错误: ',
    startFailed: '启动录音失败，请检查麦克风权限',
    notSupported: '浏览器不支持语音识别',
    confirmClear: '确定要清空问诊记录吗？',
    reportSaved: '报告已保存: ',
    noExams: '未推荐检查项目',
    error: '错误: ',
    notProvided: '未提供',
    none: '无',
    reportPatientInfo: '【患者信息】',
    reportConsultation: '【问诊记录】',
    reportSOAP: '【SOAP 病历】',
    reportName: '姓名',
    reportAge: '年龄',
    reportGender: '性别',
    reportHistory: '既往史',
    reportAllergies: '过敏史',
    reportMeds: '当前用药',
    reportChiefComplaint: '主诉',
    reportDiagnosis: '初步诊断'
  },
  fr: {
    appTitle: 'EHR Agent - Système d\'assistance aux dossiers médicaux',
    appSubtitle: 'Enregistrement de consultations et génération de dossiers médicaux',
    patientInfo: 'Informations du patient',
    patientName: 'Nom du patient',
    patientNamePlaceholder: 'Entrez le nom',
    patientAge: 'Âge',
    patientAgePlaceholder: 'Entrez l\'âge',
    patientGender: 'Sexe',
    patientGenderPlaceholder: 'Sélectionner',
    patientGenderMale: 'Homme',
    patientGenderFemale: 'Femme',
    patientGenderOther: 'Autre',
    patientHistory: 'Antécédents médicaux',
    patientHistoryPlaceholder: "Entrez les antécédents, ou 'Aucun'",
    patientAllergies: 'Allergies',
    patientAllergiesPlaceholder: "Entrez les allergies, ou 'Aucune'",
    patientMeds: 'Médicaments actuels',
    patientMedsPlaceholder: "Entrez les médicaments (séparés par des virgules), ou 'Aucun'",
    consultation: 'Compte-rendu de consultation',
    startRecording: 'Démarrer l\'enregistrement',
    stopRecording: 'Arrêter l\'enregistrement',
    clear: 'Effacer',
    consultationPlaceholder: "Cliquez sur 'Démarrer' pour la saisie vocale, ou tapez ici...",
    charCount: 'Caractères: ',
    generateSOAP: 'Générer note SOAP',
    recommendExams: 'Recommandations d\'examens',
    checkDrugs: 'Vérifier interactions médicamenteuses',
    saveReport: 'Enregistrer le rapport',
    loading: 'Traitement en cours...',
    soapNote: 'Note SOAP',
    recommendedExams: 'Examens recommandés',
    drugCheck: 'Vérification des interactions',
    chiefComplaint: 'Motif de consultation',
    subjective: 'Subjectif (S)',
    objective: 'Objectif (O)',
    assessment: 'Évaluation (A)',
    plan: 'Plan (P)',
    preliminaryDiagnosis: 'Diagnostic préliminaire',
    priorityHigh: 'Priorité haute',
    priorityMedium: 'Priorité moyenne',
    priorityLow: 'Priorité basse',
    reason: 'Justification',
    detectedDrugs: 'Médicaments détectés',
    overallAssessment: 'Évaluation globale',
    allergyWarnings: 'Avertissements allergies',
    drugInteractions: 'Interactions médicamenteuses',
    contraindications: 'Contre-indications',
    dosageWarnings: 'Avertissements posologie',
    recommendations: 'Recommandations',
    noRisk: 'Aucun conflit médicamenteux ou risque de sécurité détecté.',
    severityHigh: 'Risque élevé',
    severityMedium: 'Risque modéré',
    severityLow: 'Risque faible',
    severityNone: 'Aucun risque',
    severityUnknown: 'Inconnu',
    enterTranscript: 'Veuillez d\'abord saisir le compte-rendu',
    generateFirst: 'Veuillez d\'abord générer la note SOAP',
    generateSOAPFailed: 'Échec de la génération: ',
    recommendFailed: 'Échec des recommandations: ',
    checkFailed: 'Échec de la vérification: ',
    requestFailed: 'Échec de la requête: ',
    saveFailed: 'Échec de l\'enregistrement: ',
    recording: 'Enregistrement en cours...',
    recordingStopped: 'Enregistrement arrêté',
    recordingError: 'Erreur reconnaissance vocale: ',
    startFailed: 'Impossible de démarrer, vérifiez les autorisations microphone',
    notSupported: 'La reconnaissance vocale n\'est pas prise en charge',
    confirmClear: 'Effacer le compte-rendu ?',
    reportSaved: 'Rapport enregistré: ',
    noExams: 'Aucun examen recommandé',
    error: 'Erreur: ',
    notProvided: 'Non fourni',
    none: 'Aucun',
    reportPatientInfo: '【Informations patient】',
    reportConsultation: '【Compte-rendu】',
    reportSOAP: '【Note SOAP】',
    reportName: 'Nom',
    reportAge: 'Âge',
    reportGender: 'Sexe',
    reportHistory: 'Antécédents',
    reportAllergies: 'Allergies',
    reportMeds: 'Médicaments',
    reportChiefComplaint: 'Motif de consultation',
    reportDiagnosis: 'Diagnostic préliminaire'
  }
};

// 当前语言，默认中文
let currentLang = localStorage.getItem('ehr-lang') || 'zh';
const speechLangs = { en: 'en-US', zh: 'zh-CN', fr: 'fr-FR' };

function t(key) {
  return translations[currentLang]?.[key] ?? translations.en[key] ?? key;
}

function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('ehr-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en' : 'fr';
    applyTranslations();
    if (typeof onLanguageChange === 'function') onLanguageChange(lang);
  }
}

function getLanguage() {
  return currentLang;
}

function getSpeechLang() {
  return speechLangs[currentLang] || 'zh-CN';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key);
    if (val) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('option[data-i18n-opt]').forEach(opt => {
    const key = opt.getAttribute('data-i18n-opt');
    const val = t(key);
    if (val) opt.textContent = val;
  });
  const title = t('appTitle');
  if (title) document.title = title;
}
