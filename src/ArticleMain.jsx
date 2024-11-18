import footerMain from '../db.json'

const ArticleMain = () =>{
    const articleData = footerMain.sections.main.items[0]; 
 return(
    <section className="page__article-main article-main">
        <div className="article-main__container">
            <div className="article-main__body">
                <div className="article-main__bg"><img src={articleData.line.url} alt=""/></div>
                <div className="article-main__image-body">
                    <div className="article-main__image">
                        <img src={articleData.img.url} alt=""/>
                    </div>
                    <div className="article-main__sticker">
                        <img src={articleData.sticker.url} alt=""/>
                    </div>
                </div>
                <div className="article-main__content">
                    <div className="article-main__buttons buttons-first-block">
                        <div className="article-main__button-main button-first-block">
                            <a href="#" className="article-main__button _active">{articleData.stamp.word}</a>
                        </div>
                        <div className="article-main__button-links">
                            {articleData.tags.map((tag, index) =>(
                                <a key={index} href="#" className="article-main__button">{tag}</a>
                            ))}
                        </div>
                    </div>
                    <div className="article-main__label">
                        <h1 className="article-main__title">{articleData.title}</h1>
                        <div className="article-main__text">{articleData.text}</div>
                    </div>
                    <div className="article-main__subcontent subcontent subcontent-first-block">
                        <div className="article-main__calendar calendar calendar-first-block _icon-calendar">
                        {new Date(articleData.date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                        </div>
                        <div className="article-main__time time time-first-block _icon-clock">{articleData.duration} {articleData.durationText}</div>
                    </div>
                    <form className="article-main__form-button" action="#">
                        <button type="submit" className="article-main__button-more _bouble"><span>{articleData['browse-text']}</span></button>
                    </form>
                </div>
            </div>
        </div>
    </section>
 )
}

export default ArticleMain;