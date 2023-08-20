const config = require('../config');

async function updateLabels(issue, octokit) {
    let labelsToAdd = ['documentación', 'contenido'];

    const existingLabels = issue.labels.map(label => label.name);
    labelsToAdd = labelsToAdd.filter(label => !existingLabels.includes(label));

    if (!issue.assignee && !existingLabels.includes('ayuda')) {
        labelsToAdd.push('ayuda');
    }

    if (labelsToAdd.length) {
        await octokit.issues.addLabels({
            owner: config.org,
            repo: config.repo,
            issue_number: issue.number,
            labels: labelsToAdd,
        });
    }
}

module.exports = {
    updateLabels,
};