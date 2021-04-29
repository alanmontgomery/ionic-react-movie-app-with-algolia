import { IonButton, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import styles from './Movies.module.scss';

//	Algolia imports
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

//	Custom Algolia UI
import CustomSearchbox from '../components/CustomSearchbox';
import CustomInfiniteHits from '../components/CustomInfiniteHits';
import { useEffect } from 'react';
import { addOutline } from 'ionicons/icons';

const searchClient = algoliasearch('QZKBD6VPU7', 'db21b77f5f3bf4d4cbde385b7f33c60d');

const Movies = props => {

	//	PWA functionality for a custom add to homescreen
	//	This allows us to display a custom button based on service worker
	useEffect(() => {
    
		const buttInstall = document.getElementById('buttInstall');
		window.addEventListener('beforeinstallprompt', (event) => {
			
			console.log('👍', 'beforeinstallprompt', event);
			
			//	Save the event so it can be triggered later.
			window.deferredPrompt = event;
			buttInstall.classList.toggle('hidden', false);
		});
	
		window.addEventListener('appinstalled', (event) => {
			
			console.log('👍', 'appinstalled', event);
			// Clear the deferredPrompt so it can be garbage collected
			window.deferredPrompt = null;
		});
	}, []);

	const addToHomeScreen = async () => {

		const buttInstall = document.getElementById('buttInstall');

		console.log('👍', 'buttInstall-clicked');
		const promptEvent = window.deferredPrompt;
		
		if (!promptEvent) {
			
			// The deferred prompt isn't available.
			return;
		}

		// Show the install prompt.
		promptEvent.prompt();
		
		// Log the result
		const result = await promptEvent.userChoice;
		console.log('👍', 'userChoice', result);
		
		// Reset the deferred prompt variable, since
		// prompt() can only be called once.
		window.deferredPrompt = null;

		// Hide the install button.
		buttInstall.classList.toggle('hidden', true);
	}

	return (
		<IonPage className={ styles.page }>

			<InstantSearch searchClient={ searchClient } indexName="dev_movies">
				<IonHeader>
					<IonToolbar>
						<div className={ styles.searchContainer }>							
							<IonCardTitle>Movie List</IonCardTitle>
							<IonCardSubtitle>with algolia search</IonCardSubtitle>
							<CustomSearchbox />

							<IonButton id="buttInstall" color="success" fill="solid" size="small" className="hidden add-button" onClick={ () => addToHomeScreen() }>
								<IonIcon icon={ addOutline } />&nbsp;&nbsp;Install App
							</IonButton>
						</div>
					</IonToolbar>
				</IonHeader>

				<IonContent fullscreen>						
					<CustomInfiniteHits />
				</IonContent>
			</InstantSearch>
		</IonPage>
	);
};

export default Movies;