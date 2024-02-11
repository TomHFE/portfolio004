import React from "react";
import Email from "./email";
import "./contact.scss";

interface ContactOption {
  name: string;
  link: string;
  symbol: string;
}

export default function Contact() {
  console.log(Email());
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

  //   <Link
  //   to={
  //     array[2].name !== "CONTACT"
  //       ? `/${array[2].name.toLowerCase()}`
  //       : EmailLink()
  //   }
  //   className="linkStyling"
  // >
  return (
    <div className="contact-body">
      <div className="contact-container" id="contact-container">
        <h1>CONTACT</h1>
        <div id="contacts">
          {contactOptions.map((contact, i) => (
            <div key={contact.name + i} className="section">
              <a rel="noopener noreferrer" target="_blank" href={contact.link}>
                {contact.name}
              </a>
            </div>
          ))}
          <a rel="noopener noreferrer" target="_blank" href={Email()}>
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
