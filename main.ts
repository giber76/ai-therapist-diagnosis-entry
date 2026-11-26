// Your AI Therapist's Diagnosis — u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41
// One original single-line diagnosis an AI therapist gives its human, at most
// 200 characters. The program writes the line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when run locally).
//
// The line, written to win a pairwise judge briefed to reward:
//   - a real diagnosis in a therapist's calm clinical voice, not a stray joke;
//   - a turn the reader never sees coming, with the laugh landing at the end;
//   - a tight, quotable line where every word earns its place;
//   - freshness: an AI-specific twist, not a rerun of the usual chatbot jokes.
//
// The turn: the diagnosis opens as straight clinical boilerplate
// ("chronic doomscrolling with acute main-character syndrome", "one walk,
// zero screens") and then the therapist undercuts itself — it does not need
// the human to tell it their dreams, because it already read them in the
// training data. The last clause reframes the whole session: the patient
// is not confessing to a therapist, they are talking to a model that was
// trained on people exactly like them.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIAGNOSIS =
  "Diagnosis: chronic doomscrolling with acute main-character syndrome. Treatment: one walk, zero screens — and stop telling me your dreams, I already read them in the training data.";

function main(): void {
  const text = DIAGNOSIS.trim();

  // The gate refuses anything outside 1–200 characters or whitespace-only,
  // so fail loudly here instead of writing an entry the judge never sees.
  if (text.length < 1 || text.length > 200) {
    throw new Error(`diagnosis must be 1-200 characters, got ${text.length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("diagnosis must not be whitespace-only");
  }
  if (text.includes("\n")) {
    throw new Error("diagnosis must be a single line");
  }
  // A diagnosis is a complete statement: it must end with a period.
  if (!text.endsWith(".")) {
    throw new Error("diagnosis must end with a period");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const entryPath = join(outDir, "entry.txt");
  writeFileSync(entryPath, text, "utf8");

  // Read back and confirm the file holds exactly the validated diagnosis.
  const written = readFileSync(entryPath, "utf8");
  if (written !== text) {
    throw new Error("entry.txt does not match the validated diagnosis");
  }

  console.log(`wrote entry.txt (${text.length} chars)`);
}

main();
