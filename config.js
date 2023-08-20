const core = require('@actions/core');

module.exports = {
    org: core.getInput('org'),
    repo: core.getInput('repo'),
    branch: core.getInput('branch'),
    templateName: core.getInput('templateName'),
    issuePrefix: core.getInput('issuePrefix'),
    gifURL: core.getInput('gifURL'),

    get issueTemplateURL() {
        return `https://github.com/${this.org}/${this.repo}/blob/${this.branch}/.github/ISSUE_TEMPLATE/${this.templateName}`;
    },
    get rawIssueTemplateURL() {
        return `${this.issueTemplateURL}?raw=true`;
    }
};