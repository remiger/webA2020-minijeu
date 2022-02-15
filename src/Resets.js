/*******************************************************
*                                                      *
* Fichier: Resets.js                                   *
* Fonctions pour réinitialiser les objets              *
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

//Importation des variables nécessaires aux fonctions
import {monstre, joueur, fireball, projectile} from './DeclarationObjets.js';
import{leCanvas} from './PageAccueil.js';

//Param: Aucun
//Fonction: Réinitialise tous les paramètres du monstre qui peuvent être modifiés durant la partie
//Return: Rien
function resetMonstre(){
    monstre.vie = 100;
    monstre.vitesseX = 4;
    monstre.vitesseY = 4;
    monstre.posX = 0;
    monstre.posY = 0;
    monstre.miroir = false;
    monstre.beginFire = false;
    monstre.hit = false;
    monstre.indexVignette = 0;
    monstre.compteurHit = 0;
    monstre.sourceX = 0;
    monstre.img.src = "images/PteraDroiteArray.png";
}

//Param: Aucun
//Fonction: Réinitialise tous les paramètres du projectile qui peuvent être modifiés durant la partie
//Return: Rien
function resetProjectile(){
    projectile.position = [];
    projectile.posY = [];
    projectile.posX = [];
    projectile.vitesseX = [];
    projectile.projectileDone = false;
    projectile.beginInit = true;
    projectile.indexVignette = 0;
    projectile.sourceX = 0;
}

//Param: Aucun
//Fonction: Réinitialise tous les paramètres du joueur qui peuvent être modifiés durant la partie
//Return: Rien
function resetJoueur(){
    joueur.nbClicks = 0;
    joueur.posX = leCanvas.width/2;
    joueur.posY = leCanvas.height/2;
    joueur.vie = 100;
    joueur.indexVignette = 0;
    joueur.sourceX = 0;
}

//Param: Aucun
//Fonction: Réinitialise tous les paramètres de la fireball qui peuvent être modifiés durant la partie
//Return: Rien
function resetFireball(){
    fireball.direction = true;
    fireball.compteur = 0;
    fireball.indexVignette = 4;
    fireball.sourceX = 952;
}

//Param: Aucun
//Fonction: Réinitialise tous les paramètres de tous les objets qui peuvent être modifiés durant la partie
//Return: Rien
function resetAllObjects(){
    resetJoueur();
    resetMonstre();
    resetProjectile();
    resetFireball();
}

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {resetAllObjects};