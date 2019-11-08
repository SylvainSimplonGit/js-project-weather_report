# Projet Javascript Bulletin météo

- [Description du projet](#Description-du-projet)
- [Livrables attendus](#Livrables-attendus)
- [Énoncé du brief](#Énoncé-du-brief)
- [Implémentation du code](#Implémentation-du-code)
  - [HTML](#html)
  - [CSS](#css)
  - [JAVASCRIPT](#javascript)
- [Utilisation](#Utilisation)
- [Reste à faire](#Reste-à-faire)
  - [Implémentation](#implémentation)
  - [Responsive](#responsive)

<p align="center">
    <img width="30%" style="border: 1px solid #000000;" src="resources\screenshots\menu-none.png">
</p>

## Description du projet

Grâce à un petit Raspberry, l'équipe pédagogique mettra à votre disposition une petite station météo qui mesurera toutes les minutes la température, la pression et l'humidité de la salle de formation. Ces mesures seront accessibles grâce à une API et vous aurez la responsabilité de les exploiter pour afficher un bulletin météo de la promo.

## Livrables attendus

L'adresse de votre repository github hébergeant le code de votre bulletin météo.

## Énoncé du brief

Votre mission est de réaliser un bulletin météo à 4 menus :

1. Visualisation de la dernière mesure (température, pression et humidité) dans la salle.
1. Visualisation des top mesures de température, pression et humidité
1. Visualisation des mesures de la dernière journée sous forme de tableau
1. Bonus : Visualisation des mesures de la dernière journée sous forme de graphique (avec par exemple : <https://www.chartjs.org/>)

Vous trouverez en pièce jointe de ce brief un zip qui embarque plusieurs captures d'écran :

- Des captures de l'interface graphique attendu (last-measure, top-measures, table-measures et graph-measures).
- Des captures d'écran de la spécification de l'API que vous pouvez utiliser pour récupérer les mesures
- Un exemple JavaScript d'appel de l'API

## Implémentation du code

### HTML

le fichier **index.html** utilise comme ressources :

- les fichiers CSS :

  - font.css
  - style.css

- les fichiers JAVASCRIPT :

  - chart-2.9.2.min.js
  - moment-with-locales.min.js
  - script.js

### CSS

- font.css :

  Ce fichier contient les polices de caractères utilisées sur le site. Il contient la description de la police *Source Sans Pro Regular* qui est appelé dans le fichier **style.css**
  
- style.css :

  Ce fichier contient toutes les règles CSS utilisées par le site.

  Le premier bloc *:root* permet de déclarer des variables utilisés à différents endroits dans le ficheir CSS. Cela permet de ne changer une couleur par exemple qu'une seule fois dans le code.

  A la fin du fichier, l'utilisation des *médias queries* permet de modifier l'affichage des éléments en fonction de la largeur de l'écran du device sur lequel s'affiche la page WEB.

### JAVASCRIPT

- chart-2.9.2.min.js :

  Ce fichier permet l'affichage des graphiques suite à l'appel au menu "Les mesures en graphiques".
  
  Il a été récupérer sur le site <https://www.chartjs.org/>.
  
  On peut trouver des examples d'utilisation de cette librairie sur cette page <https://www.chartjs.org/samples/latest/>

- moment-with-locales.min.js :

  Ce fichier permet la gestion des dates sous javascript.

  Il a été récupérer sur le site <https://momentjs.com/downloads/moment-with-locales.js>.
  
  On peut trouver des examples d'utilisation de cette librairie sur cette page <https://momentjs.com/>

- script.js :

  Ce fichier contient toutes les fonctions utilisées pour gérées les données (format, accès, ...) et leur affichages.

## Utilisation

Lorsque vous cliquez sur les différents menus, vous verrez apparaitre les données mises en forme sous le menu et le menu actif sera mis en évidence.

Menu "la dernière mesure" :
<p align="center">
    <img width="30%" style="border: 1px solid #000000;" src="resources\screenshots\menu-lastMeasures.png">
</p>

Menu "les top mesures" :
<p align="center">
    <img width="30%" style="border: 1px solid #000000;" src="resources\screenshots\menu-topMeasures.png">
</p>

Menu "les mesures en tableau" :

Menu "les mesures en graphique" :

<p align="center">
    <img width="30%" style="border: 1px solid #000000;" src="resources\screenshots\menu-graphMeasures.png">
</p>

## Reste à faire

### Implémentation

- Pouvoir choisir un intervalle de date pour l'affichage des données du tableau

- Pouvoir choisir un intervalle de date pour l'affichage des données du graphique

### Responsive

- Modifier l'affichage du tableau sur un écran inférieure à 700px
- Afficher un graphique "vue-barre" au lieu du graghique "line" pour les écran dont la largeur est inférieure à 400px
- Modifier le menu actuel sur écran dont la largeur est inférieure à 768px pour que les entrées du menus soient affichées qu'au clic sur un bouton (façon bootstrap).

