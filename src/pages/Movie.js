import { IonBackButton, IonBadge, IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow } from '@ionic/react';
import styles from './Movie.module.scss';

import { useEffect, useState } from 'react';
import { arrowBack } from 'ionicons/icons';
import { useLocation, useParams } from 'react-router';

const Movie = () => {

	const params = useParams();
	const location = useLocation();
	const [ movie, setMovie ] = useState(false);

	useEffect(() => {

		if (location.state.movie) {

			const backdropPath = `https://image.tmdb.org/t/p/w500${ location.state.movie.backdrop_path }`;
			location.state.movie.cover_image = backdropPath;

			setMovie(location.state.movie);
		}
	}, [ params ]);

	const parseDate = dateToParse => {

		const dateParts = dateToParse.split("-");
		return `${ dateParts[2] }-${ dateParts[1] }-${ dateParts[0] }`;
	}

	return (
		<IonPage className={ styles.page }>
			<IonHeader>
				<img src={ movie.cover_image } alt="movie cover" />
				<IonBackButton color="light" className={ styles.backButton } text="&nbsp;&nbsp;Back to search" icon={ arrowBack } />
			</IonHeader>

			<IonContent fullscreen>
				<IonGrid>
					<IonRow>
						<IonCol size="5">
							<img src={ movie.image } />
						</IonCol>

						<IonCol size="7" className={ styles.movieInfo }>
							<IonCardSubtitle>Title</IonCardSubtitle>
							<IonCardTitle>{ movie.title }</IonCardTitle>

							<IonRow className="ion-justify-content-center ion-margin-top">
								<IonCol size="6">
									<IonCardSubtitle>Popularity</IonCardSubtitle>
									<IonBadge className={ styles.infoBadge }>{ movie.popularity ? movie.popularity : "Unknown" }</IonBadge>
								</IonCol>

								<IonCol size="6">
									<IonCardSubtitle>Release Date</IonCardSubtitle>
									<IonBadge className={ styles.infoBadge }>{ movie.release_date ? parseDate(movie.release_date) : "Unknown" }</IonBadge>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol size="12">
									<IonCardSubtitle>Search for Youtube Trailer</IonCardSubtitle>
									<a href={ `https://www.youtube.com/results?search_query=${ movie.title } trailer` } rel="noopener" target="_new">
										<IonButton>
											Search now
										</IonButton>
									</a>
								</IonCol>
							</IonRow>
						</IonCol>
					</IonRow>

					<IonRow className={ styles.movieOverview }>
						<IonCol size="12">
							<IonCardSubtitle>Overview</IonCardSubtitle>
							<p>{ movie.overview ? movie.overview : `No overview to show unfortunately. Try doing a google search for '${ movie.title }.` }</p>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Movie;