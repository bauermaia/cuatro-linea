// CREA UN OBJETO CON LOS TURNOS
export const turns = {
  X: 'X',
  O: 'O'
}

// crea un array con todas las combinaciones ganadoras
export const winner_combos = [
// horizontales
[0, 1, 2, 3],[1, 2, 3, 4],
[5, 6, 7, 8],[6, 7, 8, 9],
[10, 11, 12, 13],[11, 12, 13, 14],
[15, 16, 17, 18],[16, 17, 18, 19],

// verticales
[0, 5, 10, 15],
[1, 6, 11, 16],
[2, 7, 12, 17],
[4, 9, 14, 19],

// diagonales
[0, 6, 12, 18],
[3, 7, 11, 15],
[4, 8, 12, 16],
[1, 7, 13, 19]
]
