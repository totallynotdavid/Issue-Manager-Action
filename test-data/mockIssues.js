module.exports = [
    /* Caso donde las tareas ya no coinciden con las tareas actuales */
    {
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
    /* Caso donde algunas tareas coinciden con las tareas actualizadas y están terminadas */
    {
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
    /* Caso donde solo hay una tarea completada */
    {
        number: 123,
        body: `### Pasos

- [X] Temas (mínimo 4)

### Curso

Termodinámica

### Código

CFO604`
    },
    /* Caso donde solo hay una tarea sin completar */
    {
        number: 123,
        body: `### Pasos

- [ ] Temas (mínimo 4)

### Curso

Termodinámica

### Código

CFO604`
    }
];