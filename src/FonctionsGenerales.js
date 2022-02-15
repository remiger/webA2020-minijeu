/*******************************************************
*                                                      *
* Fichier: FonctionsGenerales.js                       *
* Fonctions moins spécifiques, qui s'appliquent généra-*
* lement à plus qu'1 objet (ex: detection de collision)*
*                                                      *
* Auteur: Rémi Gervais                                 *
* Date: 2020-11-27                                     *
*                                                      *
* Cours d'Animation et intéractivité en jeu            *
* Collège de Maisonneuve, TIM 2020                     *
*                                                      *
********************************************************/

//Param: Aucun
//Fonction: Permet de générer un nombre aléatoire entre 1 et 2
//Return: 1 ou 2
function randomDeux(){
    return Math.ceil(Math.random() * 2);
}

//Param: objet1: Premier objet, qui contient une feuille de sprite avec des largeurs IDENTIQUES
//       objetArray2: Deuxième objet, qui contient une feuille de sprite avec des largeurs DIFFÉRENTES
//       precision: Permet d'ajuster un degré de précision pour détecter une collision
//       multiplicateur: Si on affiche une image 2 fois plus grande que sa taille originale, on met 2 ici (pour garder les proportions)
//Fonction: Retourne true s'il y a une collision entre deux objets, false si ce n'est pas le cas
//Return: true (il y a une collision) ou false (il n'y a pas de collision)
function detecterCollisionArray(objet1, objetArray2, precision, multiplicateur){
    if (objet1.posX - precision < objetArray2.posX + (objetArray2.largeur[objetArray2.indexVignette] * multiplicateur) &&
        objet1.posX + objet1.largeur + precision > objetArray2.posX &&
        objet1.posY - precision < objetArray2.posY + (objetArray2.hauteur * multiplicateur) &&
        objet1.posY + objet1.hauteur + precision > objetArray2.posY) {
        return true;
    } 
    else {
        return false;
    }
}

//Param: objet1: Premier objet, qui contient une feuille de sprite avec des largeurs IDENTIQUES
//       objet2: Deuxième objet, qui contient une feuille de sprite avec des largeurs IDENTIQUES
//       precision: Permet d'ajuster un degré de précision pour détecter une collision
//Fonction: Retourne true s'il y a une collision entre deux objets, false si ce n'est pas le cas
//Return: true (il y a une collision) ou false (il n'y a pas de collision)
function detecterCollision(objet1, objet2, precision){
    if (objet1.posX - precision < objet2.posX + objet2.largeur &&
        objet1.posX + objet1.largeur + precision > objet2.posX &&
        objet1.posY - precision < objet2.posY + objet2.hauteur &&
        objet1.posY + objet1.hauteur + precision > objet2.posY) {
        return true;
    } 
    else {
        return false;
    }
}

//Param: objet1: Premier objet, qui contient une feuille de sprite avec des largeurs IDENTIQUES
//       objetArray2: Deuxième objet, qui contient une feuille de sprite avec des largeurs IDENTIQUES mais DIFFÉRENTES positions en X
//       incrementation: Permet d'ajuster avec quelle position en X du 2e objet on vérifie la collision
//       precision: Pour réduire la hitbox des objets
//       multiplicateur: Si on affiche une image 2 fois plus grande que sa taille originale, on met 2 ici (pour garder les proportions)
//Fonction: Retourne true s'il y a une collision entre deux objets, false si ce n'est pas le cas
//Return: true (il y a une collision) ou false (il n'y a pas de collision)
function detecterCollisionJoueurProjectile(objet1, objetArray2, incrementation, precision, multiplicateur){
    if (objet1.posX + precision < objetArray2.posX[incrementation] + (objetArray2.largeur * multiplicateur) &&
        objet1.posX + objet1.largeur - precision > objetArray2.posX[incrementation] &&
        objet1.posY + precision < objetArray2.posY[incrementation] + (objetArray2.hauteur * multiplicateur) &&
        objet1.posY + objet1.hauteur - precision > objetArray2.posY[incrementation]) {
        return true;
    } 
    else {
        return false;
    }
}

//Param: objet: L'objet auquel on veut ajuster la sourceX
//Fonction: Permet de modifier la sourceX d'un objet qui a une propriété miroir
//Return: sourceX (la prochaine sourceX de l'objet)
function sourceXArray(objet){
    let sourceX = 0;
    if (objet.miroir == false){
        for(let i = 0; i < objet.indexVignette; i++){
            sourceX += objet.largeur[i];
        }
        return sourceX;
    }
    else{
        for(let i = 0; i < objet.indexVignette; i++){
            sourceX += objet.largeur[(objet.nbVignette - 1) - i];
        }
        return sourceX;
    }
}

//Param: objet
//Fonction: Vérifie si un objet est mort (c'est-à-dire dont la vie est inférieure ou égale à 0)
//Return: true (si la vie est inférieure ou égale à 0) ou false (si la vie est supérieure à 0)
function entityDead(objet){
    if(objet.vie <= 0){
        return true;
    }
    else{
        return false;
    }
}

//Param: objet
//Fonction: Permet d'animer un perso sprite dont les largeurs sont DIFFÉRENTES (ex: monstre)
//Return: Rien
function animerUnPersoSprite(objet){
    objet.indexVignette++;
    objet.sourceX = sourceXArray(objet);
    objet.indexVignette = objet.indexVignette % (objet.nbVignette - 1);
}

//Param: objet
//Fonction: Permet d'animer un perso sprite dont les largeurs sont IDENTIQUES (ex: joueur)
//Return: Rien
function animerUnPersoSpriteNormal(objet){
    objet.indexVignette++;
    objet.sourceX = objet.indexVignette * objet.largeur;
    objet.indexVignette = objet.indexVignette % (objet.nbVignette - 1);
}

//Exportation des variables et/ou fonctions nécessaires aux fonctions des autres modules
export {entityDead, randomDeux, animerUnPersoSprite, animerUnPersoSpriteNormal, detecterCollisionArray, detecterCollisionJoueurProjectile};