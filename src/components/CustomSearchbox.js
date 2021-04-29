import { IonSearchbar } from "@ionic/react";
import { searchCircleOutline } from "ionicons/icons";
import { connectSearchBox } from "react-instantsearch-core";

const CustomSearchBox = ({ currentRefinement, refine }) => (
	<IonSearchbar animated={ true } onIonCancel={ () => refine('') } value={ currentRefinement } onIonChange={ event => refine(event.currentTarget.value) } onKeyUp={ event => refine(event.currentTarget.value) } placeholder="Try 'Avengers'" icon={ searchCircleOutline } slot="end" />
);

export default connectSearchBox(CustomSearchBox);