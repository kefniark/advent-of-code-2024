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

let data = content.split(" ").map((x) => parseInt(x))
for (let i = 1; i <= 25; i++) {
    data = blink(data)
}
console.log(data.length)
