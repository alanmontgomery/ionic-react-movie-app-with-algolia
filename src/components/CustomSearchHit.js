import { IonCol, IonRouterLink } from "@ionic/react";
import { Link } from "react-router-dom";
import styles from "../pages/Movies.module.scss";

const CustomSearchHit = ({ hit }) => {

	//	Any movies without an image, lets just exclude them
	//	So the UI looks nicer.
	//	When I scraped the data, I put a placeholder URL image in
	//	But after more thought, it looks cleaner without including these.
	if (hit && hit.image !== "https://critics.io/img/movies/poster-placeholder.png" && hit.backdrop_path !== null) {
		return (
			
			<IonCol size="6" className={ styles.movie }>
				<Link to={{ pathname: `/movie/${ hit.objectID }`, state: { movie: hit } }} className="non-link">
					<div className={ styles.movieInfo }>
						<img src={ hit.image } alt="movie poster" />
						<h2>{ hit.title }</h2>
					</div>
				</Link>
			</IonCol>
		);
	} else {

		return null;
	}
}

export default CustomSearchHit;