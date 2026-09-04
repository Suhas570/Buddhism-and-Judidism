const API_URL = "http://localhost:4000/api";

export class ApiError extends Error {
  status: number;
  details?: Record<string, string[] | undefined>;

  constructor(message: string, status: number, details?: Record<string, string[] | undefined>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function authHeaders(role: string) {
  const token = localStorage.getItem("auth_token");
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : { "x-demo-role": role }),
  };
}

async function parseError(response: Response) {
  const body = await response.json().catch(() => null);
  return new ApiError(body?.error ?? `API request failed: ${response.status}`, response.status, body?.details);
}

export async function apiGet<T>(path: string, role = "user"): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      ...authHeaders(role),
    },
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json();
}

export async function apiSend<T>(path: string, options: RequestInit = {}, role = "user"): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(role),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.status === 204 ? (undefined as T) : response.json();
}
