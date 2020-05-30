export async function login(user: string): Promise<string> {
  return post('/users', { user })
    .then((data) => data.authToken);

}


export type FeedCredentials = {
  token: string;
  apiKey: string;
  appId: string
}

export async function getFeedToken(backendToken: string): Promise<FeedCredentials> {
  return post('/stream-feed-credentials', {}, backendToken);
}

export type ChatCredentials = {
  token: string;
  apiKey: string;
}

export async function getChatToken(backendToken: string): Promise<ChatCredentials> {
  return post('/stream-chat-credentials', {}, backendToken);
}

function post(
  path: string,
  body: any,
  backendToken: string | null = null,
): Promise<any> {
  let headers: { [key: string]: string } = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (backendToken !== null) {
    headers['Authorization'] = `Bearer ${backendToken}`;
  }

  return fetch(`http://localhost:8080/v1${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
