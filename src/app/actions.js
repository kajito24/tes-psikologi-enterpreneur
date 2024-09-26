/**
 * Sign in the user
 * @param {FormData} formData
 */
export async function signIn(formData) {
  const userData = {
    fullName: formData.get("fullName"),
    birthYear: formData.get("birthYear"),
    score: 0,
  };

  return fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/**
 *  Sign out the user
 */
export async function signOut() {
  return fetch("/api/expire", { method: "POST" });
}
