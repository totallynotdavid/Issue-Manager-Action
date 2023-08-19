const { Octokit } = require('@octokit/rest');
const config = require('./config');

const octokit = new Octokit({
    auth: process.env.ISSUE_TOKEN,  // eslint-disable-line no-undef
});

const updateIssue = require('./components/body').updateIssue;
const updateLabels = require('./components/labels').updateLabels;

async function main() {
    const { data: issues } = await octokit.issues.listForRepo({
        owner: config.org,
        repo: config.repo,
    });

    for (const issue of issues) {
        if (issue.title.startsWith(config.issuePrefix)) {
            await updateIssue(issue, octokit);
            await updateLabels(issue, octokit);

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

main().catch(console.error);
