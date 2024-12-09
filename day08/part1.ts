const content = await Deno.readTextFile("./day08/input.txt")

type vec = [number, number]

const getId = (x: vec) => `${x[0]}:${x[1]}`

const findAntinode = (input: vec[]) => {
    const res: vec[] = []
    for (const a of input) {
        for (const b of input) {
            if (a == b) continue
            const anti: vec = [2 * a[0] - b[0], 2 * a[1] - b[1]]
            if (anti[0] < 0 || anti[0] >= grid.length) continue
            if (anti[1] < 0 || anti[1] >= width) continue
            res.push(anti)
        }
    }
    return res
}

const grid = content.split("\n").map((row) => row.split(""))
const width = grid[0].length

const antennas = grid.flat().reduce((set, val, i) => {
    set.set(val, [...(set.get(val) ?? []), [Math.floor(i / width), i % width]])
    return set
}, new Map<string, vec[]>())

const antinodes = new Set(
    [...antennas.keys()]
        .filter((x) => x != ".")
        .map((freq) => findAntinode(antennas.get(freq)!).map((x) => getId(x))).flat(),
)

const res = grid.flat().reduce((acc, _, i) => acc + (antinodes.has(getId([Math.floor(i / width), i % width])) ? 1 : 0), 0)
console.log(res)
