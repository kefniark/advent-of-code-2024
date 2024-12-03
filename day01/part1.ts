// https://adventofcode.com/2024/day/1

const content = await Deno.readTextFile("./day01/input.txt")

const getIds = (colNum: number): number[] =>
    content.split("\n").map((x) => {
        const entries = x.split("   ")
        return parseInt(entries[colNum])
    }).sort((a, b) => a - b)

const [ids1, ids2] = [getIds(0), getIds(1)]
const count = ids1.reduce((count, _, i) => count + Math.abs(ids1[i] - ids2[i]), 0)
console.log(count)
