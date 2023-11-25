# Projet Goupil

[Goupil](https://goupil.hopto.org)

## Description

Goupil est un projet regroupant plusieurs petits modules conçus pour faciliter le développement d'un projet plus vaste. Actuellement, les principaux modules inclus sont un système simple de journalisation et une base de données facile à utiliser.

## Table des matières

- [Installation](#installation)
- [Modules](#modules)
  - [Module de Journalisation](#module-de-journalisation)
  - [Module de Base de Données](#module-de-base-de-données)
- [Licence](#licence)

## Installation

Clonez ce dépôt sur votre machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/Romaindu74/goupil.git
```

## Modules

### Module de Journalisation
Le module de journalisation fournit un système simple pour enregistrer des messages dans vos applications. Pour l'utiliser, importez le module dans votre code et appelez la fonction de journalisation appropriée.

#### Instalation: 
```bash
npm install goupil-logs
```

#### Exemple :
```js
const { Logs } = require("goupil-logs");

globalThis.Log = new Logs();

Log.setup({
    pathfile: 'Logs',
    formatfilename: 'Log %j-%M-%a.log',
    prefixlog: '[%h:%m %j/%M/%a][%type] '
});

Log.debug("Hello World !");
Log.info("Hello World !");
Log.warning("Hello World !");
Log.error("Hello World !");
Log.critical("Hello World !");
```

### Module de Base de Données
Le module de base de données fournit un système simple pour enregistrer du contenu. Pour l'utiliser, importez le module sur votre ordinateur et lancez un exemple. Pour accéder à cette base de données, il n'y a pour le moment qu'une seule façon, c'est en passant par la console d'un navigateur avec le fichier Web.min.js qui se trouve dans le dossier Client.

#### Instalation: 
```bash
npm install goupil-database
```

#### Exemple :
Serveur (Fichier "Exemple 2.js"):
```js
const { SimpleDataBase } = require("goupil-database");

var port  = 8080;

var Serveur = new SimpleDataBase(port);

Serveur.Start();
```

Web:
```js
Goupil.start(['Votre url']);

Goupil.connect(['Votre nom d\'utilisateur par defaut "root"'], ['Votre mot de passe par defaut "root"']);

Goupil.open(['Path du fichier']);
Goupil.save(['Path du fichier']);
```
## Licence
Ce projet est sous licence GNU General Public License v3.0 - voir le fichier LICENSE pour plus de détails.
