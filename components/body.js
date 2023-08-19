const axios = require('axios');
const yaml = require('js-yaml');
const config = require('../config');

async function updateIssue(issue, octokit) {
  try {
      const response = await axios.get(config.issueTemplateURL);
      const template = yaml.load(response.data);

      let newBody = '';

      for (const section of template.body) {
          if (section.type === 'checkboxes') {
              const templateTasks = section.attributes.options.map(option => `- [ ] ${option.label}`);
              const issueTasksChecked = issue.body.match(/- \[[xX]\] .+/gi) || [];
              const issueTasksUnchecked = issue.body.match(/- \[\s\] .+/gi) || [];

              for (let i = 0; i < templateTasks.length; i++) {
                  const taskLabel = templateTasks[i].slice(5).trim();

                  const checkedIndex = issueTasksChecked.findIndex(task => task.trim().includes(taskLabel));
                  const uncheckedIndex = issueTasksUnchecked.findIndex(task => task.trim().includes(taskLabel));

                  if (checkedIndex !== -1) {
                      templateTasks[i] = issueTasksChecked[checkedIndex];
                  } else if (uncheckedIndex !== -1) {
                      templateTasks[i] = issueTasksUnchecked[uncheckedIndex];
                  }
              }

              newBody += `### ${section.attributes.label}\n\n` + templateTasks.join('\n') + '\n\n';
          } else if (section.type === 'input') {
              const pattern = new RegExp(`### ${section.attributes.label}\\n\\n([^#]+)`);
              const sectionContent = issue.body.match(pattern);
              const sectionData = sectionContent ? sectionContent[1].trim() : section.attributes.label;
              newBody += `### ${section.attributes.label}\n\n${sectionData}\n\n`;
          }
      }

      newBody = newBody.trim();

      if (issue.body.trim() !== newBody) {
          await octokit.issues.update({
              owner: config.org,
              repo: config.repo,
              issue_number: issue.number,
              body: newBody
          });

          console.log(`Updated issue #${issue.number}`);
          await octokit.issues.createComment({
              owner: config.org,
              repo: config.repo,
              issue_number: issue.number,
              body: '¡Hola! Hemos hecho algunas actualizaciones a este Issue en base a nuestra nueva plantilla estandarizada. Puedes revisar los cambios [aquí](https://github.com/caefisica/web/blob/master/.github/ISSUE_TEMPLATE/plantilla_de_cursos.yml).\n\n<img src="https://media.tenor.com/t8ZbssN1A9kAAAAd/momo-twice.gif" height="250"/>',
          });
      } else {
          console.log(`No changes required for issue #${issue.number}`);
      }
  } catch (err) {
      console.error(`Failed to update issue #${issue.number}`, err);
  }
}

module.exports = {
    updateIssue,
};