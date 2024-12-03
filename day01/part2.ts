// https://adventofcode.com/2024/day/1

const content = await Deno.readTextFile("./day01/input.txt")

const getIds = (colNum: number): number[] =>
    content.split("\n").map((x) => {
        const entries = x.split("   ")
        return parseInt(entries[colNum])
    }).sort((a, b) => a - b)

const countFreq = (num: number[]): Map<number, number> => {
    const map = new Map<number, number>()
    num.forEach((x) => map.set(x, (map.get(x) ?? 0) + 1))
    return map
}

const ids = getIds(0)
const freqMap = countFreq(getIds(1))
const count = ids.reduce((count, id) => count + id * (freqMap.get(id) ?? 0), 0)
console.log(count)
