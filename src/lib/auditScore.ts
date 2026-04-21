export type QuizAnswers = {
  q1: string
  q2: string
  q3: string
  q4: string
}

export type BreakdownRow = {
  dimension: string
  points: number
  maxPoints: number
  label: string
}

export type AuditResult = {
  total: number
  breakdown: BreakdownRow[]
  fix: string
}

const GOOGLE_PRESENCE: Record<string, number> = {
  no_listing: 0,
  reviews_low: 8,
  reviews_mid: 15,
  reviews_good: 22,
  reviews_strong: 30,
}

const ONLINE_ORDERING: Record<string, number> = {
  ordering_none: 0,
  ordering_one: 10,
  ordering_both: 20,
  ordering_own: 25,
}

const SOCIAL_MEDIA: Record<string, number> = {
  social_none: 0,
  social_inactive: 5,
  social_occasional: 10,
  social_active: 15,
}

function pageSpeedPoints(score: number | null): number {
  if (score === null) return 0
  if (score < 30) return 5
  if (score < 50) return 12
  if (score < 70) return 20
  if (score < 90) return 25
  return 30
}

function dimensionLabel(points: number, max: number): string {
  const pct = points / max
  if (pct >= 0.8) return 'Strong'
  if (pct >= 0.5) return 'Needs Work'
  return 'Critical'
}

const FIXES: Record<string, string> = {
  googlePresence:
    "Your restaurant isn't showing up well on Google. Claim and optimise your Google Business Profile — it's free and the single highest-impact thing you can do right now.",
  onlineOrdering:
    "You're missing out on orders. Getting listed on both Zomato and Swiggy can double your delivery revenue within 30 days.",
  socialMedia:
    "Your restaurant has no social presence. Even 2 posts a week on Instagram can bring in new walk-in customers — especially in your neighbourhood.",
  websiteSpeed:
    "Your website is too slow on mobile. Most customers check menus on their phone — a slow site means lost orders before they even see your food.",
  allGood:
    "Your online presence is solid. The next step is consistency — keep your reviews fresh, post regularly, and Naira Growth can handle the rest.",
}

const FIX_KEY_MAP: Record<string, string> = {
  'Google Presence': 'googlePresence',
  'Online Ordering': 'onlineOrdering',
  'Social Media': 'socialMedia',
  'Website Speed': 'websiteSpeed',
}

export function calculateScore(answers: QuizAnswers, pageSpeedScore: number | null): AuditResult {
  const gp = GOOGLE_PRESENCE[answers.q1] ?? 0
  const oo = ONLINE_ORDERING[answers.q2] ?? 0
  const sm = SOCIAL_MEDIA[answers.q3] ?? 0
  const ws = pageSpeedPoints(pageSpeedScore)

  const breakdown: BreakdownRow[] = [
    { dimension: 'Google Presence', points: gp, maxPoints: 30, label: dimensionLabel(gp, 30) },
    { dimension: 'Online Ordering', points: oo, maxPoints: 25, label: dimensionLabel(oo, 25) },
    { dimension: 'Social Media', points: sm, maxPoints: 15, label: dimensionLabel(sm, 15) },
    {
      dimension: 'Website Speed',
      points: ws,
      maxPoints: 30,
      label: pageSpeedScore === null ? 'Not checked' : dimensionLabel(ws, 30),
    },
  ]

  const total = Math.min(gp + oo + sm + ws, 100)

  const allAbove60Pct = breakdown.every(r => r.points / r.maxPoints >= 0.6)

  let fix = FIXES.allGood
  if (!allAbove60Pct) {
    const checkable = breakdown.filter(r => r.label !== 'Not checked')
    const [lowestRow] = [...checkable].sort(
      (a, b) => a.points / a.maxPoints - b.points / b.maxPoints,
    )
    fix = FIXES[FIX_KEY_MAP[lowestRow.dimension]] ?? FIXES.allGood
  }

  return { total, breakdown, fix }
}
