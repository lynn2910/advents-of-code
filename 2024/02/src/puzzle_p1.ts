const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(Deno.args[0]);
const input = decoder.decode(data);

let goodReports = 0;

input.split(/\r?\n/).forEach((line) => {
  const numbers = line.split(/\s+/gi).map((s) => Number.parseInt(s));

  const typeOfCurve: "-" | "+" = numbers[0] - numbers[1] > 0 ? "-" : "+";
  let alreadyUsedSafeModule = false;

  let last = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const n = numbers[i];
    let diff;
    if (typeOfCurve === "-") {
      diff = last - n;
    } else {
      diff = n - last;
    }

    if (diff < 1 || diff > 3) break;
    last = n;

    if (i === numbers.length - 1) {
      goodReports++;
    }
  }
});

console.log("Number of good reports: " + goodReports);
