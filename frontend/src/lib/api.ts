// frontend/src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL;

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({ error: 'unknown' }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export const getIdeas = () => request("/ideas");


export const createIdea = (text: string) => {
  return request("/ideas", {
    method: "POST",
    body: JSON.stringify({ text })
  });
};

export const upvoteIdea = (id: string) => {
  return request(`/ideas/${id}/upvote`, { method: "POST" });
};

