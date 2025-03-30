# Mini App Telegram - Gestion des Cartes Bancaires

Introduction

Cette Mini App Telegram permet aux utilisateurs de consulter les informations de leur carte bancaire via une interface en HTML/CSS/jQuery. L'application interagit avec une API custom (hébergée sur le même VPS que le bot Telegram) pour vérifier si un utilisateur a bien une carte bancaire associée dans Google Sheets. Si ce n'est pas le cas, l'utilisateur est invité à retourner vers le bot Telegram pour finaliser sa demande.

L'application intégrera ensuite l'API bancaire Interlace pour gérer les cartes (activation, blocage temporaire, transactions). Un système de dépôt sera également mis en place via une autre API fournie par Simon.
---

## 📌 Prérequis 

Avant d’installer et d’exécuter le bot, assure-toi d’avoir :

1. L'api du Bot fonctionnelle
2. Cette mini app hébergée en HTTPS 
3. Les boutons bien configurés via BotFather

---

## 🔑 API interlace pour gérer les intéractions bancaires

1. Va sur [la doc Interlace](https://developer.interlace.money/docs/api-resources).
2. Mets en place l'auth
3. Mets en place la gestion des récupérations d'infos de cartes bancaires, consultation solde, etc
4. Mets en place la gestion des intéractions avec la carte (blocage)
5. Mets en place la gestion des récupérations des transactions
6. Mets en place la gestion des récupérations des détails de transactions

```
---

## 🔑 API NOVABOT

1. Gestion des dépots d'argent (voir avec Simon)

```
