const video = document.getElementById("cameraFeed");
const poseCanvas = document.getElementById("poseCanvas");
const poseCtx = poseCanvas.getContext("2d");

const cameraStatus = document.getElementById("cameraStatus");
const moodStatus = document.getElementById("moodStatus");
const energyStatus = document.getElementById("energyStatus");
const stabilityStatus = document.getElementById("stabilityStatus");
const detectedMood = document.getElementById("detectedMood");
const candidateMood = document.getElementById("candidateMood");
const candidateTimer = document.getElementById("candidateTimer");
const motionType = document.getElementById("motionType");
const opennessValue = document.getElementById("opennessValue");
const bounceValue = document.getElementById("bounceValue");
const captureButton = document.getElementById("captureButton");
const stopAudioButton = document.getElementById("stopAudioButton");
const captureStatus = document.getElementById("captureStatus");
const youtubePanel = document.getElementById("youtubePanel");
const youtubeFrame = document.getElementById("youtubeFrame");
const playerSource = document.getElementById("playerSource");
const liveIndicatorDot = document.getElementById("liveIndicatorDot");

const patternLibrary = {
  intense: {
    bpm: 134,
    meter: 4,
    chordType: "triangle",
    leadType: "sawtooth",
    bassType: "square",
    chordInstrument: "plain",
    leadInstrument: "brass",
    bassInstrument: "sub",
    counterInstrument: "glass",
    droneInstrument: "sub",
    sectionPlan: ["intro", "groove", "lift", "peak", "groove", "break", "lift", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 1],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 1, 1, 1, 1, 1, 1, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [0, 1, 0, 1, 0, 1, 0, 1],
    tom: [0, 0, 0, 0, 0, 1, 0, 1],
    chords: [[45, 52, 57], [43, 50, 55], [48, 55, 60], [50, 57, 62]],
    bass: [33, 33, 31, 31, 36, 36, 38, 38],
    lead: [69, 72, 74, 72, 76, 74, 79, 76],
    counter: [81, null, 79, 81, null, 84, 81, 79],
    drone: 33,
  },
  hiphop: {
    bpm: 98,
    meter: 4,
    chordType: "triangle",
    leadType: "square",
    bassType: "sawtooth",
    chordInstrument: "organ",
    leadInstrument: "glass",
    bassInstrument: "sub",
    counterInstrument: "brass",
    droneInstrument: "sub",
    sectionPlan: ["groove", "break", "groove", "lift", "groove", "break", "peak", "break"],
    kick: [1, 0, 0, 1, 0, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 0, 1, 0, 1, 1, 0, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 1],
    shaker: [0, 0, 0, 1, 0, 0, 0, 1],
    tom: [0, 0, 0, 0, 1, 0, 0, 1],
    chords: [[45, 48, 52], [43, 47, 50], [41, 45, 48], [43, 47, 50]],
    bass: [33, null, 33, 36, 31, null, 29, 31],
    lead: [57, null, 60, null, 62, 60, 57, null],
    counter: [69, null, null, 67, null, 64, null, 67],
    drone: 33,
    swing: 0.06,
  },
  house: {
    bpm: 124,
    meter: 4,
    chordType: "triangle",
    leadType: "sawtooth",
    bassType: "square",
    chordInstrument: "organ",
    leadInstrument: "glass",
    bassInstrument: "sub",
    counterInstrument: "pluck",
    sectionPlan: ["intro", "groove", "groove", "lift", "groove", "break", "lift", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [0, 1, 0, 1, 0, 1, 0, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [1, 1, 1, 1, 1, 1, 1, 1],
    tom: [0, 0, 0, 0, 0, 0, 1, 0],
    chords: [[48, 55, 60], [50, 57, 62], [45, 52, 57], [43, 50, 55]],
    bass: [36, 36, 38, 38, 33, 33, 31, 31],
    lead: [72, null, 76, null, 79, null, 76, null],
    counter: [84, null, 81, null, 86, null, 84, null],
    swing: 0.02,
  },
  techno: {
    bpm: 130,
    meter: 4,
    chordType: "triangle",
    leadType: "sawtooth",
    bassType: "square",
    chordInstrument: "organ",
    leadInstrument: "brass",
    bassInstrument: "sub",
    counterInstrument: "glass",
    sectionPlan: ["intro", "groove", "groove", "lift", "groove", "break", "groove", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 0, 0, 0, 0, 0, 1, 0],
    hat: [1, 1, 1, 1, 1, 1, 1, 1],
    clap: [0, 0, 0, 0, 0, 0, 1, 0],
    shaker: [0, 1, 0, 1, 0, 1, 0, 1],
    tom: [0, 0, 0, 0, 0, 1, 0, 1],
    chords: [[45, 52, 57], [45, 50, 55], [43, 50, 55], [48, 55, 60]],
    bass: [33, 33, 33, 33, 31, 31, 31, 31],
    lead: [72, null, 74, null, 76, null, 74, null],
    counter: [84, null, null, 81, null, null, 79, null],
    drone: 33,
  },
  edm: {
    bpm: 132,
    meter: 4,
    chordType: "triangle",
    leadType: "sawtooth",
    bassType: "square",
    chordInstrument: "fmPad",
    leadInstrument: "brass",
    bassInstrument: "sub",
    counterInstrument: "glass",
    sectionPlan: ["intro", "lift", "peak", "groove", "break", "lift", "peak", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 1, 1, 1, 1, 1, 1, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [1, 1, 0, 1, 1, 1, 0, 1],
    tom: [0, 0, 0, 1, 0, 0, 0, 1],
    chords: [[45, 52, 57], [48, 55, 60], [50, 57, 62], [43, 50, 55]],
    bass: [33, 33, 36, 36, 38, 38, 31, 31],
    lead: [76, 79, 81, 84, 81, 79, 76, 74],
    counter: [88, null, 84, null, 91, null, 88, null],
    drone: 33,
  },
  funk: {
    bpm: 108,
    meter: 4,
    chordType: "triangle",
    leadType: "square",
    bassType: "triangle",
    chordInstrument: "organ",
    leadInstrument: "brass",
    bassInstrument: "sub",
    counterInstrument: "bell",
    sectionPlan: ["groove", "groove", "lift", "break", "groove", "peak", "groove", "peak"],
    kick: [1, 0, 0, 1, 0, 1, 0, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 0, 1, 1, 0, 1, 0, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [0, 1, 0, 1, 1, 0, 1, 0],
    tom: [0, 0, 0, 0, 1, 0, 0, 1],
    chords: [[45, 52, 55], [43, 50, 53], [48, 55, 58], [45, 52, 55]],
    bass: [33, null, 36, 33, null, 38, 36, null],
    lead: [69, null, 72, 74, null, 76, 74, null],
    counter: [81, null, null, 79, null, 81, null, 76],
    swing: 0.07,
  },
  disco: {
    bpm: 118,
    meter: 4,
    chordType: "triangle",
    leadType: "square",
    bassType: "triangle",
    chordInstrument: "pluck",
    leadInstrument: "bell",
    bassInstrument: "plain",
    counterInstrument: "glass",
    sectionPlan: ["intro", "groove", "groove", "lift", "groove", "break", "lift", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 1, 1, 0, 1, 1, 1, 0],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [1, 0, 1, 0, 1, 0, 1, 0],
    tom: [0, 0, 0, 0, 0, 1, 0, 1],
    chords: [[60, 64, 67], [62, 65, 69], [57, 60, 64], [59, 62, 65]],
    bass: [48, 52, 55, 52, 50, 53, 57, 53],
    lead: [84, 86, 88, 86, 91, 88, 86, 84],
    counter: [72, 76, null, 79, 76, null, 72, 74],
  },
  latin: {
    bpm: 118,
    meter: 4,
    chordType: "sine",
    leadType: "triangle",
    bassType: "triangle",
    chordInstrument: "pluck",
    leadInstrument: "bell",
    bassInstrument: "sub",
    counterInstrument: "pluck",
    sectionPlan: ["groove", "lift", "groove", "peak", "groove", "break", "lift", "peak"],
    kick: [1, 0, 0, 1, 0, 1, 0, 0],
    snare: [0, 1, 0, 0, 1, 0, 0, 1],
    hat: [1, 1, 0, 1, 1, 0, 1, 1],
    clap: [0, 0, 0, 1, 0, 0, 1, 0],
    shaker: [1, 1, 1, 0, 1, 1, 1, 0],
    tom: [0, 1, 0, 0, 1, 0, 1, 0],
    chords: [[57, 60, 64], [60, 64, 67], [55, 59, 62], [57, 60, 64]],
    bass: [45, 48, null, 50, 52, null, 43, 47],
    lead: [76, 79, 81, null, 79, 76, 74, null],
    counter: [69, null, 72, null, 74, null, 72, null],
    swing: 0.08,
  },
  kpop: {
    bpm: 128,
    meter: 4,
    chordType: "triangle",
    leadType: "square",
    bassType: "triangle",
    chordInstrument: "fmPad",
    leadInstrument: "glass",
    bassInstrument: "plain",
    counterInstrument: "pluck",
    sectionPlan: ["intro", "groove", "lift", "peak", "groove", "break", "lift", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 1, 1, 0, 1, 1, 1, 0],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [0, 1, 0, 1, 0, 1, 0, 1],
    tom: [0, 0, 0, 0, 0, 1, 0, 1],
    chords: [[60, 64, 67], [62, 65, 69], [57, 60, 64], [59, 62, 65]],
    bass: [48, 52, 55, 52, 50, 53, 57, 53],
    lead: [84, 88, 86, 84, 91, 88, 86, 84],
    counter: [72, 76, null, 79, 76, null, 72, 74],
  },
  gangnam: {
    bpm: 132,
    meter: 4,
    chordType: "triangle",
    leadType: "square",
    bassType: "square",
    chordInstrument: "brass",
    leadInstrument: "brass",
    bassInstrument: "sub",
    counterInstrument: "organ",
    sectionPlan: ["groove", "lift", "peak", "groove", "break", "groove", "lift", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 1, 0, 0, 0, 1, 0, 0],
    hat: [1, 0, 1, 1, 1, 0, 1, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 1],
    shaker: [0, 1, 0, 1, 0, 1, 0, 1],
    tom: [0, 0, 1, 0, 0, 0, 1, 1],
    chords: [[45, 52, 57], [45, 50, 55], [48, 55, 60], [50, 57, 62]],
    bass: [33, 33, 38, 38, 36, 36, 41, 41],
    lead: [76, 76, 79, 81, 79, 76, 74, 76],
    counter: [69, null, 71, null, 74, null, 76, null],
  },
  smooth: {
    bpm: 92,
    meter: 4,
    chordType: "triangle",
    leadType: "sine",
    bassType: "sine",
    chordInstrument: "glassPad",
    leadInstrument: "glass",
    bassInstrument: "sub",
    counterInstrument: "bell",
    droneInstrument: "glassPad",
    sectionPlan: ["intro", "groove", "groove", "lift", "groove", "break", "groove", "peak"],
    kick: [1, 0, 0, 0, 1, 0, 0, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [0, 1, 0, 1, 0, 1, 0, 1],
    clap: [0, 0, 0, 0, 0, 0, 1, 0],
    shaker: [0, 1, 0, 0, 0, 1, 0, 0],
    tom: [0, 0, 0, 0, 0, 0, 0, 1],
    chords: [[57, 60, 64, 67], [55, 59, 62, 65], [53, 57, 60, 64], [50, 53, 57, 60]],
    bass: [33, null, 36, null, 31, null, 29, null],
    lead: [72, null, 74, 76, null, 77, 76, null],
    counter: [84, null, null, 81, null, 79, null, 77],
    drone: 45,
  },
  ballet: {
    bpm: 84,
    meter: 4,
    chordType: "sine",
    leadType: "sine",
    bassType: "triangle",
    chordInstrument: "glassPad",
    leadInstrument: "bell",
    bassInstrument: "plain",
    counterInstrument: "glass",
    droneInstrument: "glassPad",
    sectionPlan: ["intro", "groove", "groove", "lift", "break", "groove", "lift", "peak"],
    kick: [1, 0, 0, 0, 1, 0, 0, 0],
    snare: [0, 0, 0, 0, 0, 0, 1, 0],
    hat: [0, 1, 0, 0, 0, 1, 0, 0],
    clap: [0, 0, 0, 0, 0, 0, 0, 0],
    shaker: [0, 0, 1, 0, 0, 0, 1, 0],
    tom: [0, 0, 0, 0, 0, 0, 0, 1],
    chords: [[69, 72, 76], [67, 71, 74], [65, 69, 72], [64, 67, 71]],
    bass: [45, null, 48, null, 43, null, 47, null],
    lead: [81, 84, null, 86, 88, null, 86, 84],
    counter: [72, null, 76, null, 79, null, 76, null],
    drone: 57,
  },
  contemporary: {
    bpm: 88,
    meter: 4,
    chordType: "triangle",
    leadType: "triangle",
    bassType: "sine",
    chordInstrument: "glassPad",
    leadInstrument: "glass",
    bassInstrument: "sub",
    counterInstrument: "bell",
    droneInstrument: "organ",
    sectionPlan: ["intro", "break", "groove", "lift", "break", "groove", "lift", "peak"],
    kick: [1, 0, 0, 0, 0, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 0, 0],
    hat: [1, 0, 0, 1, 0, 1, 0, 0],
    clap: [0, 0, 0, 0, 0, 0, 1, 0],
    shaker: [0, 1, 0, 0, 0, 1, 0, 0],
    tom: [0, 0, 0, 1, 0, 0, 0, 1],
    chords: [[50, 57, 60, 64], [48, 55, 59, 62], [45, 53, 57, 60], [47, 55, 59, 62]],
    bass: [38, null, null, 41, null, 43, null, null],
    lead: [72, null, 76, null, 79, null, 77, null],
    counter: [84, null, 81, null, 79, null, 77, null],
    drone: 38,
  },
  waltz: {
    bpm: 88,
    meter: 3,
    genre: "waltz",
    chordType: "sine",
    leadType: "sine",
    bassType: "triangle",
    chordInstrument: "organ",
    leadInstrument: "bell",
    bassInstrument: "sub",
    counterInstrument: "glassPad",
    droneInstrument: "glassPad",
    sectionPlan: ["intro", "groove", "lift", "groove", "break", "groove", "lift", "peak"],
    kick: [1, 0, 0, 1, 0, 0],
    snare: [0, 0, 0, 0, 0, 0],
    hat: [0, 0, 0, 0, 0, 0],
    clap: [0, 0, 0, 0, 0, 0],
    shaker: [0, 0, 1, 0, 0, 1],
    tom: [0, 0, 0, 0, 0, 0],
    chords: [[57, 60, 64], [62, 65, 69], [59, 62, 67], [60, 64, 67]],
    bass: [45, null, 52, 50, null, 57],
    lead: [72, null, 76, 79, 77, 74],
    counter: [84, 81, null, 79, 76, null],
    drone: 45,
  },
  cute: {
    bpm: 136,
    meter: 4,
    chordType: "triangle",
    leadType: "square",
    bassType: "triangle",
    chordInstrument: "pluck",
    leadInstrument: "bell",
    bassInstrument: "plain",
    counterInstrument: "pluck",
    sectionPlan: ["intro", "groove", "lift", "peak", "groove", "break", "lift", "peak"],
    kick: [1, 0, 1, 0, 1, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0],
    hat: [1, 1, 1, 1, 1, 1, 1, 1],
    clap: [0, 0, 1, 0, 0, 0, 1, 0],
    shaker: [1, 0, 1, 0, 1, 0, 1, 0],
    tom: [0, 0, 0, 0, 0, 1, 0, 1],
    chords: [[60, 64, 67], [67, 71, 74], [64, 67, 71], [65, 69, 72]],
    bass: [48, 55, 52, 55, 55, 59, 57, 59],
    lead: [84, 86, 88, 86, 91, 88, 86, 84],
    counter: [72, 76, null, 79, 76, null, 72, 74],
  },
};

const styleToTrackKey = {
  EDM: "edm",
  Pop: "kpop",
  Waltz: "waltz",
};

const DEFAULT_STYLE = "Pop";
const INITIAL_ANALYSIS_MS = 4000;
const STYLE_SWITCH_HOLD_MS = 1800;
const STYLE_SWITCH_COOLDOWN_MS = 0;
const STYLE_SWITCH_SCORE_GAP = 0.008;
const STYLE_SWITCH_CANDIDATE_GRACE_MS = 500;

const youtubeLibrary = window.DANCE_YOUTUBE_LIBRARY || {
  EDM: [],
  Pop: [],
  Waltz: [],
};

const analysis = {
  previousSample: null,
  smoothedEnergy: 0,
  smoothedBounce: 0,
  smoothedOpenness: 0,
  smoothedTravel: 0,
  smoothedSymmetry: 0,
  smoothedCross: 0,
  smoothedVerticality: 0,
  mood: "Standby",
  motion: "준비 중",
  visibility: 0,
  liveBuffer: [],
  bufferWindowMs: 2600,
  latestAggregate: null,
};

const transportState = {
  running: false,
  intervalId: null,
  nextBarTime: 0,
  currentStyle: DEFAULT_STYLE,
  queuedStyle: DEFAULT_STYLE,
  barsPlayed: 0,
  lastTransitionAt: 0,
  lookAheadMs: 150,
  scheduleAheadTime: 0.28,
};

const audioState = {
  context: null,
  currentMaster: null,
  activeNodes: new Set(),
};

const poseGestureState = {
  xPoseSince: 0,
  lastSeenAt: 0,
  stopTriggered: false,
};

const styleDecisionState = {
  currentStyle: DEFAULT_STYLE,
  candidateStyle: null,
  candidateSince: 0,
  candidateLastSeenAt: 0,
  lastCommittedAt: 0,
};

const playbackState = {
  active: false,
  pendingStart: false,
  startRequestedAt: 0,
  mode: "idle",
  currentStyle: null,
  youtubeVideoId: null,
};

const youtubeState = {
  apiRequested: false,
  apiReady: false,
  playerReady: false,
  player: null,
  pendingRequest: null,
};

function midiToFreq(midi) {
  return 440 * (2 ** ((midi - 69) / 12));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function averageVisibility(points) {
  return points.reduce((sum, point) => sum + (point.visibility || 0), 0) / points.length;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function ccw(a, b, c) {
  return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
}

function segmentsIntersect(a, b, c, d) {
  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

function speakStatusSafe(text) {
  captureStatus.textContent = text;
}

function updateViewportHeight() {
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const pageTitle = document.querySelector(".page-title");
  const titleHeight = pageTitle ? Math.ceil(pageTitle.getBoundingClientRect().height) : 0;
  document.documentElement.style.setProperty("--app-vh", `${Math.round(viewportHeight)}px`);
  document.documentElement.style.setProperty("--title-block-height", `${titleHeight}px`);
}

function setLiveIndicator(isLive) {
  if (!liveIndicatorDot) return;
  liveIndicatorDot.classList.toggle("is-live", Boolean(isLive));
}

function updateCandidateDisplay(label = "없음", detail = "현재 장르 유지 중") {
  candidateMood.textContent = label;
  candidateTimer.textContent = detail;
}

function resetAnalysisState() {
  analysis.previousSample = null;
  analysis.smoothedEnergy = 0;
  analysis.smoothedBounce = 0;
  analysis.smoothedOpenness = 0;
  analysis.smoothedTravel = 0;
  analysis.smoothedSymmetry = 0;
  analysis.smoothedCross = 0;
  analysis.smoothedVerticality = 0;
  analysis.mood = "Standby";
  analysis.motion = "준비 중";
  analysis.visibility = 0;
  analysis.liveBuffer = [];
  analysis.latestAggregate = null;
}

function ensureAudioContext() {
  if (!audioState.context) {
    audioState.context = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioState.context.state === "suspended") {
    audioState.context.resume();
  }
  return audioState.context;
}

function registerNode(...nodes) {
  nodes.forEach((node) => {
    audioState.activeNodes.add(node);
  });
}

function disconnectNode(node) {
  if (!node) return;
  try {
    if (node.stop) node.stop();
  } catch {}
  try {
    node.disconnect();
  } catch {}
  audioState.activeNodes.delete(node);
}

function cleanupFinishedNode(node, endTime) {
  const delay = Math.max(0, (endTime - ensureAudioContext().currentTime) * 1000 + 120);
  window.setTimeout(() => disconnectNode(node), delay);
}

function clearActiveNodes() {
  Array.from(audioState.activeNodes).forEach((node) => disconnectNode(node));
  audioState.activeNodes.clear();
}

function stopGeneratedAudio(resetUi = false, reason = "") {
  transportState.running = false;
  if (transportState.intervalId) {
    clearInterval(transportState.intervalId);
    transportState.intervalId = null;
  }
  if (audioState.currentMaster && audioState.context) {
    const now = audioState.context.currentTime;
    try {
      audioState.currentMaster.gain.cancelScheduledValues(now);
      audioState.currentMaster.gain.setValueAtTime(audioState.currentMaster.gain.value || 0.18, now);
      audioState.currentMaster.gain.linearRampToValueAtTime(0.0001, now + 0.45);
    } catch {}
  }
  clearActiveNodes();
  audioState.currentMaster = null;
  if (resetUi) {
    captureButton.disabled = false;
    setEngineUi(false);
  }
  if (reason) {
    speakStatusSafe(reason);
  }
}

function ensureYoutubeApi() {
  if (youtubeState.apiRequested || window.YT?.Player) return;
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(script);
  youtubeState.apiRequested = true;
}

function queueYoutubeRequest(style, forceRandom = false) {
  youtubeState.pendingRequest = { style, forceRandom };
}

function flushYoutubeRequest() {
  if (!youtubeState.pendingRequest || !youtubeState.playerReady) return;
  const pending = youtubeState.pendingRequest;
  youtubeState.pendingRequest = null;
  playYoutubeForStyle(pending.style, pending.forceRandom);
}

function initYoutubePlayer() {
  if (!youtubeState.apiReady || youtubeState.player) return;
  youtubeState.player = new window.YT.Player("youtubeFrame", {
    height: "100%",
    width: "100%",
    videoId: "",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
      rel: 0,
      origin: window.location.origin,
    },
    events: {
      onReady: () => {
        youtubeState.playerReady = true;
        flushYoutubeRequest();
      },
      onStateChange: (event) => {
        if (!window.YT?.PlayerState) return;
        if (event.data === window.YT.PlayerState.ENDED && playbackState.active && playbackState.mode === "youtube" && playbackState.currentStyle) {
          playYoutubeForStyle(playbackState.currentStyle, true);
        }
      },
      onAutoplayBlocked: () => {
        speakStatusSafe("유튜브 자동재생이 막혀 플레이어에서 한 번 재생해야 합니다");
      },
    },
  });
}

window.onYouTubeIframeAPIReady = () => {
  youtubeState.apiReady = true;
  initYoutubePlayer();
};

function hideYoutubePlayer() {
  if (youtubeState.playerReady) {
    try {
      youtubeState.player.stopVideo();
    } catch {}
  }
  youtubeState.pendingRequest = null;
  youtubePanel.hidden = true;
  playerSource.textContent = "생성 음악";
  playbackState.youtubeVideoId = null;
}

function stopPlayback(reason = "음악 정지됨") {
  playbackState.active = false;
  playbackState.pendingStart = false;
  playbackState.startRequestedAt = 0;
  playbackState.mode = "idle";
  playbackState.currentStyle = null;
  resetStyleDecisionState(DEFAULT_STYLE);
  resetXPoseGesture();
  stopGeneratedAudio(false);
  hideYoutubePlayer();
  captureButton.disabled = false;
  setEngineUi(false);
  updateCandidateDisplay("없음", "현재 장르 유지 중");
  speakStatusSafe(reason);
}

function pickRandomYoutubeEntry(style) {
  const entries = youtubeLibrary[style] || [];
  if (entries.length === 0) return null;
  if (entries.length === 1) return entries[0];
  const candidates = entries.filter((entry) => entry.id !== playbackState.youtubeVideoId);
  const pool = candidates.length > 0 ? candidates : entries;
  return pool[Math.floor(Math.random() * pool.length)];
}

function extractVideoIdFromUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {}
  return null;
}

function playYoutubeForStyle(style, forceRandom = false) {
  if (!forceRandom && playbackState.mode === "youtube" && playbackState.currentStyle === style) {
    return true;
  }
  ensureYoutubeApi();
  if (window.YT?.Player && !youtubeState.apiReady) {
    youtubeState.apiReady = true;
  }
  if (youtubeState.apiReady && !youtubeState.player) {
    initYoutubePlayer();
  }
  const entry = pickRandomYoutubeEntry(style);
  if (!entry) return false;
  const videoId = entry.id || extractVideoIdFromUrl(entry.url);
  if (!videoId) return false;
  if (!youtubeState.playerReady) {
    queueYoutubeRequest(style, forceRandom);
    youtubePanel.hidden = false;
    playerSource.textContent = `${style} / YouTube 로드 중`;
    setEngineUi(true);
    speakStatusSafe(`유튜브 로드 중: ${style}`);
    return true;
  }
  try {
    youtubeState.player.loadVideoById({
      videoId,
      startSeconds: entry.startSeconds || 0,
    });
  } catch {
    queueYoutubeRequest(style, forceRandom);
    return false;
  }
  youtubePanel.hidden = false;
  playerSource.textContent = `${style} / ${entry.title || entry.source}`;
  playbackState.mode = "youtube";
  playbackState.currentStyle = style;
  playbackState.youtubeVideoId = videoId;
  setEngineUi(true);
  speakStatusSafe(`유튜브 재생: ${style}`);
  return true;
}

function syncPlaybackForStyle(style, forceRandom = false) {
  if (!playbackState.active) return;
  const hasYoutubeTracks = (youtubeLibrary[style] || []).length > 0;

  if (hasYoutubeTracks) {
    stopGeneratedAudio(false);
    playYoutubeForStyle(style, forceRandom);
    return;
  }

  if (playbackState.mode === "youtube") {
    hideYoutubePlayer();
  }

  playbackState.mode = "generated";
  playbackState.currentStyle = style;
  playerSource.textContent = "생성 음악";

  if (!transportState.running) {
    analysis.mood = style;
    startReactiveAudio(true);
    return;
  }

  setQueuedStyle(style);
}

function scheduleTone(ctx, destination, frequency, start, duration, type, gainValue) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(start);
  osc.stop(start + duration + 0.03);
  registerNode(osc, gain);
  cleanupFinishedNode(osc, start + duration + 0.05);
  cleanupFinishedNode(gain, start + duration + 0.05);
}

function scheduleFmTone(ctx, destination, frequency, start, duration, carrierType, modFrequency, modDepth, gainValue) {
  const carrier = ctx.createOscillator();
  const modulator = ctx.createOscillator();
  const modGain = ctx.createGain();
  const gain = ctx.createGain();

  carrier.type = carrierType;
  carrier.frequency.setValueAtTime(frequency, start);
  modulator.type = "sine";
  modulator.frequency.setValueAtTime(modFrequency, start);
  modGain.gain.setValueAtTime(modDepth, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);
  carrier.connect(gain);
  gain.connect(destination);

  carrier.start(start);
  modulator.start(start);
  carrier.stop(start + duration + 0.03);
  modulator.stop(start + duration + 0.03);
  registerNode(carrier, modulator, modGain, gain);
  cleanupFinishedNode(carrier, start + duration + 0.05);
  cleanupFinishedNode(modulator, start + duration + 0.05);
  cleanupFinishedNode(modGain, start + duration + 0.05);
  cleanupFinishedNode(gain, start + duration + 0.05);
}

function scheduleFilteredNoise(ctx, destination, start, duration, filterType, cutoff, gainValue) {
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    output[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  noise.buffer = noiseBuffer;
  filter.type = filterType;
  filter.frequency.value = cutoff;
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  noise.start(start);
  noise.stop(start + duration + 0.02);
  registerNode(noise, filter, gain);
  cleanupFinishedNode(noise, start + duration + 0.05);
  cleanupFinishedNode(filter, start + duration + 0.05);
  cleanupFinishedNode(gain, start + duration + 0.05);
}

function schedulePluck(ctx, destination, frequency, start, duration, gainValue) {
  scheduleFmTone(ctx, destination, frequency, start, duration, "triangle", frequency * 2, frequency * 1.8, gainValue);
}

function scheduleBell(ctx, destination, frequency, start, duration, gainValue) {
  scheduleTone(ctx, destination, frequency, start, duration * 0.92, "sine", gainValue * 0.7);
  scheduleTone(ctx, destination, frequency * 2.01, start, duration * 0.42, "sine", gainValue * 0.28);
  scheduleTone(ctx, destination, frequency * 3.97, start, duration * 0.2, "triangle", gainValue * 0.12);
}

function scheduleOrgan(ctx, destination, frequency, start, duration, gainValue) {
  scheduleTone(ctx, destination, frequency, start, duration, "sine", gainValue * 0.45);
  scheduleTone(ctx, destination, frequency * 2, start, duration, "triangle", gainValue * 0.28);
  scheduleTone(ctx, destination, frequency * 3, start, duration * 0.95, "sine", gainValue * 0.12);
}

function scheduleGlassPad(ctx, destination, frequency, start, duration, gainValue) {
  scheduleFmTone(ctx, destination, frequency, start, duration, "sine", frequency * 1.4, frequency * 0.55, gainValue * 0.72);
  scheduleTone(ctx, destination, frequency * 2.01, start, duration * 0.75, "triangle", gainValue * 0.18);
}

function scheduleGlassLead(ctx, destination, frequency, start, duration, gainValue) {
  scheduleFmTone(ctx, destination, frequency, start, duration, "triangle", frequency * 2.6, frequency * 1.2, gainValue * 0.82);
  scheduleTone(ctx, destination, frequency * 2, start, duration * 0.4, "sine", gainValue * 0.16);
}

function scheduleSub(ctx, destination, frequency, start, duration, gainValue) {
  scheduleTone(ctx, destination, frequency, start, duration, "sine", gainValue * 0.82);
  scheduleTone(ctx, destination, frequency * 2, start, duration * 0.92, "triangle", gainValue * 0.16);
}

function scheduleBrass(ctx, destination, frequency, start, duration, gainValue) {
  const oscA = ctx.createOscillator();
  const oscB = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  oscA.type = "sawtooth";
  oscB.type = "square";
  oscA.frequency.setValueAtTime(frequency, start);
  oscB.frequency.setValueAtTime(frequency * 1.01, start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2100, start);
  filter.frequency.linearRampToValueAtTime(1200, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(gainValue, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscA.connect(filter);
  oscB.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  oscA.start(start);
  oscB.start(start);
  oscA.stop(start + duration + 0.03);
  oscB.stop(start + duration + 0.03);
  registerNode(oscA, oscB, filter, gain);
  cleanupFinishedNode(oscA, start + duration + 0.05);
  cleanupFinishedNode(oscB, start + duration + 0.05);
  cleanupFinishedNode(filter, start + duration + 0.05);
  cleanupFinishedNode(gain, start + duration + 0.05);
}

function scheduleKick(ctx, destination, start, gainValue = 0.9) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, start);
  osc.frequency.exponentialRampToValueAtTime(38, start + 0.16);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(start);
  osc.stop(start + 0.2);
  registerNode(osc, gain);
  cleanupFinishedNode(osc, start + 0.25);
  cleanupFinishedNode(gain, start + 0.25);
}

function scheduleSnare(ctx, destination, start, gainValue = 0.28) {
  scheduleFilteredNoise(ctx, destination, start, 0.18, "highpass", 1400, gainValue);
}

function scheduleHat(ctx, destination, start, gainValue = 0.08) {
  scheduleFilteredNoise(ctx, destination, start, 0.04, "highpass", 5000, gainValue);
}

function scheduleClap(ctx, destination, start, gainValue = 0.18) {
  scheduleFilteredNoise(ctx, destination, start, 0.08, "bandpass", 1900, gainValue);
  scheduleFilteredNoise(ctx, destination, start + 0.018, 0.06, "bandpass", 2200, gainValue * 0.65);
}

function scheduleShaker(ctx, destination, start, gainValue = 0.05) {
  scheduleFilteredNoise(ctx, destination, start, 0.03, "highpass", 6200, gainValue);
}

function scheduleTom(ctx, destination, start, gainValue = 0.22) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(190, start);
  osc.frequency.exponentialRampToValueAtTime(92, start + 0.16);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(start);
  osc.stop(start + 0.2);
  registerNode(osc, gain);
  cleanupFinishedNode(osc, start + 0.25);
  cleanupFinishedNode(gain, start + 0.25);
}

function getWaltzChordVoicing(chordSet) {
  const upper = chordSet.slice(-2);
  const top = chordSet[chordSet.length - 1];
  return [...upper, top + 12];
}

function scheduleWaltzBar(ctx, destination, barStart, barDuration, beat, barIndex, variation) {
  const chordSet = variation.chordSet || variation.chords[barIndex % variation.chords.length];
  const lowBass = variation.bass.find((note) => note !== null) ?? (chordSet[0] - 12);
  const upperChord = getWaltzChordVoicing(chordSet);
  const pulseGain = variation.chordGain * 0.88;
  const bassGain = variation.bassGain * 1.25;
  const beatTwoTime = barStart + beat;
  const beatThreeTime = barStart + beat * 2;

  scheduleInstrumentNote(
    ctx,
    destination,
    midiToFreq(lowBass),
    barStart,
    beat * 0.86,
    bassGain,
    variation.bassInstrument,
    variation.bassType
  );
  scheduleChord(
    ctx,
    destination,
    upperChord,
    beatTwoTime,
    beat * 0.48,
    variation.chordType,
    pulseGain,
    variation.chordInstrument
  );
  scheduleChord(
    ctx,
    destination,
    upperChord,
    beatThreeTime,
    beat * 0.48,
    variation.chordType,
    pulseGain * 0.96,
    variation.chordInstrument
  );

  scheduleKick(ctx, destination, barStart, variation.kickGain * 0.45);

  if (variation.sectionName !== "intro" && variation.sectionName !== "break") {
    scheduleLead(
      ctx,
      destination,
      variation.lead.slice(0, 6),
      barStart + beat * 0.12,
      beat / 2,
      variation.leadType,
      variation.leadGain * 0.95,
      variation.leadInstrument
    );
  }

  if (variation.counter?.length) {
    scheduleLead(
      ctx,
      destination,
      variation.counter.slice(0, 6),
      barStart + beat * 0.55,
      beat / 2,
      variation.leadType,
      variation.counterGain * 0.8,
      variation.counterInstrument || "glassPad"
    );
  }

  if (variation.droneActive && variation.drone !== undefined) {
    scheduleInstrumentNote(
      ctx,
      destination,
      midiToFreq(variation.drone),
      barStart,
      barDuration * 0.96,
      variation.droneGain,
      variation.droneInstrument || "glassPad",
      "sine"
    );
  }

  if (variation.sectionName === "lift" || variation.sectionName === "peak") {
    scheduleBell(ctx, destination, midiToFreq(chordSet[chordSet.length - 1] + 12), beatThreeTime + beat * 0.2, beat * 0.44, variation.leadGain * 0.42);
  }

  if (variation.shaker?.[2]) {
    scheduleShaker(ctx, destination, beatThreeTime + beat * 0.12, variation.shakerGain * 0.8);
  }
}

function scheduleInstrumentNote(ctx, destination, frequency, start, duration, gainValue, instrument = "plain", type = "triangle") {
  if (instrument === "fmPad") {
    scheduleFmTone(ctx, destination, frequency, start, duration, type, frequency * 1.5, frequency * 0.9, gainValue);
    return;
  }
  if (instrument === "pluck") {
    schedulePluck(ctx, destination, frequency, start, duration * 0.48, gainValue);
    return;
  }
  if (instrument === "fmLead") {
    scheduleFmTone(ctx, destination, frequency, start, duration, type, frequency * 3, frequency * 1.7, gainValue);
    return;
  }
  if (instrument === "fmBass") {
    scheduleFmTone(ctx, destination, frequency, start, duration, type, frequency * 2, frequency * 1.1, gainValue);
    return;
  }
  if (instrument === "bell") {
    scheduleBell(ctx, destination, frequency, start, duration, gainValue);
    return;
  }
  if (instrument === "organ") {
    scheduleOrgan(ctx, destination, frequency, start, duration, gainValue);
    return;
  }
  if (instrument === "glassPad") {
    scheduleGlassPad(ctx, destination, frequency, start, duration, gainValue);
    return;
  }
  if (instrument === "glass") {
    scheduleGlassLead(ctx, destination, frequency, start, duration, gainValue);
    return;
  }
  if (instrument === "brass") {
    scheduleBrass(ctx, destination, frequency, start, duration, gainValue);
    return;
  }
  if (instrument === "sub") {
    scheduleSub(ctx, destination, frequency, start, duration, gainValue);
    return;
  }
  scheduleTone(ctx, destination, frequency, start, duration, type, gainValue);
}

function scheduleChord(ctx, destination, midiNotes, start, duration, type, gainValue, instrument = "plain") {
  midiNotes.forEach((midi) => {
    const frequency = midiToFreq(midi);
    const perNoteGain = gainValue / midiNotes.length;
    scheduleInstrumentNote(ctx, destination, frequency, start, duration, perNoteGain, instrument, type);
  });
}

function scheduleBassline(ctx, destination, notes, start, step, type, gainValue, instrument = "plain") {
  notes.forEach((midi, index) => {
    if (midi === null) return;
    const frequency = midiToFreq(midi);
    const noteStart = start + index * step;
    scheduleInstrumentNote(ctx, destination, frequency, noteStart, step * 0.92, gainValue, instrument, type);
  });
}

function scheduleLead(ctx, destination, notes, start, step, type, gainValue, instrument = "plain") {
  notes.forEach((midi, index) => {
    if (midi === null) return;
    const frequency = midiToFreq(midi);
    const noteStart = start + index * step;
    scheduleInstrumentNote(ctx, destination, frequency, noteStart, step * 0.72, gainValue, instrument, type);
  });
}

function seededUnit(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function rotateSequence(sequence, offset) {
  if (!sequence || sequence.length === 0) return [];
  const normalized = ((offset % sequence.length) + sequence.length) % sequence.length;
  return sequence.slice(normalized).concat(sequence.slice(0, normalized));
}

function sparseSequence(sequence, density, seedBase) {
  return sequence.map((value, index) => {
    if (value === null) return null;
    return seededUnit(seedBase + index * 1.13) <= density ? value : null;
  });
}

function transposeSequence(sequence, semitones, stride = 1) {
  return sequence.map((value, index) => {
    if (value === null || index % stride !== 0) return value;
    return value + semitones;
  });
}

function getSectionProfile(sectionName) {
  const profiles = {
    intro: { leadDensity: 0.42, counterDensity: 0.18, bassDensity: 0.72, percussionDensity: 0.54, chordGainMul: 0.88, leadGainMul: 0.72, drone: true, lift: 0 },
    groove: { leadDensity: 0.72, counterDensity: 0.38, bassDensity: 0.94, percussionDensity: 0.9, chordGainMul: 1, leadGainMul: 1, drone: false, lift: 0 },
    lift: { leadDensity: 0.88, counterDensity: 0.52, bassDensity: 1, percussionDensity: 1, chordGainMul: 1.04, leadGainMul: 1.08, drone: false, lift: 7 },
    peak: { leadDensity: 1, counterDensity: 0.76, bassDensity: 1, percussionDensity: 1, chordGainMul: 1.1, leadGainMul: 1.18, drone: false, lift: 12 },
    break: { leadDensity: 0.24, counterDensity: 0.64, bassDensity: 0.45, percussionDensity: 0.26, chordGainMul: 0.72, leadGainMul: 0.55, drone: true, lift: 0 },
  };
  return profiles[sectionName] || profiles.groove;
}

function createVariation(pattern, features, barIndex) {
  const energy = features?.smoothedEnergy || 0;
  const bounce = features?.smoothedBounce || 0;
  const openness = features?.smoothedOpenness || 0;
  const travel = features?.smoothedTravel || 0;
  const symmetry = features?.smoothedSymmetry || 0;
  const verticality = features?.smoothedVerticality || 0;
  const lively = clamp((energy + bounce + travel) / 3, 0, 1);
  const sectionName = pattern.sectionPlan?.[barIndex % pattern.sectionPlan.length] || "groove";
  const section = getSectionProfile(sectionName);
  const isWaltz = pattern.genre === "waltz";
  const bpm = isWaltz
    ? Math.round(pattern.bpm + (energy - 0.38) * 6 - bounce * 4)
    : Math.round(pattern.bpm + (energy - 0.45) * 14 + (bounce - 0.35) * 10);
  const bass = rotateSequence(pattern.bass, barIndex % pattern.bass.length).map((note, index) => {
    if (note === null) return lively > 0.72 && index % 2 === 1 ? pattern.bass[(index + 1) % pattern.bass.length] : null;
    if (verticality > 0.72 && index % 4 === 0) return note + 12;
    return note;
  });

  let lead = rotateSequence(pattern.lead, (barIndex + Math.round(travel * 4)) % pattern.lead.length);
  let counter = rotateSequence(pattern.counter || [], (barIndex * 2) % Math.max((pattern.counter || []).length, 1));

  if (openness > 0.72) {
    lead = transposeSequence(lead, 12, 3);
  } else if (symmetry < 0.35) {
    lead = [...lead].reverse();
  }

  if (section.lift) {
    lead = transposeSequence(lead, section.lift, 4);
  }

  lead = isWaltz
    ? sparseSequence(lead, clamp(0.62 + openness * 0.18, 0.45, 0.92), barIndex * 17 + 7)
    : sparseSequence(lead, clamp(section.leadDensity + lively * 0.16, 0.18, 1), barIndex * 17 + 7);
  counter = isWaltz
    ? sparseSequence(counter, clamp(0.42 + openness * 0.14, 0.3, 0.76), barIndex * 29 + 11)
    : sparseSequence(counter, clamp(section.counterDensity + openness * 0.14, 0.12, 1), barIndex * 29 + 11);
  const bassSparse = isWaltz
    ? bass
    : sparseSequence(bass, clamp(section.bassDensity + energy * 0.08, 0.35, 1), barIndex * 13 + 5);

  const hat = isWaltz
    ? pattern.hat.map(() => 0)
    : pattern.hat.map((hit, index) => (hit && seededUnit(barIndex * 19 + index) <= clamp(section.percussionDensity + lively * 0.12, 0.2, 1) ? 1 : 0));
  const snare = pattern.snare.map((hit, index) => {
    if (hit) return 1;
    return bounce > 0.78 && index % 4 === 1 && seededUnit(barIndex * 23 + index) > 0.4 ? 1 : 0;
  });
  const clap = isWaltz
    ? (pattern.clap || []).map(() => 0)
    : (pattern.clap || []).map((hit, index) => (hit && seededUnit(barIndex * 31 + index) <= clamp(section.percussionDensity + bounce * 0.12, 0.18, 1) ? 1 : 0));
  const shaker = isWaltz
    ? (pattern.shaker || []).map((hit, index) => (sectionName === "groove" || sectionName === "peak") && hit && index % 3 === 2 ? 1 : 0)
    : (pattern.shaker || []).map((hit, index) => (hit && seededUnit(barIndex * 37 + index) <= clamp(section.percussionDensity + lively * 0.2, 0.22, 1) ? 1 : 0));
  const tom = (pattern.tom || []).map((hit, index) => {
    if (!hit) return 0;
    return sectionName === "peak" || (sectionName === "lift" && index >= pattern.tom.length - 2) ? 1 : 0;
  });

  const chordGain = ((isWaltz ? 0.14 : 0.1) + openness * (isWaltz ? 0.06 : 0.08)) * section.chordGainMul;
  const bassGain = isWaltz ? 0.12 + openness * 0.04 : 0.08 + energy * 0.08;
  const leadGain = ((isWaltz ? 0.05 : 0.038) + lively * (isWaltz ? 0.03 : 0.052)) * section.leadGainMul;
  const counterGain = isWaltz ? 0.032 + openness * 0.03 : 0.024 + openness * 0.04;
  const hatGain = isWaltz ? 0.01 : 0.026 + energy * 0.052;
  const shakerGain = isWaltz ? 0.016 + openness * 0.018 : 0.018 + lively * 0.03;
  const snareGain = isWaltz ? 0.03 : 0.11 + bounce * 0.16;
  const clapGain = isWaltz ? 0.01 : 0.09 + energy * 0.08;
  const kickGain = isWaltz ? 0.24 + openness * 0.08 : 0.4 + energy * 0.42;
  const tomGain = 0.12 + energy * 0.12;
  const droneGain = section.drone ? 0.035 + openness * 0.04 : 0;
  const chordSet = pattern.chords[(barIndex + (sectionName === "lift" ? 1 : 0)) % pattern.chords.length];

  return {
    ...pattern,
    bpm: clamp(bpm, 76, 146),
    bass: bassSparse,
    lead,
    counter,
    hat,
    snare,
    clap,
    shaker,
    tom,
    chordSet,
    chordGain,
    bassGain,
    leadGain,
    counterGain,
    hatGain,
    shakerGain,
    snareGain,
    clapGain,
    kickGain,
    tomGain,
    droneGain,
    sectionName,
    droneActive: section.drone,
  };
}

function scheduleBar(ctx, destination, barStart, barIndex, variation) {
  const meter = variation.meter || 4;
  const beat = 60 / variation.bpm;
  const step = beat / 2;
  const barDuration = beat * meter;
  const stepsPerBar = meter * 2;
  const chordSet = variation.chordSet || variation.chords[barIndex % variation.chords.length];
  const swing = variation.swing || 0;

  if (variation.genre === "waltz") {
    scheduleWaltzBar(ctx, destination, barStart, barDuration, beat, barIndex, variation);
    return barDuration;
  }

  scheduleChord(
    ctx,
    destination,
    chordSet,
    barStart,
    barDuration,
    variation.chordType,
    variation.chordGain,
    variation.chordInstrument
  );
  scheduleBassline(
    ctx,
    destination,
    variation.bass.slice(0, stepsPerBar),
    barStart,
    step,
    variation.bassType,
    variation.bassGain,
    variation.bassInstrument
  );
  scheduleLead(
    ctx,
    destination,
    variation.lead.slice(0, stepsPerBar),
    barStart,
    step,
    variation.leadType,
    variation.leadGain,
    variation.leadInstrument
  );

  if (variation.counter?.length) {
    scheduleLead(
      ctx,
      destination,
      variation.counter.slice(0, stepsPerBar),
      barStart,
      step,
      variation.leadType,
      variation.counterGain,
      variation.counterInstrument || "glass"
    );
  }

  if (variation.droneActive && variation.drone !== undefined) {
    scheduleInstrumentNote(
      ctx,
      destination,
      midiToFreq(variation.drone),
      barStart,
      barDuration * 0.96,
      variation.droneGain,
      variation.droneInstrument || "glassPad",
      "sine"
    );
  }

  for (let stepIndex = 0; stepIndex < stepsPerBar; stepIndex += 1) {
    const swingOffset = stepIndex % 2 === 1 ? step * swing : 0;
    const hitTime = barStart + stepIndex * step + swingOffset;
    if (variation.kick[stepIndex % variation.kick.length]) {
      scheduleKick(ctx, destination, hitTime, variation.kickGain);
    }
    if (variation.snare[stepIndex % variation.snare.length]) {
      scheduleSnare(ctx, destination, hitTime, variation.snareGain);
    }
    if (variation.hat[stepIndex % variation.hat.length]) {
      scheduleHat(ctx, destination, hitTime, variation.hatGain);
    }
    if (variation.clap?.[stepIndex % variation.clap.length]) {
      scheduleClap(ctx, destination, hitTime, variation.clapGain);
    }
    if (variation.shaker?.[stepIndex % variation.shaker.length]) {
      scheduleShaker(ctx, destination, hitTime, variation.shakerGain);
    }
    if (variation.tom?.[stepIndex % variation.tom.length]) {
      scheduleTom(ctx, destination, hitTime, variation.tomGain);
    }
  }

  return barDuration;
}

function setEngineUi(running) {
  if (playbackState.pendingStart) {
    captureButton.textContent = "춤 분석 중";
    return;
  }
  captureButton.textContent = running ? "실시간 반응 실행 중" : "실시간 반응 시작";
}

function setQueuedStyle(style) {
  transportState.queuedStyle = style;
}

function resetStyleDecisionState(currentStyle = DEFAULT_STYLE) {
  styleDecisionState.currentStyle = currentStyle;
  styleDecisionState.candidateStyle = null;
  styleDecisionState.candidateSince = 0;
  styleDecisionState.candidateLastSeenAt = 0;
  styleDecisionState.lastCommittedAt = 0;
}

function clearStyleCandidate() {
  styleDecisionState.candidateStyle = null;
  styleDecisionState.candidateSince = 0;
  styleDecisionState.candidateLastSeenAt = 0;
  updateCandidateDisplay();
}

function commitStyleSwitch(style, forceRandom = false) {
  styleDecisionState.currentStyle = style;
  styleDecisionState.lastCommittedAt = performance.now();
  clearStyleCandidate();
  setQueuedStyle(style);
  syncPlaybackForStyle(style, forceRandom);
}

function similarityScore(features, target, weights) {
  let total = 0;
  let weightSum = 0;
  for (const [key, weight] of Object.entries(weights)) {
    total += (1 - Math.abs(features[key] - target[key])) * weight;
    weightSum += weight;
  }
  return weightSum ? total / weightSum : 0;
}

function classifyStyle(features = analysis) {
  const profile = {
    smoothedEnergy: clamp(features.smoothedEnergy, 0, 1),
    smoothedBounce: clamp(features.smoothedBounce, 0, 1),
    smoothedOpenness: clamp(features.smoothedOpenness, 0, 1),
  };

  const weights = {
    smoothedEnergy: 1.2,
    smoothedBounce: 1.1,
    smoothedOpenness: 1,
  };

  const targets = {
    EDM: {
      smoothedEnergy: 0.88,
      smoothedBounce: 0.46,
      smoothedOpenness: 0.7,
    },
    Pop: {
      smoothedEnergy: 0.5,
      smoothedBounce: 0.3,
      smoothedOpenness: 0.56,
    },
    Waltz: {
      smoothedEnergy: 0.18,
      smoothedBounce: 0.08,
      smoothedOpenness: 0.82,
    },
  };

  if (profile.smoothedEnergy < 0.08 && profile.smoothedBounce < 0.05) {
    const fallbackStyle = playbackState.currentStyle || DEFAULT_STYLE;
    analysis.mood = fallbackStyle;
    analysis.motion = "움직임 대기";
    detectedMood.textContent = fallbackStyle;
    motionType.textContent = analysis.motion;
    moodStatus.textContent = `스타일: ${fallbackStyle}`;
    energyStatus.textContent = `에너지 ${Math.round(profile.smoothedEnergy * 100)}%`;
    opennessValue.textContent = `${Math.round(profile.smoothedOpenness * 100)}%`;
    bounceValue.textContent = `${Math.round(clamp(profile.smoothedBounce * 900, 0, 100))}%`;
    return { style: fallbackStyle, ranking: [[fallbackStyle, 0]] };
  }

  const scores = {
    EDM: similarityScore(profile, targets.EDM, weights),
    Pop: similarityScore(profile, targets.Pop, weights),
    Waltz: similarityScore(profile, targets.Waltz, weights),
  };

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [style] = ranked[0];
  const descriptors = {
    EDM: "드롭형 움직임",
    Pop: "정돈된 안무",
    Waltz: "열린 흐름",
  };

  analysis.mood = style;
  analysis.motion = descriptors[style] || "움직임 분석 중";
  detectedMood.textContent = style;
  motionType.textContent = analysis.motion;
  moodStatus.textContent = `스타일: ${style}`;
  energyStatus.textContent = `에너지 ${Math.round(features.smoothedEnergy * 100)}%`;
  opennessValue.textContent = `${Math.round(features.smoothedOpenness * 100)}%`;
  bounceValue.textContent = `${Math.round(clamp(features.smoothedBounce * 900, 0, 100))}%`;

  return { style, ranking: ranked };
}

function aggregateLiveBuffer() {
  if (analysis.liveBuffer.length === 0) return null;

  const aggregate = analysis.liveBuffer.reduce(
    (acc, sample) => {
      acc.energy += sample.energy;
      acc.bounce += sample.bounce;
      acc.openness += sample.openness;
      acc.travel += sample.travel;
      acc.symmetry += sample.symmetry;
      acc.cross += sample.cross;
      acc.verticality += sample.verticality;
      return acc;
    },
    { energy: 0, bounce: 0, openness: 0, travel: 0, symmetry: 0, cross: 0, verticality: 0 }
  );

  const count = analysis.liveBuffer.length;
  return {
    smoothedEnergy: aggregate.energy / count,
    smoothedBounce: aggregate.bounce / count,
    smoothedOpenness: aggregate.openness / count,
    smoothedTravel: aggregate.travel / count,
    smoothedSymmetry: aggregate.symmetry / count,
    smoothedCross: aggregate.cross / count,
    smoothedVerticality: aggregate.verticality / count,
  };
}

function updateLiveStyle() {
  const aggregate = aggregateLiveBuffer();
  if (!aggregate) return;
  analysis.latestAggregate = aggregate;
  const { style, ranking } = classifyStyle(aggregate);

  if (playbackState.pendingStart) {
    styleDecisionState.currentStyle = style;
    clearStyleCandidate();
    detectedMood.textContent = style;
    const elapsed = performance.now() - playbackState.startRequestedAt;
    const remaining = Math.max(0, INITIAL_ANALYSIS_MS - elapsed);
    updateCandidateDisplay(style, remaining > 0 ? `첫 곡 분석 중 · ${Math.ceil(remaining / 1000)}초` : "첫 곡 확정 중");

    if (remaining > 0) {
      moodStatus.textContent = `첫 곡 분석 중 · ${Math.ceil(remaining / 1000)}초`;
      speakStatusSafe(`첫 곡 분석 중: ${style}`);
      return;
    }

    playbackState.pendingStart = false;
    playbackState.active = true;
    transportState.currentStyle = style;
    resetStyleDecisionState(style);
    styleDecisionState.lastCommittedAt = performance.now() - STYLE_SWITCH_COOLDOWN_MS;
    commitStyleSwitch(style, true);
    setEngineUi(true);
    captureButton.disabled = false;
    detectedMood.textContent = style;
    moodStatus.textContent = `첫 곡 시작: ${style}`;
    updateCandidateDisplay(style, "첫 곡 확정");
    return;
  }

  if (!playbackState.active) {
    styleDecisionState.currentStyle = style;
    clearStyleCandidate();
    detectedMood.textContent = style;
    moodStatus.textContent = `감지 스타일: ${style}`;
    updateCandidateDisplay("없음", "재생 전 대기");
    return;
  }

  const currentStyle = styleDecisionState.currentStyle || playbackState.currentStyle || DEFAULT_STYLE;
  const topScore = ranking[0]?.[1] ?? 0;
  const secondScore = ranking[1]?.[1] ?? 0;
  const scoreGap = topScore - secondScore;
  const now = performance.now();

  if (style === currentStyle) {
    if (
      styleDecisionState.candidateStyle &&
      now - styleDecisionState.candidateLastSeenAt <= STYLE_SWITCH_CANDIDATE_GRACE_MS
    ) {
      moodStatus.textContent = `변경 후보 유지: ${styleDecisionState.candidateStyle}`;
      detectedMood.textContent = currentStyle;
      updateCandidateDisplay(styleDecisionState.candidateStyle, "후보 흔들림 보정 중");
      return;
    }
    clearStyleCandidate();
    detectedMood.textContent = currentStyle;
    moodStatus.textContent = `스타일 유지: ${currentStyle}`;
    return;
  }

  if (scoreGap < STYLE_SWITCH_SCORE_GAP) {
    if (
      styleDecisionState.candidateStyle &&
      now - styleDecisionState.candidateLastSeenAt <= STYLE_SWITCH_CANDIDATE_GRACE_MS
    ) {
      moodStatus.textContent = `변경 후보 유지: ${styleDecisionState.candidateStyle}`;
      detectedMood.textContent = currentStyle;
      updateCandidateDisplay(styleDecisionState.candidateStyle, "점수 재확인 중");
      return;
    }
    clearStyleCandidate();
    detectedMood.textContent = currentStyle;
    moodStatus.textContent = `스타일 유지: ${currentStyle}`;
    return;
  }

  if (styleDecisionState.candidateStyle !== style) {
    styleDecisionState.candidateStyle = style;
    styleDecisionState.candidateSince = now;
  }
  styleDecisionState.candidateLastSeenAt = now;

  const holdElapsed = now - styleDecisionState.candidateSince;
  const cooldownElapsed = now - styleDecisionState.lastCommittedAt;
  const holdRemaining = Math.max(0, STYLE_SWITCH_HOLD_MS - holdElapsed);
  const cooldownRemaining = Math.max(0, STYLE_SWITCH_COOLDOWN_MS - cooldownElapsed);

  detectedMood.textContent = currentStyle;
  if (cooldownRemaining > 0) {
    moodStatus.textContent = `스타일 유지: ${currentStyle} · ${Math.ceil(cooldownRemaining / 1000)}초 잠금`;
    updateCandidateDisplay(style, `잠금 중 · ${Math.ceil(cooldownRemaining / 1000)}초`);
    return;
  }

  if (holdRemaining > 0) {
    moodStatus.textContent = `변경 후보: ${style} · ${Math.ceil(holdRemaining / 1000)}초 더 유지`;
    updateCandidateDisplay(style, `${Math.ceil(holdRemaining / 1000)}초 더 유지`);
    return;
  }

  commitStyleSwitch(style, true);
  detectedMood.textContent = style;
  moodStatus.textContent = `스타일 전환: ${style}`;
  updateCandidateDisplay(style, "전환 완료");
}

function getActiveFeatures() {
  return analysis.latestAggregate || {
    smoothedEnergy: analysis.smoothedEnergy,
    smoothedBounce: analysis.smoothedBounce,
    smoothedOpenness: analysis.smoothedOpenness,
    smoothedTravel: analysis.smoothedTravel,
    smoothedSymmetry: analysis.smoothedSymmetry,
    smoothedCross: analysis.smoothedCross,
    smoothedVerticality: analysis.smoothedVerticality,
  };
}

function startReactiveAudio(preserveSession = false) {
  const ctx = ensureAudioContext();
  stopGeneratedAudio(false);
  hideYoutubePlayer();

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 0.8);
  audioState.currentMaster = master;
  registerNode(master);

  transportState.running = true;
  transportState.barsPlayed = 0;
  transportState.currentStyle = analysis.mood === "Standby" ? DEFAULT_STYLE : analysis.mood;
  transportState.queuedStyle = transportState.currentStyle;
  transportState.nextBarTime = ctx.currentTime + 0.08;
  transportState.lastTransitionAt = performance.now();
  if (!preserveSession) {
    playbackState.active = true;
  }
  playbackState.mode = "generated";
  playbackState.currentStyle = transportState.currentStyle;

  setEngineUi(true);
  captureButton.disabled = false;
  playerSource.textContent = "생성 음악";
  scheduleTransport();
  transportState.intervalId = window.setInterval(scheduleTransport, transportState.lookAheadMs);
}

function scheduleTransport() {
  if (!transportState.running) return;
  const ctx = ensureAudioContext();

  while (transportState.nextBarTime < ctx.currentTime + transportState.scheduleAheadTime) {
    const chosenStyle = transportState.queuedStyle || transportState.currentStyle;
    const trackKey = styleToTrackKey[chosenStyle] || "kpop";
    const pattern = patternLibrary[trackKey] || patternLibrary.kpop;
    const features = getActiveFeatures();
    const variation = createVariation(pattern, features, transportState.barsPlayed);
    const barDuration = scheduleBar(ctx, audioState.currentMaster, transportState.nextBarTime, transportState.barsPlayed, variation);

    if (chosenStyle !== transportState.currentStyle) {
      transportState.currentStyle = chosenStyle;
      transportState.lastTransitionAt = performance.now();
      speakStatusSafe(`실시간 전환: ${chosenStyle} / ${variation.sectionName}`);
    } else {
      speakStatusSafe(`실시간 반응 중: ${chosenStyle} / ${variation.sectionName}`);
    }

    transportState.nextBarTime += barDuration;
    transportState.barsPlayed += 1;
  }
}

function resetXPoseGesture() {
  poseGestureState.xPoseSince = 0;
  poseGestureState.lastSeenAt = 0;
  poseGestureState.stopTriggered = false;
}

function isXPoseGesture(landmarks) {
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftElbow = landmarks[13];
  const rightElbow = landmarks[14];
  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];

  const visibility = averageVisibility([leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist]);
  if (visibility < 0.35) return false;

  const shoulderWidth = distance(leftShoulder, rightShoulder) || 0.001;
  const shoulderCenterX = (leftShoulder.x + rightShoulder.x) / 2;
  const shoulderCenterY = (leftShoulder.y + rightShoulder.y) / 2;
  const hipCenterY = (leftHip.y + rightHip.y) / 2;
  const torsoHeight = Math.max(hipCenterY - shoulderCenterY, 0.001);

  const wristsNearCenter =
    Math.abs(leftWrist.x - shoulderCenterX) < shoulderWidth * 0.75 &&
    Math.abs(rightWrist.x - shoulderCenterX) < shoulderWidth * 0.75;
  const wristsNearChest =
    leftWrist.y > shoulderCenterY - torsoHeight * 0.35 &&
    rightWrist.y > shoulderCenterY - torsoHeight * 0.35 &&
    leftWrist.y < hipCenterY &&
    rightWrist.y < hipCenterY;
  const wristsNearOppositeShoulders =
    distance(leftWrist, rightShoulder) < shoulderWidth * 1.35 &&
    distance(rightWrist, leftShoulder) < shoulderWidth * 1.35;
  const armsCrossed =
    segmentsIntersect(leftShoulder, leftWrist, rightShoulder, rightWrist) ||
    segmentsIntersect(leftElbow, leftWrist, rightElbow, rightWrist);
  const wristsCompact = distance(leftWrist, rightWrist) < shoulderWidth * 1.8;
  const elbowsLifted = leftElbow.y < hipCenterY && rightElbow.y < hipCenterY;

  return wristsNearCenter && wristsNearChest && wristsCompact && elbowsLifted && (armsCrossed || wristsNearOppositeShoulders);
}

function updateXPoseGesture(landmarks) {
  if (!playbackState.active) {
    resetXPoseGesture();
    return;
  }

  const now = performance.now();
  const detected = isXPoseGesture(landmarks);

  if (detected) {
    if (!poseGestureState.xPoseSince) {
      poseGestureState.xPoseSince = now;
    }
    poseGestureState.lastSeenAt = now;
  } else if (!poseGestureState.xPoseSince || now - poseGestureState.lastSeenAt > 250) {
    resetXPoseGesture();
    return;
  }

  const heldFor = poseGestureState.lastSeenAt - poseGestureState.xPoseSince;
  if (!poseGestureState.stopTriggered && heldFor >= 2000) {
    poseGestureState.stopTriggered = true;
    stopPlayback("X 포즈 인식: 음악 중지");
    return;
  }

  if (!poseGestureState.stopTriggered) {
    const secondsLeft = Math.max(1, Math.ceil((2000 - heldFor) / 1000));
    captureStatus.textContent = `X 포즈 유지 중 · ${secondsLeft}초`;
  }
}

function updateAnalysis(landmarks) {
  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
  const nose = landmarks[0];

  const visibility = averageVisibility([leftWrist, rightWrist, leftShoulder, rightShoulder, leftHip, rightHip, nose]);
  analysis.visibility = visibility;
  stabilityStatus.textContent = `포즈 안정도 ${Math.round(visibility * 100)}%`;

  const shoulderWidth = distance(leftShoulder, rightShoulder) || 0.001;
  const armSpan = distance(leftWrist, rightWrist) / shoulderWidth;
  const openness = clamp((armSpan - 0.8) / 2.4, 0, 1);
  const bodyCenterX = (leftHip.x + rightHip.x + leftShoulder.x + rightShoulder.x) / 4;
  const wristCenterX = (leftWrist.x + rightWrist.x) / 2;
  const symmetry = clamp(1 - Math.abs(wristCenterX - bodyCenterX) * 4, 0, 1);
  const wristCross = clamp((shoulderWidth * 0.55 - Math.abs(leftWrist.x - rightWrist.x)) / (shoulderWidth * 0.55), 0, 1);
  const verticality = clamp((Math.max(leftShoulder.y, rightShoulder.y) - Math.min(leftWrist.y, rightWrist.y)) * 3.5, 0, 1);

  const torsoCenterY = (leftHip.y + rightHip.y + leftShoulder.y + rightShoulder.y) / 4;
  let travel = 0;
  let delta = 0;
  let bounce = 0;

  if (analysis.previousSample) {
    delta =
      Math.abs(leftWrist.x - analysis.previousSample.leftWrist.x) +
      Math.abs(leftWrist.y - analysis.previousSample.leftWrist.y) +
      Math.abs(rightWrist.x - analysis.previousSample.rightWrist.x) +
      Math.abs(rightWrist.y - analysis.previousSample.rightWrist.y) +
      Math.abs(leftShoulder.x - analysis.previousSample.leftShoulder.x) +
      Math.abs(rightShoulder.x - analysis.previousSample.rightShoulder.x);
    bounce = Math.abs(torsoCenterY - analysis.previousSample.torsoCenterY);
    travel = Math.abs(bodyCenterX - analysis.previousSample.bodyCenterX);
  }

  analysis.previousSample = {
    leftWrist: { x: leftWrist.x, y: leftWrist.y },
    rightWrist: { x: rightWrist.x, y: rightWrist.y },
    leftShoulder: { x: leftShoulder.x, y: leftShoulder.y },
    rightShoulder: { x: rightShoulder.x, y: rightShoulder.y },
    torsoCenterY,
    bodyCenterX,
  };

  analysis.smoothedEnergy = analysis.smoothedEnergy * 0.82 + clamp(delta * 0.75, 0, 1) * 0.18;
  analysis.smoothedBounce = analysis.smoothedBounce * 0.78 + clamp(bounce * 1.5, 0, 1) * 0.22;
  analysis.smoothedOpenness = analysis.smoothedOpenness * 0.85 + openness * 0.15;
  analysis.smoothedTravel = analysis.smoothedTravel * 0.82 + clamp(travel * 7, 0, 1) * 0.18;
  analysis.smoothedSymmetry = analysis.smoothedSymmetry * 0.84 + symmetry * 0.16;
  analysis.smoothedCross = analysis.smoothedCross * 0.84 + wristCross * 0.16;
  analysis.smoothedVerticality = analysis.smoothedVerticality * 0.84 + verticality * 0.16;
  updateXPoseGesture(landmarks);

  const now = performance.now();
  analysis.liveBuffer.push({
    time: now,
    energy: analysis.smoothedEnergy,
    bounce: analysis.smoothedBounce,
    openness: analysis.smoothedOpenness,
    travel: analysis.smoothedTravel,
    symmetry: analysis.smoothedSymmetry,
    cross: analysis.smoothedCross,
    verticality: analysis.smoothedVerticality,
  });
  analysis.liveBuffer = analysis.liveBuffer.filter((sample) => now - sample.time <= analysis.bufferWindowMs);

  if (analysis.liveBuffer.length >= 12) {
    updateLiveStyle();
  }
}

function drawResults(results) {
  poseCtx.clearRect(0, 0, poseCanvas.width, poseCanvas.height);
  if (!results.poseLandmarks) {
    resetXPoseGesture();
    moodStatus.textContent = "사람을 화면 안에 보여주세요";
    stabilityStatus.textContent = "포즈 안정도 대기";
    return;
  }

  drawConnectors(poseCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#67e8f9",
    lineWidth: 3,
  });
  drawLandmarks(poseCtx, results.poseLandmarks, {
    color: "#ff8a5b",
    lineWidth: 1,
    radius: 4,
  });

  updateAnalysis(results.poseLandmarks);
}

async function initPose() {
  if (!window.Pose || !window.Camera) {
    cameraStatus.textContent = "포즈 라이브러리 로드 실패";
    setLiveIndicator(false);
    return;
  }

  const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.55,
    minTrackingConfidence: 0.55,
  });

  pose.onResults(drawResults);

  try {
    const camera = new Camera(video, {
      onFrame: async () => {
        await pose.send({ image: video });
      },
      width: 960,
      height: 720,
    });
    await camera.start();
    cameraStatus.textContent = "카메라 연결됨";
    setLiveIndicator(true);
  } catch (error) {
    cameraStatus.textContent = "카메라 권한 거부 또는 연결 실패";
    setLiveIndicator(false);
    console.error(error);
  }
}

window.addEventListener("load", async () => {
  updateViewportHeight();
  setLiveIndicator(false);
  await initPose();
  setEngineUi(false);
  updateCandidateDisplay("없음", "현재 장르 유지 중");
  speakStatusSafe("대기 중");
});

window.addEventListener("resize", updateViewportHeight);
window.visualViewport?.addEventListener("resize", updateViewportHeight);
document.fonts?.ready?.then(updateViewportHeight);

captureButton.addEventListener("click", async () => {
  if (playbackState.active || playbackState.pendingStart) return;
  ensureAudioContext();
  resetAnalysisState();
  resetXPoseGesture();
  resetStyleDecisionState(DEFAULT_STYLE);
  playbackState.pendingStart = true;
  playbackState.startRequestedAt = performance.now();
  playbackState.active = false;
  transportState.currentStyle = DEFAULT_STYLE;
  transportState.queuedStyle = DEFAULT_STYLE;
  captureButton.disabled = true;
  setEngineUi(false);
  detectedMood.textContent = "분석 중";
  motionType.textContent = "준비 중";
  moodStatus.textContent = "첫 곡 분석 중 · 4초";
  updateCandidateDisplay("분석 중", "첫 곡 분석 중 · 4초");
  speakStatusSafe("첫 곡 분석 중");
});

stopAudioButton.addEventListener("click", () => {
  stopPlayback("음악 정지됨");
});
