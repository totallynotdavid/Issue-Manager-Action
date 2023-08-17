const { updateIssue } = require('../components/body');
const { issues } = require('octokit');

jest.mock('axios');
jest.mock('octokit');

describe('updateIssue', () => {
    it('should correctly format the issue according to the template', async () => {
        const mockIssue = {
            number: 123,
            body: `### Pasos

- [ ] Temas, detallar qué temas se desarrollan en el curso
- [X] Libros teóricos, junto a comentarios de los motivos de la recomendación
- [ ] Libros prácticos, junto a comentarios de los motivos de la recomendación
- [X] Videos, por ejemplo, puede incluir canales de Youtube
- [ ] Sílabo

### Curso

Termodinámica

### Código

CFO604`
        };

        await updateIssue(mockIssue, { issues });

        const expectedBody = `### Pasos

- [ ] Información (nombre, código y créditos)
- [ ] Descripción del curso (objetivos y contenido)
- [ ] Prerrequisitos
- [ ] Temas (mínimo 4)
- [ ] Libros teóricos (mínimo 5)
- [ ] Libros teórico-prácticos (mínimo 3)
- [ ] Libros prácticos y recomendaciones (mínimo 3)
- [ ] Solucionarios (mínimo 1)
- [ ] Utilizar el formato LibGen para las tablas
- [ ] Comentarios y justificación de las recomendaciones de libros
- [ ] Documentos (mínimo 3)
- [ ] Listas de reproducción (mínimo 5)
- [ ] Páginas web (mínimo 3)
- [ ] Sílabos
- [ ] Docentes
- [ ] Agrupar docentes y sílabos en secciones desplegables (opciones para mostrar y ocultar información)

### Curso

Termodinámica

### Código

CFO604`;

        expect(issues.update).toHaveBeenCalledWith(expect.objectContaining({
            body: expectedBody
        }));
    });

});
