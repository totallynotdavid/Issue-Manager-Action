const axios = require('axios');
const yaml = require('js-yaml');
const config = require('../config');
const { generateComment } = require('../message');

async function fetchTemplate() {
    try {
        const response = await axios.get(config.rawIssueTemplateURL);
        return yaml.load(response.data);
    } catch (error) {
        throw new Error(`No se pudo obtener la plantilla de ${config.rawIssueTemplateURL}: ${error.message}`);
    }
}

function extractIssueSections(issueBody, section) {
    switch (section.type) {
    case 'checkboxes':
        return extractCheckboxSection(issueBody, section);
    case 'input':
        return extractInputSection(issueBody, section);
    default:
        return '';
    }
}

function extractCheckboxSection(issueBody, section) {
    const templateTasks = section.attributes.options.map(option => `- [ ] ${option.label}`);
    const issueTasksChecked = issueBody.match(/- \[[xX]\] .+/gi) || [];
    const issueTasksUnchecked = issueBody.match(/- \[\s\] .+/gi) || [];

    for (let i = 0; i < templateTasks.length; i++) {
        const taskLabel = templateTasks[i].slice(5);

        const checkedIndex = issueTasksChecked.findIndex(task => task.includes(taskLabel));
        const uncheckedIndex = issueTasksUnchecked.findIndex(task => task.includes(taskLabel));

        if (checkedIndex !== -1) {
            templateTasks[i] = issueTasksChecked[checkedIndex];
        } else if (uncheckedIndex !== -1) {
            templateTasks[i] = issueTasksUnchecked[uncheckedIndex];
        }
    }

    return `### ${section.attributes.label}\n\n${templateTasks.join('\n')}\n\n`;
}

function extractInputSection(issueBody, section) {
    const pattern = new RegExp(`### ${section.attributes.label}\\n\\n([^#]+)`);
    const sectionContent = issueBody.match(pattern);
    const sectionData = sectionContent ? sectionContent[1].trim() : section.attributes.label;
    return `### ${section.attributes.label}\n\n${sectionData}\n\n`;
}

function calculateTaskDifferences(oldBody, newBody) {
    const oldTasks = oldBody.match(/- \[[xX\s]\] .+/gi) || [];
    const newTasks = newBody.match(/- \[[xX\s]\] .+/gi) || [];

    const addedTasks = newTasks.filter(task => !oldTasks.includes(task));
    const deletedTasks = oldTasks.filter(task => !newTasks.includes(task));
    const unchangedTasks = oldTasks.filter(task => newTasks.includes(task));

    return {
        added: addedTasks.length,
        deleted: deletedTasks.length,
        unchanged: unchangedTasks.length
    };
}

async function updateIssue(issue, octokit) {
    try {
        const template = await fetchTemplate();
        const newBody = template.body.map(section => extractIssueSections(issue.body, section)).join('').trim();

        if (issue.body.trim() !== newBody) {
            const totalTasksUpdated = calculateTaskDifferences(issue.body, newBody);

            await octokit.issues.update({
                owner: config.org,
                repo: config.repo,
                issue_number: issue.number,
                body: newBody
            });
            console.log(`✅ Issue #${issue.number} actualizado`);

            await octokit.issues.createComment({
                owner: config.org,
                repo: config.repo,
                issue_number: issue.number,
                body: generateComment(totalTasksUpdated),
            });
        } else {
            console.log(`Sin cambios requeridos para el issue #${issue.number}`);
        }
        return newBody;
    } catch (err) {
        console.error(`No se pudo actualizar el issue #${issue.number}`, err);
    }
}

module.exports = {
    updateIssue,
    fetchTemplate
};
