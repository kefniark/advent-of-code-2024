const content = await Deno.readTextFile("./day07/input.txt")

const operators = {
    "0": (a: number, b: number) => a + b,
    "1": (a: number, b: number) => a * b,
}

const getSortedOperators = (len: number, base: number) =>
    [...Array(Math.pow(base, len)).keys()]
        .map((_, i) => (i >>> 0).toString(base).padStart(len, "0"))

const evaluate = (val: number[], ops: string[]) => val.slice(1).reduce((acc, num, i) => operators[ops[i]](acc, num), val[0])

const res = content.split("\n")
    .map((row) => {
        const values = row.split(":")
        return [parseInt(values[0]), values[1].trim().split(" ").map((i) => parseInt(i))] as [number, number[]]
    })
    .filter((row) => getSortedOperators(row[1].length - 1, 2).some((ops) => evaluate(row[1], ops.split("")) === row[0]))
    .reduce((acc, row) => acc + row[0], 0)
console.log(res)
