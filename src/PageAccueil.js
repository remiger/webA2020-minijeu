/*******************************************************
*                                                      *
* Fichier: PageAccueil.js                              *
* Fonctions de départ du jeu et déclaration du canvas  *
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

//Importation des variables nécessaires aux fonctions
import {intervallesBossFight} from './BossFight.js';
import {accueil, joueur, monstre} from './DeclarationObjets.js'
import * as FonctionGenerale from './FonctionsGenerales.js';

//Déclaration de variables pour le canvas
let leCanvas = document.querySelector("canvas");
let ctx = leCanvas.getContext("2d");

//Déclaration de variables pour storer mes intervalles
let intervalleAccueil;

//Param: Aucun
//Fonction: Joue une musique tant que l'utilisateur n'appuie pas sur la barre d'espace
//          Lorsque l'utilisateur quitte le menu, la musique arrête, on clear l'intervalle du menu et on set l'intervalle
//          pour le combat du boss
//Return: Rien
function dessinerAccueil(){
    accueil.sonAccueil.play();
    accueil.sonAccueil.volume = 0.2;
    if(accueil.joueurClicked == false){
        ctx.clearRect(0, 0, leCanvas.width, leCanvas.height);
        ctx.drawImage(accueil.img, 0, 0, leCanvas.width, leCanvas.height);
    }
    else{
        accueil.sonAccueil.pause();
        clearInterval(intervalleAccueil);
        intervallesBossFight();
    }
}

//Param: Aucun
//Fonction: Attribue un setInterval avec la fonction de l'accueil pour notre variable désignée
//Return: Rien
function partirJeu(){
    intervalleAccueil = setInterval(dessinerAccueil, 1000/60);
}

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {accueil, partirJeu, leCanvas, ctx};