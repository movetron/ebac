import Header from "./Header"
import ArticleMain from "./ArticleMain"
import ArticleFirst from "./ArticleFirst"
import ArticleSecond from "./ArticleSecond"
import ArticleThird from "./ArticleThird"
import Webinars from "./Webinars"
import Subscribe from "./Subscribe"
import Footer from "./Footer"
function App() {

  return (
    <div className="wrapper">
      <Header/>
      <main className="page page_home">
        <ArticleMain/>
        <ArticleFirst/>
        <ArticleSecond/>
        <ArticleThird/>
        <Webinars/>
        <Subscribe/>
        <Footer/>
      </main>
    </div>
  )
}

export default App
