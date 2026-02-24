import { NextResponse } from 'next/server';

export async function GET() {
  const user = 'RobsonRodriguess';
  const token = process.env.GITHUB_ACCESS_TOKEN; // Guarde no seu .env

  try {
    // Busca dados do perfil
    const userRes = await fetch(`https://api.github.com/users/${user}`, {
      headers: { Authorization: `token ${token}` }
    });
    const userData = await userRes.json();

    // Busca repositórios para calcular linguagens e estrelas
    const repoRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, {
      headers: { Authorization: `token ${token}` }
    });
    const repos = await repoRes.json();

    const stats = {
      followers: userData.followers,
      public_repos: userData.public_repos,
      total_stars: repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
      location: userData.location,
      bio: userData.bio
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar GitHub' }, { status: 500 });
  }
}