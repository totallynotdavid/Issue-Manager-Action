const mockData = `
name: 📚 Guías de estudio
description: Sugiere una idea para el proyecto

title: |
  [📚]: Semestre [X] - [Código]
labels: [ "contenido" ]

body:
  - type: checkboxes
    id: pasos
    attributes: 
      label: Pasos
      description: |
        Para considerar esta guía como completada, debe tener la siguiente estructura:
      options:
        - label: Información (nombre, código y créditos)
        - label: Descripción del curso (objetivos y contenido)
        - label: Prerrequisitos
        - label: Temas (mínimo 4)
        - label: Libros teóricos (mínimo 5)
        - label: Libros teórico-prácticos (mínimo 3)
        - label: Libros prácticos y recomendaciones (mínimo 3)
        - label: Solucionarios (mínimo 1)
        - label: Utilizar el formato LibGen para las tablas
        - label: Comentarios y justificación de las recomendaciones de libros
        - label: Documentos (mínimo 3)
        - label: Listas de reproducción (mínimo 5)
        - label: Páginas web (mínimo 3)
        - label: Sílabos
        - label: Docentes
        - label: Agrupar docentes y sílabos en secciones desplegables (opciones para mostrar y ocultar información)

  - type: input
    id: curso
    attributes:
      label: Curso
      description: Escribe el nombre del curso
      placeholder: |
        Ejemplo: "Álgebra Lineal"
    validations:
      required: true

  - type: input
    id: codigo
    attributes:
      label: Código
      description: Escribe el código del curso
      placeholder: |
        Ejemplo: "CFO304"
    validations:
      required: true
`;

module.exports = {
  get: jest.fn(() => Promise.resolve({ data: mockData }))
};
