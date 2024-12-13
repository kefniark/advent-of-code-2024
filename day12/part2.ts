const content = await Deno.readTextFile("./day12/input.txt")

type vec = [number, number]
const grid = content.split("\n").map((x, j) =>
    x.split("").map((x, i) => ({ value: x, pos: [j, i] as vec, side: [0, 0, 0, 0], region: -1 }))
)

const getTile = (pos: vec) => grid[pos[0]][pos[1]]

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] as vec[]
const floodFill = (start: vec, id: number) => {
    const cur = getTile(start)
    if (cur.region != -1) return false

    cur.region = id
    for (const dirId in directions) {
        const dir = directions[dirId]
        cur.side[dirId] = 1

        const nextPos = [start[0] + dir[0], start[1] + dir[1]] as vec
        if (nextPos[0] < 0 || nextPos[0] >= grid.length) continue
        if (nextPos[1] < 0 || nextPos[1] >= grid[0].length) continue

        const next = getTile(nextPos)
        if (next.value != cur.value) continue
        cur.side[dirId] = 0
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
    return acc + tiles.length * tiles.reduce((sum, tile) => {
                let corners = 0
                for (let dirId = 0; dirId < 4; dirId++) {
                    if (tile.side[dirId] == 1 && tile.side[(dirId + 1) % 4] == 1) {
                        // count convex corner (check 2 side of the tile)
                        corners += 1
                    } else if (tile.side[dirId] == 0 && tile.side[(dirId + 1) % 4] == 0) {
                        // count concave corner (check 2 side of the diag tile)
                        const other = getTile([
                            tile.pos[0] + (directions[dirId][0] || directions[(dirId + 1) % 4][0]),
                            tile.pos[1] + (directions[dirId][1] || directions[(dirId + 1) % 4][1]),
                        ])
                        if (other.side[(dirId + 2) % 4] == 1 && other.side[(dirId + 3) % 4] == 1) {
                            corners += 1
                        }
                    }
                }
                return sum + corners
            }, 0)
}, 0)
console.log(res)
