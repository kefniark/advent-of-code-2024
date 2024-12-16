const content = await Deno.readTextFile("./day15/input.txt")

type vec = [number, number]
const directions: Record<string, vec> = {
    "<": [0, -1],
    ">": [0, 1],
    "v": [1, 0],
    "^": [-1, 0],
}
const map = content.split("\n").filter((x) => x[0] === "#").map((x) => x.split(""))
const moves = content.split("\n").filter((x) => x[0] !== "#" && x.trim() != "").join("")

const find = (ch: string) => {
    for (let y = 0; y < map.length; y++) {
        const x = map[y].indexOf(ch)
        if (x !== -1) return [y, x] as vec
    }
}

const print = () => map.map((y) => y.join("")).join("\n")

const move = (pos: vec, dir: string) => {
    const vel = directions[dir]
    if (!vel) throw new Error("wtf is " + dir)
    const cur = map[pos[0]][pos[1]]
    const next = map[pos[0] + vel[0]][pos[1] + vel[1]]
    if (cur == "#" || next == "#") return false
    if (next == ".") {
        map[pos[0] + vel[0]][pos[1] + vel[1]] = map[pos[0]][pos[1]]
        map[pos[0]][pos[1]] = "."
        return true
    }
    if (move([pos[0] + vel[0], pos[1] + vel[1]], dir)) {
        move(pos, dir)
        return true
    }
    return false
}

const moveRobot = (dir: string) => {
    if (move(robot!, dir)) {
        const vel = directions[dir]
        robot = [robot[0] + vel[0], robot[1] + vel[1]]
    }
}

let robot = find("@")!
map[robot[0]][robot[1]] = "."
console.log(print())

moves.split("").forEach((x) => moveRobot(x))
console.log(print())

let sum = 0
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] !== "O") continue
        sum += 100 * y + x
    }
}
console.log(sum)
