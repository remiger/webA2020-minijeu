/*******************************************************
*                                                      *
* Fichier: main.js                                     *
* Event listeners et départ du jeu                     *
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

/*    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *

Description détaillée du jeu: 

Vous êtes un mage qui devez vaincre un monstre en évitant ses attaques. Le monstre apparaît à un intervalle
régulier, et est alors vulnérable. Lorsqu'il disparait, une vague de projectiles (des missiles) apparaîtront
à droite et/ou à gauche du canvas. Vous devez les éviter, sans quoi vous perdrez des points de vie. Une fois
que les missiles auront traversés le canvas, le monstre réapparaîtra, et vous pourrez de nouveau l'attaquer. 
Ce cycle s'effectura sans fin, jusqu'à ce que vous vainquiez le monstre... ou jusqu'à ce qu'il vous vainque!
Il n'y a pas de limite de temps, seulement une limite de vie. Lorsque vous aurez vaincu le monstre (ou l'in-
verse), un message apparaîtra et vous pourrez recommencer le jeu de la même manière que vous l'avez débuté. 

Amusez-vous bien!

-Rémi

*    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    */


//Importation des variables nécessaires aux fonctions et aux event listeners
import {presserTouche, relacherTouche, leftClick} from './EventListeners.js';
import {partirJeu} from './PageAccueil.js';

//Déclaration des event listeners pour vérifier la barre d'espace, les déplacements et les attaques
document.addEventListener("keydown", presserTouche);
document.addEventListener("keyup", relacherTouche);
document.addEventListener("click", leftClick);

//Début du jeu
partirJeu();
