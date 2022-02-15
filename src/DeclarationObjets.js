/*******************************************************
*                                                      *
* Fichier: DeclarationObjets.js                        *
* Déclaration des objets accueil, joueur, monstre, pro-*
* jectile et fireball. Affectation de leurs img.src    *
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

//Importation des variables nécessaires à la déclaration d'objets
import {leCanvas} from './PageAccueil.js';

//Déclaration de l'objet accueil
const accueil = {
    img: new Image(),
    imgBG: new Image(),
    messageVictoire: new Image(),
    messageDefaite: new Image(),
    sonAccueil: new Audio("sons/menuMusic.mp3"),
    joueurClicked: false,
    reset: false
}

//Affectation des sources images dans accueil
accueil.img.src = "images/CoverHomepage.png";
accueil.imgBG.src = "images/ForestBG.png";
accueil.messageDefaite.src = "images/messageDefaite.png";
accueil.messageVictoire.src = "images/messageVictoire.png";

//Déclaration de l'objet monstre
const monstre = {
    img: new Image(),
    musiqueBoss: new Audio("sons/bossMusic.mp3"),
    sonRawr: new Audio("sons/rawr.wav"),
    vie: 100,
    vieMax: 100,
    posX: 0,
    posY: 0,
    vitesseX: 4,
    vitesseY: 4,
    vitesse: 4,
    hauteur: 95,
    largeur: [102, 110, 86, 58, 60, 80, 126, 106, 82],
    miroir: false,
    beginFire: false,
    hit: false,
    degat: 5,
    compteurHit: 0,
    indexVignette: 0,
    nbVignette: 9,
    sourceX: 0
}

//Affectation des sources images dans monstre
monstre.img.src = "images/PteraDroiteArray.png";

//Déclaration de l'objet projectile
const projectile = {
    imgDroite: new Image(),
    imgGauche: new Image(),
    sonProjectile: new Audio("sons/projectile.wav"),
    nbProjectiles: 10,
    position: [],
    posY: [],
    posX: [],
    vitesseX: [],
    vitesse: 8,
    largeur: 45,
    hauteur: 31,
    projectileDone: false,
    beginInit: true,
    indexVignette: 0,
    nbVignette: 4,
    sourceX: 0
}

//Affectation des sources images dans projectile
projectile.imgDroite.src = "images/TorpedoDroite.png";
projectile.imgGauche.src = "images/TorpedoGauche.png";

//Déclaration de l'objet joueur
const joueur = {
    img: new Image(),
    musiqueMort: new Audio("sons/deathMusic.mp3"),
    musiqueWin: new Audio("sons/victoryMusic.mp3"),
    sonGotHit: new Audio("sons/manGotHit.wav"),
    flecheDroite: false,
    flecheGauche: false,
    flecheHaut: false,
    flecheBas: false,
    nbClicks: 0,
    degat: 5,
    vie: 100,
    vieMax: 100,
    posX: leCanvas.width/2,
    posY: leCanvas.height/2,
    vitesse: 5,
    hauteur: 55,
    largeur: 50,
    indexVignette: 0,
    nbVignette: 5,
    sourceX: 0
}

//Affectation des sources images dans joueur
joueur.img.src = "images/JoueurDeboutDroite.png";

//Déclaration de l'objet fireball
const fireball = {
    img: new Image(),
    sonFireball: new Audio("sons/fireball.wav"),
    direction: true,
    compteur: 0,
    largeur: 238,
    hauteur: 238,
    indexVignette: 4,
    nbVignette: 5,
    sourceX: 952
}

//Affectation des sources images dans fireball
fireball.img.src = "images/FireballDroite.png";

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {accueil, joueur, monstre, projectile, fireball};
