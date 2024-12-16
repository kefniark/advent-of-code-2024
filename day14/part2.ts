const content = await Deno.readTextFile("./day14/input.txt")

type vec = [number, number]
const regexLine = /p=(?<position>\S+) v=(?<velocity>\S+)$/gm
const size: vec = [101, 103]
// const size: vec = [11, 7]
const robots = [
    ...content.matchAll(regexLine).map((x, i) => ({
        id: i,
        position: x.groups.position.split(",").map((y) => parseInt(y)) as vec,
        velocity: x.groups.velocity.split(",").map((y) => parseInt(y)) as vec,
    })),
]

const tick = () => {
    for (const robot of robots) {
        robot.position[0] = ((robot.position[0] + robot.velocity[0]) + 100 * size[0]) % size[0]
        robot.position[1] = ((robot.position[1] + robot.velocity[1]) + 100 * size[1]) % size[1]
    }
}

const hasRow = () => {
    for (let y = 0; y < size[1] / 2; y++) {
        let line = ""
        for (let x = 0; x < size[0]; x++) {
            const count = robots.filter((r) => r.position[0] === x && r.position[1] === y).length
            line += count > 0 ? count.toString() : "."
        }
        if (line.indexOf("111111111") !== -1) return true
    }
    return false
}

const print = () => {
    for (let y = 0; y < size[1]; y++) {
        let line = ""
        for (let x = 0; x < size[0]; x++) {
            const count = robots.filter((r) => r.position[0] === x && r.position[1] === y).length
            line += count > 0 ? count.toString() : "."
        }
        console.log(line)
    }
}

print()

let iteration = 1
while (true) {
    tick()
    if (hasRow()) {
        break
    } else {
        iteration++
    }
}

print()
console.log("iteration=", iteration)
