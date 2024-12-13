const content = await Deno.readTextFile("./day12/input.txt")

type vec = [number, number]
const grid = content.split("\n").map((x, j) => x.split("").map((x, i) => ({ value: x, pos: [j, i] as vec, side: 0, region: -1 })))

const getTile = (pos: vec) => grid[pos[0]][pos[1]]

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] as vec[]
const floodFill = (start: vec, id: number) => {
    const cur = getTile(start)
    if (cur.region != -1) return false

    cur.region = id
    cur.side = 4
    for (const dir of directions) {
        const nextPos = [start[0] + dir[0], start[1] + dir[1]] as vec
        if (nextPos[0] < 0 || nextPos[0] >= grid.length) continue
        if (nextPos[1] < 0 || nextPos[1] >= grid[0].length) continue

        const next = getTile(nextPos)
        if (next.value != cur.value) continue
        cur.side -= 1
        floodFill(nextPos, id)
    }
    return true
}

let regionId = 0
for (const x of grid.flat()) {
    if (floodFill(x.pos, regionId)) regionId++
}

const res = [...Array(regionId).keys()].reduce((acc, regionId) => {
    const tiles = grid.flat().filter((x) => x.region == regionId)
    return acc + tiles.length * tiles.reduce((sum, x) => sum + x.side, 0)
}, 0)
console.log(res)
