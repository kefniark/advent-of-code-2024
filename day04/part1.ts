const content = await Deno.readTextFile("./day04/input.txt")

const data = content.split("\n").map((x) => x.split(""))
const maxY = data.length
const maxX = data[0].length

const isValidWord = (x: number, y: number, dx: number, dy: number): number => {
    if ((y + dy * 3) >= maxY || (y + dy * 3) < 0) return 0 // check vertical boundary
    if ((x + dx * 3) >= maxX || (x + dx * 3) < 0) return 0 // check horizontal boundary
    return data[y][x] == "X" && data[y + dy][x + dx] == "M" && data[y + dy * 2][x + dx * 2] == "A" && data[y + dy * 3][x + dx * 3] == "S" ? 1 : 0
}

// check 8 possible directions
const directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
const evalPosition = (x: number, y: number): number => directions.reduce((acc, dir) => acc + isValidWord(x, y, dir[1], dir[0]), 0)

let count = 0
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        count += evalPosition(x, y)
    }
}
console.log(count)
