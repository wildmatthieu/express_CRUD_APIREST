# express_CRUD_APIREST

## Installation

- cloner le projet
- dans son SGBD (soit mysql soit mariadb) : 
    - créer une nouvelle base de données nommée `banquePopulol`

        `CREATE DATABASE banquePopulol;`

    - créer un nouvel utilisateur nommé 'banquePopulolAdmin' avec le mot de passe '123456azerty'

        `CREATE USER 'banquePopulolAdmin'@'localhost' IDENTIFIED BY '123456azerty';`

    - configurer l'utilisateur `banquePopulolAdmin` afin qu'il ait tous les droits sur la base de données `banquePopulol` 

        `GRANT ALL PRIVILEGES ON banquePopulol.* TO 'banquePopulolAdmin'@'localhost';FLUSH PRIVILEGES;`
    - **testez** si votre utilisateur fonctionne bien : quittez votre SGBD et vérifiez que vous vous y reconnectez bien avec la commande `mysql -u banquePopulolAdmin -p` 

- initialisez le contenu de la base de données en exécutant la commande `npm run reset-db`

## Comment suivre étape par étape le développement de ce projet ?

En suivant tout simplement les commits :) 

Un `git log` permet d'afficher la liste des commits.

Vous pouvez passez d'un commit à l'autre en local avec, par exemple, la commande `git checkout identifiantducommit`