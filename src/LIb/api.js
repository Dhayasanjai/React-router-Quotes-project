const FIREBASE_DOMAIN =
  'https://react-router-quotes-project-default-rtdb.firebaseio.com';
export async function AddQuotes(EnteredQuotes) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(EnteredQuotes),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something Went Wrong ');
  }
}
export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something Went Wrong ');
  }
  const loadedData = [];
  for (const item in data) {
    loadedData.push({ ...data[item], id: item });
  }

  return loadedData;
}
export async function getOneQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something Went Wrong ');
  }

  return data;
}
export async function AddComments(requestData) {
  const { quoteId, enteredComments } = requestData;
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify(enteredComments),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something Went Wrong ');
  }
  return null;
}
export async function GetComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'something Went Wrong ');
  }
  const loadedData = [];
  for (const item in data) {
    loadedData.push(data[item]);
  }

  return loadedData;
}
