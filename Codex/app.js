const LANG_KEY = "guiaonco-lang-v1";
const savedLang = localStorage.getItem(LANG_KEY);

const state = {
  lang: ["en", "es", "both"].includes(savedLang) ? savedLang : "both",
  screen: "home",
  caseIndex: 0,
  answers: {},
  clinicStatus: "idle",
  clinicLink: "",
  questionDraft: ""
};

const LOGOS = {
  en: `
    <svg class="brand-logo-svg" width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <circle cx="44" cy="38" r="30" fill="none" stroke="#c0152a" stroke-width="3.5"/>
      <line x1="66" y1="60" x2="80" y2="74" stroke="#c0152a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="44" cy="38" r="9" fill="#c0152a" opacity="0.18"/>
      <circle cx="44" cy="38" r="4" fill="#c0152a"/>
      <text x="96" y="32" font-family="Georgia,serif" font-size="30" font-weight="400" fill="#1a1a1a">
        <tspan>gu</tspan><tspan font-weight="700" fill="#c0152a">I</tspan><tspan font-weight="700" fill="#1a1a1a">A</tspan><tspan font-weight="400">onco</tspan>
      </text>
      <text x="97" y="53" font-family="Arial,sans-serif" font-size="13" fill="#888" letter-spacing="0.2">supporting those who care</text>
    </svg>
  `,
  es: `
    <svg class="brand-logo-svg" width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <circle cx="44" cy="38" r="30" fill="none" stroke="#c0152a" stroke-width="3.5"/>
      <line x1="66" y1="60" x2="80" y2="74" stroke="#c0152a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="44" cy="38" r="9" fill="#c0152a" opacity="0.18"/>
      <circle cx="44" cy="38" r="4" fill="#c0152a"/>
      <text x="96" y="32" font-family="Georgia,serif" font-size="30" font-weight="400" fill="#1a1a1a">
        <tspan>gu</tspan><tspan font-weight="700" fill="#c0152a">I</tspan><tspan font-weight="700" fill="#1a1a1a">A</tspan><tspan font-weight="400">onco</tspan>
      </text>
      <text x="97" y="53" font-family="Arial,sans-serif" font-size="13" fill="#888" letter-spacing="0.2">apoyando quienes cuidan</text>
    </svg>
  `
};

const SOURCES = {
  en: [
    {
      label: "WHO: Breast cancer",
      href: "https://www.who.int/news-room/fact-sheets/detail/breast-cancer"
    },
    {
      label: "PAHO/WHO: Breast cancer",
      href: "https://www.paho.org/en/topics/breast-cancer"
    },
    {
      label: "CDC: Symptoms",
      href: "https://www.cdc.gov/breast-cancer/symptoms/index.html"
    },
    {
      label: "CDC: Risk factors",
      href: "https://www.cdc.gov/breast-cancer/risk-factors/index.html"
    },
    {
      label: "NCI: Breast cancer",
      href: "https://www.cancer.gov/types/breast"
    }
  ],
  es: [
    {
      label: "OMS: cáncer de mama",
      href: "https://www.who.int/es/news-room/fact-sheets/detail/breast-cancer"
    },
    {
      label: "OPS/OMS: cáncer de mama",
      href: "https://www.paho.org/es/temas/cancer-mama"
    },
    {
      label: "CDC: síntomas",
      href: "https://www.cdc.gov/breast-cancer/es/symptoms/index.html"
    },
    {
      label: "CDC: factores de riesgo",
      href: "https://www.cdc.gov/breast-cancer/es/risk-factors/index.html"
    },
    {
      label: "NCI: cáncer de mama",
      href: "https://www.cancer.gov/espanol/tipos/seno"
    },
    {
      label: "Perú MINSA: cáncer de mama",
      href: "https://www.gob.pe/22541-que-es-el-cancer-de-mama"
    }
  ]
};

const UI = {
  back: { en: "Back", es: "Volver" },
  home: { en: "Home", es: "Inicio" },
  tagline: {
    en: "AI support for healthcare workers caring for patients with breast cancer concerns",
    es: "Apoyo con IA para personal de salud que atiende consultas sobre cáncer de mama"
  }
};

const MODULES = [
  {
    id: "learn",
    accent: "#cf1235",
    title: { en: "Learn", es: "Aprender" },
    sub: { en: "Key signs", es: "Signos clave" }
  },
  {
    id: "practice",
    accent: "#f29aad",
    title: { en: "Practice", es: "Practicar" },
    sub: { en: "Short cases", es: "Casos cortos" }
  },
  {
    id: "education",
    accent: "#211a1d",
    title: { en: "Education", es: "Educación" },
    sub: { en: "Patient words", es: "Pacientes" }
  },
  {
    id: "clinics",
    accent: "#ef5d72",
    title: { en: "Clinics", es: "Clínicas" },
    sub: { en: "Find care", es: "Buscar atención" }
  },
  {
    id: "referral",
    accent: "#f5b9c4",
    title: { en: "Referral", es: "Referencia" },
    sub: { en: "Next steps", es: "Próximos pasos" }
  },
  {
    id: "ask",
    accent: "#8d6972",
    title: { en: "Ask Expert", es: "Consultar a un experto" },
    sub: { en: "Prepare question", es: "Preparar consulta" }
  }
];

const SCREEN_COPY = {
  learn: {
    accent: "#cf1235",
    title: { en: "Learn", es: "Aprender" },
    intro: {
      en: "Focus on changes that should not wait.",
      es: "Identifique los cambios que requieren atención sin demora."
    },
    blocks: [
      {
        title: { en: "Warning signs", es: "Signos de alarma" },
        items: [
          { title: { en: "New lump", es: "Bulto nuevo" }, body: { en: "Breast or underarm.", es: "En la mama o en la axila." } },
          { title: { en: "Skin change", es: "Cambio en la piel" }, body: { en: "Dimpling, redness, ulcer, or orange-peel texture.", es: "Retracción, enrojecimiento, úlcera o piel de naranja." } },
          { title: { en: "Nipple change", es: "Cambio en el pezón" }, body: { en: "Pulled inward, rash, scaling, or bloody discharge.", es: "Pezón retraído, irritación, descamación o secreción sanguinolenta." } },
          { title: { en: "Persistent focal pain", es: "Dolor localizado persistente" }, body: { en: "Especially with a lump or skin change.", es: "Especialmente si se acompaña de un bulto o cambio en la piel." } }
        ]
      },
      {
        title: { en: "Risk questions", es: "Preguntas sobre riesgo" },
        items: [
          { title: { en: "Age", es: "Edad" }, body: { en: "Risk rises after 40 and 50.", es: "El riesgo aumenta después de los 40 y más aún después de los 50." } },
          { title: { en: "Family history", es: "Antecedentes familiares" }, body: { en: "Breast or ovarian cancer in close relatives.", es: "Cáncer de mama u ovario en familiares cercanos." } },
          { title: { en: "Past breast problem", es: "Antecedente mamario" }, body: { en: "Cancer, high-risk lesion, or chest radiation.", es: "Cáncer previo, lesión de alto riesgo o radioterapia en el tórax." } },
          { title: { en: "Lifestyle", es: "Estilo de vida" }, body: { en: "Alcohol, tobacco, inactivity, or obesity after menopause.", es: "Alcohol, tabaco, poca actividad física u obesidad después de la menopausia." } }
        ]
      }
    ],
    examTitle: { en: "Clinical exam in 3 moves", es: "Examen clínico en 3 pasos" },
    exam: [
      { title: { en: "Ask", es: "Preguntar" }, body: { en: "Concern, duration, pregnancy, breastfeeding, fever, family history.", es: "Motivo de consulta, tiempo de evolución, embarazo, lactancia, fiebre y antecedentes familiares." } },
      { title: { en: "Look", es: "Inspeccionar" }, body: { en: "Compare both breasts with arms down, raised, and hands on hips.", es: "Compare ambas mamas con los brazos relajados, elevados y con las manos en la cintura." } },
      { title: { en: "Feel", es: "Palpar" }, body: { en: "All breast tissue, nipples, underarms, and above clavicles.", es: "Palpe todo el tejido mamario, pezones, axilas y regiones supraclaviculares." } }
    ]
  },
  education: {
    accent: "#211a1d",
    title: { en: "Education", es: "Educación" },
    intro: {
      en: "Short messages patients can remember.",
      es: "Mensajes breves y claros para pacientes."
    },
    items: [
      { title: { en: "Normalize care", es: "Normalizar la consulta" }, body: { en: "Many breast changes are not cancer, but checking early is safer.", es: "Muchos cambios en la mama no son cáncer, pero evaluarlos temprano es más seguro." } },
      { title: { en: "Do not wait for pain", es: "No esperar a que duela" }, body: { en: "Cancer may start without pain.", es: "El cáncer de mama puede comenzar sin dolor." } },
      { title: { en: "Return fast", es: "Consultar pronto" }, body: { en: "Lump, skin change, nipple change, or blood needs review.", es: "Un bulto, cambios en la piel o el pezón, o secreción sanguinolenta requieren evaluación." } },
      { title: { en: "Teach-back", es: "Confirmar comprensión" }, body: { en: "Ask: Where will you go, and what will you do if delayed?", es: "Pregunte: ¿A dónde acudirá y qué hará si la cita se retrasa?" } }
    ]
  },
  clinics: {
    accent: "#ef5d72",
    title: { en: "Clinics", es: "Clínicas" },
    intro: {
      en: "Use location to search nearby breast or oncology care.",
      es: "Use la ubicación para buscar atención mamaria u oncológica cercana."
    },
    button: { en: "Use my location", es: "Usar mi ubicación" },
    idle: { en: "Location not checked yet.", es: "Ubicación aún no consultada." },
    locating: { en: "Checking location...", es: "Consultando ubicación..." },
    ready: { en: "Nearby oncology clinic search is ready.", es: "La búsqueda de atención oncológica cercana está lista." },
    open: { en: "Open nearby clinics", es: "Abrir centros cercanos" },
    denied: { en: "Location permission was not granted.", es: "No se concedió el permiso de ubicación." },
    unavailable: { en: "Location is unavailable. Use local referral directory.", es: "La ubicación no está disponible. Use el directorio local de referencia." },
    note: {
      en: "Confirm services, eligibility, cost, and referral requirements before sending a patient.",
      es: "Confirme servicios disponibles, criterios de atención, costo y requisitos de referencia antes de referir a una paciente."
    }
  },
  referral: {
    accent: "#f5b9c4",
    title: { en: "Referral", es: "Referencia" },
    intro: {
      en: "Make the next step clear before the patient leaves.",
      es: "Deje claro el siguiente paso antes de que la paciente se vaya."
    },
    steps: [
      { title: { en: "1. Mark urgent", es: "1. Marcar como urgente" }, body: { en: "New hard lump, skin dimpling, bloody discharge, or hard nodes.", es: "Bulto duro de aparición reciente, retracción de la piel, secreción sanguinolenta o ganglios duros." } },
      { title: { en: "2. Document", es: "2. Documentar" }, body: { en: "Side, size, clock position, duration, skin/nipple change, nodes.", es: "Lado, tamaño, ubicación según reloj, tiempo de evolución, cambios en piel o pezón y ganglios." } },
      { title: { en: "3. Close the loop", es: "3. Asegurar seguimiento" }, body: { en: "Confirm where, when, transport, phone number, and return plan.", es: "Confirme lugar, fecha, transporte, teléfono de contacto y plan si no logra la cita." } }
    ]
  },
  ask: {
    accent: "#8d6972",
    title: { en: "Ask Expert", es: "Consultar a un experto" },
    intro: {
      en: "Format a consult message to send through your local referral pathway.",
      es: "Prepare un mensaje de consulta para enviarlo por la vía local de referencia."
    },
    label: { en: "Patient concern", es: "Motivo de consulta" },
    placeholder: {
      en: "Example: 47-year-old with hard left breast lump and skin dimpling for 3 weeks. No fever. Can travel only on Mondays.",
      es: "Ejemplo: paciente de 47 años con bulto duro en mama izquierda y retracción de piel desde hace 3 semanas. Sin fiebre. Solo puede viajar los lunes."
    },
    button: { en: "Format message", es: "Formatear mensaje" },
    resultTitle: { en: "Draft to copy", es: "Borrador para copiar" },
    empty: { en: "Add the main finding first.", es: "Agregue primero el hallazgo principal." },
    notSent: {
      en: "The app does not send this message. Copy it into the local referral form, phone message, WhatsApp, email, or call script.",
      es: "La app no envía este mensaje. Cópielo en el formulario local, mensaje telefónico, WhatsApp, correo o guion de llamada."
    },
    disclaimer: {
      en: "This does not replace local clinical judgment or urgent referral.",
      es: "Esto no reemplaza el criterio clínico local ni una referencia urgente cuando corresponde."
    }
  }
};

const CASES = [
  {
    title: { en: "Hard lump", es: "Bulto duro" },
    scenario: {
      en: "47-year-old with a new hard painless breast lump and skin dimpling.",
      es: "Paciente de 47 años con bulto mamario nuevo, duro, sin dolor y con retracción de la piel."
    },
    choices: [
      { en: "Reassure because there is no pain.", es: "Dar seguridad porque no presenta dolor." },
      { en: "Document, examine both breasts/nodes, and refer urgently.", es: "Documentar, examinar ambas mamas y ganglios, y referir con urgencia." },
      { en: "Return in six months.", es: "Indicar control en seis meses." }
    ],
    correct: 1,
    feedback: {
      correct: {
        en: "Correct. A hard new lump with dimpling is suspicious even without pain.",
        es: "Correcto. Un bulto duro de aparición reciente con retracción de la piel es sospechoso aunque no duela."
      },
      wrong: {
        en: "Reconsider. Lack of pain does not rule out cancer. Refer promptly.",
        es: "Reconsidere. La ausencia de dolor no descarta cáncer. Refiera sin demora."
      }
    }
  },
  {
    title: { en: "Bloody discharge", es: "Secreción sanguinolenta" },
    scenario: {
      en: "56-year-old with spontaneous blood from one nipple.",
      es: "Paciente de 56 años con secreción sanguinolenta espontánea por un pezón."
    },
    choices: [
      { en: "Treat as a red flag and refer.", es: "Considerarlo signo de alarma y referir." },
      { en: "Say discharge is normal after menopause.", es: "Decir que es normal después de la menopausia." },
      { en: "Use warm compresses only.", es: "Usar solo compresas tibias." }
    ],
    correct: 0,
    feedback: {
      correct: {
        en: "Correct. One-sided spontaneous bloody discharge needs assessment.",
        es: "Correcto. La secreción sanguinolenta espontánea y unilateral requiere evaluación."
      },
      wrong: {
        en: "Reconsider. Bloody nipple discharge is not a watch-and-wait symptom.",
        es: "Reconsidere. La secreción sanguinolenta por el pezón no debe observarse sin evaluación."
      }
    }
  },
  {
    title: { en: "Breastfeeding fever", es: "Fiebre durante la lactancia" },
    scenario: {
      en: "29-year-old breastfeeding patient with fever, body aches, and a tender red area for one day.",
      es: "Paciente lactante de 29 años con fiebre, malestar general y zona roja dolorosa desde hace un día."
    },
    choices: [
      { en: "Ignore because she is young.", es: "Ignorar porque es joven." },
      { en: "Assess/treat mastitis and schedule close follow-up.", es: "Evaluar y tratar posible mastitis, y programar seguimiento cercano." },
      { en: "Stop breastfeeding permanently.", es: "Suspender lactancia definitivamente." }
    ],
    correct: 1,
    feedback: {
      correct: {
        en: "Correct. Infection is likely, but follow-up matters. Refer if no improvement or mass persists.",
        es: "Correcto. Es probable una infección, pero el seguimiento es importante. Refiera si no mejora o si persiste un bulto."
      },
      wrong: {
        en: "Reconsider. Treat likely mastitis and reassess soon.",
        es: "Reconsidere. Trate la probable mastitis y reevalúe pronto."
      }
    }
  }
];

function dualText(en, es) {
  return `<span class="dual-text"><span lang="en">${en}</span><span lang="es">${es}</span></span>`;
}

function text(value) {
  if (state.lang === "both") return dualText(value.en, value.es);
  return value[state.lang];
}

function plain(value) {
  if (state.lang === "both") return `${value.en} / ${value.es}`;
  return value[state.lang];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sourceListItems(sources) {
  return sources.map((source) => (
    `<li><a href="${source.href}" target="_blank" rel="noreferrer">${source.label}</a></li>`
  )).join("");
}

function sourceLinks() {
  const heading = { en: "Sources", es: "Fuentes" };

  if (state.lang === "both") {
    return `
      <section class="source-block">
        <h3 class="section-title">${text(heading)}</h3>
        <strong class="source-group-title">English</strong>
        <ul class="source-list">${sourceListItems(SOURCES.en)}</ul>
        <strong class="source-group-title">Español</strong>
        <ul class="source-list">${sourceListItems(SOURCES.es)}</ul>
      </section>
    `;
  }

  return `
    <section class="source-block">
      <h3 class="section-title">${text(heading)}</h3>
      <ul class="source-list">${sourceListItems(SOURCES[state.lang])}</ul>
    </section>
  `;
}

function redFlagSummary(draft, lang) {
  const value = draft.toLowerCase();
  const flags = [];
  const checks = [
    {
      test: /lump|mass|bulto|masa|nodule|nódulo/.test(value),
      en: "breast or underarm lump/mass",
      es: "bulto o masa en mama o axila"
    },
    {
      test: /dimpl|retract|retracci|hundid|piel de naranja|skin/.test(value),
      en: "skin dimpling/retraction or other skin change",
      es: "retracción de piel u otro cambio cutáneo"
    },
    {
      test: /nipple|pez[oó]n|areola/.test(value),
      en: "nipple or areola change",
      es: "cambio en pezón o areola"
    },
    {
      test: /blood|bloody|sangre|sanguinolent|discharge|secreci/.test(value),
      en: "bloody or spontaneous nipple discharge",
      es: "secreción sanguinolenta o espontánea por el pezón"
    },
    {
      test: /node|axill|underarm|ganglio|axila/.test(value),
      en: "axillary/underarm node concern",
      es: "posible ganglio axilar"
    },
    {
      test: /ulcer|úlcera|wound|herida/.test(value),
      en: "ulcer or wound on the breast",
      es: "úlcera o herida en la mama"
    }
  ];

  checks.forEach((item) => {
    if (item.test) flags.push(item[lang]);
  });

  if (flags.length === 0) {
    return lang === "es"
      ? "No se detectó un signo de alarma específico en el texto. Confirmar bulto, piel, pezón, secreción y ganglios antes de decidir urgencia."
      : "No specific red-flag keyword was detected in the text. Confirm lump, skin, nipple, discharge, and node findings before deciding urgency.";
  }

  return flags.join("; ");
}

function consultDraft(draft, lang) {
  const cleanDraft = draft.trim();

  if (!cleanDraft) {
    return lang === "es"
      ? "Agregue primero el hallazgo principal."
      : "Add the main finding first.";
  }

  if (lang === "es") {
    return [
      "BORRADOR DE CONSULTA / REFERENCIA",
      "",
      "Motivo:",
      "Solicito orientación para una paciente con posible signo de alarma mamario.",
      "",
      "Resumen de la paciente:",
      cleanDraft,
      "",
      "Signos de alarma identificados en la nota:",
      redFlagSummary(cleanDraft, "es"),
      "",
      "Datos que debo completar antes de enviar:",
      "- Edad, embarazo/lactancia, fiebre o signos de infección.",
      "- Lado, tamaño, ubicación según reloj y tiempo de evolución.",
      "- Cambios de piel o pezón, secreción y ganglios axilares.",
      "- Estudios previos, antecedentes familiares y barreras de transporte/cita.",
      "",
      "Pregunta para el centro de referencia:",
      "¿Cuál es el siguiente paso más seguro y qué ruta local debe usarse para evaluación diagnóstica mamaria? ¿Qué documentos o contacto se requieren?",
      "",
      "Nota:",
      "La app no envía este mensaje. El personal de salud debe enviarlo por la vía local aprobada."
    ].join("\n");
  }

  return [
    "CONSULT / REFERRAL DRAFT",
    "",
    "Reason:",
    "Requesting guidance for a patient with a possible breast warning sign.",
    "",
    "Patient summary:",
    cleanDraft,
    "",
    "Red flags identified from the note:",
    redFlagSummary(cleanDraft, "en"),
    "",
    "Details to complete before sending:",
    "- Age, pregnancy/breastfeeding, fever or infection signs.",
    "- Side, size, clock position, and duration.",
    "- Skin or nipple changes, discharge, and axillary nodes.",
    "- Prior studies, family history, and transport/appointment barriers.",
    "",
    "Question for referral center:",
    "What is the safest next step and which local pathway should be used for diagnostic breast evaluation? What documents or contact are required?",
    "",
    "Note:",
    "The app does not send this message. The healthcare worker must send it through the approved local pathway."
  ].join("\n");
}

function warningGraphic() {
  const title = {
    en: "Optional clinical photo",
    es: "Foto clínica opcional"
  };
  const description = {
    en: "Open an example image showing a visible lump, skin dimpling, and nipple change.",
    es: "Abrir una imagen de ejemplo que muestra un bulto visible, retracción de la piel y cambio del pezón."
  };
  const action = {
    en: "Open clinical photo example",
    es: "Abrir foto clínica de ejemplo"
  };
  const credit = {
    en: "Image source and license",
    es: "Fuente y licencia de la imagen"
  };

  return `
    <aside class="clinical-resource">
      <strong>${text(title)}</strong>
      <span>${text(description)}</span>
      <div class="resource-links">
        <a href="assets/breast-cancer-signs.jpg" target="_blank" rel="noreferrer">${text(action)}</a>
        <a href="https://commons.wikimedia.org/wiki/File:Breast_cancer.jpg" target="_blank" rel="noreferrer">${text(credit)}</a>
      </div>
    </aside>
  `;
}

function renderHome() {
  document.getElementById("module-grid").innerHTML = `
    ${MODULES.map((module) => `
      <button class="module-card" type="button" style="--accent: ${module.accent}" data-screen="${module.id}">
        <strong>${text(module.title)}</strong>
        <em>${text(module.sub)}</em>
      </button>
    `).join("")}
  `;
}

function renderShellText() {
  document.documentElement.lang = state.lang === "es" ? "es" : "en";
  const logo = document.getElementById("brand-logo");
  const useEnglishLogo = state.lang === "en";
  const logoLang = useEnglishLogo ? "en" : "es";
  if (logo.dataset.logoLang !== logoLang) {
    logo.innerHTML = LOGOS[logoLang];
    logo.dataset.logoLang = logoLang;
  }
  logo.setAttribute("aria-label", useEnglishLogo ? "guIAonco, supporting those who care" : "guIAonco, apoyando quienes cuidan");
  document.getElementById("app-tagline").innerHTML = text(UI.tagline);
  document.getElementById("back-button").innerHTML = `‹ ${text(UI.back)}`;
  document.querySelectorAll(".lang-button").forEach((button) => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function screenHead(copy) {
  return `
    <div class="screen-head" style="--accent: ${copy.accent}">
      <div class="screen-title-block">
        <h2>${text(copy.title)}</h2>
        <p>${text(copy.intro)}</p>
      </div>
    </div>
  `;
}

function infoTile(item) {
  return `
    <div class="info-tile">
      <div>
        <strong>${text(item.title)}</strong>
        <span>${text(item.body)}</span>
      </div>
    </div>
  `;
}

function renderLearn() {
  const copy = SCREEN_COPY.learn;
  return `
    ${screenHead(copy)}
    ${warningGraphic()}
    ${copy.blocks.map((block) => `
      <section class="section-block">
        <h3 class="section-title">${text(block.title)}</h3>
        <div class="tile-grid">${block.items.map(infoTile).join("")}</div>
      </section>
    `).join("")}
    <section class="section-block">
      <h3 class="section-title">${text(copy.examTitle)}</h3>
      <div class="step-row three">
        ${copy.exam.map((item) => `
          <div class="step-tile" style="--accent: ${copy.accent}">
            <strong>${text(item.title)}</strong>
            <span>${text(item.body)}</span>
          </div>
        `).join("")}
      </div>
    </section>
    ${sourceLinks()}
  `;
}

function renderEducation() {
  const copy = SCREEN_COPY.education;
  return `
    ${screenHead(copy)}
    <div class="tile-grid">${copy.items.map(infoTile).join("")}</div>
  `;
}

function renderReferral() {
  const copy = SCREEN_COPY.referral;
  return `
    ${screenHead(copy)}
    <div class="step-row">
      ${copy.steps.map((step) => `
        <div class="step-tile" style="--accent: ${copy.accent}">
          <strong>${text(step.title)}</strong>
          <span>${text(step.body)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPractice() {
  const module = MODULES.find((item) => item.id === "practice");
  const current = CASES[state.caseIndex];
  const selected = state.answers[state.caseIndex];
  const answered = Number.isInteger(selected);
  const isCorrect = selected === current.correct;

  return `
    ${screenHead({
      accent: module.accent,
      title: module.title,
      intro: { en: "Pick the safest first action.", es: "Elija la primera acción más segura." }
    })}
    <div class="case-card">
      <div class="case-progress">${state.caseIndex + 1} / ${CASES.length} · ${text(current.title)}</div>
      <p class="scenario">${text(current.scenario)}</p>
      <div class="choice-grid">
        ${current.choices.map((choice, index) => {
          const className = answered && index === current.correct
            ? "choice-button is-correct"
            : answered && index === selected
              ? "choice-button is-wrong"
              : "choice-button";
          return `<button class="${className}" type="button" data-choice="${index}">${text(choice)}</button>`;
        }).join("")}
      </div>
      ${answered ? `
        <div class="feedback-box ${isCorrect ? "" : "warning"}">
          ${text(isCorrect ? current.feedback.correct : current.feedback.wrong)}
        </div>
      ` : ""}
      <div class="action-row">
        <button class="primary-button" type="button" data-action="next-case">${text({ en: "Next case", es: "Siguiente caso" })}</button>
        <button class="primary-button" type="button" data-action="reset-cases">${text({ en: "Reset", es: "Reiniciar" })}</button>
      </div>
    </div>
  `;
}

function clinicMessage(copy) {
  if (state.clinicStatus === "locating") return text(copy.locating);
  if (state.clinicStatus === "ready") return text(copy.ready);
  if (state.clinicStatus === "denied") return text(copy.denied);
  if (state.clinicStatus === "unavailable") return text(copy.unavailable);
  return text(copy.idle);
}

function renderClinics() {
  const copy = SCREEN_COPY.clinics;
  return `
    ${screenHead(copy)}
    <div class="question-box">
      <strong>${clinicMessage(copy)}</strong>
      <span>${text(copy.note)}</span>
      <div class="action-row">
        <button class="primary-button" type="button" data-action="locate">${text(copy.button)}</button>
        ${state.clinicLink ? `<a class="ghost-link" href="${state.clinicLink}" target="_blank" rel="noreferrer">${text(copy.open)}</a>` : ""}
      </div>
    </div>
  `;
}

function renderAsk() {
  const copy = SCREEN_COPY.ask;
  const hasDraft = state.questionDraft.trim().length > 0;
  const template = hasDraft
    ? state.lang === "both"
      ? `
        <div class="draft-output">
          <strong>English</strong>
          <pre>${escapeHtml(consultDraft(state.questionDraft, "en"))}</pre>
          <strong>Español</strong>
          <pre>${escapeHtml(consultDraft(state.questionDraft, "es"))}</pre>
        </div>
      `
      : `<div class="draft-output"><pre>${escapeHtml(consultDraft(state.questionDraft, state.lang))}</pre></div>`
    : `<span>${text(copy.empty)}</span>`;

  return `
    ${screenHead(copy)}
    <div class="notice-box">
      <strong>${text({ en: "How this works", es: "Cómo funciona" })}</strong>
      <span>${text(copy.notSent)}</span>
    </div>
    <div class="question-box">
      <label>
        <strong>${text(copy.label)}</strong>
        <textarea id="question-input" placeholder="${plain(copy.placeholder)}">${escapeHtml(state.questionDraft)}</textarea>
      </label>
      <button class="primary-button" type="button" data-action="build-question">${text(copy.button)}</button>
    </div>
    <div class="question-box">
      <strong>${text(copy.resultTitle)}</strong>
      ${template}
      <span>${text(copy.disclaimer)}</span>
    </div>
  `;
}

function renderScreen() {
  const renderer = {
    learn: renderLearn,
    practice: renderPractice,
    education: renderEducation,
    clinics: renderClinics,
    referral: renderReferral,
    ask: renderAsk
  }[state.screen];

  document.getElementById("screen-content").innerHTML = renderer ? renderer() : "";
}

function render() {
  renderShellText();
  renderHome();
  if (state.screen !== "home") renderScreen();
  document.getElementById("home-view").hidden = state.screen !== "home";
  document.getElementById("screen-view").hidden = state.screen === "home";
}

function showScreen(screen) {
  state.screen = screen;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function locateClinics() {
  const copy = SCREEN_COPY.clinics;
  if (!("geolocation" in navigator)) {
    state.clinicStatus = "unavailable";
    state.clinicLink = "https://www.google.com/maps/search/oncology+clinic";
    renderScreen();
    return;
  }

  state.clinicStatus = "locating";
  renderScreen();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      state.clinicStatus = "ready";
      state.clinicLink = `https://www.google.com/maps/search/oncology+clinic/@${latitude},${longitude},11z`;
      renderScreen();
    },
    (error) => {
      state.clinicStatus = error.code === 1 ? "denied" : "unavailable";
      state.clinicLink = "https://www.google.com/maps/search/oncology+clinic";
      renderScreen();
    },
    { enableHighAccuracy: false, maximumAge: 600000, timeout: 10000 }
  );
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.lang) {
    state.lang = button.dataset.lang;
    localStorage.setItem(LANG_KEY, state.lang);
    render();
    return;
  }

  if (button.dataset.screen) {
    showScreen(button.dataset.screen);
    return;
  }

  if (button.dataset.choice) {
    state.answers[state.caseIndex] = Number(button.dataset.choice);
    renderScreen();
    return;
  }

  const action = button.dataset.action;
  if (action === "home") showScreen("home");
  if (action === "next-case") {
    state.caseIndex = (state.caseIndex + 1) % CASES.length;
    renderScreen();
  }
  if (action === "reset-cases") {
    state.answers = {};
    renderScreen();
  }
  if (action === "locate") locateClinics();
  if (action === "build-question") {
    state.questionDraft = document.getElementById("question-input")?.value || "";
    renderScreen();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "question-input") {
    state.questionDraft = event.target.value;
  }
});

render();
