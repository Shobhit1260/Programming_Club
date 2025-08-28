import BASE from './config'

export async function addToLeaderboard(payload) {
  const res = await fetch(`${BASE}/v1/leaderboard/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to add");
  return data;
}

export async function fetchLeaderboard(page = 1, limit = 10) {
  const res = await fetch(`${BASE}/leaderboard?page=${page}&limit=${limit}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

export async function updateLeaderboard() {
  const res = await fetch(`${BASE}/leaderboard/update`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Failed to update leaderboard");
  return data;
}

export async function refreshLeaderboard() {
  const res = await fetch(`${BASE}/leaderboard/refresh`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Failed to refresh ranks");
  return data;
}
