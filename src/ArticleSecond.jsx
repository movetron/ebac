
import ArticleMainFirst from '../db.json'

const ArticleSecond = () =>{
    const articleDataDesign = ArticleMainFirst.sections.content.items[2]; 
    return(
        <section className="page__article-popular-second article-main">
            <div className="article-main__container">
                <div className="article-main__body body-article-second">
                    <div className="article-main__image-body">
                        <div className={"article-main__image-article article-main__image-design-second"}>
                            <img src={articleDataDesign.img.url} alt='' />
                        </div>
                        <div className={"article-main__sticker sticker-design-second"}>
                            <img src={articleDataDesign.sticker?.url || ''} alt="Sticker" />
                        </div>
                    </div>
                    <div className="article-main__content content-article-second">
                    <div className="article-main__buttons buttons-third-block">
                        <div className="article-main__button-main button-third-block">
                            <a href="#" className={"article-main__button _active btn-design"}>
                                {articleDataDesign.stamp.word}
                            </a>
                        </div>
                        <div className="article-main__button-links">
                            {articleDataDesign.tags.map((tag, index) => (
                                <a key={index} href="#" className={"article-main__button text-design"}>
                                    {tag}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="article-main__label">
                        <h2 className="article-main__title">{articleDataDesign.title}</h2>
                        <div className="article-main__text">{articleDataDesign.text}</div>
                    </div>
                    <div className="article-main__subcontent subcontent">
                        <div className="article-main__calendar calendar _icon-calendar">
                            {new Date(articleDataDesign.date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div className="article-main__time time _icon-clock">
                            {articleDataDesign.duration} {articleDataDesign.durationText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
export default ArticleSecond;
