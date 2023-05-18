export function isBangladeshiPhoneNumber(number) {
  const cleanedNumber = number.replace(/\D/g, '');
  const regex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return regex.test(cleanedNumber);
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  