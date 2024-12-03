const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(Deno.args[0]);
const input = decoder.decode(data);

let total_sum = 0;
let nb = 0;

let concatenated = "";
for (const s of input.split("")) {
  concatenated += s;

  if ((/mul\(\d+,\d+\)$/).test(concatenated)) {
    const match = concatenated.match(/mul\((\d+),(\d+)\)$/);
    if (!match) continue;

    const a = Number.parseInt(match[1]);
    const b = Number.parseInt(match[2]);

    total_sum += a * b;
    nb++;

    concatenated = s;
  }
}

console.log(`Total sum: '${total_sum}' (${nb} matches)`);
