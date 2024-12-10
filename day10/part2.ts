const content = await Deno.readTextFile("./day10/input.txt")

type Tile = { val: number; y: number; x: number }
type Trail = { tiles: Tile[] }

const grid = content.split("\n").map((row) => row.split("").map((x) => parseInt(x)))
const tiles = grid.map((row, y) => row.map((val, x) => ({ val, y, x } as Tile)))

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] as [number, number][]
const walk = (path: Trail, current: Tile): Trail[] => {
    return directions.map((dir) => {
        if (current.y + dir[0] < 0 || current.y + dir[0] >= tiles.length) return null
        if (current.x + dir[1] < 0 || current.x + dir[1] >= tiles[0].length) return null
        if (tiles[current.y + dir[0]][current.x + dir[1]].val !== current.val + 1) return null
        if (tiles[current.y + dir[0]][current.x + dir[1]].val === 9) {
            return { tiles: [...path.tiles, current, tiles[current.y + dir[0]][current.x + dir[1]]] }
        }
        return walk({ tiles: [...path.tiles, current] }, tiles[current.y + dir[0]][current.x + dir[1]])
    }).filter((x) => !!x).flat()
}

const total = tiles.flat()
    .filter((x) => x.val === 0)
    .reduce((acc, cur) => acc + walk({ tiles: [] }, cur).length, 0)
console.log(total)
