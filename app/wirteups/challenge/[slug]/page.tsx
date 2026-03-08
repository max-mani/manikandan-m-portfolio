import { getChallengeBySlug, getAllChallenges } from '@/lib/writeups/events';
import { redirect, notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const challenges = getAllChallenges();
  return challenges.map((c) => ({ slug: c.slug }));
}

export default async function ChallengeRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);
  if (!challenge) {
    notFound();
  }
  redirect(`/wirteups/event/${challenge.eventSlug}/${challenge.slug}`);
}
