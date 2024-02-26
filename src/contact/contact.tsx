import Email from "./email";
import "./contact.scss";

// interface for props
interface ContactOption {
  name: string;
  link: string;
  symbol: string;
}

export default function Contact() {
  // contact options
  const contactOptions: ContactOption[] = [
    {
      name: "Github",
      link: "https://github.com/TomHFE",
      symbol: "",
    },
    {
      name: "LinkedIN",
      link: "https://www.linkedin.com/in/tom-england-webdev",
      symbol: "",
    },
  ];

  //  dom
  return (
    <div className="contact-body">
      <div className="contact-container" id="contact-container">
        <h1>CONTACT</h1>
        <div id="contacts">
          {/* mapping contact options to dom */}
          {contactOptions.map((contact, i) => (
            <div key={contact.name + i} className="section">
              <a rel="noopener noreferrer" target="_blank" href={contact.link}>
                {contact.name}
              </a>
            </div>
          ))}
          {/* email function */}
          <a rel="noopener noreferrer" target="_blank" href={Email()}>
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
