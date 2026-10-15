import type { ContactPage } from "./schema";

export const contact: ContactPage = {
  title: "Contact",
  intro: "Email is the quickest way to reach me. LinkedIn and GitHub work too.",
  routesHeading: "Ways to reach me",
  emailLabel: "Email",
  arrangementsHeading: "Working with me",
  form: {
    heading: "Send a message",
    intro: "Goes straight to my inbox. I'll reply from my own email address.",
    fields: { name: "Your name", email: "Your email", message: "Message", honeypot: "Leave this field empty" },
    hints: {
      email: "Only used to reply to you.",
      message: "A role, a project, or a question. Between 10 and 5,000 characters.",
    },
    submit: "Send message",
    sending: "Sending",
    service: {
      checking: "Waking the contact service. It runs on free hosting that sleeps when idle, so this can take up to a minute.",
      ready: "Contact service is ready.",
      unreachable: "The contact service isn't responding right now. You can still try, or email me directly.",
    },
    errorSummary: "Some fields need attention:",
    sent: { heading: "Message sent", body: "Thanks. It's in my inbox and I'll reply by email." },
    rateLimited: "That's a lot of messages from your connection in a short time. Please try again later, or email me directly.",
    failed: "Your message couldn't be sent. Please email me instead; I've filled in what you wrote.",
    fallbackLink: "Email me with your message",
    fallbackSubject: "Message from your portfolio",
    privacy:
      "This site doesn't store what you send. The form passes it to my inbox through an email delivery service (Resend), and I use it only to reply to you.",
  },
};
