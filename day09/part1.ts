const content = await Deno.readTextFile("./day09/input.txt")

const toBlocks = (input: string) =>
    input.split("").reduce((acc, val, idx) => {
        acc.buffer.push([idx % 2 == 0 ? acc.id++ : -1, parseInt(val)])
        return acc
    }, { buffer: [] as [number, number][], id: 0 }).buffer

const compactFile = (input: [number, number][]) => {
    const tmp = input.map((x) => Array(x[1]).fill(x[0])).flat()
    for (let i = tmp.length - 1; i > 0; i--) {
        if (tmp[i] == -1) continue
        const j = tmp.findIndex((x) => x == -1)
        if (j == -1 || j >= i) continue
        tmp[j] = tmp[i]
        tmp[i] = -1
    }
    return tmp
}

const checksum = (input: number[]) => input.reduce((acc, x, idx) => x != -1 ? acc + x * idx : acc, 0)

console.log(checksum(compactFile(toBlocks(content))))
