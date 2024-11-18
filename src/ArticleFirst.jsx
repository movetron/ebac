
import ArticleMainFirst from '../db.json'

const ArticleFirst = () =>{
    const { content, main } = ArticleMainFirst.sections;
    const articleDataFashion = ArticleMainFirst.sections.content.items[0]; 
    const ticker = main.ticker.text;

    const renderArticle = (articleData, customClass) => (
        <div className="article-main__topcontent">
            <div className="article-main__image-body">
                <div className={`article-main__image-article article-main__image-${customClass}`}>
                    <img src={articleData.img.url} alt='' />
                </div>
                <div className={`article-main__sticker-${customClass}`}>
                    <img src={articleData.sticker?.url || ''} alt="Sticker" />
                </div>
            </div>
            <div className="article-main__content adaptive-content">
                <div className="article-main__buttons buttons-second-block">
                    <div className="article-main__button-main">
                        <a href="#" className={`article-main__button _active btn-${customClass}`}>
                            {articleData.stamp.word}
                        </a>
                    </div>
                    <div className="article-main__button-links">
                        {articleData.tags.map((tag, index) => (
                            <a key={index} href="#" className={`article-main__button text-${customClass}`}>
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="article-main__label">
                    <h2 className="article-main__title">{articleData.title}</h2>
                    <div className="article-main__text">{articleData.text}</div>
                </div>
                <div className="article-main__subcontent subcontent">
                    <div className="article-main__calendar calendar _icon-calendar">
                        {new Date(articleData.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                    <div className="article-main__time time _icon-clock">
                        {articleData.duration} {articleData.durationText}
                    </div>
                </div>
            </div>
        </div>
    );
    
    return(
        <section className="page__article-popular-first article-main">
        <div className="article-main__runline runline">
            <div className="article-main__runline-container runline-container">
            {[...Array(5)].map((_, i) => (
            <p key={i} className="article-main__runline-text runline-text">{ticker}</p>
          ))}
               
            </div>
        </div>
        <div className="article-main__container">
            <div className="article-main__body body-article">
                <div className="article-main__bg"><img src={articleDataFashion.line.url} alt=""/></div>
                {renderArticle(content.items[0], 'fashion')}
                {renderArticle(content.items[1], 'design')}
            </div>
        </div>
    </section>
    )
}
export default ArticleFirst;
