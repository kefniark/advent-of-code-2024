const content = await Deno.readTextFile("./day06/input.txt")
const orientation = [[-1, 0], [0, 1], [1, 0], [0, -1]] as vec[]
const tileId = (pos: vec, dir: number) => `${pos[0]}:${pos[1]}:${dir}`

const map = content.split("\n").map((row) => row.split("").map((y) => y != "^" ? y : "."))
const guardOriginalPos = content.split("\n").map((row, j) =>
    row.split("").map((letter, i) => letter === "^" ? [j, i] : null).filter((x) => !!x).flat()
).flat() as vec

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
        this.dir = (this.dir + 1) % orientation.length
        this.visited.add(tileId(this.pos, this.dir))
    }

    move(newPos: vec) {
        this.pos = newPos
        this.visited.add(tileId(this.pos, this.dir))
    }

    walk(grid: string[][]) {
        while (true) {
            const nextPos: vec = [
                this.pos[0] + orientation[this.dir][0],
                this.pos[1] + orientation[this.dir][1],
            ]
            if (nextPos[0] < 0 || nextPos[0] >= map.length) break
            if (nextPos[1] < 0 || nextPos[1] >= map[0].length) break

            if (grid[nextPos[0]][nextPos[1]] == "#") {
                this.rotate()
                continue
            }

            // it's a loop
            if (this.visited.has(tileId(nextPos, this.dir))) return true
            this.move(nextPos)
        }
    }
}

const newMapWithObstacle = (pos: vec) => map.map((row, j) => row.map((cell, i) => pos[0] == j && pos[1] == i ? "#" : cell))

let loop = 0
map.forEach((row, j) =>
    row.forEach((_, i) => {
        if (map[j][i] != ".") return
        const guard = new Guard(guardOriginalPos)
        if (guard.walk(newMapWithObstacle([j, i]))) loop += 1
    })
)
console.log(loop)
