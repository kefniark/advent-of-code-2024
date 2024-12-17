const content = await Deno.readTextFile("./day16/input.txt")

type vec = [number, number]
type ReindeerStatus = {
    position: vec
    dir: number
    point: number
    parent: vec
}

const directions: vec[] = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const grid = content.split("\n").map((x) => x.split(""))

const find = (ch: string) => {
    for (let y = 0; y < grid.length; y++) {
        const x = grid[y].indexOf(ch)
        if (x !== -1) return [y, x] as vec
    }
}

const getId = (pos: vec) => pos[0] * 100000 + pos[1]

const walk = (status: ReindeerStatus, visited: Map<number, ReindeerStatus>) => {
    const moves: ReindeerStatus[] = [
        {
            position: [status.position[0] + directions[status.dir][0], status.position[1] + directions[status.dir][1]],
            dir: status.dir,
            point: status.point + 1,
            parent: status.position,
        },
        {
            position: [status.position[0] + directions[(status.dir + 1) % 4][0], status.position[1] + directions[(status.dir + 1) % 4][1]],
            dir: (status.dir + 1) % 4,
            point: status.point + 1001,
            parent: status.position,
        },
        {
            position: [status.position[0] + directions[(status.dir + 3) % 4][0], status.position[1] + directions[(status.dir + 3) % 4][1]],
            dir: (status.dir + 3) % 4,
            point: status.point + 1001,
            parent: status.position,
        },
    ]
    for (const mv of moves) {
        if (grid[mv.position[0]][mv.position[1]] === "#") continue
        const id = getId(mv.position)
        const next = visited.get(id)
        if (next && next.point < mv.point) continue
        visited.set(id, mv)
        walk(mv, visited)
    }
}

const startPoint = find("S")!
const endPoint = find("E")!

const visited = new Map<number, ReindeerStatus>()
walk({ position: startPoint, dir: 1, point: 0, parent: startPoint }, visited)
console.log(visited)
console.log(grid, startPoint, endPoint, visited.get(getId(endPoint)))
