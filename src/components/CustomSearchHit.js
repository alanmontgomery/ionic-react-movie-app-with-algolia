import { IonCol } from "@ionic/react";
import styles from "../pages/Movies.module.scss";

const CustomSearchHit = ({ hit }) => {

	//	Any movies without an image, lets just exclude them
	//	So the UI looks nicer.
	//	When I scraped the data, I put a placeholder URL image in
	//	But after more thought, it looks cleaner without including these.
	if (hit && hit.image !== "https://critics.io/img/movies/poster-placeholder.png") {
		return (

			<IonCol size="6" className={ styles.movie }>
				<div className={ styles.movieInfo }>
					<img src={ hit.image } alt="movie poster" />
					<h2>{ hit.title }</h2>
				</div>
			</IonCol>
		);
	} else {

		return null;
	}
}

export default CustomSearchHit;