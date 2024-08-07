#  Rentel
### Slogan : Rent Smart, Borrow Easy.

  Rentel is a location-based platform designed to connect nearby users, 
  making it easy to borrow and rent items. With Rentel, users can effortlessly find and rent items they need, 
  or offer items they own for rent. Notifications within a 1km radius ensure convenient and efficient borrowing.

## Technologies:

- **Front-End** : Angular
- **Back-End** : PHP
- **Database**
  - Firebase : Location based queries, Storage, Hoisting
  - MySQL :  database based
- **Version control** : Github
- **Websocket** : Socket.io || Pusher
- **webserver** : Apache Server

## Features

- User Authantication
- Location-Based services
- Post request for required item
- Leader offers
- Real-Time Notifications
- Item insurance
- User Reviews

## Models

- user `Full Name` `Usernaem` `Phone` `Address` `profilePic` `idPic`
- Item `Name` `description` `itemImage` `avalible` `Stutus` `Price` `duration`
- Rental `borrower_id` `lender_id` `item_id` `start_date` `end_date` `price`
- Messages `Sender_id` `reciver_id` `content` `time`
- reviews `reviewer` `reviewed` `rating` `comment`


## System Users

`**Admin**` | `**Leander**` | `**Borrower**`

## Usage Scenarios
  Borrowing: Need a power drill for a weekend project? Post an announcement on Rentel and get offers from nearby users within a 1km radius.
  
  Lending: Have a set of camping gear collecting dust? List it on Rentel and get notified when someone nearby needs it.

## Borrower Use Cases

- Post a required item
- Specify duration of borrowing
- May record an expected rent
- Message the lender
- Review the lender
- View history of borrowed items and prices

## Lender use cases

- Makes offers
- message borrowers
- Review borrowers
- View history of borrower

## Admin use cases

- Check renting requests
- Ban Members
- Approve or Deny requests
- check user messages
- Generate reports