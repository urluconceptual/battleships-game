const baseUrl = "http://163.172.177.98:8081";

const baseHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const result = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      ...baseHeaders,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await result.json();

  if (data.accessToken === undefined) {
    throw new Error(data.message);
  }

  return data.accessToken;
};

export const register = async (email: string, password: string) => {
  const result = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      ...baseHeaders,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await result.json();

  if (data.id === undefined) {
    throw new Error(data.message);
  }

  return data;
};

export const getUserDetails = async (token: string) => {
  const result = await fetch(`${baseUrl}/user/details/me`, {
    method: "GET",
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();

  if (data.user === undefined) {
    throw new Error(data.message);
  }

  return data;
};
