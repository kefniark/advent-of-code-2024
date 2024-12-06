const content = await Deno.readTextFile("./day06/input.txt")

const mapData = content.split("\n").map((row) => row.split("").map((y) => y != "^" ? y : "."))
const originalPos = content.split("\n").map((row, j) =>
    row.split("").map((letter, i) => letter === "^" ? [j, i] : null).filter((x) => !!x).flat()
).flat() as vec

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] as vec[]
const tileId = (pos: vec, dir: number) => `${pos[0]}:${pos[1]}:${dir}`
type vec = [number, number]

class Guard {
    pos: vec
    dir: number = 0
    visited: Set<string> = new Set()

    constructor(pos: vec) {
        this.pos = pos
        this.visited.add(tileId(pos, this.dir))
    }

    rotate() {
        this.dir = (this.dir + 1) % directions.length
        this.visited.add(tileId(this.pos, this.dir))
    }

    move(newPos: vec) {
        this.pos = newPos
        this.visited.add(tileId(this.pos, this.dir))
    }

    walk(grid: string[][]) {
        while (true) {
            const nextPos: vec = [this.pos[0] + directions[this.dir][0], this.pos[1] + directions[this.dir][1]]
            if (nextPos[0] < 0 || nextPos[0] >= mapData.length) break
            if (nextPos[1] < 0 || nextPos[1] >= mapData[0].length) break
            if (grid[nextPos[0]][nextPos[1]] == "#") this.rotate()
            else if (this.visited.has(tileId(nextPos, this.dir))) return true // it's a loop
            else this.move(nextPos)
        }
    }
}

// To get the list of usually visited tiles (we can discard others)
const baseGuard = new Guard(originalPos)
baseGuard.walk(mapData)

let loop = 0
mapData.forEach((row, j) =>
    row.forEach((_, i) => {
        if (mapData[j][i] != ".") return
        if (!directions.some((_, x) => baseGuard.visited.has(tileId([j, i], x)))) return

        const guard = new Guard(originalPos)
        const newMap = mapData.map((row, y) => row.map((cell, x) => y == j && x == i ? "#" : cell))
        if (guard.walk(newMap)) loop += 1
    })
)
console.log(loop)
