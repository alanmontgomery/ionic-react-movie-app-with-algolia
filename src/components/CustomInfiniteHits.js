import { IonCardSubtitle, IonCardTitle, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonRow } from "@ionic/react";
import { connectInfiniteHits } from "react-instantsearch-core";
import CustomSearchHit from "./CustomSearchHit";

const CustomInfiniteHits = ({ hits, hasMore, refineNext }) => {

	const getMore = (e, refine) => {

		refine();
		e.target.complete();
	}

	return (

		<div className="ais-InfiniteHits">
			<IonList className="ais-InfiniteHits-list">	
				<div className="ais-Hits__root">

					<IonRow>
						{ hits.map(hit => <CustomSearchHit key={ hit.objectID } hit={ hit } />) }

						{ hits.length < 1 &&
							<IonCol size="12" className="ion-text-center ion-padding-top ion-margin-top">
								<IonCardTitle>No results found</IonCardTitle>
								<IonCardSubtitle>Try something else</IonCardSubtitle>
							</IonCol>
						}
					</IonRow>

					<IonInfiniteScroll threshold="100px" onIonInfinite={ e => getMore(e, refineNext) }>
						<IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Getting more movies..." />
					</IonInfiniteScroll>
				</div>
			</IonList>
		</div>
	);
}

export default connectInfiniteHits(CustomInfiniteHits);