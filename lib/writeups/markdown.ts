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
}

export interface CategoryData {
  name: string
  slug: string
  challenges: Challenge[]
  totalPoints: number
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getAllChallenges(): Challenge[] {
  const filePath = path.join(CONTENT_DIR, 'writeups.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const challenges: Challenge[] = []
  
  // Split by main challenge headers (# Challenge Name)
  const challengeBlocks = fileContent.split(/(?=^# [^#])/m)

  for (const block of challengeBlocks) {
    if (!block.trim()) continue

    const lines = block.trim().split('\n')
    const titleLine = lines[0]
    
    if (!titleLine.startsWith('# ')) continue

    const title = titleLine.replace(/^# /, '').trim()
    
    let category = ''
    let points = 0
    let flag = ''
    let content = block

    // Extract metadata
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

    // Normalize category - handle various formats
    const normalizedCategory = category
      .split(/[/,]/)
      .map(c => c.trim())
      .filter(c => c)
      .join(' / ')

    if (!normalizedCategory || !title) continue

    const challenge: Challenge = {
      id: slugify(title),
      slug: slugify(title),
      title,
      category: normalizedCategory,
      points,
      flag,
      content: block,
      excerpt: lines
        .slice(1)
        .filter(l => !l.startsWith('**') && l.trim())
        .join(' ')
        .substring(0, 150),
    }

    challenges.push(challenge)
  }

  return challenges
}

export function getChallengeBySlug(slug: string): Challenge | undefined {
  const challenges = getAllChallenges()
  return challenges.find(c => c.slug === slug)
}

export function getChallengesByCategory(category: string): Challenge[] {
  const challenges = getAllChallenges()
  return challenges.filter(c => 
    c.category.toLowerCase() === category.toLowerCase()
  )
}

export function getAllCategories(): CategoryData[] {
  const challenges = getAllChallenges()
  const categoriesMap = new Map<string, Challenge[]>()

  for (const challenge of challenges) {
    const key = challenge.category.toLowerCase()
    if (!categoriesMap.has(key)) {
      categoriesMap.set(key, [])
    }
    categoriesMap.get(key)!.push(challenge)
  }

  const categories: CategoryData[] = Array.from(categoriesMap.entries()).map(
    ([categoryKey, challenges]) => ({
      name: challenges[0].category,
      slug: slugify(challenges[0].category),
      challenges,
      totalPoints: challenges.reduce((sum, c) => sum + c.points, 0),
    })
  )

  return categories.sort((a, b) => a.name.localeCompare(b.name))
}
