import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Home, BookOpen, Headphones, PenLine, Mic, Calculator, Brain, Sparkles,
  CalendarDays, Settings, Flame, Trophy, Check, X, ChevronRight, RefreshCw,
  Send, Target, GraduationCap, Languages, Loader2, ArrowRight, ArrowLeft,
  Lightbulb, BarChart3, Layers, Award, Clock, Zap, Volume2,
  Play, Pause, Square, Flag, FileText, ChevronLeft, AlertTriangle, CheckCircle2, RotateCcw, Timer
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

/* ============================================================================
   ITQĀN — Personal mastery cockpit for TOEFL ITP, IELTS & TPA Bappenas
   Built for Sopian. إتقان = mastery / excellence of work.
============================================================================ */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root{
  --paper:#F4F5F8; --panel:#FFFFFF; --ink:#15161C; --ink-2:#3A3D49; --muted:#797E8C;
  --line:#E4E6EC; --line-2:#EEF0F4;
  --toefl:#0E7C7B; --toefl-soft:#E2F1F0;
  --ielts:#9B2C2C; --ielts-soft:#F6E7E5;
  --tpa:#3D3A99; --tpa-soft:#E9E8F6;
  --gold:#B07D2B; --gold-soft:#F6EEDD;
  --ok:#1E8E5A; --bad:#C0392B;
}
*{box-sizing:border-box}
.itq{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--paper);
  background-image:linear-gradient(var(--line-2) 1px,transparent 1px),linear-gradient(90deg,var(--line-2) 1px,transparent 1px);
  background-size:34px 34px;background-position:-1px -1px;min-height:100vh;-webkit-font-smoothing:antialiased}
.serif{font-family:'Fraunces','Georgia',serif}
.mono{font-family:'JetBrains Mono',monospace}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.shell{display:flex;min-height:100vh;width:100%}
.rail{width:78px;flex:0 0 78px;border-right:1px solid var(--line);background:rgba(255,255,255,.78);backdrop-filter:blur(8px);
  position:sticky;top:0;height:100vh;display:flex;flex-direction:column;align-items:center;padding:18px 0;gap:4px;z-index:20}
.brandmark{width:42px;height:42px;border-radius:12px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;
  font-family:'Fraunces',serif;font-weight:600;font-size:20px;margin-bottom:14px}
.navbtn{width:54px;height:50px;border-radius:12px;border:0;background:transparent;color:var(--muted);display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:3px;cursor:pointer;transition:.15s;font-size:9px;font-family:'JetBrains Mono',monospace}
.navbtn:hover{background:var(--line-2);color:var(--ink)}
.navbtn.active{background:var(--ink);color:#fff}
.navbtn:focus-visible{outline:2px solid var(--tpa);outline-offset:2px}
.main{flex:1;min-width:0;display:flex;flex-direction:column}
.topbar{height:60px;border-bottom:1px solid var(--line);background:rgba(244,245,248,.86);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:space-between;padding:0 26px;position:sticky;top:0;z-index:15}
.wordmark{font-family:'Fraunces',serif;font-weight:600;font-size:21px;letter-spacing:.02em}
.chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:#fff;border-radius:999px;padding:5px 11px;
  font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:500}
.content{padding:30px 26px 90px;max-width:1180px;width:100%;margin:0 auto}
.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:22px}
.card.flat{box-shadow:none}
.card.pad-lg{padding:26px}
.h1{font-family:'Fraunces',serif;font-weight:600;font-size:30px;line-height:1.08;letter-spacing:-.01em}
.h2{font-family:'Fraunces',serif;font-weight:600;font-size:21px;letter-spacing:-.01em}
.sub{color:var(--muted);font-size:14px;line-height:1.5}
.btn{appearance:none;border:1px solid var(--ink);background:var(--ink);color:#fff;border-radius:11px;padding:11px 17px;font-size:14px;
  font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:.15s;font-family:'Inter',sans-serif}
.btn:hover{transform:translateY(-1px)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn.ghost{background:#fff;color:var(--ink)}
.btn.ghost:hover{background:var(--line-2)}
.btn.sm{padding:8px 13px;font-size:13px;border-radius:9px}
.btn:focus-visible{outline:2px solid var(--tpa);outline-offset:2px}
.pill{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:4px 10px;font-size:12px;font-weight:600;font-family:'JetBrains Mono',monospace}
.dom-card{cursor:pointer;border:1px solid var(--line);background:#fff;border-radius:16px;padding:20px;transition:.15s;text-align:left;width:100%}
.dom-card:hover{transform:translateY(-2px);border-color:var(--ink-2)}
.dom-card:focus-visible{outline:2px solid var(--tpa);outline-offset:2px}
.choice{width:100%;text-align:left;border:1.5px solid var(--line);background:#fff;border-radius:12px;padding:13px 15px;font-size:15px;
  cursor:pointer;display:flex;gap:12px;align-items:flex-start;transition:.12s;line-height:1.45;font-family:'Inter',sans-serif;color:var(--ink)}
.choice:hover{border-color:var(--ink-2);background:#fcfcfd}
.choice .key{flex:0 0 24px;height:24px;border-radius:7px;border:1.5px solid var(--line);display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:var(--muted);margin-top:1px}
.choice.sel{border-color:var(--ink);background:#fafafa}
.choice.sel .key{border-color:var(--ink);background:var(--ink);color:#fff}
.choice.correct{border-color:var(--ok);background:#EAF7F0}
.choice.correct .key{border-color:var(--ok);background:var(--ok);color:#fff}
.choice.wrong{border-color:var(--bad);background:#FBECEA}
.choice.wrong .key{border-color:var(--bad);background:var(--bad);color:#fff}
.choice:disabled{cursor:default}
.passage{font-family:'Fraunces',serif;font-size:16.5px;line-height:1.72;color:#23252e}
.passage p{margin:0 0 14px}
.explain{border-left:3px solid var(--gold);background:var(--gold-soft);border-radius:0 10px 10px 0;padding:12px 15px;font-size:14px;line-height:1.55}
.gridstat{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px}
.statk{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.statv{font-family:'Fraunces',serif;font-size:26px;font-weight:600;line-height:1}
.input{width:100%;border:1.5px solid var(--line);border-radius:12px;padding:13px 15px;font-size:15px;font-family:'Inter',sans-serif;
  background:#fff;color:var(--ink);resize:vertical;line-height:1.55}
.input:focus{outline:none;border-color:var(--ink-2)}
.crumb{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted);cursor:pointer;border:0;background:transparent;padding:4px 0}
.crumb:hover{color:var(--ink)}
.tabrow{display:flex;gap:6px;flex-wrap:wrap}
.tab{border:1px solid var(--line);background:#fff;border-radius:10px;padding:9px 14px;font-size:13.5px;font-weight:600;cursor:pointer;
  font-family:'Inter',sans-serif;color:var(--ink-2);transition:.12s}
.tab:hover{border-color:var(--ink-2)}
.tab.on{color:#fff}
.bubble{border-radius:14px;padding:12px 15px;font-size:14.5px;line-height:1.55;max-width:84%}
.bubble.u{background:var(--ink);color:#fff;margin-left:auto;border-bottom-right-radius:4px}
.bubble.a{background:#fff;border:1px solid var(--line);border-bottom-left-radius:4px}
.bottomnav{display:none}
.spin{animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.rise{animation:rise .4s ease both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes bar{from{height:5px}to{height:20px}}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
@media (max-width:760px){
  .rail{display:none}
  .content{padding:20px 16px 96px}
  .h1{font-size:24px}
  .bottomnav{display:flex;position:fixed;bottom:0;left:0;right:0;height:64px;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);
    border-top:1px solid var(--line);z-index:30;justify-content:space-around;align-items:center;padding:0 4px;overflow-x:auto}
  .bnbtn{border:0;background:transparent;display:flex;flex-direction:column;align-items:center;gap:2px;color:var(--muted);font-size:9px;
    font-family:'JetBrains Mono',monospace;cursor:pointer;padding:6px 8px;min-width:52px}
  .bnbtn.active{color:var(--ink)}
  .topbar{padding:0 16px}
}
`;

/* ----------------------------- DOMAIN META ------------------------------ */
const DOMAINS = {
  toefl: { label: "TOEFL ITP", color: "var(--toefl)", soft: "var(--toefl-soft)", icon: GraduationCap },
  ielts: { label: "IELTS", color: "var(--ielts)", soft: "var(--ielts-soft)", icon: Languages },
  tpa:   { label: "TPA Bappenas", color: "var(--tpa)", soft: "var(--tpa-soft)", icon: Brain },
};

/* ----------------------------- SEED CONTENT ----------------------------- */
// TOEFL — Structure (complete the sentence)
const TOEFL_STRUCTURE = [
  { stem: "_____ in 1869, the transcontinental railroad linked the eastern and western United States.",
    choices: ["Completed", "It was completed", "Completing", "To complete"], answer: 0,
    explanation: "A reduced participial phrase modifies the subject: “Completed in 1869, the railroad…”. Option B creates two independent clauses with no connector." },
  { stem: "Not until the late nineteenth century _____ a practical method of refrigeration.",
    choices: ["was developed", "developed", "it was developed", "that developed"], answer: 0,
    explanation: "A negative adverbial at the front (“Not until…”) forces subject–verb inversion: “…was a practical method of refrigeration developed.”" },
  { stem: "_____ the harsh winters, many settlers chose to remain in the region.",
    choices: ["Despite", "Although", "Even", "However"], answer: 0,
    explanation: "“Despite” takes a noun phrase (the harsh winters). “Although” would need a full clause (subject + verb)." },
  { stem: "Rarely _____ such a vivid display of the aurora borealis at this latitude.",
    choices: ["have observers seen", "observers have seen", "observers seen", "seen have observers"], answer: 0,
    explanation: "A restrictive adverb (“Rarely”) at the start triggers inversion of the auxiliary and subject: “Rarely have observers seen…”." },
  { stem: "The committee has met three times, but _____ reached a final decision.",
    choices: ["it has not yet", "it has yet not", "not it has", "has it not"], answer: 0,
    explanation: "Standard order after the conjunction is subject + auxiliary + “not” + “yet” + participle: “it has not yet reached…”." },
  { stem: "_____ is widely regarded as the founder of modern chemistry.",
    choices: ["Lavoisier", "That Lavoisier", "Because Lavoisier", "Lavoisier who"], answer: 0,
    explanation: "The sentence needs a simple subject. The extra words in B/C/D create a fragment without a main clause." },
  { stem: "The new policy will take effect _____ the board approves the proposed budget.",
    choices: ["as soon as", "as soon", "soon as", "so soon"], answer: 0,
    explanation: "“As soon as” is the fixed conjunction introducing the time clause." },
  { stem: "Neither the report _____ the supporting documents were submitted on time.",
    choices: ["nor", "or", "and", "but"], answer: 0,
    explanation: "The correlative pair is “neither … nor”." },
];

// TOEFL — Written Expression (identify the error)
const TOEFL_WE = [
  { stem: "Each of the students | were given | a separate | assignment.",
    choices: ["A — were given", "B — a", "C — separate", "D — assignment"], answer: 0,
    explanation: "“Each of the students” is grammatically singular, so the verb must be “was given.”" },
  { stem: "The scientist conducted | a series of | experiment to | test her hypothesis.",
    choices: ["A — conducted", "B — a series of", "C — experiment to", "D — test"], answer: 2,
    explanation: "“A series of” must be followed by a plural noun: “a series of experiments.”" },
  { stem: "Despite of | the heavy rain, | the outdoor concert | continued as planned.",
    choices: ["A — Despite of", "B — the heavy rain", "C — outdoor concert", "D — continued"], answer: 0,
    explanation: "Use either “Despite the rain” or “In spite of the rain,” never “Despite of.”" },
  { stem: "She is one of the | most talented | musician | in the national orchestra.",
    choices: ["A — one of the", "B — most talented", "C — musician", "D — in"], answer: 2,
    explanation: "“One of the most talented…” requires a plural noun: “musicians.”" },
  { stem: "Neither the manager | nor the employees | was aware | of the new policy.",
    choices: ["A — Neither the manager", "B — nor the employees", "C — was aware", "D — of"], answer: 2,
    explanation: "With “neither … nor,” the verb agrees with the nearer subject (“employees”), so it must be “were aware.”" },
  { stem: "The data | collected during | the field study | were analysed quickly | and accurate.",
    choices: ["A — collected", "B — the field study", "C — were analysed", "D — and accurate"], answer: 3,
    explanation: "Parallelism after the adverb requires another adverb: “quickly and accurately.”" },
  { stem: "If he would have studied | harder, he | would have passed | the entrance examination.",
    choices: ["A — would have studied", "B — he", "C — would have passed", "D — examination"], answer: 0,
    explanation: "In a third conditional, the if-clause uses the past perfect: “If he had studied harder…”." },
];

// TOEFL — Reading passage (original)
const TOEFL_READING = {
  title: "Bioluminescence in the Deep Ocean",
  passage:
`Bioluminescence — the production of light by living organisms through a chemical reaction — is far more common in the ocean than on land. While fireflies are the best-known example of glowing creatures, the vast majority of luminous species inhabit the sea, particularly the dim region between two hundred and one thousand meters known as the twilight zone. In this layer, sunlight has nearly vanished, and an organism's ability to generate its own light can mean the difference between catching prey and going hungry, or between escaping a predator and being eaten.

The light is created when a molecule called luciferin reacts with oxygen, a process accelerated by an enzyme known as luciferase. Because almost no heat is released, scientists describe the glow as "cold light." Animals exploit this glow in strikingly different ways. Some anglerfish dangle a luminous lure to draw curious victims toward their jaws. Certain squid, by contrast, use a downward-facing glow to erase their own silhouette against the faint light filtering from above, a defensive trick called counter-illumination. Still other creatures release a luminous cloud to startle an attacker and slip away in the confusion.

Despite decades of study, researchers have catalogued only a fraction of luminous marine species, and the genetic origins of the trait remain incompletely understood. What is clear is that bioluminescence has evolved independently many times, a pattern that strongly suggests its considerable survival value in an environment defined by darkness.`,
  questions: [
    { stem: "What is the main idea of the passage?",
      choices: ["Fireflies are the most important bioluminescent organisms.","Bioluminescence is a widespread and useful adaptation in the dark ocean.","Luciferin is more important than luciferase in producing light.","The twilight zone is the deepest part of the ocean."],
      answer: 1, explanation: "The passage repeatedly stresses how common and valuable bioluminescence is for survival in the dark ocean — that is its central claim." },
    { stem: "The word “accelerated” in paragraph 2 is closest in meaning to",
      choices: ["weakened","sped up","reversed","measured"], answer: 1,
      explanation: "An enzyme that accelerates a reaction makes it happen faster — “sped up.”" },
    { stem: "According to the passage, counter-illumination helps an animal by",
      choices: ["attracting prey toward its mouth","producing heat to warm its body","hiding its outline from below","releasing a startling cloud"],
      answer: 2, explanation: "The text says certain squid use a downward glow to erase their silhouette against light from above — i.e., to hide their outline from predators below." },
    { stem: "Which is described as a defensive use of light?",
      choices: ["The anglerfish's lure","The squid's counter-illumination","Producing luciferin","Generating heat"], answer: 1,
      explanation: "Counter-illumination and the luminous-cloud trick are defensive; the anglerfish lure is offensive (for catching prey)." },
    { stem: "It can be inferred from the last paragraph that",
      choices: ["scientists fully understand the genetics of bioluminescence","bioluminescence rarely benefits marine animals","the trait is valuable because it evolved repeatedly","most ocean species have now been catalogued"],
      answer: 2, explanation: "Independent (repeated) evolution of a trait implies strong selective advantage — here, considerable survival value." },
  ],
};

// IELTS — Reading passage (original) with TRUE/FALSE/NOT GIVEN
const IELTS_READING = {
  title: "Urban Green Spaces and Public Wellbeing",
  passage:
`As cities expand, planners increasingly treat parks, gardens and tree-lined streets not as luxuries but as essential infrastructure. Beyond their obvious recreational appeal, urban green spaces deliver measurable benefits. Vegetation cools neighbourhoods during heatwaves, absorbs rainfall that would otherwise overwhelm drains, and filters airborne pollutants. A growing body of research also links regular access to greenery with lower stress levels and improved concentration.

Yet the distribution of these spaces is rarely equal. In many cities, wealthier districts enjoy generous tree canopies, while denser, lower-income areas may have little more than a few scattered patches of grass. Some municipalities have responded by converting disused industrial land into community gardens, or by requiring new developments to include accessible green areas. Such policies, advocates argue, repay their cost many times over through reduced healthcare spending and higher property values, although the long-term economic effects are still debated.`,
  questions: [
    { stem: "Statement: Urban green spaces are now seen by some planners as essential rather than optional.",
      choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 0,
      explanation: "The passage says planners treat green spaces “not as luxuries but as essential infrastructure” — TRUE." },
    { stem: "Statement: Green spaces are distributed equally across most cities.",
      choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1,
      explanation: "The text states the distribution “is rarely equal,” with wealthier districts better served — FALSE." },
    { stem: "Statement: Converting industrial land into gardens is the most effective single policy available.",
      choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 2,
      explanation: "It is mentioned as one response, but the passage never ranks it as the most effective — NOT GIVEN." },
    { stem: "Statement: The long-term economic benefits of green-space policies are universally agreed upon.",
      choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1,
      explanation: "The passage says the long-term economic effects “are still debated” — so they are not universally agreed (FALSE)." },
    { stem: "Statement: Vegetation can help reduce flooding by absorbing rainwater.",
      choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 0,
      explanation: "It states vegetation “absorbs rainfall that would otherwise overwhelm drains” — TRUE." },
  ],
};

const IELTS_WRITING_PROMPTS = {
  task2: [
    { type: "Opinion (Agree/Disagree)", prompt: "Some people believe that university education should be free for all students, while others think students should pay tuition fees. To what extent do you agree or disagree? Give reasons and include relevant examples. (Write at least 250 words.)" },
    { type: "Discussion (Both views)", prompt: "Some argue that governments should invest more in public transport, while others believe investment should focus on building more roads. Discuss both views and give your own opinion. (Write at least 250 words.)" },
    { type: "Problem / Solution", prompt: "Many cities suffer from severe traffic congestion. What are the main causes of this problem, and what measures could be taken to address it? (Write at least 250 words.)" },
    { type: "Advantages / Disadvantages", prompt: "More people are choosing to work from home rather than commute to an office. Do the advantages of this trend outweigh the disadvantages? (Write at least 250 words.)" },
  ],
  task1: [
    { type: "Academic — Line graph", prompt: "The graph below shows the number of international visitors to three coastal cities (A, B, and C) between 2010 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words.)\n\nKey data to describe: City A rose steadily from 0.4m to 1.6m; City B peaked at 1.2m in 2018 then fell to 0.7m; City C remained roughly flat at 0.9m throughout." },
    { type: "Academic — Process", prompt: "The diagram below shows how recycled paper is produced. Summarise the information by describing the stages of the process. (Write at least 150 words.)\n\nStages: waste paper collected → sorted by grade → pulped with water and chemicals → screened to remove ink and contaminants → pressed and dried into new paper rolls → cut and packaged for distribution." },
  ],
};

const IELTS_SPEAKING = {
  part1: [
    "Let's talk about your hometown. Where are you from, and what is it like?",
    "Do you prefer living in a big city or a small town? Why?",
    "What do you usually do to relax after a busy day?",
    "How important is exercise in your daily life?",
  ],
  part2: [
    { cue: "Describe a skill you would like to learn.", points: ["what the skill is", "why you want to learn it", "how you would learn it", "and explain how this skill would benefit you"] },
    { cue: "Describe a project or piece of work you are proud of.", points: ["what it was", "why you did it", "what challenges you faced", "and explain why you are proud of it"] },
    { cue: "Describe a place you enjoy spending time outdoors.", points: ["where it is", "how often you go there", "what you do there", "and explain why you enjoy it"] },
  ],
  part3: [
    "Some people say technology is changing the way we learn. Do you agree?",
    "What skills do you think will be most important in the future job market?",
    "How can people stay motivated when learning something difficult?",
  ],
};

// TPA — Verbal (Indonesian)
const TPA_VERBAL = [
  { stem: "SINONIM — BAKU", choices: ["Standar", "Mentah", "Cair", "Langka"], answer: 0, explanation: "Baku berarti tolok ukur/standar yang menjadi acuan." },
  { stem: "SINONIM — NIRLABA", choices: ["Tanpa modal", "Tidak mencari keuntungan", "Tanpa hasil", "Merugi"], answer: 1, explanation: "Nir- = tanpa; nirlaba = organisasi yang tidak berorientasi pada laba." },
  { stem: "SINONIM — SAHIH", choices: ["Lemah", "Valid / benar", "Palsu", "Samar"], answer: 1, explanation: "Sahih berarti valid, benar, atau dapat dipercaya." },
  { stem: "SINONIM — RANCU", choices: ["Teratur", "Kacau / tidak teratur", "Jelas", "Murni"], answer: 1, explanation: "Rancu = bercampur tidak teratur sehingga membingungkan." },
  { stem: "ANTONIM — GASAL", choices: ["Genap", "Ganjil", "Tunggal", "Banyak"], answer: 0, explanation: "Gasal = ganjil; lawannya genap." },
  { stem: "ANTONIM — GERSANG", choices: ["Tandus", "Subur", "Kering", "Panas"], answer: 1, explanation: "Gersang (tandus) berlawanan dengan subur." },
  { stem: "ANTONIM — CANGGUNG", choices: ["Kaku", "Terampil / luwes", "Ragu", "Malu"], answer: 1, explanation: "Canggung = kaku/tidak luwes; lawannya terampil atau luwes." },
  { stem: "ANALOGI — DOKTER : STETOSKOP = PELUKIS : ...", choices: ["Kanvas", "Kuas", "Warna", "Galeri"], answer: 1, explanation: "Stetoskop adalah alat utama dokter, sebagaimana kuas adalah alat utama pelukis." },
  { stem: "ANALOGI — HAUS : MINUM = LAPAR : ...", choices: ["Lelah", "Makan", "Tidur", "Sakit"], answer: 1, explanation: "Haus diatasi dengan minum, sebagaimana lapar diatasi dengan makan (sebab–solusi)." },
  { stem: "ANALOGI — PADI : BERAS = ... : TEPUNG", choices: ["Roti", "Gandum", "Sawah", "Nasi"], answer: 1, explanation: "Padi diolah menjadi beras, sebagaimana gandum diolah menjadi tepung (bahan mentah → hasil olahan)." },
];

// TPA — Logika / Penalaran (Indonesian)
const TPA_LOGIKA = [
  { stem: "Semua dokter adalah lulusan perguruan tinggi. Sebagian lulusan perguruan tinggi adalah peneliti. Kesimpulan yang PASTI benar:",
    choices: ["Semua dokter adalah peneliti.", "Sebagian dokter adalah peneliti.", "Semua dokter adalah lulusan perguruan tinggi.", "Semua peneliti adalah dokter."],
    answer: 2, explanation: "Hanya premis pertama yang dapat disimpulkan ulang dengan pasti. Hubungan dokter–peneliti tidak ditentukan (silogisme tidak menjamin irisan)." },
  { stem: "Jika hujan, maka jalan basah. Saat ini jalan tidak basah. Maka:",
    choices: ["Hari ini hujan.", "Hari ini tidak hujan.", "Jalan akan basah nanti.", "Tidak dapat disimpulkan."],
    answer: 1, explanation: "Modus tollens: jika P→Q dan Q salah (jalan tidak basah), maka P salah (tidak hujan)." },
  { stem: "Semua karyawan yang disiplin mendapat bonus. Budi tidak mendapat bonus. Maka:",
    choices: ["Budi disiplin.", "Budi tidak disiplin.", "Budi malas.", "Tidak dapat disimpulkan."],
    answer: 1, explanation: "Karena 'disiplin → bonus' dan Budi tidak dapat bonus (modus tollens), maka Budi tidak disiplin." },
  { stem: "A lebih tua dari B. C lebih muda dari B. D lebih tua dari A. Siapa yang paling muda?",
    choices: ["A", "B", "C", "D"], answer: 2, explanation: "Urutan usia: D > A > B > C, sehingga C paling muda." },
  { stem: "Dalam satu baris: P duduk tepat di kiri Q. R duduk tepat di kanan Q. Urutan dari kiri ke kanan adalah:",
    choices: ["Q, P, R", "P, Q, R", "R, Q, P", "P, R, Q"], answer: 1, explanation: "P di kiri Q dan R di kanan Q → urutan P, Q, R." },
];

// TPA — Vocabulary set (academic English) for SRS
const VOCAB = [
  ["abundant", "existing in large quantities; plentiful", "berlimpah"],
  ["deteriorate", "to become progressively worse", "memburuk"],
  ["hypothesis", "a proposed explanation to be tested", "hipotesis"],
  ["inevitable", "certain to happen; unavoidable", "tak terhindarkan"],
  ["prevalent", "widespread in a particular area or time", "lazim / umum"],
  ["scrutinize", "to examine closely and critically", "menelaah dengan cermat"],
  ["comprehensive", "complete; covering all elements", "menyeluruh"],
  ["ambiguous", "open to more than one interpretation", "ambigu / bermakna ganda"],
  ["deduce", "to reach a conclusion by reasoning", "menyimpulkan"],
  ["intricate", "very complicated or detailed", "rumit"],
  ["mitigate", "to make less severe or painful", "meredam / mengurangi"],
  ["plausible", "seeming reasonable or probable", "masuk akal"],
  ["redundant", "no longer needed; superfluous", "berlebihan / mubazir"],
  ["coherent", "logical and consistent", "koheren / runtut"],
  ["substantiate", "to provide evidence to support", "membuktikan / mendukung"],
  ["arbitrary", "based on random choice, not reason", "sembarang / sewenang"],
  ["feasible", "possible to do easily or conveniently", "layak / dapat dilakukan"],
  ["robust", "strong and able to withstand pressure", "kokoh / tangguh"],
  ["empirical", "based on observation or experiment", "empiris"],
  ["nuance", "a subtle difference in meaning", "nuansa / perbedaan halus"],
  ["paradigm", "a typical example or model", "paradigma"],
  ["resilient", "able to recover quickly from difficulties", "ulet / lentur"],
  ["sufficient", "enough for a particular purpose", "cukup / memadai"],
  ["volatile", "liable to change rapidly and unpredictably", "mudah berubah / bergejolak"],
  ["pragmatic", "dealing with things practically", "pragmatis"],
];

/* ----------------------- EXPANDED BANKS (v0.2) -------------------------- */
// TOEFL — Structure (extra)
const TOEFL_STRUCTURE_EXTRA = [
  { stem: "_____ the invention of the printing press, books were copied by hand.",
    choices: ["Prior to", "Prior", "Before to", "Priorly"], answer: 0,
    explanation: "“Prior to” is the fixed prepositional phrase taking a noun (“the invention…”)." },
  { stem: "The professor, along with her assistants, _____ preparing the experiment.",
    choices: ["is", "are", "were", "have been"], answer: 0,
    explanation: "“Along with…” does not change the number of the subject (“professor”), which stays singular: “is.”" },
  { stem: "Not only _____ the exam, but she also earned the highest score in the class.",
    choices: ["did she pass", "she passed", "she did pass", "passed she"], answer: 0,
    explanation: "A fronted “Not only” forces auxiliary–subject inversion: “Not only did she pass…”." },
  { stem: "Seldom _____ such dedication among first-year students.",
    choices: ["do we see", "we see", "we do see", "seeing we"], answer: 0,
    explanation: "The negative adverb “Seldom” at the start triggers inversion: “Seldom do we see…”." },
  { stem: "The new bridge, _____ took three years to build, has greatly eased traffic.",
    choices: ["which", "that", "what", "it"], answer: 0,
    explanation: "A non-restrictive clause set off by commas uses “which,” never “that.”" },
  { stem: "_____ enough preparation, the team would have won the competition.",
    choices: ["Had they had", "If they would have", "Have they had", "Had they"], answer: 0,
    explanation: "An inverted third conditional drops “if”: “Had they had enough preparation…” (= If they had had)." },
  { stem: "The results of the survey _____ that most employees prefer flexible hours.",
    choices: ["indicate", "indicates", "indicating", "to indicate"], answer: 0,
    explanation: "The plural subject “results” takes the plural verb “indicate.”" },
  { stem: "_____ surprised everyone was the sudden change in the schedule.",
    choices: ["What", "That", "Which", "It"], answer: 0,
    explanation: "A nominal relative clause acts as the subject: “What surprised everyone was…”." },
  { stem: "She spoke so softly that _____ in the back row could hear her.",
    choices: ["hardly anyone", "anyone hardly", "hardly no one", "no one hardly"], answer: 0,
    explanation: "“Hardly anyone” is the standard form; “hardly” already carries the negative, so a second negative is wrong." },
  { stem: "_____ the data were incomplete, the researchers postponed their conclusion.",
    choices: ["Because", "Despite", "In spite of", "Due to"], answer: 0,
    explanation: "A full clause (“the data were incomplete”) needs a conjunction such as “Because”; the others take noun phrases." },
];

// TOEFL — Written Expression (extra) — identify the error
const TOEFL_WE_EXTRA = [
  { stem: "The amount of | visitors | to the museum | has risen sharply.",
    choices: ["A — The amount of", "B — visitors", "C — to the museum", "D — has risen"], answer: 0,
    explanation: "Use “number of” for countable nouns: “the number of visitors.”" },
  { stem: "She has worked | in this office | since five years, | so she knows it well.",
    choices: ["A — has worked", "B — in this office", "C — since five years", "D — so she knows"], answer: 2,
    explanation: "A duration takes “for”: “for five years.” “Since” marks a point in time." },
  { stem: "The committee | could not agree | on weather | to approve the new plan.",
    choices: ["A — The committee", "B — could not agree", "C — on weather", "D — to approve"], answer: 2,
    explanation: "The correct word is “whether,” not the weather-related homophone “weather.”" },
  { stem: "Each of the | proposals | have | its own clear advantages.",
    choices: ["A — Each of the", "B — proposals", "C — have", "D — its own"], answer: 2,
    explanation: "“Each of the proposals” is singular, so the verb must be “has.”" },
  { stem: "He is | more taller | than his brother | by several centimeters.",
    choices: ["A — He is", "B — more taller", "C — than his brother", "D — by several"], answer: 1,
    explanation: "Avoid the double comparative: “taller,” not “more taller.”" },
  { stem: "The number of students | who passed the test | were | higher this term.",
    choices: ["A — The number of students", "B — who passed the test", "C — were", "D — higher this term"], answer: 2,
    explanation: "“The number of…” takes a singular verb: “was higher.”" },
  { stem: "Despite she was exhausted, | she kept | working | until well past midnight.",
    choices: ["A — Despite she was exhausted", "B — she kept", "C — working", "D — until"], answer: 0,
    explanation: "“Despite” cannot introduce a clause. Use “Although she was exhausted” or “Despite being exhausted.”" },
  { stem: "Neither of the | two designs | are | suitable for the budget.",
    choices: ["A — Neither of the", "B — two designs", "C — are", "D — suitable"], answer: 2,
    explanation: "“Neither of…” is grammatically singular: “is suitable.”" },
];

// TOEFL — Reading passage 2 (original)
const TOEFL_READING_2 = {
  title: "How Honeybees Share Directions",
  passage:
`When a foraging honeybee discovers a rich source of nectar, it faces a problem familiar to any explorer: how to tell others where the treasure lies. Remarkably, the bee solves this not with sound but with movement. Back at the hive, it performs a series of repeated motions on the vertical surface of the honeycomb that researchers call the waggle dance.

The dance encodes two pieces of information at once. The direction of the food relative to the sun is shown by the angle of the waggling run: a run straight up the comb means "fly toward the sun," while a run angled thirty degrees to the right means "fly thirty degrees to the right of the sun." The distance to the food is conveyed by how long the waggling lasts — the longer the waggle, the farther the journey. A dance of a single second may point to a meadow a few hundred meters away, whereas a longer performance can direct hivemates to flowers kilometers distant.

What makes this behavior extraordinary is that the other bees, crowded in the darkness of the hive, cannot see the dance at all. Instead, they press close and read it through touch and the vibrations it produces. After following only a few circuits, a recruit can leave the hive and fly directly to a place it has never visited. For decades scientists doubted that such a system could truly transmit precise coordinates, but careful experiments, including the use of tiny radar transponders, have confirmed that bees do navigate by the instructions encoded in the dance.`,
  questions: [
    { stem: "What is the main idea of the passage?",
      choices: ["Honeybees rely mainly on sound to communicate.", "Honeybees use a dance to tell others where food is located.", "Honeybees can only find food close to the hive.", "Honeybees compete with human explorers for nectar."],
      answer: 1, explanation: "The passage explains how the waggle dance communicates the location of a food source — that is its central point." },
    { stem: "According to the passage, the direction to the food is shown by",
      choices: ["the loudness of the dance", "the angle of the waggling run relative to the sun", "the number of bees dancing", "the time of day the dance occurs"],
      answer: 1, explanation: "Direction is encoded in the angle of the run: straight up means toward the sun." },
    { stem: "How is the distance to the food communicated?",
      choices: ["By the quality of the nectar", "By how long the waggling phase lasts", "By the direction the bee faces", "By the age of the dancing bee"],
      answer: 1, explanation: "The longer the waggling lasts, the farther the food source." },
    { stem: "The word “circuits” in the last paragraph is closest in meaning to",
      choices: ["electrical wires", "repeated rounds of the dance", "physical obstacles", "spoken questions"],
      answer: 1, explanation: "Here “circuits” refers to the repeated rounds or loops of the dance." },
    { stem: "It can be inferred that other bees understand the dance mainly through",
      choices: ["watching it in bright light", "listening to the queen bee", "touch and vibration in the dark", "the smell of the nectar"],
      answer: 2, explanation: "The text says the bees cannot see the dance and instead read it through touch and vibration." },
  ],
};

// TPA — Verbal (extra, Indonesian)
const TPA_VERBAL_EXTRA = [
  { stem: "SINONIM — FANA", choices: ["Abadi", "Sementara / tidak kekal", "Nyata", "Suci"], answer: 1, explanation: "Fana berarti tidak kekal, sementara." },
  { stem: "SINONIM — BANAL", choices: ["Istimewa", "Biasa / klise", "Lucu", "Rumit"], answer: 1, explanation: "Banal = biasa-biasa saja, klise, tidak istimewa." },
  { stem: "SINONIM — IMUN", choices: ["Lemah", "Kebal", "Sakit", "Rentan"], answer: 1, explanation: "Imun berarti kebal terhadap sesuatu." },
  { stem: "SINONIM — MUTAKHIR", choices: ["Kuno", "Terkini / terbaru", "Lambat", "Rusak"], answer: 1, explanation: "Mutakhir berarti paling baru atau modern." },
  { stem: "ANTONIM — EKSPLISIT", choices: ["Tersurat", "Tersirat / implisit", "Jelas", "Tegas"], answer: 1, explanation: "Eksplisit (tersurat) berlawanan dengan implisit (tersirat)." },
  { stem: "ANTONIM — MAYOR", choices: ["Besar", "Minor / kecil", "Penting", "Banyak"], answer: 1, explanation: "Mayor berlawanan dengan minor." },
  { stem: "ANTONIM — PROGRESIF", choices: ["Maju", "Konservatif", "Cepat", "Modern"], answer: 1, explanation: "Progresif (menuju kemajuan/perubahan) berlawanan dengan konservatif." },
  { stem: "ANALOGI — GURU : MENGAJAR = PETANI : ...", choices: ["Sawah", "Bercocok tanam", "Cangkul", "Padi"], answer: 1, explanation: "Profesi dengan aktivitas utamanya: guru mengajar, petani bercocok tanam." },
  { stem: "ANALOGI — TERMOMETER : SUHU = ... : TEKANAN", choices: ["Barometer", "Speedometer", "Higrometer", "Seismograf"], answer: 0, explanation: "Termometer mengukur suhu, barometer mengukur tekanan." },
  { stem: "ANALOGI — BUKU : BAB = DRAMA : ...", choices: ["Babak", "Penonton", "Panggung", "Aktor"], answer: 0, explanation: "Buku terbagi menjadi bab, drama terbagi menjadi babak (keseluruhan : bagian)." },
];

// TPA — Logika (extra, Indonesian)
const TPA_LOGIKA_EXTRA = [
  { stem: "Semua mamalia bernapas dengan paru-paru. Paus adalah mamalia. Maka:",
    choices: ["Paus bernapas dengan insang.", "Paus bernapas dengan paru-paru.", "Paus bukan mamalia.", "Tidak dapat disimpulkan."],
    answer: 1, explanation: "Modus ponens dari premis umum: paus (mamalia) bernapas dengan paru-paru." },
  { stem: "Jika harga naik, permintaan turun. Permintaan tidak turun. Maka:",
    choices: ["Harga naik.", "Harga tidak naik.", "Harga akan naik nanti.", "Tidak dapat disimpulkan."],
    answer: 1, explanation: "Modus tollens: P→Q, Q salah (permintaan tidak turun) ⇒ P salah (harga tidak naik)." },
  { stem: "Sebagian guru adalah penulis. Semua penulis gemar membaca. Maka yang PASTI benar:",
    choices: ["Semua guru gemar membaca.", "Sebagian guru gemar membaca.", "Semua penulis adalah guru.", "Tidak ada guru yang membaca."],
    answer: 1, explanation: "Sebagian guru = penulis, dan semua penulis gemar membaca, jadi sebagian guru gemar membaca." },
  { stem: "S, P, Q, R berdiri antre. S paling depan. Q di depan P. R tepat di belakang P. Urutan dari depan:",
    choices: ["S, Q, P, R", "S, P, Q, R", "S, R, P, Q", "Q, S, P, R"],
    answer: 0, explanation: "S terdepan; Q sebelum P; R tepat setelah P → S, Q, P, R." },
  { stem: "Jika semua A adalah B, dan tidak ada B yang C, maka:",
    choices: ["Semua A adalah C.", "Tidak ada A yang C.", "Sebagian A adalah C.", "Tidak dapat disimpulkan."],
    answer: 1, explanation: "Semua A masuk B, sedangkan B sama sekali tidak beririsan dengan C ⇒ tidak ada A yang C." },
  { stem: "Nilai Rani lebih tinggi dari Sinta tetapi lebih rendah dari Tina. Nilai Umar lebih rendah dari Sinta. Nilai tertinggi adalah:",
    choices: ["Rani", "Sinta", "Tina", "Umar"], answer: 2, explanation: "Urutan: Tina > Rani > Sinta > Umar. Tertinggi: Tina." },
  { stem: "Andi lebih tinggi dari Budi. Budi lebih tinggi dari Citra. Dedi lebih tinggi dari Andi. Yang paling tinggi:",
    choices: ["Andi", "Budi", "Citra", "Dedi"], answer: 3, explanation: "Urutan tinggi: Dedi > Andi > Budi > Citra. Paling tinggi: Dedi." },
];

// VOCAB (extra) — 25 more academic words
const VOCAB_EXTRA = [
  ["alleviate", "to make suffering or a problem less severe", "meringankan"],
  ["ambivalent", "having mixed or contradictory feelings", "mendua / ragu"],
  ["candid", "truthful and straightforward", "terus terang"],
  ["conscientious", "careful and thorough in one's work", "teliti / bersungguh-sungguh"],
  ["deficit", "the amount by which something falls short", "defisit / kekurangan"],
  ["diligent", "showing careful and persistent effort", "rajin / tekun"],
  ["elaborate", "involving many careful details", "terperinci"],
  ["evident", "clearly seen or understood", "jelas / nyata"],
  ["fluctuate", "to rise and fall irregularly", "berfluktuasi"],
  ["hinder", "to obstruct or delay progress", "menghambat"],
  ["impartial", "treating all sides equally; unbiased", "tidak memihak"],
  ["inherent", "existing as a natural, permanent part", "melekat / hakiki"],
  ["meticulous", "showing great attention to detail", "sangat teliti"],
  ["negligible", "so small as to be unimportant", "dapat diabaikan"],
  ["obsolete", "no longer in use; outdated", "usang"],
  ["persistent", "continuing firmly despite difficulty", "gigih"],
  ["proficient", "competent and skilled", "mahir / cakap"],
  ["reluctant", "unwilling and hesitant", "enggan"],
  ["scarce", "insufficient for demand; rare", "langka"],
  ["tedious", "too long, slow, or dull", "membosankan"],
  ["transparent", "open and easy to understand", "transparan"],
  ["versatile", "able to adapt to many functions", "serbaguna"],
  ["viable", "capable of working successfully", "layak / dapat dijalankan"],
  ["vigilant", "keeping careful watch for danger", "waspada"],
  ["wary", "cautious about possible problems", "berhati-hati"],
];

// Merged pools used by practice + mock
const TOEFL_STRUCTURE_ALL = [...TOEFL_STRUCTURE, ...TOEFL_STRUCTURE_EXTRA];
const TOEFL_WE_ALL = [...TOEFL_WE, ...TOEFL_WE_EXTRA];
const TOEFL_READINGS = [TOEFL_READING, TOEFL_READING_2];
const TPA_VERBAL_ALL = [...TPA_VERBAL, ...TPA_VERBAL_EXTRA];
const TPA_LOGIKA_ALL = [...TPA_LOGIKA, ...TPA_LOGIKA_EXTRA];
const VOCAB_ALL = [...VOCAB, ...VOCAB_EXTRA];

/* --------------------------- LISTENING CONTENT -------------------------- */
// who: "N" narrator, "M" male speaker, "W" female speaker
// TOEFL Listening — Part A (short conversations, 1 question each)
const LISTEN_TOEFL_A = [
  { script: [
      { who: "M", text: "I was hoping to register for Professor Lee's seminar, but it says the class is already full." },
      { who: "W", text: "You should still add your name to the waiting list. A few students usually drop in the first week." },
      { who: "N", text: "What does the woman suggest the man do?" }],
    choices: ["Choose a different professor", "Put his name on the waiting list", "Drop the seminar right away", "Register again next year"],
    answer: 1, explanation: "The woman advises adding his name to the waiting list since students often drop early." },
  { script: [
      { who: "W", text: "Have you finished the lab report that's due tomorrow?" },
      { who: "M", text: "I've done everything except the conclusion. I'll wrap it up tonight." },
      { who: "N", text: "What does the man mean?" }],
    choices: ["He has not started the report.", "He has completed the whole report.", "He still needs to write the conclusion.", "He will submit it next week."],
    answer: 2, explanation: "He has finished all parts except the conclusion, which he will write tonight." },
  { script: [
      { who: "W", text: "The library closes early today, doesn't it?" },
      { who: "M", text: "Actually, during exam week it stays open until midnight." },
      { who: "N", text: "What does the man imply about the library?" }],
    choices: ["It is closed all day today.", "It closes earlier than usual.", "It is open late because of exams.", "It has moved to a new building."],
    answer: 2, explanation: "He corrects her: during exam week the library is open late, until midnight." },
  { script: [
      { who: "M", text: "I can't decide whether to take the bus or just walk to campus." },
      { who: "W", text: "With this rain, I'd take the bus if I were you." },
      { who: "N", text: "What does the woman recommend?" }],
    choices: ["Walking to campus", "Taking the bus because of the rain", "Staying home today", "Riding a bicycle"],
    answer: 1, explanation: "Because of the rain, she recommends taking the bus." },
  { script: [
      { who: "W", text: "Did you understand the homework on chapter five?" },
      { who: "M", text: "Not really. Maybe we could go over it together before class." },
      { who: "N", text: "What does the man propose?" }],
    choices: ["Skipping the homework", "Studying the homework together", "Asking for an extension", "Doing chapter six instead"],
    answer: 1, explanation: "He proposes going over the homework together before class." },
  { script: [
      { who: "M", text: "This is already my third cup of coffee today." },
      { who: "W", text: "No wonder you couldn't sleep last night." },
      { who: "N", text: "What does the woman imply?" }],
    choices: ["The man should drink more coffee.", "The coffee tastes bad.", "Coffee may be why the man couldn't sleep.", "The man slept very well."],
    answer: 2, explanation: "She implies his heavy coffee drinking is likely the reason he couldn't sleep." },
];

// TOEFL Listening — Part C (a short talk + questions)
const LISTEN_TOEFL_C = {
  title: "A talk in an introductory biology class",
  script: [
    { who: "N", text: "Now listen to part of a talk in an introductory biology class." },
    { who: "M", text: "Today I want to talk about how desert plants survive with very little water. The main challenge they face is losing water through tiny pores in their leaves. These pores normally open during the day to take in carbon dioxide. Many desert plants solve the problem with a clever trick: they keep the pores closed during the hot daytime and open them only at night, when the air is cooler and far less water escapes. They store the carbon dioxide collected at night, then use it for photosynthesis the next day. This lets them carry out the chemistry of growth while wasting almost no moisture." },
  ],
  questions: [
    { stem: "What is the main topic of the talk?",
      choices: ["How desert animals find water", "How desert plants conserve water", "Why deserts receive little rain", "How leaves change color"],
      answer: 1, explanation: "The professor focuses on how desert plants survive with little water." },
    { stem: "According to the professor, when do many desert plants open their pores?",
      choices: ["During the hottest part of the day", "At night, when it is cooler", "Only when it rains", "Continuously, day and night"],
      answer: 1, explanation: "They open their pores at night, when less water escapes." },
    { stem: "Why do these plants store carbon dioxide at night?",
      choices: ["To use it for photosynthesis the next day", "To release it during the day", "To attract insects", "To cool their leaves"],
      answer: 0, explanation: "They store CO₂ at night and use it for photosynthesis the following day." },
  ],
};

// IELTS Listening — short conversation + questions
const LISTEN_IELTS = {
  title: "Enquiry about a sports centre membership",
  script: [
    { who: "N", text: "You will hear a phone call between a man and a receptionist at a sports centre." },
    { who: "W", text: "Good morning, Riverside Sports Centre. How can I help you?" },
    { who: "M", text: "Hi, I'd like to know about your membership options. I'm mainly interested in swimming." },
    { who: "W", text: "Certainly. A full membership is forty pounds a month and covers the pool, the gym, and all fitness classes. If you only want to swim, the pool-only membership is twenty-five pounds." },
    { who: "M", text: "The pool-only one sounds right for me. And what are the pool's opening hours on weekends?" },
    { who: "W", text: "On Saturdays and Sundays the pool is open from seven in the morning until eight in the evening. Just remember to bring a swimming cap. They're required for all swimmers." },
    { who: "M", text: "Good to know. I'll come by this afternoon to sign up." },
  ],
  questions: [
    { stem: "How much is the pool-only membership per month?",
      choices: ["£20", "£25", "£40", "£45"], answer: 1, explanation: "The receptionist says the pool-only membership is twenty-five pounds." },
    { stem: "What does the full membership include that the pool-only one does not?",
      choices: ["Only the pool", "The gym and fitness classes", "A free swimming cap", "Extra weekend hours"],
      answer: 1, explanation: "Full membership also covers the gym and all fitness classes." },
    { stem: "What does the receptionist remind the man to bring?",
      choices: ["A towel", "A swimming cap", "A membership card", "His own lock"],
      answer: 1, explanation: "She reminds him a swimming cap is required for all swimmers." },
  ],
};

/* --------------------------- NUMERIC GENERATORS ------------------------- */
const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[ri(0, arr.length - 1)];

function makeMCQ(correct, distractors) {
  const set = [correct, ...distractors];
  for (let i = set.length - 1; i > 0; i--) { const j = ri(0, i);[set[i], set[j]] = [set[j], set[i]]; }
  return { choices: set.map(String), answer: set.indexOf(correct) };
}
function uniqueDistract(correct, gen, n = 3) {
  const out = new Set();
  let guard = 0;
  while (out.size < n && guard < 100) { const d = gen(); if (d !== correct && !out.has(d)) out.add(d); guard++; }
  return [...out];
}

function genSeriesArithmetic() {
  const start = ri(1, 12), d = ri(2, 9), n = 5;
  const seq = Array.from({ length: n }, (_, i) => start + i * d);
  const ans = start + n * d;
  const m = makeMCQ(ans, uniqueDistract(ans, () => ans + ri(-6, 6) || ans + 1));
  return { stem: `Lanjutkan deret: ${seq.join(", ")}, ...`, ...m, explanation: `Beda tetap +${d}. Suku berikutnya = ${seq[n - 1]} + ${d} = ${ans}.` };
}
function genSeriesGeometric() {
  const start = ri(1, 4), r = ri(2, 3), n = 4;
  const seq = Array.from({ length: n }, (_, i) => start * r ** i);
  const ans = start * r ** n;
  const m = makeMCQ(ans, uniqueDistract(ans, () => ans + ri(-8, 8) * r || ans + r));
  return { stem: `Lanjutkan deret: ${seq.join(", ")}, ...`, ...m, explanation: `Rasio tetap ×${r}. Suku berikutnya = ${seq[n - 1]} × ${r} = ${ans}.` };
}
function genSeriesIncreasingDiff() {
  const start = ri(1, 6), base = ri(2, 4); const diffs = [base, base + 2, base + 4, base + 6];
  const seq = [start];
  diffs.forEach(d => seq.push(seq[seq.length - 1] + d));
  const nextDiff = base + 8; const ans = seq[seq.length - 1] + nextDiff;
  const m = makeMCQ(ans, uniqueDistract(ans, () => ans + ri(-7, 7) || ans + 2));
  return { stem: `Lanjutkan deret: ${seq.join(", ")}, ...`, ...m, explanation: `Selisih bertambah: +${diffs.join(", +")}, lalu +${nextDiff}. Jadi ${seq[seq.length - 1]} + ${nextDiff} = ${ans}.` };
}
function genPercent() {
  const base = ri(4, 40) * 10, p = pick([10, 15, 20, 25, 40, 50, 75]);
  const ans = Math.round(base * p / 100);
  const m = makeMCQ(ans, uniqueDistract(ans, () => Math.round(base * pick([5, 12, 18, 30, 60]) / 100) || ans + 3));
  return { stem: `Berapakah ${p}% dari ${base}?`, ...m, explanation: `${p}% × ${base} = ${p}/100 × ${base} = ${ans}.` };
}
function genRatio() {
  const a = ri(2, 6), b = ri(2, 6), unit = ri(3, 9) * 10; const total = (a + b) * unit;
  const ans = a * unit;
  const m = makeMCQ(ans, uniqueDistract(ans, () => (a + ri(-1, 2)) * unit || b * unit));
  return { stem: `Uang dibagi dua orang dengan perbandingan ${a} : ${b}. Jika totalnya ${total}, bagian orang pertama adalah ...`, ...m, explanation: `Bagian = ${a}/${a + b} × ${total} = ${ans}.` };
}
function genAverage() {
  const n = ri(3, 5); const nums = Array.from({ length: n }, () => ri(40, 95)); const sum = nums.reduce((x, y) => x + y, 0);
  const ans = Math.round(sum / n);
  const m = makeMCQ(ans, uniqueDistract(ans, () => ans + ri(-6, 6) || ans + 2));
  return { stem: `Rata-rata dari ${nums.join(", ")} adalah ...`, ...m, explanation: `(${nums.join(" + ")}) ÷ ${n} = ${sum} ÷ ${n} = ${ans}.` };
}
function genAlgebra() {
  const x = ri(3, 14), a = ri(2, 6), b = ri(1, 20); const c = a * x + b;
  const ans = x;
  const m = makeMCQ(ans, uniqueDistract(ans, () => x + ri(-4, 4) || x + 1));
  return { stem: `Jika ${a}x + ${b} = ${c}, maka x = ...`, ...m, explanation: `${a}x = ${c} − ${b} = ${c - b}; x = ${c - b} ÷ ${a} = ${ans}.` };
}
function genWorkRate() {
  const t1 = ri(3, 6), t2 = ri(3, 6);
  // combined time = t1*t2/(t1+t2), keep clean-ish; present as nearest
  const combined = (t1 * t2) / (t1 + t2);
  const ans = Math.round(combined * 10) / 10;
  const m = makeMCQ(ans, uniqueDistract(ans, () => Math.round((ans + (ri(-15, 15) / 10)) * 10) / 10 || ans + 0.5));
  return { stem: `A menyelesaikan tugas dalam ${t1} jam, B dalam ${t2} jam. Bila bekerja bersama, waktu yang diperlukan (jam) ≈ ...`, ...m, explanation: `1/T = 1/${t1} + 1/${t2}. T = (${t1}×${t2})/(${t1}+${t2}) = ${ans} jam.` };
}
const NUMERIC_GENS = [genSeriesArithmetic, genSeriesGeometric, genSeriesIncreasingDiff, genPercent, genRatio, genAverage, genAlgebra, genWorkRate];
function genNumericSet(n = 10) { return Array.from({ length: n }, () => pick(NUMERIC_GENS)()); }

/* ------------------------------ TPA FIGURAL ----------------------------- */
// Simple SVG pattern series — rotation of an arrow.
function FiguralRotation() {
  // square with a dot moving clockwise across corners: TL, TR, BR, ? (BL)
  const positions = ["TL", "TR", "BR", "BL"];
  const dot = (pos) => {
    const map = { TL: [16, 16], TR: [44, 16], BR: [44, 44], BL: [16, 44] };
    const [cx, cy] = map[pos];
    return `<rect x="6" y="6" width="48" height="48" rx="6" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="6" fill="currentColor"/>`;
  };
  const seq = ["TL", "TR", "BR"];
  const optionPos = ["BL", "TL", "TR", "BR"]; // BL correct
  return {
    figural: true,
    seqSvgs: seq.map(dot),
    optionSvgs: optionPos.map(dot),
    answer: 0,
    stem: "Titik bergerak searah jarum jam mengelilingi sudut. Gambar manakah yang melanjutkan pola?",
    explanation: "Titik berpindah TL → TR → BR (searah jarum jam), sehingga berikutnya berada di sudut kiri-bawah (BL).",
  };
}
function FiguralCount() {
  // increasing number of bars: 1,2,3 -> 4
  const bars = (k) => {
    let r = "";
    for (let i = 0; i < k; i++) r += `<rect x="${8 + i * 11}" y="${44 - 0}" width="7" height="0" fill="currentColor"/>`;
    // draw vertical bars of increasing presence (count) instead
    r = "";
    for (let i = 0; i < k; i++) r += `<rect x="${8 + i * 11}" y="14" width="7" height="32" rx="2" fill="currentColor"/>`;
    return `<rect x="4" y="6" width="52" height="48" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>${r}`;
  };
  const seq = [1, 2, 3];
  const opts = [4, 2, 5, 3]; // 4 correct
  return {
    figural: true,
    seqSvgs: seq.map(bars),
    optionSvgs: opts.map(bars),
    answer: 0,
    stem: "Jumlah batang bertambah satu setiap langkah. Gambar manakah yang melanjutkan pola?",
    explanation: "Pola: 1, 2, 3 batang → berikutnya 4 batang.",
  };
}
function FiguralPolygon() {
  // regular polygon with increasing number of sides: 3,4,5 -> 6
  const poly = (sides) => {
    const cx = 30, cy = 31, r = 19;
    let pts = [];
    for (let i = 0; i < sides; i++) {
      const a = (-90 + i * 360 / sides) * Math.PI / 180;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return `<rect x="4" y="5" width="52" height="50" rx="6" fill="none" stroke="var(--line)" stroke-width="1.5"/><polygon points="${pts.join(" ")}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>`;
  };
  const seq = [3, 4, 5];
  const opts = [6, 7, 5, 4]; // 6 correct
  return {
    figural: true, seqSvgs: seq.map(poly), optionSvgs: opts.map(poly), answer: 0,
    stem: "Jumlah sisi bangun bertambah satu tiap langkah. Gambar manakah yang melanjutkan pola?",
    explanation: "Pola: 3, 4, 5 sisi → berikutnya 6 sisi (segi enam).",
  };
}
function FiguralHand() {
  // a single hand rotating 90 deg clockwise: up, right, down -> left
  const hand = (dir) => {
    const cx = 30, cy = 30, L = 20;
    const map = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
    const [dx, dy] = map[dir];
    return `<rect x="4" y="4" width="52" height="52" rx="6" fill="none" stroke="var(--line)" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="currentColor"/><line x1="${cx}" y1="${cy}" x2="${cx + dx * L}" y2="${cy + dy * L}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
  };
  const seq = ["up", "right", "down"];
  const opts = ["left", "up", "right", "down"]; // left correct
  return {
    figural: true, seqSvgs: seq.map(hand), optionSvgs: opts.map(hand), answer: 0,
    stem: "Jarum berputar 90° searah jarum jam tiap langkah. Gambar manakah yang melanjutkan pola?",
    explanation: "Atas → kanan → bawah (searah jarum jam), sehingga berikutnya menunjuk ke kiri.",
  };
}
const FIGURAL_GENS = [FiguralRotation, FiguralCount, FiguralPolygon, FiguralHand];
const FIGURAL = FIGURAL_GENS.map(f => f());

/* ------------------------------ AI HELPERS ------------------------------ */
// SumoPod is an OpenAI-compatible (LiteLLM-style) gateway.
// Priority: cheapest-but-powerful first, then fall back. (No truly-free chat model exists in the catalog.)
const AI_MODELS = [
  { id: "MiniMax-M2.7-highspeed", label: "MiniMax M2.7 Highspeed — termurah, cepat ($0.03/$0.12)" },
  { id: "gpt-5-nano", label: "GPT-5 nano — sangat murah ($0.05/$0.40)" },
  { id: "gemini/gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite — stabil ($0.10/$0.40)" },
  { id: "deepseek-v4-flash", label: "DeepSeek V4 Flash — penalaran kuat, murah ($0.14/$0.28)" },
  { id: "mimo-v2.5", label: "MiMo v2.5 — murah ($0.14/$0.28)" },
  { id: "qwen3.6-flash", label: "Qwen 3.6 Flash ($0.25/$1.50)" },
  { id: "gemini/gemini-3.1-flash-lite", label: "Gemini 3.1 Flash Lite — generasi baru ($0.25/$1.50)" },
  { id: "MiniMax-M3", label: "MiniMax M3 — konteks 1M ($0.30/$1.20)" },
  { id: "deepseek-v4-pro", label: "DeepSeek V4 Pro — pintar, output murah ($0.43/$0.87)" },
  { id: "gpt-5-mini", label: "GPT-5 mini ($0.25/$2.00)" },
  { id: "glm-5.2", label: "GLM-5.2 — konteks 1M ($1.40/$4.40)" },
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5 ($1.00/$5.00)" },
  { id: "gemini/gemini-3.1-pro-preview", label: "Gemini 3.1 Pro — sangat pintar ($2.00/$12.00)" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 — kualitas tinggi ($3.00/$15.00)" },
  { id: "claude-opus-4-8", label: "Claude Opus 4.8 — terkuat ($5.00/$25.00)" },
];
// chain used automatically if the chosen model errors/empties out (lintas provider agar tahan gangguan)
const AI_FALLBACK = ["MiniMax-M2.7-highspeed", "deepseek-v4-flash", "gemini/gemini-2.5-flash-lite", "gpt-5-mini"];

const DEFAULT_AI = {
  baseUrl: "https://itqan-sumopod-proxy.sopian-hadianto.workers.dev", // Cloudflare Worker proxy; key disimpan sebagai secret di Worker
  apiKey: "",                           // SENGAJA kosong: otentikasi ditangani Worker, jangan pernah taruh key di sini
  model: "MiniMax-M2.7-highspeed",
};

function aiEndpoint(base) {
  const b = (base || "").trim().replace(/\/+$/, "");
  if (!b) return "";
  if (/\/chat\/completions$/.test(b)) return b;
  if (/\/v1$/.test(b)) return b + "/chat/completions";
  return b + "/v1/chat/completions";
}

async function callClaude(messages, maxTokens = 1024, system) {
  const cfg = (typeof window !== "undefined" && window.__itqAI) || DEFAULT_AI;
  const url = aiEndpoint(cfg.baseUrl);
  if (!url) throw new Error("AI belum dikonfigurasi — buka Set ▸ AI.");
  const msgs = system ? [{ role: "system", content: system }, ...messages] : messages;
  const chosen = cfg.model || DEFAULT_AI.model;
  const order = [chosen, ...AI_FALLBACK.filter(m => m !== chosen)];
  const headers = { "Content-Type": "application/json" };
  if (cfg.apiKey) headers["Authorization"] = "Bearer " + cfg.apiKey;

  let lastErr;
  for (const model of order) {
    try {
      const res = await fetch(url, {
        method: "POST", headers,
        body: JSON.stringify({ model, messages: msgs, max_tokens: maxTokens, temperature: 0.4 }),
      });
      if (!res.ok) {
        lastErr = new Error("HTTP " + res.status);
        if (res.status === 401 || res.status === 403) throw lastErr; // auth: stop, don't burn fallbacks
        continue;
      }
      const data = await res.json();
      const m = data && data.choices && data.choices[0] && data.choices[0].message;
      let txt = m && m.content;
      if (Array.isArray(txt)) txt = txt.map(p => (p && (p.text || p.content)) || "").join("");
      if (typeof txt === "string" && txt.trim()) return txt.trim();
      lastErr = new Error("Respons AI kosong");
    } catch (e) {
      lastErr = e;
      if (/\b401\b|\b403\b/.test(String(e && e.message))) break;
    }
  }
  throw lastErr || new Error("AI gagal");
}
function parseJSON(text) {
  let t = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const s = t.indexOf("{"), sArr = t.indexOf("[");
  const start = (sArr !== -1 && (sArr < s || s === -1)) ? sArr : s;
  const end = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"));
  if (start !== -1 && end !== -1) t = t.slice(start, end + 1);
  return JSON.parse(t);
}

/* ------------------------------ PERSISTENCE ----------------------------- */
const DEFAULT_DATA = {
  v: 1,
  profile: { name: "Sopian", targets: { toefl: 550, ielts: 6.5, tpa: 600 } },
  progress: {
    toefl: { answered: 0, correct: 0, byday: {} },
    ielts: { answered: 0, correct: 0, byday: {} },
    tpa: { answered: 0, correct: 0, byday: {} },
  },
  srs: { cards: [], lastSeed: 0 },
  history: [], // {date, domain, sub, correct, total}
  streak: { count: 0, last: null },
  xp: 0,
  ai: { ...DEFAULT_AI },
};
const todayStr = () => new Date().toISOString().slice(0, 10);
function yesterdayStr() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }

// Persistence shim: use window.storage inside claude.ai artifacts; fall back to
// localStorage on real deployments (GitHub Pages, custom domain) so progress and
// the AI key survive a page reload.
const STORE = {
  async get(k) {
    try { if (typeof window !== "undefined" && window.storage) return await window.storage.get(k); } catch (e) { }
    try { const v = localStorage.getItem(k); return v != null ? { value: v } : null; } catch (e) { return null; }
  },
  async set(k, v) {
    try { if (typeof window !== "undefined" && window.storage) return await window.storage.set(k, v); } catch (e) { }
    try { localStorage.setItem(k, v); } catch (e) { }
  },
  async del(k) {
    try { if (typeof window !== "undefined" && window.storage) return await window.storage.delete(k); } catch (e) { }
    try { localStorage.removeItem(k); } catch (e) { }
  },
};

function useItqan() {
  const [data, setData] = useState(null);
  const tRef = useRef(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      let loaded = JSON.parse(JSON.stringify(DEFAULT_DATA));
      try {
        const r = await STORE.get("itqan:data");
        if (r && r.value) loaded = { ...loaded, ...JSON.parse(r.value) };
      } catch (e) { /* first run / no key */ }
      loaded.ai = { ...DEFAULT_AI, ...(loaded.ai || {}) };
      if (typeof window !== "undefined") window.__itqAI = loaded.ai;
      // seed / top-up SRS from VOCAB_ALL
      if (!loaded.srs.cards || loaded.srs.cards.length === 0) {
        loaded.srs.cards = VOCAB_ALL.map(([term, def, gloss], i) => ({
          id: "v" + i, term, def, gloss, ease: 2.5, interval: 0, reps: 0, due: todayStr(),
        }));
      } else {
        const have = new Set(loaded.srs.cards.map(c => c.term));
        VOCAB_ALL.forEach(([term, def, gloss], i) => {
          if (!have.has(term)) loaded.srs.cards.push({ id: "vx" + i, term, def, gloss, ease: 2.5, interval: 0, reps: 0, due: todayStr() });
        });
      }
      if (alive) setData(loaded);
    })();
    return () => { alive = false; };
  }, []);
  const persist = useCallback((next) => {
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(async () => {
      try { await STORE.set("itqan:data", JSON.stringify(next)); } catch (e) { }
    }, 400);
  }, []);
  const update = useCallback((updater) => {
    setData(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (typeof window !== "undefined" && next && next.ai) window.__itqAI = next.ai;
      persist(next);
      return next;
    });
  }, [persist]);
  return [data, update];
}

/* score estimates from accuracy */
function acc(d) { return d.answered ? d.correct / d.answered : 0; }
function estToefl(a) { return Math.round((310 + a * 340) / 10) * 10; }       // 310..650
function estIelts(a) { return Math.round((4 + a * 5) * 2) / 2; }              // 4.0..9.0
function estTpa(a) { return Math.round((250 + a * 600) / 5) * 5; }           // 250..850
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

/* ------------------------------ UI ATOMS -------------------------------- */
function Eyebrow({ n, children, color }) {
  return <div className="eyebrow" style={{ marginBottom: 8 }}>
    {n != null && <span style={{ color: color || "var(--ink)", fontWeight: 600 }}>{String(n).padStart(2, "0")} — </span>}
    {children}
  </div>;
}
function Pill({ children, color, soft }) {
  return <span className="pill" style={{ background: soft, color }}>{children}</span>;
}

function Gauge({ value, target, max, color, label, suffix = "" }) {
  // arc 220deg
  const size = 132, stroke = 11, r = (size - stroke) / 2 - 8, cx = size / 2, cy = size / 2 + 6;
  const startA = 160, endA = 20, sweep = (360 - (startA - endA)) % 360 || 220; // 220deg
  const frac = clamp(value / max, 0, 1);
  const tfrac = clamp(target / max, 0, 1);
  const pt = (deg) => { const a = (deg) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  // map fraction f -> angle. We go clockwise from 160deg down through bottom to 20deg (i.e., 160 -> 380 == 20)
  const ang = (f) => 160 + f * 220;
  const arcPath = (f0, f1) => {
    const [x0, y0] = pt(ang(f0)); const [x1, y1] = pt(ang(f1));
    const large = (ang(f1) - ang(f0)) > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };
  const [tx, ty] = pt(ang(tfrac));
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size - 14} viewBox={`0 0 ${size} ${size - 6}`}>
        <path d={arcPath(0, 1)} fill="none" stroke="var(--line)" strokeWidth={stroke} strokeLinecap="round" />
        <path d={arcPath(0, frac)} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
        {/* target tick */}
        <circle cx={tx} cy={ty} r={4.5} fill="#fff" stroke={color} strokeWidth={2.5} />
        <text x={cx} y={cy - 2} textAnchor="middle" className="serif" style={{ fontSize: 30, fontWeight: 600, fill: "var(--ink)" }}>
          {value}{suffix}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" className="mono" style={{ fontSize: 10, fill: "var(--muted)", letterSpacing: ".08em" }}>
          TARGET {target}{suffix}
        </text>
      </svg>
      <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", marginTop: -2 }}>{label}</div>
    </div>
  );
}

/* ------------------------------ AUDIO / SPEECH -------------------------- */
const SPEECH_OK = typeof window !== "undefined" && "speechSynthesis" in window;

function useSpeechScript(script) {
  const [voices, setVoices] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | playing | paused | done
  const [lineIdx, setLineIdx] = useState(-1);
  const [rate, setRate] = useState(1);
  const rateRef = useRef(1);
  useEffect(() => { rateRef.current = rate; }, [rate]);

  useEffect(() => {
    if (!SPEECH_OK) return;
    const load = () => setVoices(window.speechSynthesis.getVoices() || []);
    load();
    window.speechSynthesis.addEventListener?.("voiceschanged", load);
    return () => {
      try { window.speechSynthesis.cancel(); } catch (e) { }
      window.speechSynthesis.removeEventListener?.("voiceschanged", load);
    };
  }, []);

  const enVoices = voices.filter(v => /^en(-|_|$)/i.test(v.lang));
  const pool = enVoices.length ? enVoices : voices;
  const femaleV = pool.find(v => /female|woman|samantha|victoria|zira|fiona|karen|moira|tessa|female\)/i.test(v.name)) || pool.find(v => /uk english female|google us english/i.test(v.name)) || pool[0];
  const maleV = pool.find(v => /male|man|daniel|alex|david|fred|rishi|oliver|male\)/i.test(v.name)) || pool[1] || pool[0];
  const voiceFor = (who) => who === "W" ? femaleV : who === "M" ? maleV : (maleV || femaleV || pool[0]);

  const speakFrom = (start) => {
    if (!SPEECH_OK || !script || !script.length) return;
    window.__itqStop = false;
    try { window.speechSynthesis.cancel(); } catch (e) { }
    const speakOne = (k) => {
      if (window.__itqStop) return;
      if (k >= script.length) { setStatus("done"); setLineIdx(-1); return; }
      setLineIdx(k);
      const u = new SpeechSynthesisUtterance(script[k].text);
      const v = voiceFor(script[k].who);
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
      u.rate = rateRef.current;
      u.pitch = script[k].who === "M" ? 0.9 : script[k].who === "W" ? 1.12 : 1;
      u.onend = () => { if (!window.__itqStop) speakOne(k + 1); };
      u.onerror = () => { if (!window.__itqStop) speakOne(k + 1); };
      window.speechSynthesis.speak(u);
    };
    setStatus("playing");
    speakOne(start);
  };

  const play = () => { speakFrom(0); };
  const pause = () => { if (SPEECH_OK) { try { window.speechSynthesis.pause(); } catch (e) { } setStatus("paused"); } };
  const resume = () => { if (SPEECH_OK) { try { window.speechSynthesis.resume(); } catch (e) { } setStatus("playing"); } };
  const stop = () => { if (SPEECH_OK) { window.__itqStop = true; try { window.speechSynthesis.cancel(); } catch (e) { } setStatus("idle"); setLineIdx(-1); } };

  return { status, lineIdx, rate, setRate, play, pause, resume, stop, count: script ? script.length : 0 };
}

function ListeningPlayer({ script, reveal, accent = "var(--toefl)", title, lockTranscript = false }) {
  const sp = useSpeechScript(script);
  const [showText, setShowText] = useState(false);
  const playing = sp.status === "playing";
  const paused = sp.status === "paused";
  const speakerName = (who) => who === "M" ? "Pria" : who === "W" ? "Wanita" : "Narator";
  const transcriptVisible = showText || (reveal && !lockTranscript);

  return (
    <div className="card" style={{ marginBottom: 16, borderLeft: `3px solid ${accent}`, background: "#fcfcfd" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 36px" }}>
          <Headphones size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div className="serif" style={{ fontSize: 15, fontWeight: 600 }}>{title || "Rekaman audio"}</div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: ".05em" }}>SUARA SINTETIS · {sp.count} BARIS</div>
        </div>
        {SPEECH_OK ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!playing
              ? <button className="btn sm" onClick={paused ? sp.resume : sp.play} style={{ background: accent, borderColor: accent }}>
                  <Play size={15} /> {paused ? "Lanjut" : (sp.status === "done" ? "Putar lagi" : "Putar")}
                </button>
              : <button className="btn ghost sm" onClick={sp.pause}><Pause size={15} /> Jeda</button>}
            {(playing || paused) && <button className="btn ghost sm" onClick={sp.stop} title="Hentikan"><Square size={13} /></button>}
          </div>
        ) : (
          <span className="mono" style={{ fontSize: 11, color: "var(--bad)" }}>Audio tak didukung</span>
        )}
      </div>

      {SPEECH_OK && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
          {/* soundwave */}
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 22 }}>
            {[0, 1, 2, 3, 4, 5, 6].map(b => (
              <span key={b} style={{
                width: 3, borderRadius: 2, background: playing ? accent : "var(--line)",
                height: playing ? `${6 + ((b * 7 + sp.lineIdx * 5) % 16)}px` : "5px",
                transition: "height .2s", animation: playing ? `bar 0.9s ${b * 0.08}s infinite alternate` : "none",
              }} />
            ))}
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
            {playing ? `Memutar… baris ${sp.lineIdx + 1}/${sp.count}` : paused ? "Dijeda" : sp.status === "done" ? "Selesai diputar" : "Belum diputar"}
          </span>
          <div style={{ display: "flex", gap: 6, marginLeft: "auto", alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>Kecepatan</span>
            {[0.8, 1].map(r => (
              <button key={r} className={"tab" + (sp.rate === r ? " on" : "")} style={{ padding: "4px 9px", fontSize: 12, ...(sp.rate === r ? { background: accent, borderColor: accent } : {}) }} onClick={() => sp.setRate(r)}>{r === 1 ? "1×" : "0.8×"}</button>
            ))}
          </div>
        </div>
      )}

      {!lockTranscript && (
        <button className="crumb" style={{ marginTop: 10 }} onClick={() => setShowText(s => !s)}>
          <FileText size={13} /> {transcriptVisible ? "Sembunyikan transkrip" : "Tampilkan transkrip"}
        </button>
      )}
      {transcriptVisible && (
        <div className="rise" style={{ marginTop: 8, borderTop: "1px solid var(--line-2)", paddingTop: 10 }}>
          {script.map((l, k) => (
            <div key={k} style={{ display: "flex", gap: 10, marginBottom: 7, fontSize: 14, lineHeight: 1.5 }}>
              <span className="mono" style={{ flex: "0 0 64px", color: l.who === "M" ? "var(--toefl)" : l.who === "W" ? "var(--ielts)" : "var(--muted)", fontSize: 11, paddingTop: 2 }}>{speakerName(l.who)}</span>
              <span style={{ color: l.who === "N" ? "var(--muted)" : "var(--ink)", fontStyle: l.who === "N" ? "italic" : "normal" }}>{l.text}</span>
            </div>
          ))}
        </div>
      )}
      {!SPEECH_OK && !transcriptVisible && (
        <div className="sub" style={{ fontSize: 13, marginTop: 8 }}>Browser ini tidak mendukung audio. Buka transkrip untuk membaca.</div>
      )}
    </div>
  );
}

function useSpeechRecognition() {
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const supported = !!SR;
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);
  const start = (onText, lang = "en-US") => {
    if (!supported) return;
    try {
      const r = new SR();
      recRef.current = r;
      r.lang = lang; r.interimResults = true; r.continuous = true;
      let finalT = "";
      r.onresult = (e) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) finalT += t + " "; else interim += t;
        }
        onText((finalT + interim).trim());
      };
      r.onend = () => setListening(false);
      r.onerror = () => setListening(false);
      setListening(true);
      r.start();
    } catch (e) { setListening(false); }
  };
  const stop = () => { try { recRef.current && recRef.current.stop(); } catch (e) { } setListening(false); };
  return { supported, listening, start, stop };
}

function MicButton({ lang = "en-US", onText, accent = "var(--ielts)" }) {
  const { supported, listening, start, stop } = useSpeechRecognition();
  if (!supported) return null;
  return (
    <button type="button" className="btn ghost sm" title="Bicara untuk mengisi teks (eksperimental)"
      onClick={() => listening ? stop() : start(onText, lang)}
      style={listening ? { borderColor: accent, color: accent } : {}}>
      {listening ? <><Square size={13} /> Berhenti</> : <><Mic size={14} /> Bicara</>}
    </button>
  );
}

/* ------------------------------ QUIZ ENGINE ----------------------------- */
function FiguralSvg({ markup, active }) {
  return <div style={{
    width: 78, height: 70, border: "1.5px solid " + (active ? "var(--ink)" : "var(--line)"),
    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", background: active ? "#fafafa" : "#fff"
  }}>
    <svg width="56" height="56" viewBox="0 0 60 60" dangerouslySetInnerHTML={{ __html: markup }} />
  </div>;
}

function Quiz({ items, accent, domain, sub, onFinish, passage, passageTitle, listenScript }) {
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [aiExp, setAiExp] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  const q = items[i];
  const last = i === items.length - 1;

  const submit = () => {
    if (sel == null) return;
    setRevealed(true);
    if (sel === q.answer) setScore(s => s + 1);
  };
  const next = () => {
    if (last) { onFinish({ correct: score, total: items.length }); return; }
    setI(i + 1); setSel(null); setRevealed(false); setAiExp(null);
  };
  const explainAI = async () => {
    setAiBusy(true);
    try {
      const txt = await callClaude([{
        role: "user", content:
          `You are an expert ${domain.toUpperCase()} tutor. A learner answered this question. Explain clearly and briefly (max 90 words) WHY the correct answer is right and why a common wrong choice is tempting. Use simple language; if the question is in Indonesian, answer in Indonesian.\n\nQuestion: ${q.stem}\nOptions: ${q.choices.map((c, idx) => String.fromCharCode(65 + idx) + ") " + c).join("  ")}\nCorrect: ${String.fromCharCode(65 + q.answer)}`
      }], 300);
      setAiExp(txt);
    } catch (e) { setAiExp("Penjelasan AI gagal: " + ((e && e.message) || "tidak tersedia") + ". Atur mesin AI di Set \u25B8 AI lalu coba lagi."); }
    setAiBusy(false);
  };

  return (
    <div className="rise">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Pill color={accent} soft="var(--line-2)">SOAL {i + 1} / {items.length}</Pill>
        <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Skor sesi: {score}</span>
      </div>

      {q.script
        ? <ListeningPlayer key={"a" + i} script={q.script} reveal={revealed} accent={accent} />
        : listenScript
          ? <ListeningPlayer script={listenScript} reveal={revealed} accent={accent} title={passageTitle} />
          : passage ? (
            <div className="card" style={{ marginBottom: 16, background: "#fcfcfb" }}>
              {passageTitle && <div className="serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{passageTitle}</div>}
              <div className="passage">{passage.split("\n\n").map((p, k) => <p key={k}>{p}</p>)}</div>
            </div>
          ) : null}

      <div className="card pad-lg">
        <div className="serif" style={{ fontSize: 18, lineHeight: 1.5, marginBottom: 18 }}>{q.stem}</div>

        {q.figural ? (
          <>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
              {q.seqSvgs.map((s, k) => <FiguralSvg key={k} markup={s} />)}
              <div style={{ width: 70, height: 70, borderRadius: 12, border: "1.5px dashed var(--ink-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "var(--muted)" }}>?</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, maxWidth: 420 }}>
              {q.optionSvgs.map((s, idx) => {
                const isC = revealed && idx === q.answer, isW = revealed && idx === sel && sel !== q.answer;
                return <button key={idx} disabled={revealed} onClick={() => setSel(idx)}
                  style={{ border: "0", background: "transparent", cursor: revealed ? "default" : "pointer", padding: 0 }}>
                  <div style={{
                    border: "2px solid " + (isC ? "var(--ok)" : isW ? "var(--bad)" : sel === idx ? "var(--ink)" : "var(--line)"),
                    borderRadius: 12, background: isC ? "#EAF7F0" : isW ? "#FBECEA" : sel === idx ? "#fafafa" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", height: 72, color: "var(--ink)"
                  }}>
                    <svg width="52" height="52" viewBox="0 0 60 60" dangerouslySetInnerHTML={{ __html: s }} />
                  </div>
                  <div className="mono" style={{ fontSize: 11, marginTop: 4, color: "var(--muted)" }}>{String.fromCharCode(65 + idx)}</div>
                </button>;
              })}
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.choices.map((c, idx) => {
              const cls = ["choice"];
              if (revealed) { if (idx === q.answer) cls.push("correct"); else if (idx === sel) cls.push("wrong"); }
              else if (sel === idx) cls.push("sel");
              return (
                <button key={idx} className={cls.join(" ")} disabled={revealed} onClick={() => setSel(idx)}>
                  <span className="key">{String.fromCharCode(65 + idx)}</span>
                  <span style={{ paddingTop: 1 }}>{c}</span>
                  {revealed && idx === q.answer && <Check size={18} color="var(--ok)" style={{ marginLeft: "auto" }} />}
                  {revealed && idx === sel && idx !== q.answer && <X size={18} color="var(--bad)" style={{ marginLeft: "auto" }} />}
                </button>
              );
            })}
          </div>
        )}

        {revealed && (
          <div className="explain rise" style={{ marginTop: 16 }}>
            <strong style={{ fontWeight: 600 }}>{sel === q.answer ? "Benar. " : "Pembahasan. "}</strong>
            {q.explanation}
          </div>
        )}
        {revealed && aiExp && <div className="card flat rise" style={{ marginTop: 12, background: "var(--tpa-soft)", border: "1px solid #d9d7f0" }}>
          <div className="eyebrow" style={{ color: "var(--tpa)" }}><Sparkles size={11} style={{ verticalAlign: "-1px" }} /> PENJELASAN AI</div>
          <div style={{ fontSize: 14, lineHeight: 1.55, marginTop: 6 }}>{aiExp}</div>
        </div>}

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          {!revealed
            ? <button className="btn" disabled={sel == null} onClick={submit}>Periksa jawaban <ArrowRight size={16} /></button>
            : <>
              <button className="btn" onClick={next}>{last ? "Selesai" : "Soal berikutnya"} <ArrowRight size={16} /></button>
              {!aiExp && <button className="btn ghost sm" onClick={explainAI} disabled={aiBusy}>
                {aiBusy ? <Loader2 size={15} className="spin" /> : <Sparkles size={15} />} Tanya AI kenapa
              </button>}
            </>}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result, accent, onAgain, onHome }) {
  const pct = Math.round(result.correct / result.total * 100);
  return (
    <div className="card pad-lg rise" style={{ textAlign: "center" }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
        <Trophy size={30} />
      </div>
      <div className="h2">Sesi selesai</div>
      <div className="serif" style={{ fontSize: 44, fontWeight: 600, color: accent, margin: "6px 0" }}>{result.correct}<span style={{ color: "var(--muted)", fontSize: 24 }}>/{result.total}</span></div>
      <div className="sub" style={{ marginBottom: 18 }}>Akurasi {pct}% &nbsp;·&nbsp; +{result.correct * 10 + result.total * 2} XP</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn" onClick={onAgain}><RefreshCw size={16} /> Latihan lagi</button>
        <button className="btn ghost" onClick={onHome}>Kembali</button>
      </div>
    </div>
  );
}

/* ------------------------- AI QUESTION GENERATOR ------------------------ */
async function generateQuestions(domain, sub, difficulty, n = 5) {
  const ctx = {
    toefl: "TOEFL ITP (paper-based). Sections: Listening (use a short scripted mini-dialogue described in text), Structure & Written Expression (formal academic English grammar), Reading Comprehension.",
    ielts: "IELTS Academic. Reading uses TRUE/FALSE/NOT GIVEN or multiple choice on a short academic passage.",
    tpa: "TPA Bappenas (Tes Potensi Akademik, in Bahasa Indonesia). Verbal (sinonim, antonim, analogi), numerik (deret, aritmetika), logika (silogisme, penalaran analitis).",
  }[domain];
  const lang = domain === "tpa" ? "Bahasa Indonesia" : "English (for TOEFL/IELTS), but Indonesian explanations are fine.";
  const prompt =
    `Generate ${n} high-quality multiple-choice practice questions for ${ctx}\nSub-skill focus: ${sub}. Difficulty: ${difficulty}.\nWrite questions in ${lang}. Each question must have exactly 4 options and ONE correct answer. Make distractors plausible. Keep stems self-contained (if a reading/listening item, embed the needed short text inside the stem).\n\nRespond with ONLY a JSON array, no markdown, no preamble, in this exact shape:\n[{"stem":"...","choices":["...","...","...","..."],"answer":0,"explanation":"why the correct answer is right (max 40 words)"}]`;
  const txt = await callClaude([{ role: "user", content: prompt }], 1500);
  const arr = parseJSON(txt);
  return arr.filter(q => q && Array.isArray(q.choices) && q.choices.length === 4 && typeof q.answer === "number")
    .map(q => ({ ...q, answer: clamp(q.answer, 0, 3) }));
}

async function generateListening(domain, difficulty) {
  const isT = domain === "toefl";
  const brief = isT
    ? `Create a short TOEFL ITP style listening "talk" — a mini lecture or campus announcement of about 90 to 130 words, spoken by a single speaker — then 3 multiple-choice comprehension questions about it.`
    : `Create a short IELTS style listening conversation of about 100 to 140 words between two speakers (for example an enquiry, booking, or campus discussion), then 3 multiple-choice comprehension questions about it.`;
  const shape = `Difficulty: ${difficulty}. Use natural spoken English.\nRespond with ONLY JSON, no markdown, no preamble, in this exact shape:\n{"title":"short title","script":[{"who":"N","text":"one-line narrator intro"},{"who":"M","text":"..."},{"who":"W","text":"..."}],"questions":[{"stem":"...","choices":["..","..","..",".."],"answer":0,"explanation":"why correct, max 30 words"}]}\nUse "N" only for a brief narrator intro line, "M" for a male speaker, "W" for a female speaker. Keep each script line to one or two sentences.`;
  const txt = await callClaude([{ role: "user", content: brief + "\n\n" + shape }], 1400);
  const r = parseJSON(txt);
  r.script = (r.script || []).filter(l => l && l.text).map(l => ({ who: ["N", "M", "W"].includes(l.who) ? l.who : "N", text: String(l.text) }));
  r.questions = (r.questions || []).filter(q => q && Array.isArray(q.choices) && q.choices.length === 4 && typeof q.answer === "number").map(q => ({ ...q, answer: clamp(q.answer, 0, 3) }));
  if (!r.title) r.title = isT ? "Talk (AI)" : "Conversation (AI)";
  return r;
}

/* --------------------------------- VIEWS -------------------------------- */
function Dashboard({ data, go }) {
  const tA = acc(data.progress.toefl), iA = acc(data.progress.ielts), pA = acc(data.progress.tpa);
  const tEst = estToefl(tA), iEst = estIelts(iA), pEst = estTpa(pA);
  const totalAnswered = data.progress.toefl.answered + data.progress.ielts.answered + data.progress.tpa.answered;
  const due = (data.srs.cards || []).filter(c => c.due <= todayStr()).length;

  // history chart (last 14 days accuracy across all)
  const chart = useMemo(() => {
    const days = {};
    (data.history || []).forEach(h => {
      days[h.date] = days[h.date] || { c: 0, t: 0 };
      days[h.date].c += h.correct; days[h.date].t += h.total;
    });
    return Object.keys(days).sort().slice(-14).map(d => ({ d: d.slice(5), acc: Math.round(days[d].c / days[d].t * 100) }));
  }, [data.history]);

  return (
    <div className="rise">
      <Eyebrow>Personal mastery cockpit</Eyebrow>
      <div className="h1">Assalamu'alaikum, {data.profile.name}.</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 22, maxWidth: 640 }}>
        Tiga target, satu disiplin. Estimasi di bawah dihitung dari akurasi latihanmu — bukan skor resmi, tapi penunjuk arah yang jujur. Titik kecil pada gauge = target.
      </div>

      <div className="card pad-lg" style={{ marginBottom: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8, justifyItems: "center" }}>
          <Gauge value={tEst} target={data.profile.targets.toefl} max={677} color="var(--toefl)" label="TOEFL ITP" />
          <Gauge value={iEst} target={data.profile.targets.ielts} max={9} color="var(--ielts)" label="IELTS BAND" />
          <Gauge value={pEst} target={data.profile.targets.tpa} max={850} color="var(--tpa)" label="TPA BAPPENAS" />
        </div>
      </div>

      <div className="gridstat" style={{ marginBottom: 20 }}>
        <div className="card flat"><div className="statk"><Flame size={12} style={{ verticalAlign: "-2px", color: "var(--gold)" }} /> Streak</div><div className="statv" style={{ marginTop: 8 }}>{data.streak.count}<span style={{ fontSize: 14, color: "var(--muted)" }}> hari</span></div></div>
        <div className="card flat"><div className="statk"><Zap size={12} style={{ verticalAlign: "-2px", color: "var(--gold)" }} /> Total XP</div><div className="statv" style={{ marginTop: 8 }}>{data.xp}</div></div>
        <div className="card flat"><div className="statk"><BarChart3 size={12} style={{ verticalAlign: "-2px" }} /> Soal dikerjakan</div><div className="statv" style={{ marginTop: 8 }}>{totalAnswered}</div></div>
        <div className="card flat"><div className="statk"><Layers size={12} style={{ verticalAlign: "-2px" }} /> Kosakata jatuh tempo</div><div className="statv" style={{ marginTop: 8 }}>{due}</div></div>
      </div>

      <button className="dom-card" onClick={() => go("mock")} style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 16, borderColor: "var(--gold)" }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--gold-soft)", color: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 46px" }}><Clock size={22} /></div>
        <div style={{ flex: 1 }}>
          <div className="serif" style={{ fontSize: 18, fontWeight: 600 }}>Simulasi ujian berwaktu</div>
          <div className="sub" style={{ fontSize: 13, marginTop: 2 }}>Mock TOEFL / IELTS / TPA dengan timer per bagian, audio Listening, dan estimasi skor per seksi.</div>
        </div>
        <ChevronRight size={20} color="var(--muted)" />
      </button>

      <Eyebrow n={1} color="var(--ink)">Mulai latihan</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 22 }}>
        {[
          ["toefl", "Listening · Structure · Reading", GraduationCap],
          ["ielts", "Reading · Writing · Speaking", Languages],
          ["tpa", "Verbal · Numerik · Logika", Brain],
        ].map(([k, desc, Ic]) => (
          <button key={k} className="dom-card" onClick={() => go(k)}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: DOMAINS[k].soft, color: DOMAINS[k].color, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={20} /></div>
              <ChevronRight size={18} color="var(--muted)" />
            </div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>{DOMAINS[k].label}</div>
            <div className="sub" style={{ fontSize: 13, marginTop: 2 }}>{desc}</div>
          </button>
        ))}
      </div>

      {chart.length > 1 && (
        <>
          <Eyebrow n={2}>Tren akurasi (14 hari)</Eyebrow>
          <div className="card" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="d" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} stroke="var(--muted)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} stroke="var(--muted)" />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--line)", fontFamily: "Inter" }} />
                <Line type="monotone" dataKey="acc" stroke="var(--ink)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

/* generic domain practice view that uses seed banks + AI generation */
function PracticeView({ data, update, domain }) {
  const meta = DOMAINS[domain];
  const [mode, setMode] = useState("menu"); // menu | quiz | result
  const [items, setItems] = useState(null);
  const [passage, setPassage] = useState(null);
  const [pTitle, setPTitle] = useState(null);
  const [sub, setSub] = useState("");
  const [result, setResult] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState(null);
  const [diff, setDiff] = useState("medium");

  const subskills = {
    toefl: [
      { key: "structure", label: "Structure", desc: "Lengkapi kalimat — tata bahasa akademik.", icon: PenLine, bank: TOEFL_STRUCTURE_ALL },
      { key: "we", label: "Written Expression", desc: "Temukan bagian yang salah.", icon: PenLine, bank: TOEFL_WE_ALL },
      { key: "reading", label: "Reading", desc: "Bacaan akademik + pertanyaan.", icon: BookOpen, readingPool: TOEFL_READINGS },
      { key: "listening", label: "Listening (audio)", desc: "Percakapan & ceramah dengan suara.", icon: Headphones, listening: true },
    ],
    ielts: [
      { key: "reading", label: "Reading (T/F/NG)", desc: "Bacaan + True/False/Not Given.", icon: BookOpen, reading: IELTS_READING },
      { key: "writing", label: "Writing + nilai AI", desc: "Task 1 & 2 dengan rubrik band.", icon: PenLine, writing: true },
      { key: "speaking", label: "Speaking + nilai AI", desc: "Part 1–3, umpan balik band.", icon: Mic, speaking: true },
      { key: "listening", label: "Listening (audio)", desc: "Percakapan IELTS dengan suara.", icon: Headphones, listening: true },
    ],
    tpa: [
      { key: "verbal", label: "Verbal", desc: "Sinonim, antonim, analogi.", icon: Languages, bank: TPA_VERBAL_ALL },
      { key: "numerik", label: "Numerik", desc: "Deret & aritmetika (tak terbatas).", icon: Calculator, gen: () => genNumericSet(10) },
      { key: "logika", label: "Logika", desc: "Silogisme & penalaran.", icon: Brain, bank: TPA_LOGIKA_ALL },
      { key: "figural", label: "Figural", desc: "Pola gambar (visual).", icon: Layers, bank: FIGURAL },
    ],
  }[domain];

  const recordResult = (res, subKey) => {
    update(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const dp = next.progress[domain];
      dp.answered += res.total; dp.correct += res.correct;
      const t = todayStr();
      dp.byday[t] = (dp.byday[t] || 0) + res.total;
      next.history.push({ date: t, domain, sub: subKey, correct: res.correct, total: res.total });
      next.xp += res.correct * 10 + res.total * 2;
      // streak
      if (next.streak.last !== t) {
        next.streak.count = next.streak.last === yesterdayStr() ? next.streak.count + 1 : 1;
        next.streak.last = t;
      }
      return next;
    });
  };

  const startBank = (s) => {
    setSub(s.label);
    if (s.readingPool) { const rd = pick(s.readingPool); setItems(rd.questions); setPassage(rd.passage); setPTitle(rd.title); }
    else if (s.reading) { setItems(s.reading.questions); setPassage(s.reading.passage); setPTitle(s.reading.title); }
    else if (s.gen) { setItems(s.gen()); setPassage(null); setPTitle(null); }
    else { setItems(s.bank); setPassage(null); setPTitle(null); }
    setMode("quiz");
  };
  const startAI = async (s) => {
    setAiBusy(true); setAiErr(null); setSub(s.label);
    try {
      const qs = await generateQuestions(domain, s.label, diff, 5);
      if (!qs.length) throw new Error("empty");
      setItems(qs); setPassage(null); setPTitle(null); setMode("quiz");
    } catch (e) { setAiErr("Gagal membuat soal AI: " + ((e && e.message) || "?") + ". Cek Set \u25B8 AI (Base URL / API Key / model)."); }
    setAiBusy(false);
  };
  const genMore = async (s) => {
    // for bank subskills, fetch AI fresh set
    setAiBusy(true); setAiErr(null);
    try {
      const qs = await generateQuestions(domain, s, diff, 5);
      if (qs.length) { setItems(qs); setMode("quiz"); }
    } catch (e) { setAiErr("Gagal membuat soal AI: " + ((e && e.message) || "?") + ". Cek Set \u25B8 AI."); }
    setAiBusy(false);
  };

  if (mode === "quiz" && items) {
    return (
      <div>
        <button className="crumb" onClick={() => setMode("menu")}><ArrowLeft size={14} /> {meta.label} · {sub}</button>
        <Quiz items={items} accent={meta.color} domain={domain} sub={sub} passage={passage} passageTitle={pTitle}
          onFinish={(res) => { recordResult(res, sub); setResult(res); setMode("result"); }} />
      </div>
    );
  }
  if (mode === "result") {
    return (
      <div>
        <button className="crumb" onClick={() => setMode("menu")}><ArrowLeft size={14} /> {meta.label}</button>
        <ResultCard result={result} accent={meta.color}
          onAgain={() => setMode("menu")} onHome={() => setMode("menu")} />
      </div>
    );
  }

  // special composite views
  if (mode === "writing") return <WritingView data={data} update={update} back={() => setMode("menu")} record={recordResult} />;
  if (mode === "speaking") return <SpeakingView back={() => setMode("menu")} />;
  if (mode === "listening") return <ListeningView domain={domain} meta={meta} record={recordResult} back={() => setMode("menu")} />;

  // MENU
  return (
    <div className="rise">
      <Eyebrow color={meta.color}>{meta.label}</Eyebrow>
      <div className="h1">{meta.label} — latihan terarah</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 18 }}>Pilih sub-keterampilan. Bank soal tervalidasi + generator AI untuk latihan tak terbatas.</div>

      <div className="card flat" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="eyebrow">Tingkat AI:</span>
        <div className="tabrow">
          {["easy", "medium", "hard"].map(d => (
            <button key={d} className={"tab" + (diff === d ? " on" : "")} style={diff === d ? { background: meta.color, borderColor: meta.color } : {}} onClick={() => setDiff(d)}>
              {d === "easy" ? "Dasar" : d === "medium" ? "Menengah" : "Sulit"}
            </button>
          ))}
        </div>
        {aiErr && <span style={{ color: "var(--bad)", fontSize: 13 }}>{aiErr}</span>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
        {subskills.map(s => (
          <div key={s.key} className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: meta.soft, color: meta.color, display: "flex", alignItems: "center", justifyContent: "center" }}><s.icon size={18} /></div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 600 }}>{s.label}</div>
            </div>
            <div className="sub" style={{ fontSize: 13, flex: 1, marginBottom: 14 }}>{s.desc}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.writing ? <button className="btn sm" onClick={() => setMode("writing")}>Buka <ArrowRight size={14} /></button>
                : s.speaking ? <button className="btn sm" onClick={() => setMode("speaking")}>Buka <ArrowRight size={14} /></button>
                  : s.listening ? <button className="btn sm" onClick={() => setMode("listening")}>Buka <ArrowRight size={14} /></button>
                    : s.ai ? <button className="btn sm" disabled={aiBusy} onClick={() => startAI(s)}>{aiBusy ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Buat soal AI</button>
                      : <>
                        <button className="btn sm" onClick={() => startBank(s)}>Mulai <ArrowRight size={14} /></button>
                        {!s.figural && <button className="btn ghost sm" disabled={aiBusy} onClick={() => genMore(s.label)} title="Soal baru dari AI">
                          {aiBusy ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} AI
                        </button>}
                      </>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* IELTS Writing with AI band evaluation */
function WritingView({ back, record }) {
  const [taskType, setTaskType] = useState("task2");
  const [promptIdx, setPromptIdx] = useState(0);
  const prompts = IELTS_WRITING_PROMPTS[taskType];
  const prompt = prompts[promptIdx];
  const [essay, setEssay] = useState("");
  const [busy, setBusy] = useState(false);
  const [evalRes, setEvalRes] = useState(null);
  const [err, setErr] = useState(null);
  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const minW = taskType === "task2" ? 250 : 150;

  const evaluate = async () => {
    setBusy(true); setErr(null); setEvalRes(null);
    try {
      const sys = "You are a certified IELTS examiner. Score strictly by the official IELTS Writing band descriptors. Be fair but rigorous and concrete.";
      const txt = await callClaude([{
        role: "user", content:
          `Evaluate this IELTS Academic Writing ${taskType === "task2" ? "Task 2" : "Task 1"} response.\n\nTASK PROMPT:\n${prompt.prompt}\n\nCANDIDATE RESPONSE (${words} words):\n${essay}\n\nReturn ONLY JSON, no markdown:\n{"overall": <number 1-9 in 0.5 steps>, "criteria": {"task": {"band": <n>, "comment": "<=30 words"}, "coherence": {"band": <n>, "comment": "<=30 words"}, "lexical": {"band": <n>, "comment": "<=30 words"}, "grammar": {"band": <n>, "comment": "<=30 words"}}, "strengths": ["...","..."], "improvements": ["...","...","..."], "rewrite": "one improved version of the candidate's weakest sentence (<=40 words)"}`
      }], 1100, sys);
      const r = parseJSON(txt);
      setEvalRes(r);
      // count toward progress (1 task = treat as practice)
      record({ correct: Math.round((r.overall / 9) * 5), total: 5 }, "writing");
    } catch (e) { setErr("Penilaian AI gagal: " + ((e && e.message) || "?") + ". Cek Set \u25B8 AI."); }
    setBusy(false);
  };

  const critLabels = { task: "Task Response", coherence: "Coherence & Cohesion", lexical: "Lexical Resource", grammar: "Grammar Range & Accuracy" };

  return (
    <div className="rise">
      <button className="crumb" onClick={back}><ArrowLeft size={14} /> IELTS · Writing</button>
      <Eyebrow color="var(--ielts)">Writing + penilaian band AI</Eyebrow>
      <div className="h1">Tulis. Dinilai. Diperbaiki.</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 16 }}>Tulis jawaban lalu minta AI menilainya sesuai 4 kriteria band resmi IELTS dan memberi langkah perbaikan konkret.</div>

      <div className="tabrow" style={{ marginBottom: 14 }}>
        <button className={"tab" + (taskType === "task2" ? " on" : "")} style={taskType === "task2" ? { background: "var(--ielts)", borderColor: "var(--ielts)" } : {}} onClick={() => { setTaskType("task2"); setPromptIdx(0); setEvalRes(null); }}>Task 2 (Esai)</button>
        <button className={"tab" + (taskType === "task1" ? " on" : "")} style={taskType === "task1" ? { background: "var(--ielts)", borderColor: "var(--ielts)" } : {}} onClick={() => { setTaskType("task1"); setPromptIdx(0); setEvalRes(null); }}>Task 1 (Laporan)</button>
        <button className="tab" onClick={() => { setPromptIdx((promptIdx + 1) % prompts.length); setEvalRes(null); }}><RefreshCw size={13} style={{ verticalAlign: "-2px" }} /> Ganti soal</button>
      </div>

      <div className="card" style={{ marginBottom: 14, borderLeft: "3px solid var(--ielts)" }}>
        <Pill color="var(--ielts)" soft="var(--ielts-soft)">{prompt.type}</Pill>
        <div className="serif" style={{ fontSize: 16, lineHeight: 1.6, marginTop: 10, whiteSpace: "pre-wrap" }}>{prompt.prompt}</div>
      </div>

      <textarea className="input" rows={11} placeholder="Tulis jawabanmu di sini…" value={essay} onChange={e => setEssay(e.target.value)} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0 16px", flexWrap: "wrap", gap: 10 }}>
        <span className="mono" style={{ fontSize: 12, color: words < minW ? "var(--bad)" : "var(--ok)" }}>{words} kata · min. {minW}</span>
        <button className="btn" disabled={busy || words < 40} onClick={evaluate} style={{ background: "var(--ielts)", borderColor: "var(--ielts)" }}>
          {busy ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />} Nilai dengan AI
        </button>
      </div>
      {err && <div className="card" style={{ borderColor: "var(--bad)", color: "var(--bad)", marginBottom: 16 }}>{err}</div>}

      {evalRes && (
        <div className="rise">
          <div className="card pad-lg" style={{ marginBottom: 14, textAlign: "center" }}>
            <div className="eyebrow">Estimasi band keseluruhan</div>
            <div className="serif" style={{ fontSize: 52, fontWeight: 600, color: "var(--ielts)" }}>{evalRes.overall}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginBottom: 14 }}>
            {Object.entries(evalRes.criteria || {}).map(([k, v]) => (
              <div key={k} className="card flat">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="statk">{critLabels[k] || k}</span>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--ielts)" }}>{v.band}</span>
                </div>
                <div className="sub" style={{ fontSize: 13, marginTop: 6 }}>{v.comment}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
            <div className="card flat"><div className="eyebrow" style={{ color: "var(--ok)" }}>Kekuatan</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>{(evalRes.strengths || []).map((s, i) => <li key={i}>{s}</li>)}</ul></div>
            <div className="card flat"><div className="eyebrow" style={{ color: "var(--ielts)" }}>Perbaikan</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>{(evalRes.improvements || []).map((s, i) => <li key={i}>{s}</li>)}</ul></div>
          </div>
          {evalRes.rewrite && <div className="explain" style={{ marginTop: 14 }}><strong style={{ fontWeight: 600 }}>Contoh perbaikan kalimat: </strong>{evalRes.rewrite}</div>}
        </div>
      )}
    </div>
  );
}

/* IELTS Speaking simulation with AI feedback */
function SpeakingView({ back }) {
  const [part, setPart] = useState(1);
  const [p2idx] = useState(() => ri(0, IELTS_SPEAKING.part2.length - 1));
  const [msgs, setMsgs] = useState([]); // {role, text}
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  const cue = IELTS_SPEAKING.part2[p2idx];
  const opener = part === 1 ? pick(IELTS_SPEAKING.part1) : part === 3 ? pick(IELTS_SPEAKING.part3)
    : `${cue.cue} You should say: ${cue.points.join("; ")}. You have 1–2 minutes.`;

  useEffect(() => { setMsgs([{ role: "a", text: opener }]); /* eslint-disable-next-line */ }, [part]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs]);

  const send = async () => {
    if (!draft.trim()) return;
    const userText = draft.trim();
    const history = [...msgs, { role: "u", text: userText }];
    setMsgs(history); setDraft(""); setBusy(true);
    try {
      const sys = "You are an IELTS Speaking examiner and coach. Respond in English. First give a brief band-style assessment of the candidate's last answer across Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy (1 short line each with an estimated band, note you cannot assess pronunciation from text). Then give 2 concrete tips and a more natural model phrasing of one sentence. End with ONE relevant follow-up question to keep the interview going. Keep it under 160 words and friendly.";
      const apiMsgs = history.map(m => ({ role: m.role === "u" ? "user" : "assistant", content: m.text }));
      const txt = await callClaude(apiMsgs, 500, sys);
      setMsgs(m => [...m, { role: "a", text: txt }]);
    } catch (e) { setMsgs(m => [...m, { role: "a", text: "Penilaian AI gagal: " + ((e && e.message) || "tidak tersedia") + ". Cek Set \u25B8 AI." }]); }
    setBusy(false);
  };

  return (
    <div className="rise">
      <button className="crumb" onClick={back}><ArrowLeft size={14} /> IELTS · Speaking</button>
      <Eyebrow color="var(--ielts)">Speaking + umpan balik AI</Eyebrow>
      <div className="h1">Simulasi wawancara</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 8 }}>Ketik jawaban (idealnya ucapkan dulu, baru transkrip). AI memberi estimasi band per kriteria, perbaikan, dan pertanyaan lanjutan. Catatan: pelafalan tak bisa dinilai dari teks.</div>
      <div className="tabrow" style={{ marginBottom: 14 }}>
        {[1, 2, 3].map(p => <button key={p} className={"tab" + (part === p ? " on" : "")} style={part === p ? { background: "var(--ielts)", borderColor: "var(--ielts)" } : {}} onClick={() => setPart(p)}>Part {p}</button>)}
      </div>

      <div className="card" ref={scrollRef} style={{ height: 360, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        {msgs.map((m, i) => <div key={i} className={"bubble " + m.role} style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>)}
        {busy && <div className="bubble a"><Loader2 size={16} className="spin" /></div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <textarea className="input" rows={2} placeholder="Jawabanmu (transkrip)…" value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(); }} />
        <button className="btn" disabled={busy || !draft.trim()} onClick={send} style={{ background: "var(--ielts)", borderColor: "var(--ielts)", alignSelf: "stretch" }}><Send size={16} /></button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
        <MicButton lang="en-US" onText={setDraft} accent="var(--ielts)" />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>Ucapkan jawabanmu (mic) atau ketik · Ctrl/⌘ + Enter untuk kirim</span>
      </div>
    </div>
  );
}

/* Listening with real (synthesized) audio */
function ListeningView({ domain, meta, record, back }) {
  const sets = domain === "toefl"
    ? [
      { key: "a", label: "Percakapan pendek (Part A)", desc: "Enam percakapan, masing-masing satu soal. Audio per percakapan.", type: "perItem", items: LISTEN_TOEFL_A },
      { key: "c", label: "Ceramah singkat (Part C)", desc: "Satu ceramah kelas + tiga soal.", type: "shared", data: LISTEN_TOEFL_C },
    ]
    : [
      { key: "conv", label: "Percakapan (Section 1)", desc: "Satu percakapan sehari-hari + tiga soal.", type: "shared", data: LISTEN_IELTS },
    ];
  const [mode, setMode] = useState("menu"); // menu | quiz | result
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);
  const [diff, setDiff] = useState("medium");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState(null);

  const startSet = (s) => { setActive(s); setMode("quiz"); };
  const startAI = async () => {
    setAiBusy(true); setAiErr(null);
    try {
      const r = await generateListening(domain, diff);
      if (!r.questions.length || !r.script.length) throw new Error("empty");
      setActive({ key: "ai", label: "Audio AI", type: "shared", data: r });
      setMode("quiz");
    } catch (e) { setAiErr("Gagal membuat audio AI: " + ((e && e.message) || "?") + ". Cek Set \u25B8 AI."); }
    setAiBusy(false);
  };

  if (mode === "quiz" && active) {
    const isPer = active.type === "perItem";
    const items = isPer ? active.items : active.data.questions;
    const listenScript = isPer ? null : active.data.script;
    const title = isPer ? null : active.data.title;
    return (
      <div>
        <button className="crumb" onClick={() => setMode("menu")}><ArrowLeft size={14} /> {meta.label} · Listening · {active.label}</button>
        <Quiz items={items} accent={meta.color} domain={domain} sub={"Listening · " + active.label}
          listenScript={listenScript} passageTitle={title}
          onFinish={(res) => { record(res, "listening"); setResult(res); setMode("result"); }} />
      </div>
    );
  }
  if (mode === "result") {
    return (
      <div>
        <button className="crumb" onClick={() => setMode("menu")}><ArrowLeft size={14} /> {meta.label} · Listening</button>
        <ResultCard result={result} accent={meta.color} onAgain={() => setMode("menu")} onHome={back} />
      </div>
    );
  }

  return (
    <div className="rise">
      <button className="crumb" onClick={back}><ArrowLeft size={14} /> {meta.label}</button>
      <Eyebrow color={meta.color}><Headphones size={11} style={{ verticalAlign: "-1px" }} /> Listening dengan audio</Eyebrow>
      <div className="h1">Latih telinga, bukan cuma mata</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 14, maxWidth: 660 }}>
        Audio dibacakan suara sintetis bawaan browser. Dengarkan dulu, jawab, baru buka transkrip — persis alur ujian sebenarnya. Untuk latihan tak terbatas, buat audio baru dengan AI.
      </div>
      {!SPEECH_OK && <div className="card" style={{ borderColor: "var(--bad)", color: "var(--bad)", marginBottom: 14, fontSize: 13 }}>
        <AlertTriangle size={15} style={{ verticalAlign: "-2px" }} /> Browser ini tampaknya tidak mendukung pemutaran suara. Transkrip tetap dapat dibaca, tetapi untuk audio gunakan Chrome/Edge/Safari terbaru.
      </div>}

      <div className="card flat" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span className="eyebrow">Audio AI · tingkat:</span>
        <div className="tabrow">
          {["easy", "medium", "hard"].map(d => (
            <button key={d} className={"tab" + (diff === d ? " on" : "")} style={diff === d ? { background: meta.color, borderColor: meta.color } : {}} onClick={() => setDiff(d)}>
              {d === "easy" ? "Dasar" : d === "medium" ? "Menengah" : "Sulit"}
            </button>
          ))}
        </div>
        <button className="btn sm" disabled={aiBusy} onClick={startAI} style={{ background: meta.color, borderColor: meta.color }}>
          {aiBusy ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Buat audio AI
        </button>
        {aiErr && <span style={{ color: "var(--bad)", fontSize: 13 }}>{aiErr}</span>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
        {sets.map(s => (
          <div key={s.key} className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: meta.soft, color: meta.color, display: "flex", alignItems: "center", justifyContent: "center" }}><Headphones size={18} /></div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 600 }}>{s.label}</div>
            </div>
            <div className="sub" style={{ fontSize: 13, flex: 1, marginBottom: 14 }}>{s.desc}</div>
            <button className="btn sm" onClick={() => startSet(s)}>Mulai <ArrowRight size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* SRS Vocabulary */
function VocabView({ data, update }) {
  const due = useMemo(() => (data.srs.cards || []).filter(c => c.due <= todayStr()), [data.srs.cards]);
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const card = due[i];
  const totalDue = due.length;

  const rate = (quality) => {
    update(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const c = next.srs.cards.find(x => x.id === card.id);
      let { ease, interval, reps } = c;
      if (quality === 0) { interval = 0; reps = 0; }
      else if (quality === 3) { interval = Math.max(1, Math.round(interval * 1.2)); ease = clamp(ease - 0.15, 1.3, 3.0); reps += 1; }
      else if (quality === 4) { interval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(interval * ease); reps += 1; }
      else { interval = Math.round((reps === 0 ? 2 : interval) * ease * 1.3); ease = clamp(ease + 0.15, 1.3, 3.0); reps += 1; }
      const d = new Date(); d.setDate(d.getDate() + interval);
      c.ease = ease; c.interval = interval; c.reps = reps; c.due = interval === 0 ? todayStr() : d.toISOString().slice(0, 10);
      next.xp += 5;
      const t = todayStr();
      if (next.streak.last !== t) { next.streak.count = next.streak.last === yesterdayStr() ? next.streak.count + 1 : 1; next.streak.last = t; }
      return next;
    });
    setShow(false);
    setI(idx => idx + 1 >= totalDue ? 0 : idx + 1);
  };

  if (totalDue === 0) {
    return (
      <div className="rise">
        <Eyebrow color="var(--gold)">Spaced repetition</Eyebrow>
        <div className="h1">Kosakata akademik</div>
        <div className="card pad-lg" style={{ marginTop: 16, textAlign: "center" }}>
          <Award size={40} color="var(--gold)" style={{ marginBottom: 10 }} />
          <div className="h2">Semua kartu sudah ditinjau hari ini 🎉</div>
          <div className="sub" style={{ marginTop: 8 }}>Total {data.srs.cards.length} kata dalam koleksi. Kembali besok untuk kartu berikutnya — interval diatur otomatis (SM-2).</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rise">
      <Eyebrow color="var(--gold)">Spaced repetition · {totalDue} kartu jatuh tempo</Eyebrow>
      <div className="h1">Kosakata akademik</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 16 }}>Recall dulu artinya, baru buka. Penilaianmu menentukan kapan kata ini muncul lagi.</div>

      <div className="card pad-lg" style={{ textAlign: "center", minHeight: 230, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{i + 1} / {totalDue}</div>
        <div className="serif" style={{ fontSize: 40, fontWeight: 600, margin: "12px 0" }}>{card.term}</div>
        {!show ? (
          <button className="btn" style={{ alignSelf: "center" }} onClick={() => setShow(true)}>Tampilkan arti</button>
        ) : (
          <div className="rise">
            <div style={{ fontSize: 17, lineHeight: 1.5 }}>{card.def}</div>
            <div className="sub" style={{ fontSize: 14, marginTop: 4 }}>ID: {card.gloss}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
              <button className="btn ghost sm" onClick={() => rate(0)} style={{ borderColor: "var(--bad)", color: "var(--bad)" }}>Lupa</button>
              <button className="btn ghost sm" onClick={() => rate(3)}>Sulit</button>
              <button className="btn ghost sm" onClick={() => rate(4)} style={{ borderColor: "var(--ok)", color: "var(--ok)" }}>Bisa</button>
              <button className="btn sm" onClick={() => rate(5)} style={{ background: "var(--gold)", borderColor: "var(--gold)" }}>Mudah</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* AI Tutor chat */
function TutorView() {
  const [msgs, setMsgs] = useState([{ role: "a", text: "Saya tutor pribadimu untuk TOEFL, IELTS, dan TPA. Tanyakan aturan tata bahasa, strategi mengerjakan, minta drill, atau bahas pembahasan soal. Mau mulai dari mana?" }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [msgs]);

  const quick = ["Jelaskan kapan pakai 'a' vs 'the'", "Strategi skimming Reading TOEFL", "Tips struktur esai IELTS Task 2 band 7", "Trik cepat soal deret angka TPA"];

  const send = async (text) => {
    const userText = (text || draft).trim();
    if (!userText) return;
    const hist = [...msgs, { role: "u", text: userText }];
    setMsgs(hist); setDraft(""); setBusy(true);
    try {
      const sys = "You are an expert, encouraging tutor for TOEFL ITP, IELTS Academic, and the Indonesian TPA Bappenas. Give precise, practical answers with short examples. If the user writes in Indonesian, reply in Indonesian; mix English for English-language examples. Keep answers focused and under ~220 words unless asked for more.";
      const apiMsgs = hist.map(m => ({ role: m.role === "u" ? "user" : "assistant", content: m.text }));
      const txt = await callClaude(apiMsgs, 700, sys);
      setMsgs(m => [...m, { role: "a", text: txt }]);
    } catch (e) { setMsgs(m => [...m, { role: "a", text: "Tutor AI gagal: " + ((e && e.message) || "tidak tersedia") + ". Atur mesin AI di Set \u25B8 AI." }]); }
    setBusy(false);
  };

  return (
    <div className="rise">
      <Eyebrow color="var(--tpa)"><Sparkles size={11} style={{ verticalAlign: "-1px" }} /> Tutor AI</Eyebrow>
      <div className="h1">Tanya apa saja</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 14 }}>Grammar, strategi, pembahasan, atau minta dibuatkan drill khusus.</div>

      <div className="tabrow" style={{ marginBottom: 12 }}>
        {quick.map((q, i) => <button key={i} className="tab" onClick={() => send(q)}>{q}</button>)}
      </div>

      <div className="card" ref={ref} style={{ height: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        {msgs.map((m, i) => <div key={i} className={"bubble " + m.role} style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>)}
        {busy && <div className="bubble a"><Loader2 size={16} className="spin" /></div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <textarea className="input" rows={2} placeholder="Tulis pertanyaanmu…" value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(); }} />
        <button className="btn" disabled={busy || !draft.trim()} onClick={() => send()} style={{ background: "var(--tpa)", borderColor: "var(--tpa)", alignSelf: "stretch" }}><Send size={16} /></button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
        <MicButton lang="id-ID" onText={setDraft} accent="var(--tpa)" />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>Bisa pakai mic (Bahasa Indonesia) · Ctrl/⌘ + Enter untuk kirim</span>
      </div>
    </div>
  );
}

/* Study plan */
function PlanView({ data }) {
  const t = todayStr();
  const todayCount = (d) => d.byday[t] || 0;
  const tasks = [
    { d: "toefl", label: "20 soal Structure / Written Expression", done: todayCount(data.progress.toefl) >= 20, color: "var(--toefl)" },
    { d: "toefl", label: "1 bacaan TOEFL Reading + pertanyaan", done: false, color: "var(--toefl)" },
    { d: "vocab", label: "Tinjau semua kosakata jatuh tempo", done: (data.srs.cards || []).filter(c => c.due <= t).length === 0, color: "var(--gold)" },
    { d: "tpa", label: "1 set Numerik (10) + 1 set Verbal (10)", done: todayCount(data.progress.tpa) >= 20, color: "var(--tpa)" },
    { d: "ielts", label: "Selang-seling: 1 Writing task / 1 Speaking part", done: todayCount(data.progress.ielts) >= 5, color: "var(--ielts)" },
  ];
  const roadmap = [
    ["Minggu 1–2", "Pondasi", "Diagnostik di tiap domain. TOEFL: kuasai 12 pola Structure tersering. TPA: kenali 8 tipe deret. Mulai 15 kartu kosakata/hari. IELTS: pelajari band descriptor Writing & template Task 2."],
    ["Minggu 3–4", "Akurasi", "Naikkan akurasi tiap sub-skill ke ≥70%. TOEFL Reading: latih skimming + question-type. IELTS: 2 esai/minggu dinilai AI, perbaiki kelemahan berulang. TPA Logika: silogisme & penalaran analitis."],
    ["Minggu 5", "Kecepatan & timing", "Latihan dengan batas waktu. TOEFL: 1 section utuh per sesi. IELTS Speaking: 3 part berurutan. TPA: set campuran 30 soal bertempo."],
    ["Minggu 6", "Simulasi & finishing", "Full mock tiap domain, review total. Kunci kosakata lemah lewat SRS. Konsolidasi strategi yang terbukti menaikkan skormu."],
  ];

  return (
    <div className="rise">
      <Eyebrow color="var(--gold)">Rencana intensif</Eyebrow>
      <div className="h1">Rute 6 minggu menuju target</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 18, maxWidth: 660 }}>
        Skor naik dari konsistensi, bukan satu sesi maraton. Checklist harian ini yang menggerakkan gauge di dashboard. Realistis: target tercapai bila daftar ini dijalankan rutin.
      </div>

      <Eyebrow n={1}>Checklist hari ini</Eyebrow>
      <div className="card" style={{ marginBottom: 22 }}>
        {tasks.map((task, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < tasks.length - 1 ? "1px solid var(--line-2)" : "none" }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, border: "1.5px solid " + (task.done ? task.color : "var(--line)"), background: task.done ? task.color : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 24px" }}>
              {task.done && <Check size={15} color="#fff" />}
            </div>
            <span style={{ fontSize: 15, color: task.done ? "var(--muted)" : "var(--ink)", textDecoration: task.done ? "line-through" : "none" }}>{task.label}</span>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: task.color, marginLeft: "auto" }} />
          </div>
        ))}
      </div>

      <Eyebrow n={2}>Peta jalan</Eyebrow>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {roadmap.map(([wk, title, body], i) => (
          <div key={i} className="card" style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 90px" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="serif" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2, marginTop: 4 }}>{wk}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>{title}</div>
            </div>
            <div className="sub" style={{ fontSize: 14, lineHeight: 1.6, borderLeft: "1px solid var(--line)", paddingLeft: 16 }}>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Settings */
function SettingsView({ data, update }) {
  const [t, setT] = useState(data.profile.targets);
  const save = () => update(prev => ({ ...prev, profile: { ...prev.profile, targets: { toefl: +t.toefl, ielts: +t.ielts, tpa: +t.tpa } } }));
  const reset = async () => {
    if (!confirm("Reset semua progres, riwayat, dan kosakata? Tindakan ini permanen.")) return;
    try { await STORE.del("itqan:data"); } catch (e) { }
    const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
    fresh.srs.cards = VOCAB_ALL.map(([term, def, gloss], i) => ({ id: "v" + i, term, def, gloss, ease: 2.5, interval: 0, reps: 0, due: todayStr() }));
    update(fresh);
  };

  const [ai, setAi] = useState({ ...DEFAULT_AI, ...(data.ai || {}) });
  const [test, setTest] = useState({ busy: false, ok: false, msg: "" });
  const saveAi = () => update(prev => ({ ...prev, ai: { baseUrl: ai.baseUrl.trim(), apiKey: ai.apiKey.trim(), model: ai.model } }));
  const testAI = async () => {
    setTest({ busy: true, ok: false, msg: "" });
    const url = aiEndpoint(ai.baseUrl);
    if (!url) { setTest({ busy: false, ok: false, msg: "Base URL masih kosong." }); return; }
    try {
      const headers = { "Content-Type": "application/json" };
      if (ai.apiKey.trim()) headers["Authorization"] = "Bearer " + ai.apiKey.trim();
      const res = await fetch(url, { method: "POST", headers, body: JSON.stringify({ model: ai.model, messages: [{ role: "user", content: "Reply with exactly: OK" }], max_tokens: 5 }) });
      if (!res.ok) {
        const auth = (res.status === 401 || res.status === 403) ? " — API key salah/kosong?" : "";
        setTest({ busy: false, ok: false, msg: "Gagal: HTTP " + res.status + auth });
        return;
      }
      const d = await res.json();
      let txt = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
      if (Array.isArray(txt)) txt = txt.map(p => (p && (p.text || p.content)) || "").join("");
      setTest({ busy: false, ok: true, msg: "Terhubung ✓ — model menjawab: " + (typeof txt === "string" ? txt.slice(0, 40) : "(ok)") });
    } catch (e) {
      setTest({ busy: false, ok: false, msg: "Gagal: " + (e && e.message ? e.message : e) + ". Kemungkinan CORS — gunakan proxy Cloudflare Worker." });
    }
  };
  return (
    <div className="rise">
      <Eyebrow>Pengaturan</Eyebrow>
      <div className="h1">Target & data</div>
      <div className="card pad-lg" style={{ marginTop: 16, maxWidth: 480 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Target skor</div>
        {[["toefl", "TOEFL ITP", 310, 677, 10], ["ielts", "IELTS Band", 4, 9, 0.5], ["tpa", "TPA Bappenas", 200, 850, 5]].map(([k, lab, lo, hi, step]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <label style={{ fontSize: 14 }}>{lab}</label>
            <input type="number" min={lo} max={hi} step={step} value={t[k]} onChange={e => setT({ ...t, [k]: e.target.value })}
              style={{ width: 100, border: "1.5px solid var(--line)", borderRadius: 9, padding: "8px 10px", fontFamily: "JetBrains Mono", fontSize: 14, textAlign: "center" }} />
          </div>
        ))}
        <button className="btn sm" onClick={save}><Check size={14} /> Simpan target</button>
      </div>

      <div className="card pad-lg" style={{ marginTop: 14, maxWidth: 560 }}>
        <div className="eyebrow" style={{ marginBottom: 4, color: "var(--tpa)" }}><Sparkles size={11} style={{ verticalAlign: "-1px" }} /> Mesin AI (SumoPod)</div>
        <div className="sub" style={{ fontSize: 12.5, marginBottom: 14 }}>Semua fitur AI — penjelasan soal, generator soal, audio AI, penilaian Writing/Speaking, dan Tutor — memanggil gateway SumoPod (kompatibel OpenAI). Kunci API hanya tersimpan di browser ini.</div>

        <label className="statk">Base URL</label>
        <input value={ai.baseUrl} onChange={e => setAi({ ...ai, baseUrl: e.target.value })} placeholder="https://ai.sumopod.com/v1" autoComplete="off"
          style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 9, padding: "9px 11px", fontFamily: "JetBrains Mono", fontSize: 13, margin: "6px 0 4px" }} />
        <div className="sub" style={{ fontSize: 11.5, marginBottom: 12, color: "var(--muted)" }}>Verifikasi URL persis di dashboard SumoPod. Atau isi URL Cloudflare Worker-mu (lihat catatan keamanan).</div>

        <label className="statk">API Key</label>
        <input type="password" value={ai.apiKey} onChange={e => setAi({ ...ai, apiKey: e.target.value })} placeholder="sk-… (kosongkan bila pakai Worker)" autoComplete="off"
          style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 9, padding: "9px 11px", fontFamily: "JetBrains Mono", fontSize: 13, margin: "6px 0 12px" }} />

        <label className="statk">Model</label>
        <select value={ai.model} onChange={e => setAi({ ...ai, model: e.target.value })}
          style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 9, padding: "9px 11px", fontFamily: "Inter", fontSize: 14, margin: "6px 0 6px", background: "#fff" }}>
          {AI_MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <div className="sub" style={{ fontSize: 12, marginBottom: 14 }}>Default termurah & cepat: <strong>MiniMax M2.7 Highspeed</strong> ($0.03/$0.12 per 1M). Bila model gagal, sistem otomatis mencoba cadangan: DeepSeek V4 Flash → Gemini 2.5 Flash Lite → GPT-5 mini.</div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn sm" onClick={saveAi}><Check size={14} /> Simpan AI</button>
          <button className="btn ghost sm" onClick={testAI} disabled={test.busy}>{test.busy ? <Loader2 size={14} className="spin" /> : <Zap size={14} />} Test koneksi</button>
        </div>
        {test.msg && <div className="sub" style={{ fontSize: 13, marginTop: 10, color: test.ok ? "var(--ok)" : "var(--bad)" }}>{test.msg}</div>}

        <div className="explain" style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.55 }}>
          <strong style={{ fontWeight: 600 }}>Keamanan & CORS.</strong> Ini situs statis (GitHub Pages), jadi API key yang diisi di sini tersimpan di localStorage browser — jangan pernah commit key ke repo publik. Cara teraman (dan biasanya wajib karena CORS): deploy Cloudflare Worker sebagai proxy — simpan key sebagai secret di Worker, lalu isi Base URL dengan URL Worker dan kosongkan field API Key. Kode Worker ada di berkas <span className="mono">sumopod-proxy-worker.js</span>.
        </div>
      </div>

      <div className="card pad-lg" style={{ marginTop: 14, maxWidth: 480 }}>
        <div className="eyebrow" style={{ marginBottom: 8, color: "var(--bad)" }}>Zona bahaya</div>
        <div className="sub" style={{ fontSize: 13, marginBottom: 12 }}>Hapus seluruh progres dan mulai dari nol.</div>
        <button className="btn ghost sm" style={{ borderColor: "var(--bad)", color: "var(--bad)" }} onClick={reset}>Reset semua data</button>
      </div>

      <div className="sub" style={{ fontSize: 12.5, marginTop: 18, maxWidth: 560, lineHeight: 1.6 }}>
        Estimasi skor di aplikasi ini dihitung dari akurasi latihanmu sebagai indikator arah — bukan prediksi skor resmi. Skor resmi ditentukan banyak faktor (timing, audio asli, pelafalan). Gunakan ini untuk melihat tren dan menutup kelemahan.
      </div>
    </div>
  );
}

/* ------------------------------ MOCK TEST ------------------------------- */
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = ri(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (arr, n) => shuffle(arr).slice(0, n);
const mmss = (s) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, "0")}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

function MockQuestion({ q, sel, onSel }) {
  return (
    <div className="card pad-lg">
      <div className="serif" style={{ fontSize: 18, lineHeight: 1.5, marginBottom: 18 }}>{q.stem}</div>
      {q.figural ? (
        <>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
            {q.seqSvgs.map((s, k) => <FiguralSvg key={k} markup={s} />)}
            <div style={{ width: 70, height: 70, borderRadius: 12, border: "1.5px dashed var(--ink-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "var(--muted)" }}>?</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, maxWidth: 420 }}>
            {q.optionSvgs.map((s, idx) => (
              <button key={idx} onClick={() => onSel(idx)} style={{ border: "0", background: "transparent", cursor: "pointer", padding: 0 }}>
                <div style={{ border: "2px solid " + (sel === idx ? "var(--ink)" : "var(--line)"), borderRadius: 12, background: sel === idx ? "#fafafa" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", height: 72, color: "var(--ink)" }}>
                  <svg width="52" height="52" viewBox="0 0 60 60" dangerouslySetInnerHTML={{ __html: s }} />
                </div>
                <div className="mono" style={{ fontSize: 11, marginTop: 4, color: "var(--muted)" }}>{String.fromCharCode(65 + idx)}</div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.choices.map((c, idx) => (
            <button key={idx} className={"choice" + (sel === idx ? " sel" : "")} onClick={() => onSel(idx)}>
              <span className="key">{String.fromCharCode(65 + idx)}</span>
              <span style={{ paddingTop: 1 }}>{c}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MockRunner({ config, accent, onFinish, onExit }) {
  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const answersRef = useRef({});
  useEffect(() => { answersRef.current = answers; }, [answers]);

  const section = config.sections[secIdx];
  const items = section.items;
  const q = items[qIdx];
  const [timeLeft, setTimeLeft] = useState(section.seconds);
  const startRef = useRef(Date.now());
  const secTimesRef = useRef([]);
  const finishedRef = useRef(false);
  const key = (s, i) => s + ":" + i;

  const computeResult = () => ({
    sections: config.sections.map((sec, si) => {
      let correct = 0;
      sec.items.forEach((it, ii) => { if (answersRef.current[key(si, ii)] === it.answer) correct++; });
      return {
        label: sec.label, scoreGroup: sec.scoreGroup || sec.label, total: sec.items.length, correct,
        seconds: sec.seconds, used: secTimesRef.current[si] || 0,
        items: sec.items.map((it, ii) => ({ ...it, picked: answersRef.current[key(si, ii)] })),
      };
    }),
  });
  const finishAll = () => {
    if (finishedRef.current) return; finishedRef.current = true;
    try { window.__itqStop = true; window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { }
    onFinish(computeResult());
  };
  const leaveSection = () => {
    secTimesRef.current[secIdx] = Math.min(section.seconds, Math.round((Date.now() - startRef.current) / 1000));
    try { window.__itqStop = true; window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { }
    if (secIdx + 1 < config.sections.length) { setSecIdx(secIdx + 1); setQIdx(0); }
    else finishAll();
  };

  useEffect(() => {
    setTimeLeft(section.seconds);
    startRef.current = Date.now();
    const id = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(id); leaveSection(); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [secIdx]);

  const setAns = (val) => setAnswers(a => ({ ...a, [key(secIdx, qIdx)]: val }));
  const toggleFlag = () => setFlags(f => ({ ...f, [key(secIdx, qIdx)]: !f[key(secIdx, qIdx)] }));
  const answeredCount = items.filter((_, ii) => answers[key(secIdx, ii)] != null).length;
  const low = timeLeft <= 60;
  const lastSection = secIdx === config.sections.length - 1;

  return (
    <div className="rise">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <button className="crumb" onClick={onExit}><ChevronLeft size={14} /> Keluar simulasi</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Pill color={accent} soft="var(--line-2)">Bagian {secIdx + 1}/{config.sections.length}</Pill>
          <span className="chip" style={{ borderColor: low ? "var(--bad)" : "var(--line)", color: low ? "var(--bad)" : "var(--ink)", fontWeight: 600 }}>
            <Clock size={13} color={low ? "var(--bad)" : "var(--gold)"} /> {mmss(timeLeft)}
          </span>
        </div>
      </div>

      <div className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{section.label}</div>
      <div className="sub" style={{ fontSize: 13, marginBottom: 14 }}>{answeredCount}/{items.length} terjawab · sedang di soal {qIdx + 1}</div>

      {section.audioMode === "perItem" && q.script &&
        <ListeningPlayer key={"m" + secIdx + "-" + qIdx} script={q.script} reveal={false} accent={accent} lockTranscript />}
      {section.audioMode === "shared" && section.listenScript &&
        <ListeningPlayer key={"ms" + secIdx} script={section.listenScript} reveal={false} accent={accent} title={section.passageTitle} lockTranscript />}
      {section.audioMode === "reading" && section.passage && (
        <div className="card" style={{ marginBottom: 16, background: "#fcfcfb", maxHeight: 320, overflowY: "auto" }}>
          {section.passageTitle && <div className="serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{section.passageTitle}</div>}
          <div className="passage">{section.passage.split("\n\n").map((p, k) => <p key={k}>{p}</p>)}</div>
        </div>
      )}

      <MockQuestion q={q} sel={answers[key(secIdx, qIdx)] ?? null} onSel={setAns} />

      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn ghost sm" disabled={qIdx === 0} onClick={() => setQIdx(qIdx - 1)}><ChevronLeft size={15} /> Sebelumnya</button>
        {qIdx < items.length - 1
          ? <button className="btn sm" onClick={() => setQIdx(qIdx + 1)}>Berikutnya <ChevronRight size={15} /></button>
          : <button className="btn sm" onClick={leaveSection} style={{ background: accent, borderColor: accent }}>
              {lastSection ? <>Selesai & lihat hasil <CheckCircle2 size={15} /></> : <>Selesaikan bagian <ArrowRight size={15} /></>}
            </button>}
        <button className="btn ghost sm" onClick={toggleFlag} style={flags[key(secIdx, qIdx)] ? { borderColor: "var(--gold)", color: "var(--gold)" } : {}}>
          <Flag size={14} /> {flags[key(secIdx, qIdx)] ? "Ditandai" : "Tandai"}
        </button>
        <button className="btn ghost sm" style={{ marginLeft: "auto", borderColor: "var(--bad)", color: "var(--bad)" }} onClick={leaveSection}>
          {lastSection ? "Selesaikan sekarang" : "Lewati bagian"}
        </button>
      </div>

      <div className="card flat" style={{ marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Navigasi soal — bagian ini</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {items.map((_, ii) => {
            const answered = answers[key(secIdx, ii)] != null;
            const flagged = flags[key(secIdx, ii)];
            const cur = ii === qIdx;
            return (
              <button key={ii} onClick={() => setQIdx(ii)} style={{
                width: 36, height: 36, borderRadius: 9, cursor: "pointer", fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600,
                border: "1.5px solid " + (cur ? "var(--ink)" : flagged ? "var(--gold)" : answered ? accent : "var(--line)"),
                background: cur ? "var(--ink)" : answered ? accent : "#fff",
                color: (cur || answered) ? "#fff" : "var(--ink)", position: "relative",
              }}>
                {ii + 1}
                {flagged && <span style={{ position: "absolute", top: -3, right: -3, width: 9, height: 9, borderRadius: "50%", background: "var(--gold)", border: "1.5px solid #fff" }} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sub" style={{ fontSize: 12, marginTop: 12, color: "var(--muted)" }}>
        <AlertTriangle size={12} style={{ verticalAlign: "-2px" }} /> Waktu tiap bagian berjalan mundur. Saat habis, kamu otomatis pindah ke bagian berikutnya — jawaban tak bisa diubah lagi.
      </div>
    </div>
  );
}

function MockReport({ domain, result, accent, onAgain, onExit }) {
  const [showReview, setShowReview] = useState(false);
  const allItems = result.sections.flatMap(s => s.items);
  const totC = result.sections.reduce((a, s) => a + s.correct, 0);
  const totT = result.sections.reduce((a, s) => a + s.total, 0);
  const overallAcc = totT ? totC / totT : 0;

  let headline = { label: "", value: 0 };
  let subscores = [];
  const groupAcc = () => {
    const g = {};
    result.sections.forEach(s => { const k = s.scoreGroup || s.label; g[k] = g[k] || { c: 0, t: 0 }; g[k].c += s.correct; g[k].t += s.total; });
    return g;
  };

  if (domain === "toefl") {
    const g = groupAcc();
    const labelMap = { listening: "Listening", structure: "Structure & Written Exp.", reading: "Reading" };
    const order = ["listening", "structure", "reading"].filter(k => g[k]);
    const scaled = {};
    order.forEach(k => { const a = g[k].t ? g[k].c / g[k].t : 0; scaled[k] = clamp(Math.round(31 + a * 37), 31, 68); });
    const total = clamp(Math.round(order.reduce((a, k) => a + scaled[k], 0) / order.length * 10), 310, 677);
    headline = { label: "Estimasi skor TOEFL ITP", value: total };
    subscores = order.map(k => ({ label: labelMap[k], value: scaled[k], scale: "/68", note: `${g[k].c}/${g[k].t} benar` }));
  } else if (domain === "ielts") {
    const g = groupAcc();
    const labelMap = { listening: "Listening", reading: "Reading" };
    const order = ["listening", "reading"].filter(k => g[k]);
    const bands = {};
    order.forEach(k => { const a = g[k].t ? g[k].c / g[k].t : 0; bands[k] = estIelts(a); });
    const overall = Math.round((order.reduce((a, k) => a + bands[k], 0) / order.length) * 2) / 2;
    headline = { label: "Estimasi band IELTS (L + R)", value: overall };
    subscores = order.map(k => ({ label: labelMap[k], value: bands[k], scale: "", note: `${g[k].c}/${g[k].t} benar` }));
  } else {
    headline = { label: "Estimasi skor TPA", value: estTpa(overallAcc) };
    const cats = {};
    allItems.forEach(it => { const c = it.__cat || "Umum"; cats[c] = cats[c] || { c: 0, t: 0 }; cats[c].t++; if (it.picked === it.answer) cats[c].c++; });
    subscores = Object.keys(cats).map(c => ({ label: c, value: Math.round(cats[c].c / cats[c].t * 100) + "%", scale: "", note: `${cats[c].c}/${cats[c].t} benar` }));
  }

  return (
    <div className="rise">
      <button className="crumb" onClick={onExit}><ArrowLeft size={14} /> Simulasi</button>
      <Eyebrow color={accent}><Trophy size={11} style={{ verticalAlign: "-1px" }} /> Hasil simulasi</Eyebrow>
      <div className="h1">{DOMAINS[domain].label} — selesai</div>

      <div className="card pad-lg" style={{ marginTop: 14, marginBottom: 16, textAlign: "center" }}>
        <div className="eyebrow">{headline.label}</div>
        <div className="serif" style={{ fontSize: 54, fontWeight: 600, color: accent, lineHeight: 1.1 }}>{headline.value}</div>
        <div className="sub" style={{ marginTop: 4 }}>Akurasi total {Math.round(overallAcc * 100)}% · {totC}/{totT} benar · +{totC * 8 + totT} XP</div>
      </div>

      <div className="gridstat" style={{ marginBottom: 16 }}>
        {subscores.map((s, i) => (
          <div key={i} className="card flat">
            <div className="statk">{s.label}</div>
            <div className="statv" style={{ marginTop: 8, color: accent }}>{s.value}<span style={{ fontSize: 13, color: "var(--muted)" }}>{s.scale}</span></div>
            <div className="sub" style={{ fontSize: 12, marginTop: 4 }}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className="card flat" style={{ marginBottom: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Waktu per bagian</div>
        {result.sections.map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < result.sections.length - 1 ? "1px solid var(--line-2)" : "none", fontSize: 14 }}>
            <span>{s.label}</span>
            <span className="mono" style={{ color: "var(--muted)" }}>{mmss(s.used)} / {mmss(s.seconds)}</span>
          </div>
        ))}
      </div>

      <button className="btn ghost sm" onClick={() => setShowReview(v => !v)} style={{ marginBottom: 14 }}>
        <FileText size={14} /> {showReview ? "Sembunyikan pembahasan" : "Lihat pembahasan semua soal"}
      </button>

      {showReview && (
        <div className="rise" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {allItems.map((it, i) => {
            const ok = it.picked === it.answer;
            const opts = it.figural ? it.optionSvgs.map((_, k) => "Pilihan " + String.fromCharCode(65 + k)) : it.choices;
            return (
              <div key={i} className="card flat" style={{ borderLeft: "3px solid " + (ok ? "var(--ok)" : "var(--bad)") }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>SOAL {i + 1}{it.__cat ? " · " + it.__cat : ""}</span>
                  {ok ? <Pill color="var(--ok)" soft="#EAF7F0"><Check size={11} /> Benar</Pill> : <Pill color="var(--bad)" soft="#FBECEA"><X size={11} /> Salah</Pill>}
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5, margin: "8px 0" }}>{it.stem}</div>
                <div className="sub" style={{ fontSize: 13 }}>
                  Jawabanmu: <strong style={{ color: ok ? "var(--ok)" : "var(--bad)" }}>{it.picked != null ? opts[it.picked] : "— (kosong)"}</strong>
                  {!ok && <> · Kunci: <strong style={{ color: "var(--ok)" }}>{opts[it.answer]}</strong></>}
                </div>
                {it.explanation && <div className="explain" style={{ marginTop: 8 }}>{it.explanation}</div>}
              </div>
            );
          })}
        </div>
      )}

      <div className="sub" style={{ fontSize: 12.5, marginBottom: 16, lineHeight: 1.6, color: "var(--muted)" }}>
        Estimasi ini konversi kasar dari akurasi & format mini-simulasi — bukan skor resmi. Audio memakai suara sintetis. Pakai untuk melatih ritme, timing, dan menemukan bagian terlemah.
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn" onClick={onAgain} style={{ background: accent, borderColor: accent }}><RotateCcw size={16} /> Ulangi simulasi</button>
        <button className="btn ghost" onClick={onExit}>Kembali</button>
      </div>
    </div>
  );
}

function MockView({ data, update }) {
  const [running, setRunning] = useState(null);
  const [report, setReport] = useState(null);

  const buildToefl = () => ({
    domain: "toefl", label: "TOEFL ITP — Simulasi",
    sections: [
      { label: "Listening · Percakapan (Part A)", scoreGroup: "listening", audioMode: "perItem", seconds: 6 * 60, items: shuffle(LISTEN_TOEFL_A) },
      { label: "Listening · Ceramah (Part C)", scoreGroup: "listening", audioMode: "shared", listenScript: LISTEN_TOEFL_C.script, passageTitle: LISTEN_TOEFL_C.title, seconds: 4 * 60, items: LISTEN_TOEFL_C.questions },
      { label: "Structure & Written Expression", scoreGroup: "structure", audioMode: "none", seconds: 13 * 60, items: shuffle([...sample(TOEFL_STRUCTURE_ALL, 9), ...sample(TOEFL_WE_ALL, 6)]) },
      (() => { const rd = pick(TOEFL_READINGS); return { label: "Reading Comprehension", scoreGroup: "reading", audioMode: "reading", passage: rd.passage, passageTitle: rd.title, seconds: 11 * 60, items: rd.questions }; })(),
    ],
  });
  const buildIelts = () => ({
    domain: "ielts", label: "IELTS — Simulasi (Listening + Reading)",
    sections: [
      { label: "Listening · Section 1", scoreGroup: "listening", audioMode: "shared", listenScript: LISTEN_IELTS.script, passageTitle: LISTEN_IELTS.title, seconds: 6 * 60, items: LISTEN_IELTS.questions },
      { label: "Reading (True/False/Not Given)", scoreGroup: "reading", audioMode: "reading", passage: IELTS_READING.passage, passageTitle: IELTS_READING.title, seconds: 12 * 60, items: IELTS_READING.questions },
    ],
  });
  const buildTpa = () => ({
    domain: "tpa", label: "TPA Bappenas — Simulasi",
    sections: [{
      label: "TPA — Campuran (30 soal)", audioMode: "none", seconds: 30 * 60,
      items: shuffle([
        ...sample(TPA_VERBAL_ALL, 10).map(x => ({ ...x, __cat: "Verbal" })),
        ...genNumericSet(10).map(x => ({ ...x, __cat: "Numerik" })),
        ...sample(TPA_LOGIKA_ALL, 6).map(x => ({ ...x, __cat: "Logika" })),
        ...FIGURAL_GENS.map(f => f()).map(x => ({ ...x, __cat: "Figural" })),
      ]),
    }],
  });

  const start = (domain) => {
    const cfg = domain === "toefl" ? buildToefl() : domain === "ielts" ? buildIelts() : buildTpa();
    setReport(null); setRunning(cfg);
  };

  const onFinish = (res) => {
    const domain = running.domain;
    const totC = res.sections.reduce((a, s) => a + s.correct, 0);
    const totT = res.sections.reduce((a, s) => a + s.total, 0);
    update(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const dp = next.progress[domain];
      dp.answered += totT; dp.correct += totC;
      const t = todayStr();
      dp.byday[t] = (dp.byday[t] || 0) + totT;
      next.history.push({ date: t, domain, sub: "mock", correct: totC, total: totT });
      next.xp += totC * 8 + totT;
      if (next.streak.last !== t) { next.streak.count = next.streak.last === yesterdayStr() ? next.streak.count + 1 : 1; next.streak.last = t; }
      return next;
    });
    setReport({ domain, result: res }); setRunning(null);
  };
  const exitRun = () => { try { window.__itqStop = true; window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { } setRunning(null); };

  if (running) return <MockRunner config={running} accent={DOMAINS[running.domain].color} onFinish={onFinish} onExit={exitRun} />;
  if (report) return <MockReport domain={report.domain} result={report.result} accent={DOMAINS[report.domain].color} onAgain={() => start(report.domain)} onExit={() => setReport(null)} />;

  const cards = [
    { d: "toefl", title: "TOEFL ITP", mins: 34, parts: ["Listening Part A (6) + Talk (3) — audio", "Structure & Written Expression (15)", "Reading: 1 bacaan (5)"], note: "4 bagian bertimer → estimasi 3 skor seksi + total." },
    { d: "ielts", title: "IELTS (L + R)", mins: 18, parts: ["Listening Section 1 (3) — audio", "Reading T/F/NG (5)"], note: "Estimasi band Listening, Reading & rata-rata. Writing/Speaking dinilai di modul IELTS." },
    { d: "tpa", title: "TPA Bappenas", mins: 30, parts: ["30 soal campuran: Verbal, Numerik, Logika, Figural", "Satu timer menyeluruh"], note: "Melatih manajemen waktu lintas tipe soal." },
  ];

  return (
    <div className="rise">
      <Eyebrow color="var(--gold)"><Clock size={11} style={{ verticalAlign: "-1px" }} /> Simulasi berwaktu</Eyebrow>
      <div className="h1">Mock test — uji dalam tekanan waktu</div>
      <div className="sub" style={{ marginTop: 6, marginBottom: 20, maxWidth: 690 }}>
        Mini-simulasi bertimer dengan alur menyerupai ujian: berpindah antar soal, menandai yang ragu, audio Listening tanpa transkrip, dan saat waktu habis bagian otomatis ditutup. Di akhir kamu mendapat estimasi skor per seksi + pembahasan lengkap. Hasilnya ikut menggerakkan gauge di Beranda.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {cards.map(c => {
          const Ic = DOMAINS[c.d].icon;
          return (
            <div key={c.d} className="card pad-lg" style={{ display: "flex", flexDirection: "column", borderTop: "3px solid " + DOMAINS[c.d].color }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: DOMAINS[c.d].soft, color: DOMAINS[c.d].color, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={21} /></div>
                <span className="chip"><Clock size={13} color="var(--gold)" /> ±{c.mins} mnt</span>
              </div>
              <div className="serif" style={{ fontSize: 20, fontWeight: 600 }}>{c.title}</div>
              <ul style={{ margin: "10px 0 12px", paddingLeft: 18, fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", flex: 1 }}>
                {c.parts.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <div className="sub" style={{ fontSize: 12, marginBottom: 14 }}>{c.note}</div>
              <button className="btn" onClick={() => start(c.d)} style={{ background: DOMAINS[c.d].color, borderColor: DOMAINS[c.d].color }}>
                <Play size={15} /> Mulai simulasi
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------- APP ---------------------------------- */
const NAV = [
  { k: "home", label: "Beranda", icon: Home },
  { k: "toefl", label: "TOEFL", icon: GraduationCap },
  { k: "ielts", label: "IELTS", icon: Languages },
  { k: "tpa", label: "TPA", icon: Brain },
  { k: "mock", label: "Simulasi", icon: Clock },
  { k: "vocab", label: "Vocab", icon: Layers },
  { k: "tutor", label: "Tutor", icon: Sparkles },
  { k: "plan", label: "Rencana", icon: CalendarDays },
  { k: "settings", label: "Set", icon: Settings },
];

export default function App() {
  const [data, update] = useItqan();
  const [view, setView] = useState("home");

  if (!data) {
    return (
      <div className="itq" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{STYLE}</style>
        <div style={{ textAlign: "center" }}>
          <div className="brandmark" style={{ margin: "0 auto 14px", width: 56, height: 56, fontSize: 26 }}>إ</div>
          <Loader2 className="spin" size={22} color="var(--muted)" />
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>Memuat ITQĀN…</div>
        </div>
      </div>
    );
  }

  const Body = () => {
    switch (view) {
      case "home": return <Dashboard data={data} go={setView} />;
      case "toefl": return <PracticeView key="toefl" data={data} update={update} domain="toefl" />;
      case "ielts": return <PracticeView key="ielts" data={data} update={update} domain="ielts" />;
      case "tpa": return <PracticeView key="tpa" data={data} update={update} domain="tpa" />;
      case "mock": return <MockView data={data} update={update} />;
      case "vocab": return <VocabView data={data} update={update} />;
      case "tutor": return <TutorView />;
      case "plan": return <PlanView data={data} />;
      case "settings": return <SettingsView data={data} update={update} />;
      default: return <Dashboard data={data} go={setView} />;
    }
  };

  return (
    <div className="itq">
      <style>{STYLE}</style>
      <div className="shell">
        <nav className="rail">
          <div className="brandmark">إ</div>
          {NAV.map(n => (
            <button key={n.k} className={"navbtn" + (view === n.k ? " active" : "")} onClick={() => setView(n.k)} title={n.label}>
              <n.icon size={19} />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="main">
          <header className="topbar">
            <div className="wordmark">ITQĀN <span className="mono" style={{ fontSize: 11, color: "var(--muted)", fontWeight: 400, letterSpacing: ".1em" }}>· إتقان</span></div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="chip"><Flame size={13} color="var(--gold)" /> {data.streak.count}</span>
              <span className="chip"><Zap size={13} color="var(--gold)" /> {data.xp} XP</span>
            </div>
          </header>
          <main className="content"><Body /></main>
        </div>
      </div>

      <nav className="bottomnav">
        {NAV.map(n => (
          <button key={n.k} className={"bnbtn" + (view === n.k ? " active" : "")} onClick={() => setView(n.k)}>
            <n.icon size={19} /><span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
