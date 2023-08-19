module.exports = [
  {
    /* Caso donde las tareas ya no coinciden con las tareas actuales */
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
  },
  {
    /* Caso donde algunas tareas coinciden con las tareas actualizadas y están terminadas */
    number: 1234,
    body: `### Pasos

- [ ] Temas, detallar qué temas se desarrollan en el curso
- [ ] Libros teóricos, junto a comentarios de los motivos de la recomendación
- [ ] Libros prácticos, junto a comentarios de los motivos de la recomendación
- [X] Listas de reproducción (mínimo 5)
- [X] Sílabos

### Curso

Termodinámica

### Código

CFO604`
  },
  {
    /* ¡Caso donde una tarea ya fue actualizada antes y no requiere de cambios! */
    number: 1234,
    body: `### Pasos

- [ ] Información (nombre, código y créditos)
- [ ] Descripción del curso (objetivos y contenido)
- [ ] Prerrequisitos
- [X] Temas (mínimo 4)
- [X] Libros teóricos (mínimo 5)
- [X] Libros teórico-prácticos (mínimo 3)
- [X] Libros prácticos y recomendaciones (mínimo 3)
- [X] Solucionarios (mínimo 1)
- [ ] Utilizar el formato LibGen para las tablas
- [ ] Comentarios y justificación de las recomendaciones de libros
- [ ] Documentos (mínimo 3)
- [X] Listas de reproducción (mínimo 5)
- [ ] Páginas web (mínimo 3)
- [X] Sílabos
- [ ] Docentes
- [ ] Agrupar docentes y sílabos en secciones desplegables (opciones para mostrar y ocultar información)

### Curso

Termodinámica

### Código

CFO604`
  },
  {
    /* Caso donde solo hay una tarea completada */
    number: 123,
    body: `### Pasos

- [X] Temas (mínimo 4)

### Curso

Termodinámica

### Código

CFO604`
  },
  {
    /* Caso donde solo hay una tarea sin completar */
    number: 123,
    body: `### Pasos

- [ ] Temas (mínimo 4)

### Curso

Termodinámica

### Código

CFO604`
  }
]