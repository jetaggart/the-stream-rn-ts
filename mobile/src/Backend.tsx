export async function login(user: string): Promise<string> {
  return post('/users', {user})
    .then((data) => data.authToken);

}

export async function getFeedToken(backendToken: string): Promise<string> {
  return post('/stream-feed-credentials', {}, backendToken)
    .then((data) => data.token);
}

export async function getChatToken(backendToken: string): Promise<string> {
  return post('/stream-chat-credentials', {}, backendToken)
    .then((data) => data.token);
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

  if(backendToken !== null) {
    headers['Authorization'] = `Bearer ${backendToken}`;
  }

  return fetch(`http://localhost:8080/v1${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
