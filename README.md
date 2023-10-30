# ReactApp CRF-XelKoomIA

Ceci est une interface utilisateur permettant de visualiser les entités nommées prédites par notre modèle NER basé sur le CRF à l'aide d'un texte envoyé ou d'un fichier pdf uploader.


## Table des matières

- [À Propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)

## À Propos

Cette application fait appel à l'API dévelloper avec FastAPI qui nous permettrai d'offrir une interface simple pour visualiser les entités nommées en tapant un du texte ou bien uploader un fichier pdf. Cela offrirai une visualisation rapide des entités d'un text.

## Fonctionnalités

Cette Interface React offre les fonctionnalités suivantes :

- **Extraction d'Entités Nomées (NER) :** Elle permet d'extraire les entités nommées d'un texte en utilisant un modèle NER pré-entrainé.

- **Traitement de Fichiers PDF :** Elle prend également en charge l'envoi de fichiers PDF pour l'extraction d'entités nommées à partir de ces fichiers.

- **Visualisations des entités nommées :** Les réponses renvoyées par l'API sont structurées et bien formatées pour une visualisation facile et claire.
- 
- **Recherche des entités nommées :** Ceci permettra de faire focus sur un mot ou groupe de mot en question et de voir quel sera le L'entité nommée prédite.



## Installation

Pour utiliser cette Application React sur votre propre système, suivez ces étapes :

1. S'assurer d'avoir déjà en possession l'API https://github.com/abdoulahadi/api-pas-challenge

2. Clônez le référentiel depuis GitHub :
   ```bash
    git clone https://github.com/abdoulahadi/frontend-pas-challenge.git
    cd frontend-pas-challenge

3. Installez les dépendances :
   ```bash
    npm install

4. Lancez l'application FastAPI :
   ```bash
    npm start
L'Application sera maintenant accessible localement à l'adresse http://127.0.0.1:3000.

## Utilisation
Après ces étapes, vous avez à disposition l'application pour tester à votre guise.
