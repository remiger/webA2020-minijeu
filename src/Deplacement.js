/*******************************************************
*                                                      *
* Fichier: Deplacement.js                              *
* Fonctions pour actualiser les positions des objets   *
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

//Importation des variables nécessaires aux fonctions
import * as variable from './DeclarationObjets.js';
import * as FonctionGenerale from './FonctionsGenerales.js';
import {leCanvas} from './PageAccueil.js';

//Param: Aucun
//Fonction: Incrémente ou décrémente les positions en X et Y du joueur selon la valeur des flèches (ou WASD)
//          Le joueur ne peut pas sortir du canvas
//          On ajuste la source de l'image pour que le sprite soit dans la même direction que celle où l'utilisateur se promène
//Return: Rien
function deplacementJoueur(){
    //Calculer les futures positions du variable.joueur et ses images
    if (variable.joueur.flecheDroite) {
        variable.joueur.posX += variable.joueur.vitesse;

        //modifier la source de l'image pour la course vers la droite
        variable.joueur.img.src = "images/JoueurMarcheDroite.png";
        variable.fireball.direction = true;
    }
    if (variable.joueur.flecheGauche) {
        variable.joueur.posX -= variable.joueur.vitesse;
        
        //modifier la source de l'image pour la course vers la gauche
        variable.fireball.direction = false;
        variable.joueur.img.src = "images/JoueurMarcheGauche.png";
    }
    if (variable.joueur.flecheBas) {
        variable.joueur.posY += variable.joueur.vitesse;

        //modifier la source de l'image pour la course vers la gauche
        if ((variable.joueur.flecheGauche == false) && (variable.joueur.flecheDroite == false)){
            variable.joueur.img.src = "images/JoueurMarcheGauche.png";
            variable.fireball.direction = false;
        }

    }
    if (variable.joueur.flecheHaut) {
        variable.joueur.posY -= variable.joueur.vitesse;
        
        //modifier la source de l'image pour la course vers la droite
        if ((variable.joueur.flecheGauche == false) && (variable.joueur.flecheDroite == false)){
            variable.fireball.direction = true;
            variable.joueur.img.src = "images/JoueurMarcheDroite.png";           
        }

    }


    //Empêcher le joueur de quitter les limites de la scène
    //----- Axe horizontal
    //Limite gauche
    if (variable.joueur.posX < 0) {
        variable.joueur.posX = 0;
    }
    //Limite droite
    let posXmax = leCanvas.width - variable.joueur.largeur;
    if (variable.joueur.posX > posXmax) {
        variable.joueur.posX = posXmax;
    }
    
    //Empêcher le variable.joueur de quitter les limites de la scène
    //----- Axe vertical
    //Limite gauche
    if (variable.joueur.posY < 0) {
        variable.joueur.posY = 0;
    }
    //Limite droite
    let posYmax = leCanvas.height - variable.joueur.hauteur;
    if (variable.joueur.posY > posYmax) {
        variable.joueur.posY = posYmax;
    }
}

//Param: Aucun
//Fonction: Initialise aléatoirement une position X de départ pour les nbProjectiles
//          On joue un son lorsque les projectiles sont initialisés
//          Incrémente ou décrémente par la suite cette position dans le sens respectif à faire traverser
//          le projectile dans le canvas
//          Une fois qu'un projectile a traversé et quitté le canvas, le déplacement des projectiles est terminé et
//          le monstre revient dans le canvas
//Return: Rien
function deplacementProjectiles(){
    //Si le monstre a quitté le canvas, initialiser les positions de départ
    if(variable.monstre.beginFire == true && variable.projectile.beginInit == true){
            variable.projectile.sonProjectile.volume = 0.2;
            variable.projectile.sonProjectile.play();
            variable.projectile.position = [];
            variable.projectile.posY = [];
            variable.projectile.posX = [];
            variable.projectile.vitesseX = [];
        //Initialisation des positions en X du projectile (chaque X est aléatoire)
        for (let i = 0; i < variable.projectile.nbProjectiles; i++){
            variable.projectile.posY.push(leCanvas.height * (i/variable.projectile.nbProjectiles));
            if(FonctionGenerale.randomDeux() == 1){
                variable.projectile.posX.push(0 - variable.projectile.largeur);
                variable.projectile.vitesseX.push(variable.projectile.vitesse);
                variable.projectile.position.push(true);
            }
            else{
                variable.projectile.posX.push(leCanvas.width);
                variable.projectile.vitesseX.push(-variable.projectile.vitesse);
                variable.projectile.position.push(false);
            }
            //console.log(variable.projectile.posX[i]);
        }
        //Initialisation terminée
        variable.projectile.beginInit = false;
    }
    //Déplacement des projectiles
    if(variable.monstre.beginFire == true && variable.projectile.beginInit == false){
        for(let i = 0; i < variable.projectile.nbProjectiles; i++){
            variable.projectile.posX[i] += variable.projectile.vitesseX[i];
            
            //Si un des projectile a quitté le canvas, la phase missiles est terminée et le monstre peut revenir
            if(variable.projectile.posX[i] > (leCanvas.width + (variable.projectile.largeur * 3)) || variable.projectile.posX[i] < (0 - (3 * variable.projectile.largeur))){
                variable.monstre.beginFire = false;
                variable.monstre.vulnerable = true;
                variable.projectile.beginInit = true;
            }
        }  
    }
}

//Param: Aucun
//Fonction: Positionne aléatoirement le monstre à un endroit hors du canvas pour qu'il débute son chemin
//Return: Rien
function positionDepartVulnerableBoss(){
    if(FonctionGenerale.randomDeux() == 1){
        variable.monstre.posX = 0 - Math.max(...variable.monstre.largeur);
    }
    else{
        variable.monstre.posX = leCanvas.width;
    }
    variable.monstre.posY = Math.floor(Math.random() * (leCanvas.height - variable.monstre.hauteur));
}

//Param: Aucun
//Fonction: Positionne le monstre au départ de son trajet
//          Ajuste la direction de sa vitesse et son miroir en conséquence
//          Lorsque le monstre commence à se déplacer, on joue un son de grognement
//          Les positions X et Y sont incrémentées de manière à ce que le monstre ne sorte pas du canvas sur les
//          côtés haut et bas, mais il peut sortir du côté opposé à celui où il est entré (ex: il entre à droite et
//          sort à gauche)
//          Une fois que le monstre est sorti, on arrête les grognements et on peut débuter la séquence des projectiles
//Return: Rien
function deplacementBoss(){
    if (variable.monstre.vulnerable == true){
        positionDepartVulnerableBoss();
        if(variable.monstre.posX < 0){
            variable.monstre.vitesseX = variable.monstre.vitesse;
            variable.monstre.miroir = false;
        }
        else{
            variable.monstre.vitesseX = -variable.monstre.vitesse;
            variable.monstre.miroir = true;
        }
        variable.monstre.vulnerable = false;
    }
    variable.monstre.sonRawr.play();
    variable.monstre.sonRawr.volume = 0.5;
    variable.monstre.posX += variable.monstre.vitesseX;
    
    variable.monstre.posY += variable.monstre.vitesseY;
    
    //Si le variable.monstre touche le haut ou le bas du canvas
    //On inverse la vitesseY
    let posYmax = leCanvas.height - variable.monstre.hauteur;

    if (variable.monstre.posY < 0 || variable.monstre.posY > posYmax) {
        variable.monstre.vitesseY *= -1; //ou variable.monstre.vitesse = -variable.monstre.vitesse
    }
    
    if(variable.monstre.posX > (leCanvas.width) || variable.monstre.posX < (0 - (Math.max(...variable.monstre.largeur))*2)){
        variable.monstre.sonRawr.pause();
        variable.monstre.sonRawr.currentTime = 3;
        variable.monstre.beginFire = true;
        variable.projectile.beginInit = true;
    }
}

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {deplacementBoss, deplacementJoueur, deplacementProjectiles};
