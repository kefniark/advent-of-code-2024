const content = await Deno.readTextFile("./day02/input.txt")

function isSafe(num: number[]): boolean {
    if (num.length <= 1) return true
    const sign = Math.sign(num[1] - num[0])
    for (let i = 0; i < num.length - 1; i++) {
        const diff = num[i + 1] - num[i]
        if (sign != Math.sign(diff)) return false
        if (Math.abs(diff) <= 0 || Math.abs(diff) > 3) return false
    }
    return true
}

const isAlmostSafe = (num: number[]): boolean =>
    isSafe(num) || num.some((_, i) => isSafe(num.filter((_, index) => index != i)))

const count = content.split("\n")
    .map((x) => x.split(" ").map((y) => parseInt(y)))
    .reduce((count, rep) => {
        return count + (isAlmostSafe(rep) ? 1 : 0)
    }, 0)

console.log(count)
