
import WebinarsMain from '../db.json'

const Webinars = () =>{
    const { proposals, content } = WebinarsMain.sections;
	const tickerFirst = content.ticker.text; 
    const tickerSecond = proposals.ticker.text;

	const parseDate = (dateString) => {
		const [day, month, year] = dateString.split('.');
		return new Date(`${year}-${month}-${day}`);
	};

	const getMonthName = (monthIndex) => {
		const months = [
			'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 
			'outubro', 'novembro', 'dezembro'
		];
		return months[monthIndex];
	};


	const formatDateRange = (dateFrom, dateTo) => {
		const parsedDateFrom = parseDate(dateFrom);
		const parsedDateTo = parseDate(dateTo);
	
		const dayFrom = parsedDateFrom.getDate();
		const dayTo = parsedDateTo.getDate();
		const monthFrom = getMonthName(parsedDateFrom.getMonth());
		const monthTo = getMonthName(parsedDateTo.getMonth());
		const year = parsedDateFrom.getFullYear();
	
		// Формируем строку вида "31 de maio, 01 e 02 de junho de 2022"
		  // Если даты в одном месяце
		  if (monthFrom === monthTo) {
			return `${dayFrom} e ${dayTo} de ${monthFrom} de ${year}`;
		}
	
		// Если даты в разных месяцах
		return `${dayFrom} de ${monthFrom} e ${dayTo} de ${monthTo} de ${year}`;
	};

    const renderWebinar = ({webinarData, index, key}) => {
		const formattedDate = formatDateRange(webinarData.dateFrom, webinarData.dateTo);
		const imageClass = index === 2 ? 'image-third' : '';
		const textAdapt = index === 0 ? 'text-adaptive_first' : index === 1 ? 'text-adaptive_second' : 'text-adaptive_third';
		const marginAdapt = index === 1 || index === 2 ? 'margin-adaptive' : ''; 

		return(
		<div className="webinars-main__column" key={key}>
		<div className={`webinars-main__column-background-${webinarData.className}`}></div>
		<div className={`webinars-main__label ${marginAdapt}`}>
			<div className={`webinars-main__image ${imageClass}`}>
				<img src={webinarData.avatarUrl} alt={webinarData.name} />
			</div>
			<div className="webinars-main__text-content">
				<div className="webinars-main__name">{webinarData.name}</div>
				<div className="webinars-main__profession">{webinarData.profession}</div>
			</div>
		</div>
		<div className={`webinars-main__text ${textAdapt}`}>{webinarData.title}</div>
		<div className="webinars-main__subcontent">
			<div className="webinars-main__top-subcontent">
				<p>{webinarData.eventType[0]}</p>
				<p>{webinarData.eventType[1]}</p>
			</div>
			<div className="webinars-main__bottom-subcontent">
				<div className="webinars-main__calendar calendar _icon-calendar">
				{formattedDate}
				</div>
				<div className="webinars-main__time time _icon-clock">{webinarData.time}</div>
			</div>
		</div>
	</div>
		)
		
    };
    
    return(
        <section className="page__webinars webinars-main">
            <div className="webinars-main__background"></div>
			<div className="webinars-main__runline runline">
				<div className="webinars-main__runline-container runline-container">
				{[...Array(5)].map((_, i) => (
				<p key={i} className="webinars-main__runline-text runline-text">{tickerFirst}</p>
			))}
				
				</div>
			</div>
    
			<div className="webinars-main__main">
				<div className="webinars-main__container">
					<div className="webinars-main__body">
						<div id="btn" className="webinars-main__body-content">
							<div className="webinars-main__title">Webinars gratuitos</div>
							<a href="" className="webinars-main__button">Todos os webinars</a>
						</div>
						<div className="webinars-main__columns" id="btn-to">
						{proposals.items.map((webinar, index) => (
								  renderWebinar({
									webinarData: {
										className: index === 0 ? 'first' : index === 1 ? 'second' : 'third',
										avatarUrl: webinar.author.img,
										name: webinar.author.name,
										profession: webinar.author.position,
										title: webinar.text,
										eventType: webinar.tags,
										type: webinar.type,
										dateFrom: webinar.date_from,
										dateTo: webinar.date_to,
										time: webinar.time,
									},
									index,
									key: index,
								})
							))}
							
						</div>
					</div>
				</div>
			</div>
			<div className="webinars-main__runline-subscribe runline">
				<div className="webinars-main__runline-container runline-container">
					<p className="webinars-main__runline-text runline-text">Suscríbete</p>
					{[...Array(5)].map((_, i) => (
						<p key={i} className="webinars-main__runline-text runline-text">{tickerSecond}</p>
					))}
				</div>
			</div>
    	</section>
    )
}
export default Webinars;
