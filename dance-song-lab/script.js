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
const recordTemplateButton = document.getElementById("recordTemplateButton");
const exportTemplatesButton = document.getElementById("exportTemplatesButton");
const importTemplatesButton = document.getElementById("importTemplatesButton");
const editTemplateButton = document.getElementById("editTemplateButton");
const deleteTemplateButton = document.getElementById("deleteTemplateButton");
const captureStatus = document.getElementById("captureStatus");
const sequenceStatus = document.getElementById("sequenceStatus");
const youtubePanel = document.getElementById("youtubePanel");
const youtubeFrame = document.getElementById("youtubeFrame");
const playerSource = document.getElementById("playerSource");
const liveIndicatorDot = document.getElementById("liveIndicatorDot");
const templateImportInput = document.getElementById("templateImportInput");
const templateStudio = document.getElementById("templateStudio");
const templateStudioBackdrop = document.getElementById("templateStudioBackdrop");
const closeTemplateStudioButton = document.getElementById("closeTemplateStudioButton");
const templateStudioMode = document.getElementById("templateStudioMode");
const templateStudioTitle = document.getElementById("templateStudioTitle");
const templateStudioDescription = document.getElementById("templateStudioDescription");
const templateStudioMessage = document.getElementById("templateStudioMessage");
const templateForm = document.getElementById("templateForm");
const templateNameField = document.getElementById("templateNameField");
const templateStyleField = document.getElementById("templateStyleField");
const templateTrackField = document.getElementById("templateTrackField");
const templateFormSubmitButton = document.getElementById("templateFormSubmitButton");
const templateFormSecondaryButton = document.getElementById("templateFormSecondaryButton");
const templateFormNote = document.getElementById("templateFormNote");
const templateLibrarySummary = document.getElementById("templateLibrarySummary");
const templateLibraryList = document.getElementById("templateLibraryList");
const templateLibraryEmpty = document.getElementById("templateLibraryEmpty");

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
  edm_alt: {
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
const INACTIVE_DETECTED_STYLE = "없음";
const INITIAL_ANALYSIS_MS = 4000;
const STYLE_SWITCH_HOLD_MS = 1800;
const STYLE_SWITCH_COOLDOWN_MS = 0;
const STYLE_SWITCH_SCORE_GAP = 0.008;
const STYLE_SWITCH_CANDIDATE_GRACE_MS = 500;
const X_POSE_HOLD_MS = 2000;
const SEQUENCE_STORAGE_KEY = "moveMuseSequenceTemplates";
const SEQUENCE_KEYPOINTS = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
const SEQUENCE_SAMPLE_MS = 90;
const SEQUENCE_BUFFER_WINDOW_MS = 12000;
const SEQUENCE_TARGET_FRAMES = 28;
const SEQUENCE_MIN_RECORDING_FRAMES = 18;
const SEQUENCE_MATCH_THRESHOLD = 0.24;
const SEQUENCE_MATCH_COOLDOWN_MS = 2600;
const SEQUENCE_ALLOWED_STYLES = ["Waltz", "EDM", "Pop"];

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

const sequenceState = {
  liveFrames: [],
  lastLiveSampleAt: 0,
  templates: [],
  recording: null,
  bestMatch: null,
};

const templateStudioState = {
  open: false,
  mode: "record",
  selectedTemplateId: null,
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
  youtubeEntry: null,
  currentTemplateId: null,
  currentTrackKey: null,
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
  if (!captureStatus) return;
  captureStatus.textContent = text;
}

function setCaptureStatusText(text) {
  if (!captureStatus) return;
  captureStatus.textContent = text;
}

function setMotionLabel(text, multiline = false) {
  if (!motionType) return;
  motionType.textContent = text;
  motionType.classList.toggle("motion-label-sequence", multiline);
}

function isKeyboardInputTarget(target) {
  if (!(target instanceof Element)) return false;
  if (target.closest("input, textarea, select, button")) return true;
  if (target.closest('[contenteditable=""], [contenteditable="true"]')) return true;
  return false;
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

function slugifyTemplateName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function normalizeSequenceStyle(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "edm" || normalized === "hiphop" || normalized === "hip-hop") return "EDM";
  if (normalized === "pop") return "Pop";
  if (normalized === "waltz") return "Waltz";
  return null;
}

function normalizeTemplateTrack(track, fallbackTitle = "Sequence Track") {
  if (!track) return null;

  const rawId =
    typeof track === "string"
      ? track
      : typeof track === "object"
        ? track.id || track.videoId || track.url || ""
        : "";
  const candidate = String(rawId || "").trim();
  if (!candidate) return null;

  const directIdMatch = candidate.match(/^[A-Za-z0-9_-]{11}$/);
  const videoId = extractVideoIdFromUrl(candidate) || directIdMatch?.[0] || null;
  if (!videoId) return null;

  const title =
    typeof track === "object" && typeof track.title === "string" && track.title.trim()
      ? track.title.trim()
      : fallbackTitle;
  const startValue = typeof track === "object" ? Number(track.startSeconds) : 0;

  return {
    id: videoId,
    url: /^https?:/i.test(candidate) ? candidate : `https://www.youtube.com/watch?v=${videoId}`,
    title,
    source: "Template",
    startSeconds: Number.isFinite(startValue) && startValue > 0 ? Math.round(startValue) : 0,
  };
}

function normalizeSequenceTemplate(template) {
  if (!template || !Array.isArray(template.frames) || template.frames.length === 0) {
    return null;
  }

  const name = String(template.name || "").trim();
  if (!name) return null;

  const style = normalizeSequenceStyle(template.style) || DEFAULT_STYLE;
  const normalizedFrames = template.frames
    .filter((frame) => Array.isArray(frame) && frame.length > 0)
    .map((frame) =>
      frame
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value))
    )
    .filter((frame) => frame.length > 0);

  if (!normalizedFrames.length) return null;

  return {
    ...template,
    id: template.id || `template-${slugifyTemplateName(name)}-${Date.now()}`,
    name,
    style,
    durationMs: Math.max(Number(template.durationMs) || 0, normalizedFrames.length * SEQUENCE_SAMPLE_MS),
    frames: normalizedFrames,
    track: normalizeTemplateTrack(template.track || template.youtubeId || template.youtubeUrl, name),
  };
}

function loadSequenceTemplates() {
  try {
    const raw = window.localStorage.getItem(SEQUENCE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const templates = Array.isArray(parsed?.templates) ? parsed.templates : Array.isArray(parsed) ? parsed : [];
    return templates.map((template) => normalizeSequenceTemplate(template)).filter(Boolean);
  } catch (error) {
    console.warn("Failed to load sequence templates", error);
    return [];
  }
}

function saveSequenceTemplates() {
  try {
    window.localStorage.setItem(
      SEQUENCE_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        updatedAt: new Date().toISOString(),
        templates: sequenceState.templates,
      })
    );
  } catch (error) {
    console.warn("Failed to save sequence templates", error);
  }
}

function setSequenceStatus(text) {
  if (!sequenceStatus) return;
  sequenceStatus.textContent = text;
}

function updateSequenceUi() {
  const templateCount = sequenceState.templates.length;
  const hasTemplates = templateCount > 0;
  const isRecording = Boolean(sequenceState.recording);
  if (recordTemplateButton) {
    recordTemplateButton.textContent = sequenceState.recording ? "기록 종료" : "시퀀스 기록";
  }
  if (exportTemplatesButton) {
    exportTemplatesButton.disabled = !hasTemplates;
  }
  if (editTemplateButton) {
    editTemplateButton.disabled = !hasTemplates || isRecording;
  }
  if (deleteTemplateButton) {
    deleteTemplateButton.disabled = !hasTemplates || isRecording;
  }

  if (sequenceState.recording) {
    const recordedSeconds = Math.max(0, (performance.now() - sequenceState.recording.startedAt) / 1000);
    setSequenceStatus(`기록 중 · ${sequenceState.recording.name} · ${recordedSeconds.toFixed(1)}초`);
    return;
  }

  if (sequenceState.bestMatch?.matched) {
    setSequenceStatus(
      `${sequenceState.bestMatch.name} ${Math.round(sequenceState.bestMatch.confidence * 100)}%`
    );
    return;
  }

  setSequenceStatus(`템플릿 ${templateCount}개`);
}

function describeTemplateTrack(template) {
  if (!template?.track) return "스타일 랜덤 재생";
  return template.track.title || template.track.id || "지정 곡";
}

function promptForTemplateSelection(actionLabel = "관리") {
  if (!sequenceState.templates.length) {
    window.alert("관리할 템플릿이 없습니다.");
    return null;
  }

  const templateList = sequenceState.templates
    .map((template, index) => `${index + 1}. ${template.name} · ${template.style} · ${describeTemplateTrack(template)}`)
    .join("\n");
  const selectedValue = window.prompt(
    `${actionLabel}할 템플릿 번호를 입력하세요.\n\n${templateList}`,
    "1"
  );
  if (selectedValue === null) return null;

  const selectedIndex = Number.parseInt(selectedValue, 10) - 1;
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= sequenceState.templates.length) {
    window.alert("올바른 템플릿 번호를 입력해 주세요.");
    return null;
  }

  return {
    index: selectedIndex,
    template: sequenceState.templates[selectedIndex],
  };
}

function exportSequenceTemplates() {
  if (!sequenceState.templates.length) return;

  const payload = JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      templates: sequenceState.templates,
    },
    null,
    2
  );

  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "move-muse-sequence-templates.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function mergeImportedTemplates(payload) {
  const imported = Array.isArray(payload?.templates) ? payload.templates : Array.isArray(payload) ? payload : [];
  if (!imported.length) {
    window.alert("불러올 템플릿이 없습니다.");
    return;
  }

  const validTemplates = imported.map((template) => normalizeSequenceTemplate(template)).filter(Boolean);

  if (!validTemplates.length) {
    window.alert("템플릿 형식이 올바르지 않습니다.");
    return;
  }

  const deduped = new Map(sequenceState.templates.map((template) => [template.id, template]));
  validTemplates.forEach((template) => {
    deduped.set(template.id, template);
  });

  sequenceState.templates = Array.from(deduped.values());
  saveSequenceTemplates();
  updateSequenceUi();
  speakStatusSafe(`템플릿 ${validTemplates.length}개 불러옴`);
}

function promptForTemplateSetup(initialTemplate = null) {
  const defaultName = initialTemplate?.name || `dance-${sequenceState.templates.length + 1}`;
  const name = window.prompt("템플릿 이름을 입력하세요.", defaultName);
  if (name === null) return null;

  const trimmedName = name.trim();
  if (!trimmedName) {
    window.alert("템플릿 이름은 비워둘 수 없습니다.");
    return null;
  }

  const defaultStyle = initialTemplate?.style || normalizeSequenceStyle(detectedMood.textContent) || DEFAULT_STYLE;
  const styleInput = window.prompt("매핑할 스타일을 입력하세요. (EDM / Pop / Waltz)", defaultStyle);
  if (styleInput === null) return null;

  const style = normalizeSequenceStyle(styleInput);
  if (!style) {
    window.alert("스타일은 EDM, Pop, Waltz 중 하나여야 합니다.");
    return null;
  }

  const trackInput = window.prompt(
    "이 안무에 연결할 YouTube URL 또는 11자리 영상 ID를 입력하세요. 비워두면 스타일 랜덤 재생을 사용합니다.",
    initialTemplate?.track?.url || initialTemplate?.track?.id || ""
  );
  const track = normalizeTemplateTrack(trackInput, trimmedName);
  if (trackInput && trackInput.trim() && !track) {
    window.alert("YouTube URL 또는 11자리 영상 ID만 사용할 수 있습니다.");
    return null;
  }

  return {
    id: initialTemplate?.id || `template-${slugifyTemplateName(trimmedName)}-${Date.now()}`,
    name: trimmedName,
    style,
    track,
  };
}

function editSequenceTemplate() {
  if (sequenceState.recording) {
    window.alert("기록 중에는 템플릿을 수정할 수 없습니다.");
    return;
  }

  const selected = promptForTemplateSelection("수정");
  if (!selected) return;

  const updatedSetup = promptForTemplateSetup(selected.template);
  if (!updatedSetup) return;

  const updatedTemplate = normalizeSequenceTemplate({
    ...selected.template,
    ...updatedSetup,
    updatedAt: new Date().toISOString(),
  });
  if (!updatedTemplate) {
    window.alert("템플릿 정보를 다시 확인해 주세요.");
    return;
  }

  sequenceState.templates = sequenceState.templates.map((template, index) => {
    return index === selected.index ? updatedTemplate : template;
  });

  if (sequenceState.bestMatch?.id === updatedTemplate.id) {
    sequenceState.bestMatch = {
      ...sequenceState.bestMatch,
      ...updatedTemplate,
    };
  }

  saveSequenceTemplates();
  updateSequenceUi();
  speakStatusSafe(`템플릿 수정: ${updatedTemplate.name}`);
}

function deleteSequenceTemplate() {
  if (sequenceState.recording) {
    window.alert("기록 중에는 템플릿을 삭제할 수 없습니다.");
    return;
  }

  const selected = promptForTemplateSelection("삭제");
  if (!selected) return;

  const shouldDelete = window.confirm(`${selected.template.name} 템플릿을 삭제할까요?`);
  if (!shouldDelete) return;

  sequenceState.templates = sequenceState.templates.filter((_, index) => index !== selected.index);

  if (sequenceState.bestMatch?.id === selected.template.id) {
    sequenceState.bestMatch = null;
  }

  if (playbackState.currentTemplateId === selected.template.id) {
    playbackState.currentTemplateId = null;
    playbackState.currentTrackKey = null;
    playbackState.youtubeEntry = null;
  }

  saveSequenceTemplates();
  updateSequenceUi();
  speakStatusSafe(`템플릿 삭제: ${selected.template.name}`);
}

function resampleSequenceFrames(frames, targetLength) {
  if (!frames.length || targetLength <= 0) return [];
  if (frames.length === targetLength) return frames.map((frame) => [...frame]);
  if (frames.length === 1) {
    return Array.from({ length: targetLength }, () => [...frames[0]]);
  }

  const result = [];
  const lastIndex = frames.length - 1;
  for (let index = 0; index < targetLength; index += 1) {
    const position = (index * lastIndex) / Math.max(targetLength - 1, 1);
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.min(lastIndex, Math.ceil(position));
    const weight = position - lowerIndex;
    const lowerFrame = frames[lowerIndex];
    const upperFrame = frames[upperIndex];

    const interpolated = lowerFrame.map((value, valueIndex) => {
      return value + (upperFrame[valueIndex] - value) * weight;
    });
    result.push(interpolated);
  }

  return result;
}

function sequenceDistance(sequenceA, sequenceB) {
  if (!sequenceA.length || !sequenceB.length || sequenceA.length !== sequenceB.length) return Number.POSITIVE_INFINITY;
  let total = 0;
  let count = 0;

  for (let frameIndex = 0; frameIndex < sequenceA.length; frameIndex += 1) {
    const frameA = sequenceA[frameIndex];
    const frameB = sequenceB[frameIndex];
    for (let valueIndex = 0; valueIndex < frameA.length; valueIndex += 1) {
      total += Math.abs(frameA[valueIndex] - frameB[valueIndex]);
      count += 1;
    }
  }

  return count ? total / count : Number.POSITIVE_INFINITY;
}

function normalizePoseFrame(landmarks) {
  const keypoints = SEQUENCE_KEYPOINTS.map((index) => landmarks[index]).filter(Boolean);
  if (keypoints.length !== SEQUENCE_KEYPOINTS.length) return null;
  if (averageVisibility(keypoints) < 0.45) return null;

  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];

  const shoulderCenterX = (leftShoulder.x + rightShoulder.x) / 2;
  const shoulderCenterY = (leftShoulder.y + rightShoulder.y) / 2;
  const hipCenterX = (leftHip.x + rightHip.x) / 2;
  const hipCenterY = (leftHip.y + rightHip.y) / 2;
  const centerX = (shoulderCenterX + hipCenterX) / 2;
  const centerY = (shoulderCenterY + hipCenterY) / 2;
  const torsoScale = Math.max(
    distance(leftShoulder, rightShoulder),
    Math.hypot(hipCenterX - shoulderCenterX, hipCenterY - shoulderCenterY),
    0.001
  );

  return SEQUENCE_KEYPOINTS.flatMap((index) => {
    const point = landmarks[index];
    return [
      Number(((point.x - centerX) / torsoScale).toFixed(4)),
      Number(((point.y - centerY) / torsoScale).toFixed(4)),
    ];
  });
}

function evaluateBestSequenceMatch(now = performance.now()) {
  if (!sequenceState.templates.length || sequenceState.recording) {
    sequenceState.bestMatch = null;
    updateSequenceUi();
    return null;
  }

  let bestMatch = null;
  for (const template of sequenceState.templates) {
    const durationMs = Math.max(template.durationMs || 0, template.frames.length * SEQUENCE_SAMPLE_MS);
    const windowStart = now - durationMs - SEQUENCE_SAMPLE_MS * 2;
    const liveFrames = sequenceState.liveFrames.filter((frame) => frame.time >= windowStart);
    if (liveFrames.length < Math.max(10, Math.floor(template.frames.length * 0.65))) continue;

    const liveSequence = resampleSequenceFrames(
      liveFrames.map((frame) => frame.values),
      template.frames.length
    );
    const distanceScore = sequenceDistance(liveSequence, template.frames);
    const confidence = clamp(1 - distanceScore / SEQUENCE_MATCH_THRESHOLD, 0, 1);
    const matched = distanceScore <= SEQUENCE_MATCH_THRESHOLD;

    if (!bestMatch || distanceScore < bestMatch.distance) {
      bestMatch = { ...template, distance: distanceScore, confidence, matched };
    }
  }

  sequenceState.bestMatch = bestMatch;
  updateSequenceUi();
  return bestMatch;
}

function startSequenceRecording() {
  const setup = promptForTemplateSetup();
  if (!setup) return;

  sequenceState.recording = {
    ...setup,
    startedAt: performance.now(),
    frames: [],
  };
  sequenceState.bestMatch = null;
  updateSequenceUi();
  speakStatusSafe(`시퀀스 기록 시작: ${setup.name}`);
}

function stopSequenceRecording() {
  if (!sequenceState.recording) return;

  const recording = sequenceState.recording;
  sequenceState.recording = null;

  if (recording.frames.length < SEQUENCE_MIN_RECORDING_FRAMES) {
    updateSequenceUi();
    window.alert("시퀀스가 너무 짧습니다. 2초 이상 기록해 주세요.");
    speakStatusSafe("시퀀스 기록 실패");
    return;
  }

  const durationMs = recording.frames[recording.frames.length - 1].time || recording.frames.length * SEQUENCE_SAMPLE_MS;
  const template = {
    id: recording.id,
    name: recording.name,
    style: recording.style,
    track: recording.track || null,
    durationMs: Math.round(durationMs),
    createdAt: new Date().toISOString(),
    frames: resampleSequenceFrames(
      recording.frames.map((frame) => frame.values),
      SEQUENCE_TARGET_FRAMES
    ),
  };

  sequenceState.templates = [...sequenceState.templates, template];
  saveSequenceTemplates();
  updateSequenceUi();
  speakStatusSafe(`시퀀스 저장: ${template.name}`);
}

function toggleSequenceRecording() {
  if (sequenceState.recording) {
    stopSequenceRecording();
    return;
  }
  startSequenceRecording();
}

function captureSequenceFrame(landmarks, now) {
  if (sequenceState.lastLiveSampleAt && now - sequenceState.lastLiveSampleAt < SEQUENCE_SAMPLE_MS) return;
  const values = normalizePoseFrame(landmarks);
  if (!values) return;

  sequenceState.lastLiveSampleAt = now;
  sequenceState.liveFrames.push({ time: now, values });
  sequenceState.liveFrames = sequenceState.liveFrames.filter((frame) => now - frame.time <= SEQUENCE_BUFFER_WINDOW_MS);

  if (sequenceState.recording) {
    sequenceState.recording.frames.push({
      time: now - sequenceState.recording.startedAt,
      values,
    });
  }

  evaluateBestSequenceMatch(now);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTemplateById(templateId) {
  return sequenceState.templates.find((template) => template.id === templateId) || null;
}

function getTemplateDefaultStyle() {
  return normalizeSequenceStyle(detectedMood.textContent) || DEFAULT_STYLE;
}

function getTemplateTrackInputValue(template = null) {
  return template?.track?.url || template?.track?.id || "";
}

function getPreferredTemplateId() {
  return playbackState.currentTemplateId || sequenceState.bestMatch?.id || sequenceState.templates[0]?.id || null;
}

function setTemplateStudioMessage(text, tone = "muted") {
  if (!templateStudioMessage) return;
  templateStudioMessage.textContent = text || "시퀀스 흐름을 여기서 한 번에 관리할 수 있습니다.";
  if (tone === "muted") {
    delete templateStudioMessage.dataset.tone;
    return;
  }
  templateStudioMessage.dataset.tone = tone;
}

function fillTemplateForm(template = null) {
  if (!templateNameField || !templateStyleField || !templateTrackField) return;
  templateNameField.value = template?.name || `dance-${sequenceState.templates.length + 1}`;
  templateStyleField.value = template?.style || getTemplateDefaultStyle();
  templateTrackField.value = getTemplateTrackInputValue(template);
}

function renderTemplateLibrary() {
  if (!templateLibraryList || !templateLibrarySummary || !templateLibraryEmpty) return;

  templateLibrarySummary.textContent = `템플릿 ${sequenceState.templates.length}개`;
  if (!sequenceState.templates.length) {
    templateLibraryList.innerHTML = "";
    templateLibraryEmpty.hidden = false;
    return;
  }

  templateLibraryEmpty.hidden = true;
  const selectedTemplateId = templateStudioState.selectedTemplateId;
  const isDeleteMode = templateStudioState.mode === "delete";

  templateLibraryList.innerHTML = sequenceState.templates
    .map((template, index) => {
      const isSelected = selectedTemplateId === template.id;
      const classes = ["template-item"];
      if (isSelected) classes.push("is-selected");
      if (isSelected && isDeleteMode) classes.push("is-delete");

      return `
        <article class="${classes.join(" ")}" data-template-select="${escapeHtml(template.id)}">
          <div class="template-item-top">
            <div>
              <p class="template-item-name">${escapeHtml(template.name)}</p>
              <p class="template-item-meta">
                <span class="template-item-style">${escapeHtml(template.style)}</span>
                <span>${escapeHtml(describeTemplateTrack(template))}</span>
              </p>
            </div>
            <span class="template-item-index">${String(index + 1).padStart(2, "0")}</span>
          </div>
          <div class="template-item-actions">
            <button class="template-item-button" type="button" data-template-action="edit" data-template-id="${escapeHtml(template.id)}">Edit</button>
            <button class="template-item-button danger" type="button" data-template-action="delete" data-template-id="${escapeHtml(template.id)}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function syncTemplateStudio() {
  if (!templateStudio) return;

  const mode = templateStudioState.mode;
  const selectedTemplate = getTemplateById(templateStudioState.selectedTemplateId);
  const isDeleteMode = mode === "delete";
  const hasTemplates = sequenceState.templates.length > 0;

  if (templateStudioMode) {
    templateStudioMode.textContent =
      mode === "record" ? "Sequence Capture" : mode === "delete" ? "Template Removal" : "Template Edit";
  }

  if (templateStudioTitle) {
    templateStudioTitle.textContent =
      mode === "record" ? "Template Capture" : mode === "delete" ? "Remove Template" : "Refine Template";
  }

  if (templateStudioDescription) {
    templateStudioDescription.textContent =
      mode === "record"
        ? "춤을 기록하기 전에 이름, 매핑 스타일, 지정 곡을 현재 무드에 맞게 정합니다."
        : mode === "delete"
          ? "삭제할 템플릿을 고르면 라이브러리와 로컬 저장에서 즉시 제거됩니다."
          : "저장된 템플릿의 이름, 스타일, 지정 곡을 여기서 다시 다듬을 수 있습니다.";
  }

  if (templateFormNote) {
    templateFormNote.textContent = isDeleteMode
      ? "삭제 모드에서는 필드가 잠기고 선택된 템플릿만 제거됩니다."
      : "Billie Jean, Gangnam Style 모두 Pop으로 매핑하고 곡만 따로 연결해도 됩니다.";
  }

  if (templateFormSubmitButton) {
    templateFormSubmitButton.textContent =
      mode === "record" ? "시퀀스 기록 시작" : mode === "delete" ? "선택 템플릿 삭제" : "템플릿 저장";
    templateFormSubmitButton.classList.toggle("danger", isDeleteMode);
  }

  if (templateNameField) templateNameField.disabled = isDeleteMode;
  if (templateStyleField) templateStyleField.disabled = isDeleteMode;
  if (templateTrackField) templateTrackField.disabled = isDeleteMode;

  if (mode === "record") {
    fillTemplateForm(null);
  } else if (selectedTemplate) {
    fillTemplateForm(selectedTemplate);
  } else if (hasTemplates) {
    templateStudioState.selectedTemplateId = sequenceState.templates[0].id;
    fillTemplateForm(sequenceState.templates[0]);
  }

  renderTemplateLibrary();
}

function openTemplateStudio(mode = "record", templateId = null) {
  if (!templateStudio) return;

  templateStudioState.open = true;
  templateStudioState.mode = mode;
  templateStudioState.selectedTemplateId = mode === "record" ? null : templateId || getPreferredTemplateId();

  templateStudio.hidden = false;
  templateStudio.setAttribute("aria-hidden", "false");
  syncTemplateStudio();
  setTemplateStudioMessage(
    mode === "record"
      ? "새 시퀀스를 등록할 준비가 됐습니다."
      : mode === "delete"
        ? "삭제할 템플릿을 선택해 주세요."
        : "수정할 템플릿을 선택해 주세요.",
    "muted"
  );

  window.requestAnimationFrame(() => {
    if (mode === "delete") {
      templateFormSubmitButton?.focus();
      return;
    }
    templateNameField?.focus();
    templateNameField?.select();
  });
}

function closeTemplateStudio() {
  if (!templateStudio) return;
  templateStudio.hidden = true;
  templateStudio.setAttribute("aria-hidden", "true");
  templateStudioState.open = false;
  templateStudioState.mode = "record";
  templateStudioState.selectedTemplateId = null;
  setTemplateStudioMessage("시퀀스 흐름을 여기서 한 번에 관리할 수 있습니다.");
}

function readTemplateFormSetup() {
  const templateName = templateNameField?.value.trim() || "";
  const style = normalizeSequenceStyle(templateStyleField?.value || "");
  const rawTrackValue = templateTrackField?.value.trim() || "";

  if (!templateName) {
    setTemplateStudioMessage("템플릿 이름을 먼저 입력해 주세요.", "error");
    templateNameField?.focus();
    return null;
  }

  if (!style) {
    setTemplateStudioMessage("매핑 스타일은 Waltz, EDM, Pop 중 하나여야 합니다.", "error");
    templateStyleField?.focus();
    return null;
  }

  const track = normalizeTemplateTrack(rawTrackValue, templateName);
  if (rawTrackValue && !track) {
    setTemplateStudioMessage("YouTube URL 또는 11자리 영상 ID만 연결할 수 있습니다.", "error");
    templateTrackField?.focus();
    return null;
  }

  return {
    id: templateStudioState.mode === "edit" ? templateStudioState.selectedTemplateId : `template-${slugifyTemplateName(templateName)}-${Date.now()}`,
    name: templateName,
    style,
    track,
  };
}

function updateTemplateRecord(templateId, setup) {
  const currentTemplate = getTemplateById(templateId);
  if (!currentTemplate) {
    setTemplateStudioMessage("수정할 템플릿을 찾지 못했습니다.", "error");
    return;
  }

  const updatedTemplate = normalizeSequenceTemplate({
    ...currentTemplate,
    ...setup,
    updatedAt: new Date().toISOString(),
  });
  if (!updatedTemplate) {
    setTemplateStudioMessage("템플릿 값을 다시 확인해 주세요.", "error");
    return;
  }

  sequenceState.templates = sequenceState.templates.map((template) => {
    return template.id === templateId ? updatedTemplate : template;
  });

  if (sequenceState.bestMatch?.id === templateId) {
    sequenceState.bestMatch = { ...sequenceState.bestMatch, ...updatedTemplate };
  }

  if (playbackState.currentTemplateId === templateId) {
    playbackState.currentTemplateId = updatedTemplate.id;
    playbackState.youtubeEntry = updatedTemplate.track ? buildTemplateYoutubeEntry(updatedTemplate) : null;
    playbackState.currentTrackKey = playbackState.youtubeEntry
      ? getYoutubeEntryKey(updatedTemplate.style, playbackState.youtubeEntry)
      : null;
  }

  templateStudioState.mode = "edit";
  templateStudioState.selectedTemplateId = updatedTemplate.id;
  saveSequenceTemplates();
  updateSequenceUi();
  syncTemplateStudio();
  setTemplateStudioMessage(`템플릿 저장 완료 · ${updatedTemplate.name}`, "success");
  speakStatusSafe(`템플릿 저장: ${updatedTemplate.name}`);
  closeTemplateStudio();
}

function removeTemplateRecord(templateId) {
  const currentTemplate = getTemplateById(templateId);
  if (!currentTemplate) {
    setTemplateStudioMessage("삭제할 템플릿을 찾지 못했습니다.", "error");
    return;
  }

  sequenceState.templates = sequenceState.templates.filter((template) => template.id !== templateId);

  if (sequenceState.bestMatch?.id === templateId) {
    sequenceState.bestMatch = null;
  }

  if (playbackState.currentTemplateId === templateId) {
    playbackState.currentTemplateId = null;
    playbackState.currentTrackKey = null;
    playbackState.youtubeEntry = null;
  }

  if (sequenceState.templates.length) {
    templateStudioState.mode = "edit";
    templateStudioState.selectedTemplateId = getPreferredTemplateId();
  } else {
    templateStudioState.mode = "record";
    templateStudioState.selectedTemplateId = null;
  }

  saveSequenceTemplates();
  updateSequenceUi();
  syncTemplateStudio();
  setTemplateStudioMessage(`템플릿 삭제 완료 · ${currentTemplate.name}`, "success");
  speakStatusSafe(`템플릿 삭제: ${currentTemplate.name}`);
}

function handleTemplateStudioSubmit(event) {
  event.preventDefault();

  if (templateStudioState.mode === "delete") {
    if (!templateStudioState.selectedTemplateId) {
      setTemplateStudioMessage("삭제할 템플릿을 먼저 선택해 주세요.", "error");
      return;
    }
    removeTemplateRecord(templateStudioState.selectedTemplateId);
    return;
  }

  const setup = readTemplateFormSetup();
  if (!setup) return;

  if (templateStudioState.mode === "edit") {
    updateTemplateRecord(templateStudioState.selectedTemplateId, setup);
    return;
  }

  startSequenceRecording(setup);
}

function handleTemplateLibraryClick(event) {
  const actionTarget = event.target.closest("[data-template-action]");
  if (actionTarget) {
    const templateId = actionTarget.dataset.templateId;
    if (!templateId) return;

    if (actionTarget.dataset.templateAction === "delete") {
      templateStudioState.mode = "delete";
      templateStudioState.selectedTemplateId = templateId;
      syncTemplateStudio();
      setTemplateStudioMessage("하단 버튼을 누르면 선택한 템플릿이 삭제됩니다.", "error");
      return;
    }

    templateStudioState.mode = "edit";
    templateStudioState.selectedTemplateId = templateId;
    syncTemplateStudio();
    setTemplateStudioMessage("선택한 템플릿을 수정 중입니다.", "muted");
    return;
  }

  const selectTarget = event.target.closest("[data-template-select]");
  if (!selectTarget) return;

  templateStudioState.selectedTemplateId = selectTarget.dataset.templateSelect;
  if (templateStudioState.mode !== "delete") {
    templateStudioState.mode = "edit";
  }
  syncTemplateStudio();
}

function updateSequenceUi() {
  const templateCount = sequenceState.templates.length;
  const hasTemplates = templateCount > 0;
  const isRecording = Boolean(sequenceState.recording);

  if (recordTemplateButton) {
    recordTemplateButton.textContent = sequenceState.recording ? "기록 종료" : "시퀀스 기록";
  }
  if (exportTemplatesButton) {
    exportTemplatesButton.disabled = !hasTemplates;
  }
  if (editTemplateButton) {
    editTemplateButton.disabled = !hasTemplates || isRecording;
  }
  if (deleteTemplateButton) {
    deleteTemplateButton.disabled = !hasTemplates || isRecording;
  }

  if (sequenceState.recording) {
    const recordedSeconds = Math.max(0, (performance.now() - sequenceState.recording.startedAt) / 1000);
    setSequenceStatus(`기록 중 · ${sequenceState.recording.name} · ${recordedSeconds.toFixed(1)}초`);
  } else if (sequenceState.bestMatch?.matched) {
    setSequenceStatus(`${sequenceState.bestMatch.name} ${Math.round(sequenceState.bestMatch.confidence * 100)}%`);
  } else {
    setSequenceStatus(`템플릿 ${templateCount}개`);
  }

  if (templateStudioState.open) {
    renderTemplateLibrary();
    if (templateLibrarySummary) {
      templateLibrarySummary.textContent = `템플릿 ${templateCount}개`;
    }
    if (templateLibraryEmpty) {
      templateLibraryEmpty.hidden = templateCount > 0;
    }
  } else if (templateLibrarySummary) {
    templateLibrarySummary.textContent = `템플릿 ${templateCount}개`;
  }
}

function mergeImportedTemplates(payload) {
  const imported = Array.isArray(payload?.templates) ? payload.templates : Array.isArray(payload) ? payload : [];
  if (!imported.length) {
    openTemplateStudio("edit", getPreferredTemplateId());
    setTemplateStudioMessage("불러올 템플릿이 없습니다.", "error");
    speakStatusSafe("템플릿 불러오기 실패");
    return;
  }

  const validTemplates = imported.map((template) => normalizeSequenceTemplate(template)).filter(Boolean);
  if (!validTemplates.length) {
    openTemplateStudio("edit", getPreferredTemplateId());
    setTemplateStudioMessage("템플릿 JSON 형식이 올바르지 않습니다.", "error");
    speakStatusSafe("템플릿 불러오기 실패");
    return;
  }

  const deduped = new Map(sequenceState.templates.map((template) => [template.id, template]));
  validTemplates.forEach((template) => {
    deduped.set(template.id, template);
  });

  sequenceState.templates = Array.from(deduped.values());
  templateStudioState.selectedTemplateId = validTemplates[0]?.id || getPreferredTemplateId();
  saveSequenceTemplates();
  updateSequenceUi();
  openTemplateStudio("edit", templateStudioState.selectedTemplateId);
  setTemplateStudioMessage(`템플릿 ${validTemplates.length}개를 라이브러리에 추가했습니다.`, "success");
  speakStatusSafe(`템플릿 ${validTemplates.length}개 불러옴`);
}

function startSequenceRecording(setup = null) {
  const nextSetup = setup || readTemplateFormSetup();
  if (!nextSetup) return;

  sequenceState.recording = {
    ...nextSetup,
    startedAt: performance.now(),
    frames: [],
  };
  sequenceState.bestMatch = null;
  updateSequenceUi();
  closeTemplateStudio();
  speakStatusSafe(`시퀀스 기록 시작: ${nextSetup.name}`);
}

function stopSequenceRecording() {
  if (!sequenceState.recording) return;

  const recording = sequenceState.recording;
  sequenceState.recording = null;

  if (recording.frames.length < SEQUENCE_MIN_RECORDING_FRAMES) {
    updateSequenceUi();
    openTemplateStudio("record");
    fillTemplateForm(recording);
    setTemplateStudioMessage("시퀀스가 너무 짧습니다. 2초 이상 다시 기록해 주세요.", "error");
    speakStatusSafe("시퀀스 기록 실패");
    return;
  }

  const durationMs = recording.frames[recording.frames.length - 1].time || recording.frames.length * SEQUENCE_SAMPLE_MS;
  const template = normalizeSequenceTemplate({
    id: recording.id,
    name: recording.name,
    style: recording.style,
    track: recording.track || null,
    durationMs: Math.round(durationMs),
    createdAt: new Date().toISOString(),
    frames: resampleSequenceFrames(
      recording.frames.map((frame) => frame.values),
      SEQUENCE_TARGET_FRAMES
    ),
  });

  if (!template) {
    openTemplateStudio("record");
    setTemplateStudioMessage("시퀀스 템플릿을 정리하는 중 문제가 생겼습니다.", "error");
    speakStatusSafe("시퀀스 기록 실패");
    return;
  }

  sequenceState.templates = [...sequenceState.templates.filter((item) => item.id !== template.id), template];
  saveSequenceTemplates();
  updateSequenceUi();
  openTemplateStudio("edit", template.id);
  setTemplateStudioMessage(`시퀀스 저장 완료 · ${template.name}`, "success");
  speakStatusSafe(`시퀀스 저장: ${template.name}`);
}

function toggleSequenceRecording() {
  if (sequenceState.recording) {
    stopSequenceRecording();
    return;
  }
  openTemplateStudio("record");
}

function editSequenceTemplate(templateId = null) {
  if (!sequenceState.templates.length) {
    openTemplateStudio("record");
    setTemplateStudioMessage("먼저 저장된 템플릿이 있어야 수정할 수 있습니다.", "error");
    return;
  }
  openTemplateStudio("edit", templateId || getPreferredTemplateId());
}

function deleteSequenceTemplate(templateId = null) {
  if (!sequenceState.templates.length) {
    openTemplateStudio("record");
    setTemplateStudioMessage("삭제할 템플릿이 아직 없습니다.", "error");
    return;
  }
  openTemplateStudio("delete", templateId || getPreferredTemplateId());
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
  sequenceState.liveFrames = [];
  sequenceState.lastLiveSampleAt = 0;
  sequenceState.bestMatch = null;
  updateSequenceUi();
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

function queueYoutubeRequest(style, forceRandom = false, preferredEntry = null) {
  youtubeState.pendingRequest = {
    style,
    forceRandom,
    preferredEntry: preferredEntry ? { ...preferredEntry } : null,
  };
}

function flushYoutubeRequest() {
  if (!youtubeState.pendingRequest || !youtubeState.playerReady) return;
  const pending = youtubeState.pendingRequest;
  youtubeState.pendingRequest = null;
  playYoutubeForSelection(pending.style, pending.forceRandom, pending.preferredEntry);
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
          const replayEntry = playbackState.youtubeEntry?.templateId ? playbackState.youtubeEntry : null;
          playYoutubeForSelection(playbackState.currentStyle, true, replayEntry);
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
  playbackState.youtubeEntry = null;
  playbackState.currentTemplateId = null;
  playbackState.currentTrackKey = null;
}

function stopPlayback(reason = "") {
  playbackState.active = false;
  playbackState.pendingStart = false;
  playbackState.startRequestedAt = 0;
  playbackState.mode = "idle";
  playbackState.currentStyle = null;
  playbackState.youtubeEntry = null;
  playbackState.currentTemplateId = null;
  playbackState.currentTrackKey = null;
  resetStyleDecisionState(DEFAULT_STYLE);
  resetXPoseGesture();
  stopGeneratedAudio(false);
  hideYoutubePlayer();
  captureButton.disabled = false;
  setEngineUi(false);
  detectedMood.textContent = INACTIVE_DETECTED_STYLE;
  setMotionLabel("시퀀스 대기");
  moodStatus.textContent = "시퀀스 대기";
  updateCandidateDisplay("없음", "재생 전 대기");
  if (reason) {
    speakStatusSafe(reason);
  } else {
    setCaptureStatusText("무대 대기 중");
  }
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

function getYoutubeEntryVideoId(entry) {
  if (!entry) return null;
  return entry.id || extractVideoIdFromUrl(entry.url);
}

function getYoutubeEntryKey(style, entry) {
  const videoId = getYoutubeEntryVideoId(entry);
  if (!videoId) return null;
  const startSeconds = Number(entry?.startSeconds) || 0;
  const templateId = entry?.templateId || "style";
  return `${style}:${templateId}:${videoId}:${startSeconds}`;
}

function normalizeTrackLookupText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "");
}

function findLibraryTrackForTemplate(template) {
  const templateName = normalizeTrackLookupText(template?.name);
  if (!templateName) return null;

  const primaryPool = youtubeLibrary[template?.style] || [];
  const allPools = Object.values(youtubeLibrary).flat();
  const lookupPool = [...primaryPool, ...allPools.filter((entry) => !primaryPool.includes(entry))];

  return (
    lookupPool.find((entry) => {
      const title = normalizeTrackLookupText(entry?.title);
      return title && (title.includes(templateName) || templateName.includes(title));
    }) || null
  );
}

function buildTemplateYoutubeEntry(template) {
  const directTrack = normalizeTemplateTrack(template?.track, template?.name || "Sequence Track");
  const inferredTrack = directTrack ? null : findLibraryTrackForTemplate(template);
  const track = directTrack || normalizeTemplateTrack(inferredTrack, template?.name || "Sequence Track");
  if (!track) return null;
  return {
    ...track,
    templateId: template.id || null,
    title: track.title || template.name || "Sequence Track",
    source: track.source || "Template",
  };
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

function playYoutubeForSelection(style, forceRandom = false, preferredEntry = null, templateIdOverride = null) {
  const rawEntry = preferredEntry || pickRandomYoutubeEntry(style);
  if (!rawEntry) return false;
  const entry = templateIdOverride && !rawEntry.templateId ? { ...rawEntry, templateId: templateIdOverride } : rawEntry;

  const videoId = getYoutubeEntryVideoId(entry);
  if (!videoId) return false;

  const trackKey = getYoutubeEntryKey(style, entry);
  if (!forceRandom && playbackState.mode === "youtube" && playbackState.currentStyle === style && playbackState.currentTrackKey === trackKey) {
    return true;
  }

  ensureYoutubeApi();
  if (window.YT?.Player && !youtubeState.apiReady) {
    youtubeState.apiReady = true;
  }
  if (youtubeState.apiReady && !youtubeState.player) {
    initYoutubePlayer();
  }

  if (!youtubeState.playerReady) {
    queueYoutubeRequest(style, forceRandom, entry);
    youtubePanel.hidden = false;
    playerSource.textContent = `${style} / YouTube loading`;
    playbackState.mode = "youtube";
    playbackState.currentStyle = style;
    playbackState.youtubeVideoId = videoId;
    playbackState.youtubeEntry = { ...entry };
    playbackState.currentTemplateId = entry.templateId || templateIdOverride || null;
    playbackState.currentTrackKey = null;
    setEngineUi(true);
    speakStatusSafe(`YouTube 로드 중: ${style}`);
    return true;
  }

  try {
    youtubeState.player.loadVideoById({
      videoId,
      startSeconds: entry.startSeconds || 0,
    });
  } catch {
    queueYoutubeRequest(style, forceRandom, entry);
    return false;
  }

  youtubePanel.hidden = false;
  playerSource.textContent = `${style} / ${entry.title || entry.source || "YouTube"}`;
  playbackState.mode = "youtube";
  playbackState.currentStyle = style;
  playbackState.youtubeVideoId = videoId;
  playbackState.youtubeEntry = { ...entry };
  playbackState.currentTemplateId = entry.templateId || templateIdOverride || null;
  playbackState.currentTrackKey = trackKey;
  setEngineUi(true);
  speakStatusSafe(`YouTube 재생: ${entry.title || style}`);
  return true;
}

function syncPlaybackForSelection(style, forceRandom = false, sequenceMatch = null) {
  if (!playbackState.active) return;
  if (!sequenceMatch?.matched) return;

  const activeTemplateId = sequenceMatch.id;
  const templateEntry = buildTemplateYoutubeEntry(sequenceMatch);
  if (templateEntry) {
    stopGeneratedAudio(false);
    playYoutubeForSelection(style, forceRandom, templateEntry, activeTemplateId);
    return;
  }

  const hasYoutubeTracks = (youtubeLibrary[style] || []).length > 0;
  if (hasYoutubeTracks) {
    stopGeneratedAudio(false);
    playYoutubeForSelection(style, forceRandom, null, activeTemplateId);
    return;
  }

  playbackState.currentTemplateId = activeTemplateId;
  playbackState.currentStyle = style;
  playbackState.currentTrackKey = null;
  playbackState.youtubeEntry = null;
  playbackState.mode = "idle";
  stopGeneratedAudio(false);
  hideYoutubePlayer();
  playerSource.textContent = "연결 곡 없음";
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

function commitStyleSwitch(style, forceRandom = false, sequenceMatch = null) {
  styleDecisionState.currentStyle = style;
  styleDecisionState.lastCommittedAt = performance.now();
  clearStyleCandidate();
  setQueuedStyle(style);
  syncPlaybackForSelection(style, forceRandom, sequenceMatch);
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

function updateFeatureMeters(features = analysis) {
  const profile = {
    smoothedEnergy: clamp(features.smoothedEnergy, 0, 1),
    smoothedBounce: clamp(features.smoothedBounce, 0, 1),
    smoothedOpenness: clamp(features.smoothedOpenness, 0, 1),
  };

  energyStatus.textContent = `에너지 ${Math.round(profile.smoothedEnergy * 100)}%`;
  opennessValue.textContent = `${Math.round(profile.smoothedOpenness * 100)}%`;
  bounceValue.textContent = `${Math.round(clamp(profile.smoothedBounce * 900, 0, 100))}%`;

  return profile;
}

function classifyStyle(features = analysis, sequenceMatch = null) {
  updateFeatureMeters(features);

  if (!sequenceMatch?.matched || !sequenceMatch.style) {
    return { style: null, ranking: [], sequenceMatch: null };
  }

  const style = sequenceMatch.style;
  analysis.mood = style;
  analysis.motion = `시퀀스 ·\n${sequenceMatch.name}`;
  detectedMood.textContent = style;
  setMotionLabel(analysis.motion, true);
  moodStatus.textContent = `시퀀스 인식: ${sequenceMatch.name}`;
  const ranking = [[style, 1], ...SEQUENCE_ALLOWED_STYLES.filter((label) => label !== style).map((label) => [label, 0])];
  return { style, ranking, sequenceMatch };
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
  const sequenceMatch = evaluateBestSequenceMatch();
  const { style } = classifyStyle(aggregate, sequenceMatch);

  if (playbackState.pendingStart) {
    if (!style || !sequenceMatch?.matched) {
      clearStyleCandidate();
      detectedMood.textContent = INACTIVE_DETECTED_STYLE;
      setMotionLabel("시퀀스 대기");
      moodStatus.textContent = "시퀀스 입력 대기";
      updateCandidateDisplay("없음", "저장된 시퀀스를 맞춰 주세요");
      return;
    }

    clearStyleCandidate();
    playbackState.pendingStart = false;
    playbackState.active = true;
    transportState.currentStyle = style;
    resetStyleDecisionState(style);
    commitStyleSwitch(style, true, sequenceMatch);
    setEngineUi(true);
    captureButton.disabled = false;
    detectedMood.textContent = style;
    moodStatus.textContent = `시퀀스 시작: ${sequenceMatch.name}`;
    updateCandidateDisplay(style, `${sequenceMatch.name} 재생 시작`);
    return;
  }

  if (!playbackState.active) {
    clearStyleCandidate();
    detectedMood.textContent = INACTIVE_DETECTED_STYLE;
    setMotionLabel(sequenceMatch?.matched ? `시퀀스 ·\n${sequenceMatch.name}` : "시퀀스 대기", Boolean(sequenceMatch?.matched));
    moodStatus.textContent = sequenceMatch?.matched ? `시퀀스 감지: ${sequenceMatch.name}` : "시퀀스 대기";
    updateCandidateDisplay("없음", sequenceMatch?.matched ? `${sequenceMatch.name} 준비 완료` : "재생 전 대기");
    return;
  }

  const currentStyle = playbackState.currentStyle || styleDecisionState.currentStyle || DEFAULT_STYLE;
  const currentTemplate = getTemplateById(playbackState.currentTemplateId);
  const currentTemplateName = currentTemplate?.name || playbackState.youtubeEntry?.title || currentStyle;
  const isCurrentTemplateMatch = Boolean(sequenceMatch?.matched && playbackState.currentTemplateId === sequenceMatch.id);
  const shouldSwitchTemplateTrack = Boolean(sequenceMatch?.matched && sequenceMatch.id !== playbackState.currentTemplateId);
  const shouldHoldTemplateTrack =
    Boolean(playbackState.currentTemplateId) &&
    (isCurrentTemplateMatch || !sequenceMatch?.matched);

  if (shouldSwitchTemplateTrack) {
    commitStyleSwitch(style, true, sequenceMatch);
    detectedMood.textContent = style;
    moodStatus.textContent = `지정곡 전환: ${sequenceMatch.name}`;
    updateCandidateDisplay(style, "지정곡 전환");
    return;
  }

  if (shouldHoldTemplateTrack) {
    clearStyleCandidate();
    detectedMood.textContent = currentStyle;
    setMotionLabel(currentTemplate ? `시퀀스 ·\n${currentTemplate.name}` : "시퀀스 유지", Boolean(currentTemplate));
    moodStatus.textContent = `시퀀스 유지: ${currentTemplateName}`;
    updateCandidateDisplay("없음", `${currentTemplateName} 재생 유지`);
    return;
  }

  clearStyleCandidate();
  detectedMood.textContent = currentStyle;
  setMotionLabel("시퀀스 대기");
  moodStatus.textContent = "시퀀스 입력 대기";
  updateCandidateDisplay("없음", "다음 시퀀스를 기다리는 중");
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
  const nose = landmarks[0];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftElbow = landmarks[13];
  const rightElbow = landmarks[14];
  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];

  const visibility = averageVisibility([nose, leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist]);
  if (visibility < 0.35) return false;

  const shoulderWidth = distance(leftShoulder, rightShoulder) || 0.001;
  const shoulderCenterX = (leftShoulder.x + rightShoulder.x) / 2;
  const shoulderCenterY = (leftShoulder.y + rightShoulder.y) / 2;
  const hipCenterY = (leftHip.y + rightHip.y) / 2;
  const torsoHeight = Math.max(hipCenterY - shoulderCenterY, 0.001);
  const headAnchorX = Number.isFinite(nose?.x) ? nose.x : shoulderCenterX;
  const headAnchorY = Number.isFinite(nose?.y) ? nose.y : shoulderCenterY - torsoHeight * 0.55;
  const headBandTop = headAnchorY - torsoHeight * 0.36;
  const headBandBottom = shoulderCenterY + torsoHeight * 0.14;
  const shoulderDepth =
    (Number.isFinite(leftShoulder.z) ? leftShoulder.z : 0) +
    (Number.isFinite(rightShoulder.z) ? rightShoulder.z : 0);
  const wristDepth =
    (Number.isFinite(leftWrist.z) ? leftWrist.z : 0) +
    (Number.isFinite(rightWrist.z) ? rightWrist.z : 0);

  const wristsNearCenter =
    Math.abs(leftWrist.x - shoulderCenterX) < shoulderWidth * 0.62 &&
    Math.abs(rightWrist.x - shoulderCenterX) < shoulderWidth * 0.62;
  const wristsNearHead =
    leftWrist.y >= headBandTop &&
    rightWrist.y >= headBandTop &&
    leftWrist.y <= headBandBottom &&
    rightWrist.y <= headBandBottom &&
    Math.abs(leftWrist.x - headAnchorX) < shoulderWidth * 0.72 &&
    Math.abs(rightWrist.x - headAnchorX) < shoulderWidth * 0.72;
  const wristsNearOppositeShoulders =
    distance(leftWrist, rightShoulder) < shoulderWidth * 1.55 &&
    distance(rightWrist, leftShoulder) < shoulderWidth * 1.55;
  const armsCrossed =
    segmentsIntersect(leftShoulder, leftWrist, rightShoulder, rightWrist) ||
    segmentsIntersect(leftElbow, leftWrist, rightElbow, rightWrist);
  const wristsCompact = distance(leftWrist, rightWrist) < shoulderWidth * 1.35;
  const elbowsLifted =
    leftElbow.y < shoulderCenterY + torsoHeight * 0.34 &&
    rightElbow.y < shoulderCenterY + torsoHeight * 0.34;
  const wristsAheadOfHead =
    !Number.isFinite(leftWrist.z) ||
    !Number.isFinite(rightWrist.z) ||
    wristDepth <= shoulderDepth + 0.16;

  return wristsNearCenter && wristsNearHead && wristsCompact && elbowsLifted && wristsAheadOfHead && (armsCrossed || wristsNearOppositeShoulders);
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
  if (!poseGestureState.stopTriggered && heldFor >= X_POSE_HOLD_MS) {
    poseGestureState.stopTriggered = true;
    stopPlayback("머리 앞 X 포즈 인식: 음악 중지");
    return;
  }

  if (!poseGestureState.stopTriggered) {
    const secondsLeft = Math.max(1, Math.ceil((X_POSE_HOLD_MS - heldFor) / 1000));
    setCaptureStatusText(`머리 앞 X 포즈 유지 중 · ${secondsLeft}초`);
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
  captureSequenceFrame(landmarks, now);

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
  sequenceState.templates = loadSequenceTemplates();
  updateViewportHeight();
  setLiveIndicator(false);
  updateSequenceUi();
  await initPose();
  setEngineUi(false);
  detectedMood.textContent = INACTIVE_DETECTED_STYLE;
  setMotionLabel("시퀀스 대기");
  moodStatus.textContent = "시퀀스 대기";
  updateCandidateDisplay("없음", "재생 전 대기");
  speakStatusSafe("시퀀스 대기");
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
  detectedMood.textContent = INACTIVE_DETECTED_STYLE;
  setMotionLabel("시퀀스 대기");
  moodStatus.textContent = "시퀀스 입력 대기";
  updateCandidateDisplay("없음", "저장된 시퀀스를 맞춰 주세요");
  speakStatusSafe("시퀀스 입력 대기");
});

stopAudioButton.addEventListener("click", () => {
  stopPlayback();
});

recordTemplateButton.addEventListener("click", () => {
  toggleSequenceRecording();
});

exportTemplatesButton.addEventListener("click", () => {
  exportSequenceTemplates();
});

importTemplatesButton.addEventListener("click", () => {
  templateImportInput.click();
});

editTemplateButton.addEventListener("click", () => {
  editSequenceTemplate();
});

deleteTemplateButton.addEventListener("click", () => {
  deleteSequenceTemplate();
});

closeTemplateStudioButton?.addEventListener("click", () => {
  closeTemplateStudio();
});

templateFormSecondaryButton?.addEventListener("click", () => {
  closeTemplateStudio();
});

templateStudioBackdrop?.addEventListener("click", () => {
  closeTemplateStudio();
});

templateForm?.addEventListener("submit", (event) => {
  handleTemplateStudioSubmit(event);
});

templateLibraryList?.addEventListener("click", (event) => {
  handleTemplateLibraryClick(event);
});

templateImportInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    mergeImportedTemplates(JSON.parse(text));
  } catch (error) {
    console.error(error);
    openTemplateStudio("edit", getPreferredTemplateId());
    setTemplateStudioMessage("템플릿 JSON을 읽지 못했습니다.", "error");
    speakStatusSafe("템플릿 불러오기 실패");
  } finally {
    templateImportInput.value = "";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && templateStudioState.open) {
    closeTemplateStudio();
    return;
  }

  const isSpaceKey = event.code === "Space" || event.key === " " || event.key === "Spacebar";
  if (!isSpaceKey || event.repeat) {
    return;
  }

  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  if (templateStudioState.open || sequenceState.recording || isKeyboardInputTarget(event.target)) {
    return;
  }

  event.preventDefault();

  if (playbackState.active || playbackState.pendingStart) {
    stopPlayback();
    return;
  }

  captureButton.click();
});
