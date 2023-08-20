const config = require('../config');

function generateComment(totalTasksUpdated) {
    const commentBody = `¡Hola! Hemos hecho algunas actualizaciones a este Issue:
- Añadido: ${totalTasksUpdated.added} tareas
- Eliminado: ${totalTasksUpdated.deleted} tareas
- Sin cambios: ${totalTasksUpdated.unchanged} tareas

Revisa la nueva plantilla [aquí](${config.issueTemplateURL}).`;

    const gifMarkup = (config.useGif && config.gifURL) ? `\n<img src="${config.gifURL}" height="250"/>` : '';

    return commentBody + gifMarkup;
}

module.exports = {
    generateComment
};