import { IonButton, IonButtons, IonCardSubtitle, IonContent, IonFooter, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBack, searchCircleOutline, trashOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination, connectInfiniteHits } from 'react-instantsearch-dom'; 

const searchClient = algoliasearch('QZKBD6VPU7', 'db21b77f5f3bf4d4cbde385b7f33c60d');

const Movies = props => {


	const [ searchTerm, setSearchTerm ] = useState("");
	const [ sentinel, setSentinel] = useState();

	const Hit = ({ hit }) => (

		<IonItem id={ `employeeItem_${ hit.id }` } className={ ` ${ styles.employeeItem } animate__animated animate__fadeIn ais-InfiniteHits-item` } key={ hit.id } lines="none">
			<img src={ hit.image } alt="employee avatar" />

			<IonLabel>
				<h2>{ hit.title }</h2>
				<p>{ hit.overview }</p>
			</IonLabel>
		</IonItem>
	);

	const getMore = (e, refine) => {

		refine();
		e.target.complete();
	}

	const CustomInfiniteHits = connectInfiniteHits(({ hits, hasMore, refineNext }) => {
		console.log(hasMore);
		console.log(hits);
		
		return (
			<>
				<div className="ais-Hits__root">
					{hits.map(hit => <Hit key={hit.objectID} hit={hit} />)}

					<IonInfiniteScroll threshold="100px" onIonInfinite={ e => getMore(e, refineNext) }>
					<IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Getting more movies...">
					</IonInfiniteScrollContent>
				</IonInfiniteScroll>
				</div>
			</>
		);
	});

	return (
		<IonPage className={ styles.page }>

			<IonHeader>
				<IonToolbar>
					<IonTitle>Movie List</IonTitle>
					<br /><br />
					<div className={ styles.searchContainer }>
						{/* <IonCardSubtitle>{ totalResults } { (totalResults === 1) ? "movie" : "movies" } found</IonCardSubtitle> */}
						{/* <IonSearchbar onKeyUp={ e => search(e) } onKeyPress={ e => search(e) } placeholder="Search..." icon={ searchCircleOutline } slot="end" /> */}
					</div>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen className={ styles.content }>

				<InstantSearch searchClient={searchClient} indexName="dev_movies">
    				<SearchBox />

					<div className="ais-InfiniteHits">
						<IonList className="ais-InfiniteHits-list">
							{/* <Hits hitComponent={ Hit } /> */}
							<CustomInfiniteHits />
						</IonList>
					</div>
  				</InstantSearch>
			</IonContent>
		</IonPage>
	);
};

export default Movies;