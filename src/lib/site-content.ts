// Editable homepage text. Defaults live here; overrides saved from /update are
// stored in the site_content table and merged on top at request time.
// Markup in values: a new line becomes a line break, *words* become gold italic.

export type ContentField = { key: string; label: string; value: string; long?: boolean };
export type ContentGroup = { title: string; fields: ContentField[] };
export type ContentSection = { id: string; title: string; description: string; groups: ContentGroup[] };

const f = (key: string, label: string, value: string, long = false): ContentField => ({ key, label, value, long });

const modes: [string, string, string, string, string, string][] = [
  ["recite", "Recite", "पाठ", "Prayer and reflection", "Your daily practice, on time.", "Bring prayer and reflection into your routine with familiar audio, played through your svaraa pendant at your chosen times."],
  ["respond", "Respond", "उत्तर", "Spoken answers", "Answers, simply spoken.", "Speak to your svaraa pendant for everyday questions and spoken answers in supported languages."],
  ["remind", "Remind", "स्मरण", "Gentle reminders", "Care that arrives gently.", "Let your pendant offer gentle spoken reminders for the routines and appointments you have set."],
  ["rescue", "Rescue", "रक्षा", "Safety and alerts", "Support, closer at hand.", "The pendant is designed to recognise possible falls and support alerts to connected family members. Voice assistance helps make asking for support more accessible."],
  ["recall", "Recall", "स्मृति", "Personal memory", "A second memory for life's details.", "Use your pendant's voice features to revisit the personal details and moments you have chosen to save."],
  ["repository", "Repository", "कोश", "Knowledge and audio", "Information, ready to be heard.", "Access supported audio content and information through your pendant, with spoken interaction at the centre of the experience."],
  ["riddle", "Riddle", "पहेली", "Play and curiosity", "A little curiosity, every day.", "Enjoy spoken riddles, trivia and word games through your pendant, bringing moments of curiosity into the day."],
];

export const modeIds = modes.map(([id]) => id);

export const contentSections: ContentSection[] = [
  {
    id: "page",
    title: "Page and menu",
    description: "Search and sharing details, plus the top menu.",
    groups: [
      { title: "Search and sharing", fields: [
        f("seo.title", "Browser tab and search title", "svaraa | A screenless pendant for everyday care"),
        f("seo.description", "Search and sharing description", "Meet the svaraa pendant: a screenless rudraksha mala designed for everyday care, voice assistance and family connection.", true),
      ] },
      { title: "Top menu", fields: [
        f("nav.product", "Menu link 1", "The pendant"),
        f("nav.seven", "Menu link 2", "Seven modes"),
        f("nav.why", "Menu link 3", "Why svaraa"),
        f("nav.makers", "Menu link 4", "Makers"),
        f("nav.cta", "Menu button", "Join the waitlist"),
      ] },
    ],
  },
  {
    id: "hero",
    title: "Opening film",
    description: "The headline and buttons over the video.",
    groups: [
      { title: "Text over the film", fields: [
        f("hero.heading", "Main headline", "Wear the stillness you seek"),
        f("hero.sub", "Supporting line", "A screenless pendant for everyday care, connection and stillness.", true),
        f("hero.cta1", "First button", "Discover the pendant"),
        f("hero.cta2", "Second button", "Join the waitlist"),
      ] },
    ],
  },
  {
    id: "care",
    title: "01 Everyday care",
    description: "The product introduction, care panel and facts strip.",
    groups: [
      { title: "Introduction", fields: [
        f("care.eyebrow", "Small label", "A screenless pendant for everyday care"),
        f("care.heading", "Section heading", "Know they are well.\n*Wherever you are.*", true),
        f("care.body", "Body text", "Worn around the neck on a rudraksha mala, the svaraa pendant brings wellbeing awareness, voice assistance and family connection into everyday life. A familiar presence, without another screen to manage.", true),
      ] },
      { title: "Care panel", fields: [
        f("care.caption", "Photo caption", "Illustrative care view"),
        f("care.panelLabel", "Panel label", "Care view, illustrated"),
        f("care.panelHeading", "Panel heading", "Close to them.\nClear for you.", true),
        f("care.tab1.label", "Tab 1 name", "Wellbeing"),
        f("care.tab1.value", "Tab 1 headline", "Gentle awareness"),
        f("care.tab1.note", "Tab 1 text", "Everyday wellbeing awareness, shared with the family members you choose, without turning care into surveillance.", true),
        f("care.tab2.label", "Tab 2 name", "Fall watch"),
        f("care.tab2.value", "Tab 2 headline", "Designed to notice"),
        f("care.tab2.note", "Tab 2 text", "The pendant is designed to recognise possible falls, check in with the wearer and support alerts to chosen family contacts.", true),
        f("care.tab3.label", "Tab 3 name", "Family alerts"),
        f("care.tab3.value", "Tab 3 headline", "Chosen contacts"),
        f("care.tab3.note", "Tab 3 text", "Supported updates and safety alerts can reach the people who need to know, wherever they are.", true),
        f("care.tab4.label", "Tab 4 name", "Power"),
        f("care.tab4.value", "Tab 4 headline", "Up to 7 days"),
        f("care.tab4.note", "Tab 4 text", "A long-lasting charge keeps the pendant present through daily routines, nights and travel.", true),
        f("care.stat1.value", "Fact 1", "IP68"),
        f("care.stat1.label", "Fact 1 label", "Water resistant"),
        f("care.stat2.value", "Fact 2", "7 days"),
        f("care.stat2.label", "Fact 2 label", "Battery life"),
        f("care.stat3.value", "Fact 3", "Indian"),
        f("care.stat3.label", "Fact 3 label", "Languages"),
        f("care.disclaimer", "Small print", "Designed for wellbeing awareness and timely assistance, not medical diagnosis. Views shown here are illustrative, not real wearer data.", true),
      ] },
      { title: "Facts strip", fields: [
        f("trust.1.value", "Fact 1", "Screenless"),
        f("trust.1.label", "Fact 1 label", "Voice-first design"),
        f("trust.2.value", "Fact 2", "IP68"),
        f("trust.2.label", "Fact 2 label", "Water resistant"),
        f("trust.3.value", "Fact 3", "7 days"),
        f("trust.3.label", "Fact 3 label", "Battery life"),
        f("trust.4.value", "Fact 4", "Indian"),
        f("trust.4.label", "Fact 4 label", "Languages"),
      ] },
    ],
  },
  {
    id: "pendant",
    title: "The pendant",
    description: "The pendant showcase and the everyday photos.",
    groups: [
      { title: "Showcase", fields: [
        f("pendant.eyebrow", "Small label", "The svaraa pendant"),
        f("pendant.heading", "Section heading", "Familiar in form.\nThoughtful in purpose.", true),
        f("pendant.body", "Body text", "A bronze-set pendant on a rudraksha mala, with a deep-plum face and delicate floral detail. Designed to bring quiet technology into a form that feels personal and familiar.", true),
        f("pendant.detail1.title", "Detail 1 title", "Rudraksha mala"),
        f("pendant.detail1.body", "Detail 1 text", "Natural beads with fine gold spacers, worn like a familiar necklace.", true),
        f("pendant.detail2.title", "Detail 2 title", "Bronze-set pendant"),
        f("pendant.detail2.body", "Detail 2 text", "A deep-plum face held in warm bronze, finished with a floral emblem.", true),
        f("pendant.detail3.title", "Detail 3 title", "Screenless interaction"),
        f("pendant.detail3.body", "Detail 3 text", "Spoken, simple and calm. Nothing to tap, swipe or learn.", true),
      ] },
      { title: "Worn through the day", fields: [
        f("life.eyebrow", "Small label", "Worn through the day"),
        f("life.heading", "Heading", "At every age.\n*At every pace.*", true),
        f("life.body", "Body text", "From a morning walk to an evening run, the pendant sits close and stays out of the way, so care keeps pace with the life it supports.", true),
        f("life.1", "Photo 1 caption", "A morning walk"),
        f("life.2", "Photo 2 caption", "Warming up"),
        f("life.3", "Photo 3 caption", "The evening run"),
      ] },
    ],
  },
  {
    id: "modes",
    title: "02 Seven modes",
    description: "The heading and the text for each of the seven modes.",
    groups: [
      { title: "Heading", fields: [
        f("modes.eyebrow", "Small label", "Features"),
        f("modes.heading", "Section heading", "Everyday support.\nWithin easy reach.", true),
        f("modes.intro", "Introduction", "Seven modes, one pendant. Choose a mode to see how it helps through the day.", true),
      ] },
      ...modes.map(([id, name, dev, tag, line, body], i) => ({
        title: `Mode ${i + 1}: ${name}`,
        fields: [
          f(`modes.${id}.name`, "Name", name),
          f(`modes.${id}.dev`, "Hindi name", dev),
          f(`modes.${id}.tag`, "Feature type", tag),
          f(`modes.${id}.line`, "Short line", line),
          f(`modes.${id}.body`, "Description", body, true),
        ],
      })),
    ],
  },
  {
    id: "why",
    title: "03 Why svaraa",
    description: "The quieter rationale behind the pendant.",
    groups: [
      { title: "Heading", fields: [
        f("why.eyebrow", "Small label", "Why svaraa"),
        f("why.heading", "Section heading", "Care should preserve\n*independence.*", true),
      ] },
      { title: "Three panels", fields: [
        f("why.1.title", "Panel 1 title", "For parents"),
        f("why.1.body", "Panel 1 text", "A familiar pendant that fits into personal routines and keeps everyday assistance close.", true),
        f("why.2.title", "Panel 2 title", "For their children"),
        f("why.2.body", "Panel 2 text", "A thoughtful way to stay connected through supported updates and alerts, while respecting a parent's independence.", true),
        f("why.3.title", "Panel 3 title", "For daily stillness"),
        f("why.3.body", "Panel 3 text", "Prayer, reflection and spoken interaction in a pendant that asks for less screen time.", true),
      ] },
    ],
  },
  {
    id: "tech",
    title: "04 Technology",
    description: "The deep plum technology section.",
    groups: [
      { title: "Text", fields: [
        f("tech.eyebrow", "Small label", "Quietly advanced"),
        f("tech.heading", "Section heading", "Quiet technology.\n*Thoughtfully* held.", true),
        f("tech.body", "Body text", "The svaraa pendant brings supported voice, memory, wellbeing and family-alert features together in one screenless device. The experience is designed around simple spoken interaction and everyday familiarity.", true),
        f("tech.1.value", "Badge 1", "Screenless"),
        f("tech.1.label", "Badge 1 label", "by design"),
        f("tech.2.value", "Badge 2", "Spoken"),
        f("tech.2.label", "Badge 2 label", "interaction"),
        f("tech.3.value", "Badge 3", "Family"),
        f("tech.3.label", "Badge 3 label", "alert support"),
      ] },
    ],
  },
  {
    id: "makers",
    title: "05 Makers",
    description: "The people building svaraa.",
    groups: [
      { title: "Text", fields: [
        f("makers.eyebrow", "Small label", "Built by"),
        f("makers.heading", "Section heading", "Two Indian-origin graduates, building from their Ivy League dorms.", true),
        f("makers.body", "Body text", "Raised on bhajans at dawn, trained on the hardest problems in computing. svaraa is where both halves meet.", true),
        f("makers.1.name", "Founder 1 name", "Founder 01"),
        f("makers.1.note", "Founder 1 line", "Full introduction coming soon"),
        f("makers.2.name", "Founder 2 name", "Founder 02"),
        f("makers.2.note", "Founder 2 line", "Full introduction coming soon"),
      ] },
    ],
  },
  {
    id: "waitlist",
    title: "06 Waitlist",
    description: "The sign-up form and its messages.",
    groups: [
      { title: "Text", fields: [
        f("waitlist.eyebrow", "Small label", "An early invitation"),
        f("waitlist.heading", "Section heading", "Be among the first to discover the svaraa pendant.", true),
        f("waitlist.body", "Body text", "Join the early-access list for launch updates and demonstration details. Exploring svaraa for a parent? Leave your contact details and our team will help you take the next step.", true),
      ] },
      { title: "Form", fields: [
        f("waitlist.name", "Name field label", "Your name"),
        f("waitlist.phone", "Phone field label", "Phone number"),
        f("waitlist.email", "Email field label", "Email address"),
        f("waitlist.button", "Button", "Reserve my place"),
        f("waitlist.sending", "Button while sending", "Reserving"),
        f("waitlist.success", "Thank you message", "Thank you. You are on the list, and we will be in touch personally.", true),
        f("waitlist.error", "Error message", "Please check your name, number and email, then try once more.", true),
      ] },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    description: "The closing band at the bottom of the page.",
    groups: [
      { title: "Text", fields: [
        f("footer.tagline", "Tagline", "Sound. Stillness. Self."),
        f("footer.description", "Short description", "A screenless pendant for everyday care, voice assistance and family connection.", true),
        f("footer.copyright", "Copyright line", "© 2026 svaraa. All rights reserved."),
      ] },
    ],
  },
];

export const allContentFields: ContentField[] = contentSections.flatMap((s) => s.groups.flatMap((g) => g.fields));

export const defaultContent: Record<string, string> = Object.fromEntries(allContentFields.map((field) => [field.key, field.value]));

export const contentKeys = new Set(Object.keys(defaultContent));

export const MAX_CONTENT_LENGTH = 2000;

export type SiteContent = Record<string, string>;

/** Saved text wins over the default; blank or unknown entries are ignored. */
export function resolveContent(overrides: Record<string, string> | null | undefined): SiteContent {
  const result: SiteContent = { ...defaultContent };
  for (const [key, value] of Object.entries(overrides ?? {})) {
    if (contentKeys.has(key) && typeof value === "string" && value.trim() !== "") result[key] = value;
  }
  return result;
}
