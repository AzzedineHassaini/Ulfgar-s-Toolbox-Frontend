// Minimum Length: 8 characters.
// Uppercase Letters: It should contain at least one uppercase letter.
// Lowercase Letters: It should contain at least one lowercase letter.
// Numbers: It should contain at least one number.
// Special Characters: It should contain at least one special character (!@#$%^&*()_+-=[]{};':"\|,.<>/?).
export const StrongPasswordRegx: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
