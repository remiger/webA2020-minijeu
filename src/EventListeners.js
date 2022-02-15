/*******************************************************
*                                                      *
* Fichier: EventListeners.js                           *
* Fonctions utilisées dans les EventListeners du main  *
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

//Importation des variables nécessaires aux fonctions
import * as FonctionGenerale from './FonctionsGenerales.js';
import {accueil, joueur, monstre, fireball} from './DeclarationObjets.js';

//Param: Rien
//Fonction: Si l'utilisateur n'est plus sur la page d'accueil (c'est-à-dire dans l'interface
//          de combat), et si celui-ci clique (Mouse 1), on incrémente joueur.nbClicks
//          Une fois que le nb de clicks atteint 5, c'est un coup et le monstre prendra du dommage
//          On joue un son de boule de feu, peu importe si le coup touche le monstre ou non
//          On réinitialise le nb de clicks à 0 quand c'est le cas
//Return: Rien
function leftClick(){
    if(accueil.joueurClicked == true){
        fireball.indexVignette = joueur.nbClicks;
        joueur.nbClicks++;
        fireball.sourceX = fireball.largeur * fireball.indexVignette;
        joueur.nbClicks = joueur.nbClicks % 6;
        if(joueur.nbClicks == 5){
            fireball.sonFireball.volume = 0.3;
            fireball.sonFireball.play();
            monstre.hit = true;
            joueur.nbClicks = 0;
        }
    }
}

//Param: Aucun
//Fonction: Modifie l'état des flèches (true ou false) dans l'objet joueur en fonction de
//          ce que l'utilisateur appuie (flèches ou wasd)
//Return: Rien
function presserTouche(event) {
    //Enregistrer si une touche gauche/droite est pressée
    if (event.keyCode == 39 || event.keyCode == 68) { //flèche droite ou d
        joueur.flecheDroite = true;
        joueur.flecheGauche = false;
    }
    if (event.keyCode == 37 || event.keyCode == 65) { //flèche gauche ou a
        joueur.flecheGauche = true;
        joueur.flecheDroite = false;

    }
    if(event.keyCode == 38 || event.keyCode == 87){ //flèche haut ou w
        joueur.flecheHaut = true;
        joueur.flecheBas = false;
    }
    if(event.keyCode == 40 || event.keyCode == 83){ //flèche bas ou s
        joueur.flecheBas = true;
        joueur.flecheHaut = false;
    }
}

//Param: Aucun
//Fonction: Modifie l'état des flèches (true ou false) dans l'objet joueur en fonction de
//          ce que l'utilisateur relâche (flèches ou wasd)
//          Modifie également la source de l'image du joueur et la direction de la fireball
//          selon la direction
//          Vérifie également si l'utilisateur relâche (et donc a appuyé) sur la barre d'espace
//          dans la page d'accueil OU quand le monstre ou joueur est mort
//Return: Rien
function relacherTouche(event) {
    //Enregistrer si une touche gauche/droite est relâchée
    if (event.keyCode == 39 || event.keyCode == 68) { //flèche droite
        joueur.flecheDroite = false;
        fireball.direction = true;
        joueur.img.src = "images/JoueurDeboutDroite.png";//********modifier la source du joueur pour arret droite
    }
    if (event.keyCode == 37 || event.keyCode == 65) { //flèche gauche
        joueur.flecheGauche = false;
        fireball.direction = false;
        joueur.img.src = "images/JoueurDeboutGauche.png";//******modifier la source du joueur pour arret gauche
    }
    if(event.keyCode == 38 || event.keyCode == 87) { //joueur.fleche up
        joueur.flecheHaut = false;
        fireball.direction = true;
        joueur.img.src = "images/JoueurDeboutDroite.png";//********modifier la source du joueur pour arret droite
    }
    if(event.keyCode == 40 || event.keyCode == 83){ // joueur.fleche down
        joueur.flecheBas = false;
        fireball.direction = false;
        joueur.img.src = "images/JoueurDeboutGauche.png";//******modifier la source du joueur pour arret gauche
    }
    if (event.keyCode == 32) { //barre d espace
        accueil.joueurClicked = true;
        if((FonctionGenerale.entityDead(joueur) == true) || (FonctionGenerale.entityDead(monstre) == true)){
            accueil.joueurClicked = false;
            accueil.reset = true;
        }
    }
}

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {leftClick, relacherTouche, presserTouche};
