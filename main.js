const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
});

const updateIssue = require('./components/body').updateIssue;
const updateLabels = require('./components/labels').updateLabels;

async function main() {
  const { data: issues } = await octokit.issues.listForRepo({
    owner: 'caefisica',
    repo: 'web',
  });

  for (const issue of issues) {
    if (issue.title.startsWith('[📚]:')) {
      await updateIssue(issue, octokit);
      await updateLabels(issue, octokit);

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

main().catch(console.error);
