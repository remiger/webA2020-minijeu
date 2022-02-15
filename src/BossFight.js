/*******************************************************
*                                                      *
* Fichier: BossFight.js                                *
* Fonctions lors du combat joueur/monstre              *
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
import * as resetLesChoses from './Resets.js';
import * as deplacement from './Deplacement.js';
import {accueil, joueur, monstre, projectile, fireball} from './DeclarationObjets.js';
import {partirJeu, leCanvas, ctx} from './PageAccueil.js';

//Déclaration de variables pour storer mes intervalles
let intervalleActualiserBoss;
let intervalleAnimerPersoCinq;
let intervalleAnimerPersoNeuf;
let intervalleWinLose;

//Param: Aucun
//Fonction: Vérifie si l'image du joueur et l'image du monstre sont en collision en même temps que l'utilisateur clique (attaque)
//          Si c'est le cas, on remet le hit de l'utilisateur à false (il doit de nouveau charger l'attaque), on attribue les dégâts
//          et on démarre un compteurHit pour l'affichage du monstre blessé (utilisé dans la fonction de dessin du monstre)
//Return: Rien
function bossGotHit(){
    if(FonctionGenerale.detecterCollisionArray(joueur, monstre, 0, 2) == true && monstre.hit == true){
        monstre.hit = false;
        monstre.vie -= joueur.degat;
        monstre.compteurHit = 150;
    }
}

//Param: Aucun
//Fonction: Vérifie un à un tous les projectiles pour voir s'il y a collision avec le joueur, si c'est le cas,
//          on retire au joueur des points de vie selon les dégâts du monstre tant qu'il est en collision.
//          On fait aussi jouer un bruit pour donner une rétroaction sonore
//Return: Rien
function joueurGotHit(){
    for(let i = 0; i < projectile.nbProjectiles; i++){
        if(FonctionGenerale.detecterCollisionJoueurProjectile(joueur, projectile, i, 20, 2) == true){
            joueur.vie -= monstre.degat;
            joueur.sonGotHit.play();
        }
    }
}

//Param: Aucun
//Fonction: S'occupe d'écrire en haut du Canvas les points de vie en pourcentage du joueur et du monstre
//Return: Rien
function afficherPointsVie(){
    //Styles du texte      
    ctx.font = " 40px Calibri";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    
    //Desssiner le score
    ctx.fillText("Votre vie : " + Math.ceil((joueur.vie / joueur.vieMax) * 100) + "%", leCanvas.width/3, 0);
    ctx.fillText("Vie du boss : " + Math.ceil((monstre.vie / monstre.vieMax) * 100) + "%", 2*(leCanvas.width/3), 0);
}

//Param: Aucun
//Fonction: S'occupe de dessiner la fireball selon la position du joueur
//          Si l'utilisateur a débuté l'attaque mais ne l'a pas terminée après un certain temps,
//          la fireball disparait à l'aide de fireball.compteur
//Return: Rien
function dessinerFireball(){
    fireball.compteur++;
    if(fireball.compteur > 90){
        fireball.compteur = 0;
        fireball.sourceX = 952;
        joueur.nbClicks = 0;
    }
    if(fireball.direction == true){
        fireball.img.src = "images/FireballDroite.png";
        ctx.drawImage(fireball.img, fireball.sourceX, 0, fireball.largeur, fireball.hauteur, joueur.posX + 10, joueur.posY, 50, 50);
    }
    else if(fireball.direction == false){
        fireball.img.src = "images/FireballGauche.png";
        ctx.drawImage(fireball.img, fireball.sourceX, 0, fireball.largeur, fireball.hauteur, joueur.posX - 10, joueur.posY, 50, 50);
    }
}

//Param: multiplicateur: définit combien de fois on grossit l'image originale
//Fonction: S'occupe de dessiner les projectiles sur le canvas. Puisqu'il n'y a qu'un objet projectile, on parcourt
//          chaque position X pour savoir combien il faut en dessiner. Les autres paramètres permettant de savoir
//          comment dessiner le projectile se trouve dans la même position du tableau (ex: position[i] permet de 
//          savoir si on prend l'image de projectile allant vers la droite ou vers la gauche
//Return: Rien
function dessinerProjectile(multiplicateur){
    for (let i = 0; i < projectile.posX.length; i++){
        if(projectile.position[i] == true){
            ctx.drawImage(projectile.imgDroite, projectile.sourceX, 0, projectile.largeur, projectile.hauteur, projectile.posX[i], projectile.posY[i], projectile.largeur * multiplicateur, projectile.hauteur * multiplicateur);
        }
        else{
            ctx.drawImage(projectile.imgGauche, projectile.sourceX, 0, projectile.largeur, projectile.hauteur, projectile.posX[i], projectile.posY[i], projectile.largeur * multiplicateur, projectile.hauteur * multiplicateur);
        }
        //console.log("je dessine le " + i + " en x : " + projectile.posX[i] + " et en y " + projectile.posY[i]);
    }
}

//Param: multiplicateur: définit combien de fois on grossit l'image originale
//Fonction: Vérifie dans un premier lieu quelle source d'image choisir selon le côté où est généré le monstre et selon
//          monstre.compteurHit qui était affecté à 150 en cas de coup réussi par l'utilisateur
//          Dessine ensuite le monstre avec un sprite de différentes largeurs et/ou à l'envers
//Return: Rien
function dessinerMonstre(multiplicateur){
    if(monstre.miroir == false){
        if(monstre.compteurHit > 100){
            monstre.img.src = "images/PteraDroiteArrayDamaged.png";
            monstre.compteurHit--;
        }
        else if(monstre.compteurHit > 50){
            monstre.img.src = "images/PteraDroiteArrayDamaged1.png";
            monstre.compteurHit--;
        }
        else if(monstre.compteurHit > 0){
            monstre.img.src = "images/PteraDroiteArrayDamaged2.png";
            monstre.compteurHit--;
        }
        else{
            monstre.img.src = "images/PteraDroiteArray.png"; 
        }
        ctx.drawImage(monstre.img, monstre.sourceX, 0, monstre.largeur[monstre.indexVignette], monstre.hauteur, monstre.posX, monstre.posY, (monstre.largeur[monstre.indexVignette])*multiplicateur, (monstre.hauteur*multiplicateur));
    }
    else{
        if(monstre.compteurHit > 100){
            monstre.img.src = "images/PteraGaucheArrayDamaged.png";
            monstre.compteurHit--;
        }
        else if(monstre.compteurHit > 50){
            monstre.img.src = "images/PteraGaucheArrayDamaged1.png";
            monstre.compteurHit--;
        }
        else if(monstre.compteurHit > 0){
            monstre.img.src = "images/PteraGaucheArrayDamaged2.png";
            monstre.compteurHit--;
        }
        else{
            monstre.img.src = "images/PteraGaucheArray.png"; 
        }
        ctx.drawImage(monstre.img, monstre.sourceX, 0, monstre.largeur[monstre.nbVignette - (monstre.indexVignette + 1)], monstre.hauteur, monstre.posX, monstre.posY, (monstre.largeur[monstre.nbVignette - (monstre.indexVignette + 1)])*multiplicateur, (monstre.hauteur*multiplicateur)); 
    }
}

//Param: multiplicateur: définit combien de fois on grossit l'image originale
//Fonction: Dessine le joueur (sprite normal avec des largeurs identiques) dans le canvas
//Return: Rien
function dessinerJoueur(multiplicateur){
    ctx.drawImage(joueur.img, joueur.sourceX, 0, joueur.largeur, joueur.hauteur, joueur.posX, joueur.posY, joueur.largeur * multiplicateur, joueur.hauteur * multiplicateur);
}

//Param: Aucun
//Fonction: Regroupe toutes les fonctions de dessin pour les différents objets, permettant d'appeler
//          une seule fonction dans le setInterval
//Return: Rien
function dessinerLesPersos(){
    ctx.clearRect(0, 0, leCanvas.width, leCanvas.height);
    ctx.drawImage(accueil.imgBG, 0, 0, leCanvas.width, leCanvas.height);
    dessinerMonstre(2);
    dessinerJoueur(1);
    dessinerProjectile(2);
    dessinerFireball();
}



//Param: Aucun
//Fonction: Permet d'animer tous les persos sprite qui ont besoin d'un setInterval à 1000/9
//Return: Rien
function animerPersoNeufSurMille(){
    FonctionGenerale.animerUnPersoSprite(monstre);
}

//Param: Aucun
//Fonction: Permet d'animer tous les persos sprite qui ont besoin d'un setInterval à 1000/5
//Return: Rien
function animerPersoCinqSurMille(){
    FonctionGenerale.animerUnPersoSpriteNormal(projectile);
    FonctionGenerale.animerUnPersoSpriteNormal(joueur);
}    

//Param: Aucun
//Fonction: Vérifie si l'utilisateur a gagné ou perdu, si un cas comme l'autre devient vrai, appelle la fonction qui clear 
//          les intervalles du combat et on démarre une nouvelle intervalle avec respectivement la fonction youWin ou youLose
//Return: Rien
function verifierWinLose(){
    if(FonctionGenerale.entityDead(joueur) == true){
        stopIntervallesBossFight();
        intervalleWinLose = setInterval(youLose, 1000/60);
    }
    if(FonctionGenerale.entityDead(monstre) == true){
        stopIntervallesBossFight();
        intervalleWinLose = setInterval(youWin, 1000/60);
    }
}

//Param: Aucun
//Fonction: Démarre une musique de défaite et affiche un message pour l'utilisateur
//          Si l'utilisateur appuie sur la barre d'espace, on réinitialise tout et le jeu recommence
//Return: Rien
function youLose(){
    joueur.musiqueMort.play();
    joueur.musiqueMort.volume = 0.2;
    ctx.drawImage(accueil.messageDefaite, 300, 200, accueil.messageDefaite.width, accueil.messageDefaite.height);
    if(accueil.reset == true){
        joueur.musiqueMort.currentTime = 0;
        accueil.sonAccueil.currentTime = 0;
        resetLesChoses.resetAllObjects();
        accueil.reset = false;
        joueur.musiqueMort.pause();
        clearInterval(intervalleWinLose);
        partirJeu();
    }
}

//Param: Aucun
//Fonction: Démarre une musique de victoire et affiche un message pour l'utilisateur
//          Si l'utilisateur appuie sur la barre d'espace, on réinitialise tout et le jeu recommence
//Return: Rien
function youWin(){
    joueur.musiqueWin.play();
    joueur.musiqueWin.volume = 0.2;
    ctx.drawImage(accueil.messageVictoire, 300, 200, accueil.messageVictoire.width, accueil.messageVictoire.height);
    if(accueil.reset == true){
        joueur.musiqueWin.currentTime = 0;
        accueil.sonAccueil.currentTime = 0;
        resetLesChoses.resetAllObjects();
        accueil.reset = false;
        joueur.musiqueWin.pause();
        clearInterval(intervalleWinLose);
        partirJeu();
    }
}

//Param: Aucun
//Fonction: Vérifier si le monstre ou le joueur se fait taper, actualise le prochain déplacement du joueur, des
//          projectiles et du monstre (si les projectiles ne sont pas en déplacement), dessine les objets et les
//          points de vie et vérifie si l'utilisateur a gagné ou perdu
//Return: Rien
function actualiserBossFight(){
    bossGotHit();
    joueurGotHit();
    deplacement.deplacementJoueur();
    dessinerLesPersos();
    afficherPointsVie();
    if(projectile.beginInit == true){
        deplacement.deplacementBoss();
    }
    deplacement.deplacementProjectiles();
    verifierWinLose();
}

//Param: Aucun
//Fonction: Joue la musique de boss lorsque le combat est en cours et set les intervalles pour les animations et 
//          l'actualisation du combat à 60 images par seconde
//Return: Rien
function intervallesBossFight(){
    monstre.musiqueBoss.play();
    monstre.musiqueBoss.volume = 0.08;
    intervalleAnimerPersoCinq = setInterval(animerPersoCinqSurMille, 1000/5);
    intervalleAnimerPersoNeuf = setInterval(animerPersoNeufSurMille, 1000/9);
    intervalleActualiserBoss = setInterval(actualiserBossFight, 1000/60);
}

//Param: Aucun
//Fonction: Arrête la musique de boss et clear les intervalles pour les animations et 
//          clear l'intervalle de l'actualisation du combat
//Return: Rien
function stopIntervallesBossFight(){
    monstre.musiqueBoss.pause();
    clearInterval(intervalleAnimerPersoCinq);
    clearInterval(intervalleAnimerPersoNeuf);
    clearInterval(intervalleActualiserBoss);
}

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {joueur, monstre, fireball, projectile, intervallesBossFight};