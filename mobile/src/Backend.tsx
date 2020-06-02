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

export async function users(backendToken: string): Promise<string[]> {
  return get('/users', backendToken).then(response => response.users)
}

function get(path: string, backendToken: string) {
  return request(path, null, backendToken, 'GET')
}

function post(path: string, body: any, backendToken: string | null = null) {
  return request(path, body, backendToken, 'POST')
}

function request(
  path: string,
  body: any,
  backendToken: string | null,
  method: string,
): Promise<any> {
  let headers: { [key: string]: string } = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (backendToken !== null) {
    headers['Authorization'] = `Bearer ${backendToken}`;
  }

  return fetch(`https://e532d01384aa.ngrok.io/v1${path}`, {
    method: method,
    headers,
    body: body ? JSON.stringify(body) : null,
  }).then((res) => res.json());
}
