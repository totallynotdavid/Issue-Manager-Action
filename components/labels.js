async function updateLabels(issue, octokit) {
    let labelsToAdd = ['documentación', 'contenido'];

    if (!issue.assignee) {
        labelsToAdd.push('ayuda');
    }

    await octokit.issues.update({
        owner: 'caefisica',
        repo: 'web',
        issue_number: issue.number,
        labels: labelsToAdd,
    });
}

module.exports = {
    updateLabels,
};