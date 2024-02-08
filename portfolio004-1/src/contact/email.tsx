function Email() {
  // my email
  const recipientEmail = "tomengland1995@gmail.com";
  // subject
  const emailSubject = "Opportunities";
  // email link
  const mailLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    emailSubject
  )}`;

  return mailLink;
}
export default Email;
