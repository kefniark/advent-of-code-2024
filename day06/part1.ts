const content = await Deno.readTextFile("./day06/input.txt")
const orientation = [[-1, 0], [0, 1], [1, 0], [0, -1]] as vec[]
const tileId = (pos: vec) => `${pos[0]}:${pos[1]}`

// parse input (map & start location)
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
        this.visited.add(tileId(pos))
    }

    rotate() {
        this.dir = (this.dir + 1) % orientation.length
    }

    move(newPos: vec) {
        this.pos = newPos
        this.visited.add(tileId(this.pos))
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
            this.move(nextPos)
        }
    }
}

const guard = new Guard(guardOriginalPos)
guard.walk(map)
console.log(guard.visited.size)
