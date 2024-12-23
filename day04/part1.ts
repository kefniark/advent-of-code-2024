const content = await Deno.readTextFile("./day04/input.txt")

const data = content.split("\n").map((x) => x.split(""))
const maxY = data.length
const maxX = data[0].length

const isValidWord = (x: number, y: number, dx: number, dy: number): boolean => {
    if ((y + dy * 3) >= maxY || (y + dy * 3) < 0) return false // check vertical boundary
    if ((x + dx * 3) >= maxX || (x + dx * 3) < 0) return false // check horizontal boundary
    return "XMAS".split("").every((letter, idx) => data[y + dy * idx][x + dx * idx] === letter)
}

// evaluate 8 possible directions from a starting point (x,y)
const directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
const evalPosition = (x: number, y: number): number => directions.reduce((acc, dir) => acc + (isValidWord(x, y, dir[1], dir[0]) ? 1 : 0), 0)

let count = 0
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        count += evalPosition(x, y)
    }
}
console.log(count)
