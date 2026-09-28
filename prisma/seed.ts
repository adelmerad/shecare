import { PrismaClient, type Mood, type Severity } from "@prisma/client"
import bcrypt from "bcryptjs"

const db = new PrismaClient()

const DEMO_EMAIL = "demo@shecare.dz"
const DEMO_PASSWORD = "Demo1234"

function daysAgo(n: number, hour = 10) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(hour, 0, 0, 0)
  return d
}

/** Next Sun–Thu working day at least `minDays` ahead, at the given hour. */
function nextWorkDay(minDays: number, hour: number) {
  const d = new Date()
  d.setDate(d.getDate() + minDays)
  while (d.getDay() === 5 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  d.setHours(hour, 0, 0, 0)
  return d
}

const specialists = [
  { name: "Dr. Sarah Kadouche", specialty: "Oncologist", yearsExperience: 15, priceDzd: 4000, durationMin: 30, rating: 4.9, reviewCount: 127, modes: ["VIDEO", "PHONE"] as const },
  { name: "Dr. Mehdi Makhlouf", specialty: "Surgical Oncologist", yearsExperience: 12, priceDzd: 5000, durationMin: 45, rating: 4.7, reviewCount: 89, modes: ["VIDEO", "CHAT"] as const },
  { name: "Dr. Rania Manel", specialty: "Medical Oncologist", yearsExperience: 18, priceDzd: 6000, durationMin: 60, rating: 4.8, reviewCount: 203, modes: ["VIDEO", "PHONE", "CHAT"] as const },
  { name: "Dr. Amel Benali", specialty: "Psycho-oncologist", yearsExperience: 9, priceDzd: 3500, durationMin: 45, rating: 4.9, reviewCount: 64, modes: ["VIDEO", "CHAT"] as const },
  { name: "Dr. Yasmine Haddad", specialty: "Oncology Dietitian", yearsExperience: 7, priceDzd: 2500, durationMin: 30, rating: 4.6, reviewCount: 41, modes: ["VIDEO", "PHONE", "CHAT"] as const },
]

const resources = [
  {
    slug: "understanding-your-diagnosis",
    title: "Understanding Your Diagnosis",
    summary: "A guide to breast cancer types and stages",
    description: "Learn about the main types of breast cancer, how staging works, and what your diagnosis means for your treatment plan.",
    type: "ARTICLE" as const,
    minutes: 15,
    featured: true,
    content: `Receiving a diagnosis raises many questions. This guide explains the words you will hear most often, so you can have clearer conversations with your care team.

## Common types
Most breast cancers start in the milk ducts (ductal carcinoma) or in the lobules (lobular carcinoma). "In situ" means the cells have not spread beyond where they started; "invasive" means they have grown into surrounding tissue.

## Hormone receptors and HER2
Your pathology report will say whether the tumour is hormone-receptor positive (ER/PR) and whether it is HER2 positive. These results guide which treatments are likely to work best.

## Staging
Stages range from 0 to IV and describe the size of the tumour and whether it has reached lymph nodes or other organs. Stage is only one part of the picture: your team also considers tumour biology, your general health and your preferences.

## Questions to ask
What type and stage is my cancer? What are my treatment options and their goals? How will treatment affect my daily life? Write your questions down before each appointment.`,
  },
  {
    slug: "chemotherapy-what-to-expect",
    title: "Chemotherapy: What to Expect",
    summary: "Preparing for and managing chemotherapy treatment",
    description: "How chemotherapy works, what a treatment day looks like, and practical tips to prepare for your sessions.",
    type: "VIDEO" as const,
    minutes: 22,
    featured: true,
    content: `Chemotherapy uses medicines that target fast-growing cells. It is usually given in cycles, with rest periods that let your body recover between sessions.

## A typical treatment day
Expect a blood test, a short check with a nurse or doctor, then the infusion itself, which can last from 30 minutes to several hours. Bring water, a snack, something to read and a warm layer.

## Preparing
Ask which side effects are most likely with your protocol and which ones need an urgent call. Arrange transport home after your first sessions.

## Looking after yourself
Rest when you need to, keep gentle movement when you can, and log how you feel in the Health Tracker so you can share accurate information with your team.`,
  },
  {
    slug: "nutrition-during-treatment",
    title: "Nutrition During Treatment",
    summary: "Maintaining good nutrition throughout your journey",
    description: "Practical meal ideas and tips for managing appetite changes, nausea and taste changes during treatment.",
    type: "PDF" as const,
    minutes: 10,
    featured: true,
    content: `Eating well can help you keep your strength and recover between treatments. Your needs may change from week to week — that is normal.

## When appetite is low
Eat small portions often, keep easy snacks nearby (yoghurt, dates, nuts, soup), and drink between meals rather than with them.

## When food tastes different
Try cold or room-temperature dishes, marinades, lemon or herbs. Plastic cutlery can help if food tastes metallic.

## Staying hydrated
Aim for regular small sips through the day. The water counter in the Health Tracker can help you keep an eye on it.

Always check with your care team or a dietitian before taking supplements.`,
  },
  {
    slug: "managing-side-effects",
    title: "Managing Side Effects",
    summary: "Practical strategies for common treatment side effects",
    description: "Approaches to managing fatigue, nausea, neuropathy and other common side effects, and when to call your team.",
    type: "ARTICLE" as const,
    minutes: 12,
    featured: true,
    content: `Side effects vary a lot from person to person. Tracking them helps your team adjust your care.

## Fatigue
Plan your day around your energy, alternate activity and rest, and accept help with daily tasks.

## Nausea
Take anti-nausea medicine as prescribed, before nausea starts. Ginger, small dry snacks and fresh air can help.

## Tingling or numbness
Tell your team early if you notice tingling in your hands or feet — doses can sometimes be adjusted.

## When to call urgently
A temperature of 38°C or more, shortness of breath, chest pain, or vomiting that prevents you from drinking are reasons to contact your care team straight away.`,
  },
  {
    slug: "mindfulness-for-patients",
    title: "Mindfulness and Meditation for Cancer Patients",
    summary: "Relaxation techniques to manage stress and anxiety",
    description: "An introduction to mindfulness and simple daily practices you can use during treatment.",
    type: "VIDEO" as const,
    minutes: 18,
    featured: false,
    content: `Mindfulness means paying attention to the present moment without judgement. Short, regular practice can ease stress and improve sleep.

## Getting started
Begin with five minutes a day. Sit comfortably, notice your breath, and gently return to it whenever your mind wanders.

## Try it in SheCare
The Wellness Hub offers guided sessions from 3 to 20 minutes, including breathing exercises you can use in waiting rooms.`,
  },
  {
    slug: "talking-to-your-family",
    title: "Talking to Your Family and Children",
    summary: "Finding the words to share your diagnosis",
    description: "Ideas for honest, age-appropriate conversations with children and loved ones.",
    type: "ARTICLE" as const,
    minutes: 8,
    featured: false,
    content: `There is no perfect way to share difficult news, but honesty in simple words usually helps everyone cope.

## With children
Use clear words like "cancer" and "medicine", reassure them that it is not their fault and that they will be cared for, and let them ask questions over time.

## With adults
Tell people what kind of help you would like — meals, lifts, company, or simply listening.`,
  },
  {
    slug: "returning-to-work",
    title: "Returning to Work After Treatment",
    summary: "Planning a gradual and sustainable return",
    description: "How to plan your return to work, talk to your employer and manage lasting fatigue.",
    type: "PDF" as const,
    minutes: 9,
    featured: false,
    content: `Going back to work can bring structure and a sense of normality, but it takes planning.

## Plan with your team
Ask your doctor when a return is realistic and whether a gradual schedule is advisable.

## Talk to your employer
You decide how much medical information to share. Focus on practical adjustments such as hours, breaks or remote days.`,
  },
  {
    slug: "exercise-during-treatment",
    title: "Gentle Exercise During Treatment",
    summary: "Staying active safely",
    description: "Why movement helps with fatigue and mood, and how to stay active safely during treatment.",
    type: "VIDEO" as const,
    minutes: 15,
    featured: false,
    content: `Regular gentle activity, such as walking, can reduce fatigue and improve mood for many people during treatment.

## Start small
Ten minutes of walking is a good start. Increase slowly and listen to your body.

## Check first
Ask your team before starting a new activity, especially after surgery or if your blood counts are low.`,
  },
]

const members = [
  { firstName: "Maria", lastName: "Benamar", email: "maria@shecare.dz" },
  { firstName: "Bouchra", lastName: "Kaci", email: "bouchra@shecare.dz" },
  { firstName: "Lyna", lastName: "Rahmani", email: "lyna@shecare.dz" },
]

async function main() {
  console.log("Seeding database...")

  // Idempotent: wipe content tables, keep schema
  await db.$transaction([
    db.appointment.deleteMany(),
    db.specialist.deleteMany(),
    db.resource.deleteMany(),
    db.user.deleteMany({ where: { email: { in: [DEMO_EMAIL, ...members.map((m) => m.email)] } } }),
  ])

  const createdSpecialists = await Promise.all(
    specialists.map((s) => db.specialist.create({ data: { ...s, modes: [...s.modes] } })),
  )
  await db.resource.createMany({
    data: resources.map((r, i) => ({ ...r, createdAt: daysAgo(resources.length - i) })),
  })

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12)

  const demo = await db.user.create({
    data: {
      email: DEMO_EMAIL,
      passwordHash,
      firstName: "Sarah",
      lastName: "Amrani",
      location: "Algiers",
      bio: "Mother of two, yoga enthusiast and breast cancer warrior. I believe in the power of community.",
      createdAt: daysAgo(45),
      medical: {
        create: {
          diagnosis: "Invasive Ductal Carcinoma",
          stage: "Stage II",
          diagnosisDate: daysAgo(70),
          treatmentStart: daysAgo(45),
          currentTreatment: "Chemotherapy (AC-T protocol). Completed 3 cycles of AC.",
          medications: "Ondansetron 8mg (as needed for nausea), Multivitamin",
          allergies: "Penicillin",
          cyclesTotal: 6,
          cyclesCompleted: 3,
        },
      },
      preferences: { create: {} },
    },
  })

  const moods: Mood[] = ["GOOD", "OKAY", "GREAT", "LOW", "GOOD", "GOOD", "OKAY"]
  await db.dailyLog.createMany({
    data: moods.map((mood, i) => ({
      userId: demo.id,
      mood,
      energy: [7, 5, 8, 4, 7, 6, 6][i],
      sleepHours: [7.5, 6, 8, 5.5, 7, 7, 6.5][i],
      waterGlasses: [6, 5, 8, 4, 7, 6, 5][i],
      notes: i === 3 ? "Tired after chemo session, mild nausea in the evening." : null,
      loggedAt: daysAgo(i, 9 + i),
    })),
  })

  const symptoms: [string, Severity, number][] = [
    ["Fatigue", "MILD", 0],
    ["Headache", "MODERATE", 1],
    ["Nausea", "MILD", 3],
    ["Loss of appetite", "MILD", 4],
  ]
  await db.symptomLog.createMany({
    data: symptoms.map(([name, severity, d]) => ({ userId: demo.id, name, severity, loggedAt: daysAgo(d, 14) })),
  })

  await db.vitalReading.create({
    data: { userId: demo.id, temperature: 36.8, heartRate: 72, systolic: 118, diastolic: 76, recordedAt: daysAgo(0, 8) },
  })

  await db.journalEntry.createMany({
    data: [
      { userId: demo.id, feelings: "Felt stronger today. Walked for 20 minutes by the sea.", gratitude: "My kids, the sun, my sister's soup", prompt: "What gave you strength today?", createdAt: daysAgo(1, 21) },
      { userId: demo.id, feelings: "Hard day after treatment, but the community messages helped.", prompt: "Who has supported you lately, and how?", createdAt: daysAgo(3, 22) },
    ],
  })

  await db.wellnessSession.createMany({
    data: [
      { userId: demo.id, type: "MEDITATION", slug: "morning-mindfulness", durationMin: 5, completedAt: daysAgo(0, 8) },
      { userId: demo.id, type: "BREATHING", slug: "box-breathing", durationMin: 4, completedAt: daysAgo(1, 20) },
      { userId: demo.id, type: "MEDITATION", slug: "sleep-preparation", durationMin: 12, completedAt: daysAgo(2, 22) },
    ],
  })

  const others = await Promise.all(
    members.map((m) =>
      db.user.create({ data: { ...m, passwordHash, preferences: { create: {} }, medical: { create: {} } } }),
    ),
  )

  const posts = await Promise.all([
    db.post.create({
      data: {
        authorId: others[0].id,
        category: "VICTORY",
        content:
          "Just finished my last chemo session! 🎉 It's been a long 6 months, but I'm finally done with treatment. To everyone still fighting — you've got this! This community has been my lifeline through the hardest days.",
        createdAt: daysAgo(0, 8),
      },
    }),
    db.post.create({
      data: {
        authorId: others[1].id,
        category: "QUESTION",
        content:
          "Has anyone tried meditation during treatment? My oncologist suggested it for managing anxiety, but I'm not sure where to start. Would love to hear your experiences!",
        createdAt: daysAgo(0, 5),
      },
    }),
    db.post.create({
      data: {
        authorId: others[2].id,
        category: "SUPPORT",
        content:
          "Feeling overwhelmed today. Started my second round of treatment and the side effects are hitting harder this time. Just need some encouragement from this amazing community. ❤️",
        createdAt: daysAgo(1, 18),
      },
    }),
  ])

  await db.comment.createMany({
    data: [
      { postId: posts[0].id, authorId: demo.id, content: "Congratulations Maria! So happy for you 💗" },
      { postId: posts[1].id, authorId: others[0].id, content: "Yes! Start with 5 minutes of breathing in the morning, it really helped me." },
      { postId: posts[2].id, authorId: others[1].id, content: "Sending you so much strength, Lyna. One day at a time." },
    ],
  })
  await db.postLike.createMany({
    data: [
      { postId: posts[0].id, userId: demo.id },
      { postId: posts[0].id, userId: others[1].id },
      { postId: posts[0].id, userId: others[2].id },
      { postId: posts[2].id, userId: others[0].id },
    ],
  })

  await db.appointment.create({
    data: {
      userId: demo.id,
      specialistId: createdSpecialists[0].id,
      mode: "VIDEO",
      startsAt: nextWorkDay(1, 14),
      notes: "Follow-up after cycle 3",
    },
  })
  await db.appointment.create({
    data: {
      userId: demo.id,
      specialistId: createdSpecialists[2].id,
      mode: "VIDEO",
      startsAt: daysAgo(10, 10),
      status: "COMPLETED",
    },
  })

  console.log(`Done. Demo account: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
