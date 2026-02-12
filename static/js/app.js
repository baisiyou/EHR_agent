// EHR Agent Web 应用前端 JavaScript

let recognition = null;
let isRecording = false;
let soapData = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
    setActiveLangButton();
    setupLangSwitcher();
    initializeSpeechRecognition();
    setupEventListeners();
    updateCharCount();
});

function setupLangSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            setActiveLangButton();
        });
    });
}

function setActiveLangButton() {
    const lang = getLanguage();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function onLanguageChange(lang) {
    if (recognition) {
        recognition.lang = getSpeechLang();
    }
    const startBtn = document.getElementById('start-recording');
    if (startBtn.disabled && startBtn.querySelector('.icon')) {
        const icon = startBtn.querySelector('.icon').outerHTML;
        startBtn.innerHTML = icon + ' ' + t('notSupported');
    }
}

// 初始化语音识别
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = getSpeechLang();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onstart = function() {
            isRecording = true;
            updateRecordingStatus(t('recording'), true);
            document.getElementById('start-recording').disabled = true;
            document.getElementById('stop-recording').disabled = false;
        };
        
        recognition.onresult = function(event) {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                }
            }
            const textarea = document.getElementById('consultation-text');
            textarea.value = textarea.value + finalTranscript;
            updateCharCount();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            updateRecordingStatus(t('recordingError') + event.error, false);
            stopRecording();
        };
        
        recognition.onend = function() {
            if (isRecording) {
                try {
                    recognition.start();
                } catch (e) {
                    stopRecording();
                }
            }
        };
    } else {
        document.getElementById('start-recording').disabled = true;
        document.getElementById('start-recording').innerHTML = '<span class="icon">⚠️</span> ' + t('notSupported');
    }
}

// 设置事件监听器
function setupEventListeners() {
    document.getElementById('start-recording').addEventListener('click', startRecording);
    document.getElementById('stop-recording').addEventListener('click', stopRecording);
    document.getElementById('clear-text').addEventListener('click', clearText);
    document.getElementById('consultation-text').addEventListener('input', function() {
        updateCharCount();
        updateButtonStates();
    });
    document.getElementById('generate-soap').addEventListener('click', generateSOAP);
    document.getElementById('recommend-exams').addEventListener('click', recommendExaminations);
    document.getElementById('check-drugs').addEventListener('click', checkDrugConflicts);
    document.getElementById('save-report').addEventListener('click', saveReport);
}

function startRecording() {
    if (recognition && !isRecording) {
        try {
            recognition.start();
        } catch (e) {
            console.error('Start recording failed:', e);
            updateRecordingStatus(t('startFailed'), false);
        }
    }
}

function stopRecording() {
    if (recognition && isRecording) {
        isRecording = false;
        recognition.stop();
        updateRecordingStatus(t('recordingStopped'), false);
        document.getElementById('start-recording').disabled = false;
        document.getElementById('stop-recording').disabled = true;
    }
}

function updateRecordingStatus(message, isRecordingStatus) {
    const statusEl = document.getElementById('recording-status');
    statusEl.textContent = message;
    statusEl.className = 'status-message' + (isRecordingStatus ? ' recording' : '');
}

function clearText() {
    if (confirm(t('confirmClear'))) {
        document.getElementById('consultation-text').value = '';
        updateCharCount();
        updateButtonStates();
    }
}

function updateCharCount() {
    const text = document.getElementById('consultation-text').value;
    document.getElementById('char-count').textContent = text.length;
}

function updateButtonStates() {
    const hasText = document.getElementById('consultation-text').value.trim().length > 0;
    document.getElementById('generate-soap').disabled = !hasText;
}

function showLoading() {
    const p = document.querySelector('#loading p');
    if (p) p.textContent = t('loading');
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

const genderValueToLabel = { not_provided: 'patientGenderPlaceholder', male: 'patientGenderMale', female: 'patientGenderFemale', other: 'patientGenderOther' };

function getPatientInfo() {
    const notProvided = t('notProvided');
    const none = t('none');
    const genderVal = document.getElementById('patient-gender').value;
    const genderLabel = genderValueToLabel[genderVal] ? t(genderValueToLabel[genderVal]) : genderVal;
    return {
        name: document.getElementById('patient-name').value || notProvided,
        age: document.getElementById('patient-age').value || notProvided,
        gender: genderVal,
        gender_display: genderLabel,
        medical_history: document.getElementById('patient-history').value || none,
        allergies: document.getElementById('patient-allergies').value || none,
        current_medications: document.getElementById('patient-medications').value || none
    };
}

async function generateSOAP() {
    const transcript = document.getElementById('consultation-text').value.trim();
    if (!transcript) {
        alert(t('enterTranscript'));
        return;
    }
    showLoading();
    try {
        const response = await fetch('/api/generate-soap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript, patient_info: getPatientInfo() })
        });
        const result = await response.json();
        if (result.success) {
            soapData = result.data;
            displaySOAP(result.data);
            document.getElementById('recommend-exams').disabled = false;
            document.getElementById('check-drugs').disabled = false;
        } else {
            alert(t('generateSOAPFailed') + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(t('requestFailed') + error.message);
    } finally {
        hideLoading();
    }
}

function displaySOAP(data) {
    const notProvided = t('notProvided');
    const errPrefix = t('error');
    if (data.error) {
        document.getElementById('soap-content').textContent = errPrefix + data.error;
    } else {
        const html = `
            <h3>${t('chiefComplaint')}</h3>
            <p>${data.chief_complaint || notProvided}</p>
            <h3>${t('subjective')}</h3>
            <p>${data.subjective || ''}</p>
            <h3>${t('objective')}</h3>
            <p>${data.objective || ''}</p>
            <h3>${t('assessment')}</h3>
            <p>${data.assessment || ''}</p>
            <h3>${t('plan')}</h3>
            <p>${data.plan || ''}</p>
            <h3>${t('preliminaryDiagnosis')}</h3>
            <ul>${(data.preliminary_diagnosis || []).map(d => `<li>${d}</li>`).join('')}</ul>
        `;
        document.getElementById('soap-content').innerHTML = html;
        document.getElementById('soap-section').classList.remove('hidden');
    }
}

async function recommendExaminations() {
    if (!soapData) {
        alert(t('generateFirst'));
        return;
    }
    showLoading();
    try {
        const transcript = document.getElementById('consultation-text').value.trim();
        const response = await fetch('/api/recommend-examinations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ soap_data: soapData, transcript })
        });
        const result = await response.json();
        if (result.success) {
            displayExaminations(result.data);
        } else {
            alert(t('recommendFailed') + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(t('requestFailed') + error.message);
    } finally {
        hideLoading();
    }
}

function displayExaminations(examinations) {
    const reason = t('reason');
    const noExams = t('noExams');
    if (!examinations || examinations.length === 0) {
        document.getElementById('examinations-content').textContent = noExams;
    } else {
        const priorityMap = { '高': 'priorityHigh', '中': 'priorityMedium', '低': 'priorityLow' };
        const high = examinations.filter(e => e.priority === '高');
        const medium = examinations.filter(e => e.priority === '中');
        const low = examinations.filter(e => e.priority === '低');
        let html = '';
        [high, medium, low].forEach((arr, i) => {
            const key = ['priorityHigh', 'priorityMedium', 'priorityLow'][i];
            if (arr.length > 0) {
                html += `<h3>${t(key)}</h3><ul>`;
                arr.forEach(e => {
                    html += `<li><strong>${e.name}</strong> (${e.type})<br>${reason}: ${e.reason}</li>`;
                });
                html += '</ul>';
            }
        });
        document.getElementById('examinations-content').innerHTML = html;
        document.getElementById('examinations-section').classList.remove('hidden');
    }
}

async function checkDrugConflicts() {
    if (!soapData || !soapData.plan) {
        alert(t('generateFirst'));
        return;
    }
    showLoading();
    try {
        const response = await fetch('/api/check-drug-conflicts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan_text: soapData.plan, patient_info: getPatientInfo() })
        });
        const result = await response.json();
        if (result.success) {
            displayDrugCheck(result.data, result.prescribed_drugs);
            document.getElementById('save-report').disabled = false;
        } else {
            alert(t('checkFailed') + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(t('requestFailed') + error.message);
    } finally {
        hideLoading();
    }
}

function displayDrugCheck(data, prescribedDrugs) {
    const severityMap = { '高': 'severityHigh', '中': 'severityMedium', '低': 'severityLow', '无': 'severityNone' };
    let html = '';
    if (prescribedDrugs && prescribedDrugs.length > 0) {
        html += `<h3>${t('detectedDrugs')}</h3><p>${prescribedDrugs.join(', ')}</p>`;
    }
    if (data.message) {
        html += `<p>${data.message}</p>`;
    } else {
        const sev = data.severity || '未知';
        const sevKey = severityMap[sev] || 'severityUnknown';
        const emoji = { severityHigh: '⚠️', severityMedium: '⚡', severityLow: 'ℹ️', severityNone: '✅', severityUnknown: '❓' };
        html += `<h3>${t('overallAssessment')}</h3><p>${emoji[sevKey] || '⚠️'} ${t(sevKey)}</p>`;
        if (data.allergy_warnings?.length) {
            html += `<h3>${t('allergyWarnings')}</h3><ul>`;
            data.allergy_warnings.forEach(w => html += `<li>⚠️ ${w}</li>`);
            html += '</ul>';
        }
        if (data.drug_interactions?.length) {
            html += `<h3>${t('drugInteractions')}</h3><ul>`;
            data.drug_interactions.forEach(i => {
                html += `<li>⚠️ ${typeof i === 'object' ? i.drugs + ': ' + i.description : i}</li>`;
            });
            html += '</ul>';
        }
        if (data.contraindications?.length) {
            html += `<h3>${t('contraindications')}</h3><ul>`;
            data.contraindications.forEach(c => html += `<li>🚫 ${c}</li>`);
            html += '</ul>';
        }
        if (data.dosage_warnings?.length) {
            html += `<h3>${t('dosageWarnings')}</h3><ul>`;
            data.dosage_warnings.forEach(w => html += `<li>⚠️ ${w}</li>`);
            html += '</ul>';
        }
        if (data.recommendations?.length) {
            html += `<h3>${t('recommendations')}</h3><ul>`;
            data.recommendations.forEach(r => html += `<li>💡 ${r}</li>`);
            html += '</ul>';
        }
        if (!data.has_conflicts && !data.allergy_warnings?.length && !data.drug_interactions?.length) {
            html += `<p>✅ ${t('noRisk')}</p>`;
        }
    }
    document.getElementById('drug-check-content').innerHTML = html;
    document.getElementById('drug-check-section').classList.remove('hidden');
}

async function saveReport() {
    showLoading();
    try {
        const patientInfo = getPatientInfo();
        const patientInfoLabel = t('reportPatientInfo');
        const consultationLabel = t('reportConsultation');
        const soapLabel = t('reportSOAP');
        const notProvided = t('notProvided');
        let report = '='.repeat(60) + '\nEHR Agent Report\n' + '='.repeat(60) + '\n\n';
        report += patientInfoLabel + '\n';
        report += `${t('reportName')}: ${patientInfo.name}\n${t('reportAge')}: ${patientInfo.age}\n${t('reportGender')}: ${patientInfo.gender_display || patientInfo.gender}\n`;
        report += `${t('reportHistory')}: ${patientInfo.medical_history}\n${t('reportAllergies')}: ${patientInfo.allergies}\n${t('reportMeds')}: ${patientInfo.current_medications}\n\n`;
        report += consultationLabel + '\n' + document.getElementById('consultation-text').value + '\n\n';
        if (soapData) {
            report += soapLabel + '\n';
            report += `${t('reportChiefComplaint')}: ${soapData.chief_complaint || notProvided}\n\n`;
            report += `Subjective:\n${soapData.subjective || ''}\n\nObjective:\n${soapData.objective || ''}\n\n`;
            report += `Assessment:\n${soapData.assessment || ''}\n\nPlan:\n${soapData.plan || ''}\n\n`;
            report += `${t('reportDiagnosis')}: ${(soapData.preliminary_diagnosis || []).join(', ')}\n\n`;
        }
        const response = await fetch('/api/save-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: report })
        });
        const result = await response.json();
        if (result.success) {
            alert(t('reportSaved') + result.filename);
        } else {
            alert(t('saveFailed') + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(t('saveFailed') + error.message);
    } finally {
        hideLoading();
    }
}
