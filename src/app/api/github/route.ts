import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache por 1 hora para economizar cota do GitHub

export async function GET() {
  const user = 'RobsonRodriguess';
  const token = process.env.GITHUB_ACCESS_TOKEN;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    ...(token ? { Authorization: `token ${token}` } : {}),
  };

  try {
    const userRes = await fetch(`https://api.github.com/users/${user}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      return NextResponse.json({
        followers: 0,
        public_repos: 0,
        total_stars: 0,
        location: 'Brasília, DF',
        bio: 'Software Engineer & Fullstack Developer',
      });
    }

    const userData = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    });

    let totalStars = 0;
    if (repoRes.ok) {
      const repos = await repoRes.json();
      if (Array.isArray(repos)) {
        totalStars = repos.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0);
      }
    }

    const stats = {
      followers: userData.followers || 0,
      public_repos: userData.public_repos || 0,
      total_stars: totalStars,
      location: userData.location || 'Brasília, DF',
      bio: userData.bio || 'Software Engineer',
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({
      followers: 0,
      public_repos: 0,
      total_stars: 0,
      location: 'Brasília, DF',
      bio: 'Software Engineer',
    });
  }
}