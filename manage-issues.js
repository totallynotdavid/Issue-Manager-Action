const { Octokit } = require("@octokit/rest");
const { createTokenAuth } = require("@octokit/auth-token");
const axios = require("axios");

const auth = createTokenAuth('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');

auth().then(authentication => {
  const octokit = new Octokit({
    auth: authentication.token,
  });

  manageIssues(octokit);
});

async function manageIssues(octokit) {
  try {
    const issues = await octokit.rest.issues.listForRepo({
      owner: 'caefisica',
      repo: 'web',
      state: 'open', 
    });

    const assignees = [ "totallynotdavid", "cae-unmsm" ];

    issues.data.forEach(async (issue) => {
      if (issue.pull_request) { 
        return;
      }

      /*
      if (issue.assignee === null) {
        const assignee = assignees.shift();
        assignees.push(assignee);

        try {
          await octokit.rest.issues.addAssignees({
            owner: 'caefisica',
            repo: 'web',
            issue_number: issue.number,
            assignees: [assignee],
          });
          console.log(`Issue #${issue.number} is assigned to ${assignee}`);
        } catch (err) {
          console.error(`Failed to assign issue #${issue.number} to ${assignee}`, err);
        }
      }
      */

      if (issue.title.startsWith("[📚]:")) {
        try {
          const response = await axios.get('https://raw.githubusercontent.com/caefisica/web/master/.github/ISSUE_TEMPLATE/plantilla_de_cursos.yml')
          
          const tasksSection = response.data.split('options:')[1].split('- type:')[0];
          const tasks = tasksSection.split('\n').filter(line => line.startsWith('        - label:')).map(line => line.replace('        - label:', '').trim());
      
          console.log(`Found ${tasks.length} tasks for issue #${issue.number}`)
          console.log(`The tasks are: ${tasks}`)
      
          for (const task of tasks) {
            if (!issue.body.includes(task)) {
              await octokit.rest.issues.update({
                owner: 'caefisica',
                repo: 'web',
                issue_number: issue.number,
                body: issue.body + '\n' + task,
              });
              console.log(`Added task "${task}" to issue #${issue.number}`);
            }
          }
        } catch (err) {
          console.error(`Failed to update issue #${issue.number}`, err);
        }
      }
    });
  } catch (err) {
    console.error('Failed to fetch issues', err);
  }
}
