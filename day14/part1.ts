const content = await Deno.readTextFile("./day14/input.txt")

type vec = [number, number]
const regexLine = /p=(?<position>\S+) v=(?<velocity>\S+)$/gm
const size: vec = [101, 103]
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

const count = () => {
    const dx = (size[0] - 1) / 2
    const dy = (size[1] - 1) / 2
    const m = new Map<number, number>()

    robots.forEach((r) => {
        if (r.position[0] == dx || r.position[1] == dy) return null
        const id = (r.position[0] < dx ? 0 : 1) + 1000 * (r.position[1] < dy ? 0 : 1)
        m.set(id, (m.get(id) ?? 0) + 1)
    })
    return m
}

for (let i = 0; i < 100; i++) {
    tick()
}

console.log(count().values().reduce((acc, x) => acc * x, 1))
