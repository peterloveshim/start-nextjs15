"use server";

export const login = async (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");
  if (username && password) {
    // ...
    return "successful";
  }
  return "failed";
};
