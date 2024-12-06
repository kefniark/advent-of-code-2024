const content = await Deno.readTextFile("./day04/input.txt")

const data = content.split("\n").map((x) => x.split(""))
const maxY = data.length
const maxX = data[0].length

const isValidWord = (x: number, y: number, dx: number, dy: number): boolean => {
    if ((y + dy) >= maxY || (y + dy) < 0 || (y - dy) >= maxY || (y - dy) < 0) return false // check vertical boundary
    if ((x + dx) >= maxX || (x + dx) < 0 || (x - dx) >= maxX || (x - dx) < 0) return false // check horizontal boundary
    return "MAS".split("").every((letter, idx) => data[y + dy * (idx - 1)][x + dx * (idx - 1)] === letter)
}

// evaluate only 4 possible diagonals from a starting point (x,y)
const directions = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
const evalPosition = (x: number, y: number): boolean =>
    directions.reduce((acc, dir) => acc + (isValidWord(x, y, dir[1], dir[0]) ? 1 : 0), 0) == 2

let count = 0
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        count += evalPosition(x, y) ? 1 : 0
    }
}
console.log(count)
