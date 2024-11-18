import { useEffect, useState } from 'react';

import headerMain from '../db.json'

const Header = () =>{
    const [headerData, setHeaderData] = useState(headerMain.menu);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/menu');
            if (!response.ok) {
                throw new Error(`Could not fetch data, status: ${response.status}`);
            }
            const data = await response.json();
            setHeaderData(data.menu); 
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    };
    useEffect(() => {
        fetchData(); 
    }, []);
   
    return(
        <header className="header">
            <div className="header__container">
                <div className="header__body">
                    <a href="#" className="header__logo">
                        <img src={headerMain.menu.logo} alt=""/>
                    </a>
                    <div className="header__menu menu">
                        <nav className="menu__body">
                            <ul className="menu__list">
                                {headerData.header.map((item,index) =>(
                                    <li key={index} className="menu__item">
                                        <a href={item.url} className="menu__link">{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="header__search-menu">
                        <div className="header__search _icon-search"></div>
                        <a href="#" className="header__link _icon-arrow-header">{headerData.link}</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header