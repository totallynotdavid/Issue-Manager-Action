const axios = require('axios');
const yaml = require('js-yaml');

async function updateIssue(issue, octokit) {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/caefisica/web/master/.github/ISSUE_TEMPLATE/plantilla_de_cursos.yml');
        const template = yaml.load(response.data);

        let newBody = '';

        for (const section of template.body) {
            if (section.type === 'checkboxes') {
                let tasks = section.attributes.options.map(option => `- [ ] ${option.label}`);

                const completedTasks = issue.body.match(/- \[x\] .+/gi);
                if (completedTasks) {
                    for (const completedTask of completedTasks) {
                        const taskIndex = tasks.findIndex(task => task.slice(5) === completedTask.slice(5));
                        if (taskIndex !== -1) {
                            tasks[taskIndex] = completedTask;
                        }
                    }
                }

                newBody += `### ${section.attributes.label}\n\n` + tasks.join('\n') + '\n\n';
            } else if (section.type === 'input') {
                const sectionContent = issue.body.match(new RegExp(`### ${section.attributes.label}\n\n(.+)\n`));
                const sectionData = sectionContent ? sectionContent[1] : section.attributes.label;
                newBody += `### ${section.attributes.label}\n\n${sectionData}\n\n`;
            }
        }

        await octokit.issues.update({
            owner: 'caefisica',
            repo: 'web',
            issue_number: issue.number,
            body: newBody
        });

        console.log(`Updated issue #${issue.number}`);
  
        await octokit.issues.createComment({
            owner: 'caefisica',
            repo: 'web',
            issue_number: issue.number,
            body: `¡Hola! Actualizamos este problema al formato de nuestra nueva plantilla estandarizada. Esto mejora la gestión y priorización de los problemas. Conservamos tus tareas completadas. Puedes revisar la nueva estructura [aquí](https://github.com/caefisica/web/blob/master/.github/ISSUE_TEMPLATE/plantilla_de_cursos.yml).\n\n![MomoBot Gif](https://media.tenor.com/t8ZbssN1A9kAAAAd/momo-twice.gif)`,
        });

    } catch (err) {
        console.error(`Failed to update issue #${issue.number}`, err);
    }
}

module.exports = {
    updateIssue,
};