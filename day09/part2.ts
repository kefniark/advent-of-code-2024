const content = await Deno.readTextFile("./day09/input.txt")

const toBlocks = (input: string) =>
    input.split("").reduce((acc, val, idx) => {
        acc.buffer.push([idx % 2 == 0 ? acc.id++ : -1, parseInt(val)])
        return acc
    }, { buffer: [] as [number, number][], id: 0 }).buffer

const compactFile = (input: [number, number][]) => {
    const buffer = input
    for (let i = buffer.length - 1; i > 0; i--) {
        if (buffer[i][0] == -1) continue
        const j = buffer.findIndex((x) => x[0] == -1 && x[1] >= buffer[i][1])
        if (j == -1 || j >= i) continue
        const size = buffer[j][1] - buffer[i][1]
        buffer[j][0] = buffer[i][0]
        buffer[j][1] = buffer[i][1]
        buffer[i][0] = -1
        if (size > 0) buffer.splice(j + 1, 0, [-1, size])
    }
    return buffer.map((x) => Array(x[1]).fill(x[0])).flat() as number[]
}

const checksum = (input: number[]) => input.reduce((acc, x, idx) => x != -1 ? acc + x * idx : acc, 0)

console.log(checksum(compactFile(toBlocks(content))))
