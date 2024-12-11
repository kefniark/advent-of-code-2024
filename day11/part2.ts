const content = await Deno.readTextFile("./day11/input.txt")

const blink = (data: number[]) =>
    data.reduce((acc, cur) => {
        const str = cur.toString()
        if (cur == 0) {
            acc.push(1)
        } else if (str.length % 2 == 0) {
            acc.push(parseInt(str.slice(0, Math.floor(str.length / 2))))
            acc.push(parseInt(str.slice(Math.floor(str.length / 2))))
        } else {
            acc.push(cur * 2024)
        }
        return acc
    }, [] as number[])

const blinkCache = (stones: Map<number, number>) =>
    stones.entries().reduce((map, [stone, count]) => {
        blink([stone]).forEach((nextStone) => {
            map.set(nextStone, (map.get(nextStone) ?? 0) + count)
        })
        return map
    }, new Map<number, number>())

const input = content.split(" ").map((x) => parseInt(x))
let data = new Map(input.map((x) => [x, 1]))
for (let i = 1; i <= 75; i++) {
    data = blinkCache(data)
}
const res = data.entries().reduce((acc, cur) => acc + cur[1], 0)
console.log(res)
