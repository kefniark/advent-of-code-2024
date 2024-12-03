const data = await Deno.readTextFile("./day01/input.txt")

const getCol = (id: number): number[] => {
    return data.split("\n").map((x) => {
        const entries = x.split("   ")
        return parseInt(entries[id])
    }).sort((a, b) => a - b)
}

const countOccurences = (num: number[]): Map<number, number> => {
    const map = new Map<number, number>()
    num.forEach((x) => map.set(x, (map.get(x) ?? 0) + 1))
    return map
}

const ids = getCol(0)
const freqMap = countOccurences(getCol(1))
const count = ids.reduce((count, id) => {
    const freq = freqMap.get(id) ?? 0
    return count + id * freq
}, 0)

console.log(count)
