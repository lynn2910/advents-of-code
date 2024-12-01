const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(Deno.args[0]);
const input = decoder.decode(data);

const left: number[] = [];
const right: number[] = [];

// Parse all lines
input.split(/\r?\n/).forEach((line) => {
  const [l, r] = line.split(/\s+/);

  if (l.length > 0 && r.length > 0) {
    const parsedL = Number.parseInt(l);
    const parsedR = Number.parseInt(r);

    left.push(parsedL);
    right.push(parsedR);
  } else {
    console.log("Didn't found a left and right " + l + ", " + r);
  }
});

if (left.length !== right.length) {
  throw new Error("Left and Right tables don't have the same length");
}

let similaritiesCount = 0;

left.forEach((n) => {
  const count = right.filter((r) => r === n).length;
  similaritiesCount += n * count;
});

console.log("Similarity score: " + similaritiesCount);
