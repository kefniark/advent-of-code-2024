const data = await Deno.readTextFile("./day01/input.txt")

const getCol = (id: number): number[] => {
    return data.split("\n").map((x) => {
        const entries = x.split("   ")
        return parseInt(entries[id])
    }).sort((a, b) => a - b)
}

const ids1 = getCol(0)
const ids2 = getCol(1)
const count = ids1.reduce((count, _, i) => {
    return count + Math.abs(ids1[i] - ids2[i])
}, 0)

console.log(count)
