module.exports = {
  org: 'caefisica',
  repo: 'web',
  branch: 'master',
  templateName: 'plantilla_de_cursos.yml',
  get issueTemplateURL() {
      return `https://github.com/${this.org}/${this.repo}/blob/${this.branch}/.github/ISSUE_TEMPLATE/${this.templateName}`;
  },
  get rawIssueTemplateURL() {
      return `${this.issueTemplateURL}?raw=true`;
  },
  issuePrefix: '[📚]:',
  gifURL: 'https://media.tenor.com/t8ZbssN1A9kAAAAd/momo-twice.gif'
};