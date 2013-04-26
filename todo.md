#Teil 1
##1. Model / View / Controller
	* Businesslogik wird im Model gespeichert (PlayerModel)
	* Änderungen im Model sind observable (mehrere Change-Events verwenden, daher z.B. ein Change Event für die Änderung der Lautstärke)
	* eine sinnvolle Trennung der Viewelemente (Tracklist, PlayerControls, TrackInfo, Timeline)
	* Controller verwenden soweit er Sinn macht (z.B. für Play/Pause und Stopp Button)
##2. Require JS
	* den Player modular aufbauen, hierfür Require-JS verwenden
	* die einzelnen Module sollen mit dem Compiler zu einem Javascript-File zusammengefügt werden (nicht optimiert!)
	* einzelne Module sind z.B.: Model, Controller und jeweils die View-Elemente (bitte eine sinnvolle Aufteilung, daher mehrere Buttons z.B. zu PlayerControls zusammenfassen)
	* Build-File mit abgeben + zusammengefügtes JS-File in Main einbinden
##3. Lautstärkeregler
	* als Subklasse von HSlider implementiert
	* es ist der Hslider aus der LV zur verwenden. Modifikationen der Klasse aus der LV dürft ihr gerne durchführen.
	* Lautstärke zwischen 0 und 1
	* Lautstärke soll auch bei neuen Tracks übernommen werden
	* Visuelles Feedback
##4. Buttons
	* Play/Stopp/Pause (kombiniert oder nicht) - derzeitiger Status soll sichtbar sein
	* der Mouse-Hover Status soll visuell sichtbar sein
	* Bei Stopp an den Anfang des aktuellen Songs zurückgehen
##5. Zeitleiste
	* eigene Zeitleiste, nicht die Browser interne
	* Spielzeit per Drag & Drop verstellbar
	* Anzeige der Abspielzeit als Text (aktuelle Abspielzeit und restliche Abspielzeit)
	* Aktuelle Spielzeit (Position - Playhead) anzeigen
	* Zeiten korrekt und User-freundlich formatieren
	* Gepufferte Spielzeit anzeigen
##5. Trackliste
	* der aktuelle dargestellte Track soll in der Trackliste besonders dargestellt werden (bitte überlegt euch eine geeignete Darstellung)
	*Doppelklick auf einen Track in einer Trackliste soll einen Track starten
##6. Drag&Drop Track
	* Ein Track ist per Drag & Drop verschiebbar (siehe Teil 2)
	* Sichtbare Linie beim Verschieben von Tracks, um die Absetzposition zu erkennen
	* Es sollen nur einzelne Tracks verschoben werden (nicht mehrere gleichzeitig)
	* Drag and Drop Funktionalität in DraggableItem implementieren, sodass es wiederverwendet werden kann (nicht im Track selbst)
##7. Trackinfo
	* Info zum aktuell gespielten Track - Text (Artist, Album, Genre)
##8. Allgemeines
	* Nach Trackende nächsten Track abspielen (Lautstärke vom vorherigen übernehmen)
	* Nachdem der letzte Track in der Liste abgespielt wurde, abspielen beim ersten Track stoppen
	* Trackliste wird aus einem JSON-File geladen (tracklist.json wird vorgegeben, siehe Anhang) (Model)
	* Trackliste ist ein Array, jedem Track initial eine ID geben (Model)
	* zum Abspielen des Audio-Files ein Audio Element verwenden – siehe Beispiel Vorlesung (Model, aber nicht für die Anzeige!) (Pro: oder die Web Audio API)
	* das Beispiel muss nur im aktuellen Google Chrome funktionieren (nicht Canary)
##9. Abgabe
	* Keine MP3-Dateien abgeben

# Teil 2 (Drag & Drop)
	* Ändern der Track-Reihenfolge durch Drag & Drop: Track soll durch Drag & Drop an eine andere Position gezogen werden können. Während des Ziehens soll es einen visuellen Indikator geben, wo im Fall von Drop der Track eingefügt würden. Die Drag-Funktionalität soll vom Track losgelöst in DraggableItem implementieren werden. Eine der folgenden Möglichkeiten ist zu implementieren:
		a. Strich zwischen zwei Tracks als Drop-Indikator
		b. Es bildet sich ein Spalt (Gap) zwischen den Tracks in der Liste an welchen sich das gedraggte Element einordnen soll.
	
	Beim Ziehen des selektierten Tracks soll es folgendes visuelles Feedback geben. Dazu ist eine der folgenden Möglichkeiten zu implementieren
		a. Der gedraggte Track wird aus der Liste entfernt
		b. Der Track verbleibt in der Liste, es gibt einen visuellen „proxy“, der gezogen wird.

	Bei beiden Möglichkeiten gibt es folgende Varianten:
		a. Die Tacks rutschen zusammen
		b. Die Abstände bleiben erhalten wie in der Liste zum Zeitpunkt von DragStart.

	Es soll eine Möglichkeit implementiert werden, die Drag & Drop Operation zu canceln, indem man den Track außerhalb der Tracklist fallen lässt (keine Veränderung der Reihenfolge).
