import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Challenge {
  id: string
  slug: string
  title: string
  category: string
  points: number
  flag: string
  content: string
  excerpt: string
  eventSlug: string
  eventName: string
}

export interface CategoryData {
  name: string
  slug: string
  challenges: Challenge[]
  totalPoints: number
}

export interface EventSummary {
  slug: string
  name: string
  year?: number
  description?: string
  totalChallenges: number
  totalPoints: number
}

export interface EventWithData extends EventSummary {
  challenges: Challenge[]
  categories: CategoryData[]
}

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseEventFile(filePath: string): EventWithData {
  const fileName = path.basename(filePath, path.extname(filePath))
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const eventSlug = slugify((data.slug as string) || fileName)

  // Derive a readable name: frontmatter title, or first heading, or slug
  let name = (data.title as string) || ''
  if (!name) {
    const firstHeading = content.split('\n').find(line => line.trim().startsWith('# '))
    if (firstHeading) {
      name = firstHeading.replace(/^#\s*/, '').trim()
    }
  }
  if (!name) {
    name = eventSlug
  }

  const year = typeof data.year === 'number' ? data.year : undefined
  const description = typeof data.description === 'string' ? data.description : undefined

  const challenges: Challenge[] = []

  // Split by main challenge headers (# Challenge Name)
  const blocks = content.split(/(?=^# [^#])/m)

  for (const block of blocks) {
    if (!block.trim()) continue

    const lines = block.trim().split('\n')
    const titleLine = lines[0]
    if (!titleLine.startsWith('# ')) continue

    const title = titleLine.replace(/^# /, '').trim()

    let category = ''
    let points = 0
    let flag = ''

    for (const line of lines.slice(1, 15)) {
      if (line.includes('**Category:**')) {
        category = line.replace(/\*\*Category:\*\*\s*/, '').trim()
      } else if (line.includes('**Points:**')) {
        const pointsStr = line.replace(/\*\*Points:\*\*\s*/, '').trim()
        points = parseInt(pointsStr, 10) || 0
      } else if (line.includes('**Flag:**')) {
        flag = line.replace(/\*\*Flag:\*\*\s*/, '').replace(/`/g, '').trim()
      }
    }

    const normalizedCategory = category
      .split(/[/,]/)
      .map(c => c.trim())
      .filter(Boolean)
      .join(' / ')

    if (!normalizedCategory || !title) continue

    const challengeContent = block
    const excerpt = lines
      .slice(1)
      .filter(l => !l.startsWith('**') && l.trim())
      .join(' ')
      .substring(0, 150)

    challenges.push({
      id: slugify(title),
      slug: slugify(title),
      title,
      category: normalizedCategory,
      points,
      flag,
      content: challengeContent,
      excerpt,
      eventSlug,
      eventName: name,
    })
  }

  const categories = buildCategories(challenges)

  return {
    slug: eventSlug,
    name,
    year,
    description,
    totalChallenges: challenges.length,
    totalPoints: challenges.reduce((sum, c) => sum + c.points, 0),
    challenges,
    categories,
  }
}

function buildCategories(challenges: Challenge[]): CategoryData[] {
  const map = new Map<string, Challenge[]>()

  for (const challenge of challenges) {
    const key = challenge.category.toLowerCase()
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key)!.push(challenge)
  }

  const categories: CategoryData[] = Array.from(map.entries()).map(([, list]) => ({
    name: list[0].category,
    slug: slugify(list[0].category),
    challenges: list,
    totalPoints: list.reduce((sum, c) => sum + c.points, 0),
  }))

  return categories.sort((a, b) => a.name.localeCompare(b.name))
}

function loadAllEvents(): EventWithData[] {
  if (!fs.existsSync(EVENTS_DIR)) return []
  const files = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.md'))
  return files.map(file => parseEventFile(path.join(EVENTS_DIR, file)))
}

export function getAllEvents(): EventSummary[] {
  return loadAllEvents().map(event => ({
    slug: event.slug,
    name: event.name,
    year: event.year,
    description: event.description,
    totalChallenges: event.totalChallenges,
    totalPoints: event.totalPoints,
  }))
}

export function getEventBySlug(slug: string): EventWithData | undefined {
  const events = loadAllEvents()
  return events.find(e => e.slug === slug)
}

export function getAllChallenges(): Challenge[] {
  return loadAllEvents().flatMap(e => e.challenges)
}

export function getChallengeBySlug(slug: string): Challenge | undefined {
  const challenges = getAllChallenges()
  return challenges.find(c => c.slug === slug)
}

export function getAllCategories(): CategoryData[] {
  const challenges = getAllChallenges()
  return buildCategories(challenges)
}

