import { useState } from 'react';
import footerMain from '../db.json'



const Footer = () => {
    const [contacts] = useState(footerMain.contacts);
    const [footer] = useState(footerMain.menu.footer);
   
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content-top">
            <div id="form" className="footer__column">
              <div id="icons-to" className="footer__images">
                <div className="footer__not-for-icons">
                  <div className="footer__logo">
                    <img src={contacts.logo.url} alt="Logo" />
                  </div>
                  <div className="footer__achievement">
                    <img src={contacts.image.url} alt="Achievement" />
                  </div>
                </div>
              </div>
              <div className="footer__form">
                <input
                  type="text"
                  placeholder={contacts.subscription.email_placeholder}
                  className="footer__input"
                />
                <a href="#" className="footer__button">
                  {contacts.subscription['submit-text']}
                </a>
              </div>
            </div>
  
            <div className="footer__column spoller-footer">
              <div data-spollers="768,max" className="footer__list-body">
                {footer.map((section, index) => (
                  <div key={index} className="footer__column-list">
                    <button type="button" data-spoller className="footer__list-title arrow">
                      {section.label}
                    </button>
                    <div className="spoller-footer__list">
                      <nav className="footer__body">
                        {section.items.map((item, i) => (
                          <ul key={i} className="footer__list">
                            <li className="footer__item">
                              <a href={item.url} className="footer__list-item">
                                {item.label}
                              </a>
                            </li>
                          </ul>
                        ))}
                      </nav>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="footer__content-bottom">
            <div className="footer__row">
              <div id="form-to" className="footer__column-bottom">
                {[
                  { title: 'WhatsApp', contact: contacts.whatsapp },
                  { title: 'Telefone', contact: contacts.phone },
                  { title: 'Email', contact: contacts.email },
                ].map((info, index) => (
                  <div key={index} className="footer__column-info">
                    <div className="footer__title">{info.title}</div>
                    <a href="#" className="footer__contact">
                      {info.contact}
                    </a>
                  </div>
                ))}
              </div>
              <div id="icons" className="footer__column-bottom">
                <div className="footer__icons">
                  {[
                    { class: '_icon-instagram' },
                    { class: '_icon-facebook' },
                    { class: '_icon-youtube'},
                    { class: '_icon-linkedin' },
                  ].map((icon, index) => (
                    <a key={index} href={icon.url} className={`footer__icon ${icon.class}`}></a>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer__row">
              {contacts.links.map((link, index) => (
                <p key={index} className="footer__info-bottom">
                  <a href={link.url}>{link.label}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;