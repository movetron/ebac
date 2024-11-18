
import SubscribeMain from '../db.json'

const Subscribe = () =>{
    const { subscription } = SubscribeMain.sections;
    return (
        <section className="page__subscribe subscribe">
          <div className="subscribe__main-block">
            <div className="subscribe__container">
              <div className="subscribe__body">
                <div className="subscribe__bg"></div>
                <div className="subscribe__content">
                  <div className="subscribe__title">{subscription.title}</div>
                  <div className="subscribe__text">{subscription.text}</div>
                  <form className="subscribe__form">
                    <input
                      autoComplete="off"
                      type="text"
                      name="email"
                      data-error="Ошибка"
                      placeholder={subscription['email-placeholder']}
                      className="subscribe__form-input"
                    />
                    <div className="subscribe__button">
                      <a href='#' type="submit" className="subscribe__btn">
                        {subscription.submit_text}
                      </a>
                    </div>
                  </form>
                  <div className="subscribe__checkbox">
                    <input
                      id="c_1"
                      data-error="Ошибка"
                      className="subscribe__checkbox-input"
                      type="checkbox"
                      value="1"
                      name="terms"
                    />
                    <label htmlFor="c_1" className="subscribe__label">
                      <div className="subscribe__checkbox-text">
                        {subscription['agreement-text']}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="subscribe__image">
                <div className="subscribe__bg-line"></div>
                <div className="subscribe__background">
                  <img src={subscription.image.url} alt="Subscribe" />
                </div>
              </div>
            </div>
          </div>
          <div className="subscribe__runline-descuento runline">
            <div className="subscribe__runline-container runline-container">
              {Array(5)
                .fill(subscription.ticker.text)
                .map((text, index) => (
                  <p key={index} className="subscribe__runline-text runline-text">
                    {text}
                  </p>
                ))}
            </div>
          </div>
        </section>
      );
}

export default Subscribe;