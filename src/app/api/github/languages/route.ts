import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const user = 'RobsonRodriguess';
  const token = process.env.GITHUB_ACCESS_TOKEN;

  try {
    const headers: HeadersInit = token
      ? { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
      : { Accept: 'application/vnd.github.v3+json' };

    // Fetch repos sorted by most recently pushed
    const repoRes = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=30&sort=pushed&direction=desc`,
      { headers, next: { revalidate: 3600 } }
    );
    const repos = await repoRes.json();

    if (!Array.isArray(repos)) {
      return NextResponse.json({ languages: [], recentRepos: [] }, { status: 200 });
    }

    // Filter out forks and get only recent repos (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentRepos = repos.filter(
      (repo: any) => !repo.fork && new Date(repo.pushed_at) > sixMonthsAgo
    );

    // Fetch language breakdown for each recent repo
    const languagePromises = recentRepos.slice(0, 15).map(async (repo: any) => {
      try {
        const langRes = await fetch(repo.languages_url, { headers });
        const langs = await langRes.json();
        return { name: repo.name, languages: langs, updated: repo.pushed_at };
      } catch {
        return { name: repo.name, languages: {}, updated: repo.pushed_at };
      }
    });

    const repoLanguages = await Promise.all(languagePromises);

    // Aggregate language bytes across all repos
    const totalBytes: Record<string, number> = {};
    for (const repo of repoLanguages) {
      for (const [lang, bytes] of Object.entries(repo.languages)) {
        totalBytes[lang] = (totalBytes[lang] || 0) + (bytes as number);
      }
    }

    // Calculate percentages and sort
    const totalAllBytes = Object.values(totalBytes).reduce((a, b) => a + b, 0);
    const languages = Object.entries(totalBytes)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalAllBytes > 0 ? Math.round((bytes / totalAllBytes) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8); // Top 8 languages

    // Get recent activity info
    const recentActivity = recentRepos.slice(0, 5).map((repo: any) => ({
      name: repo.name,
      language: repo.language,
      updatedAt: repo.pushed_at,
      description: repo.description,
      stars: repo.stargazers_count,
    }));

    return NextResponse.json({
      languages,
      totalBytes: totalAllBytes,
      repoCount: recentRepos.length,
      recentActivity,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub languages API error:', error);
    return NextResponse.json({ languages: [], recentRepos: [] }, { status: 200 });
  }
}
