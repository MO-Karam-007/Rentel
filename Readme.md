# Rentel

## Slogan: Rent Smart, Borrow Easy

Rentel is a location-based platform designed to connect nearby users,
making it easy to borrow and rent items. With Rentel, users can effortlessly find and borrow items they need,
or offer items they own for rent. Notifications within a 6km radius ensure convenient and efficient borrowing.

## Technologies:

- **Front-End** : Angular
- **Back-End** : PHP
- **Database**
  - Firebase : Location based queries, Storage, Hoisting
  - MySQL : database based
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
- Chat & Call Integration
- Advanced Search Filters
- Transaction History
- Payment Gateway Integration
- Wishlist & Favorites
- Multi-language Support
- Fraud Detection & Reporting

## Models

- Users `first_name` `last_name` `username` `email` `phone` `address` `profile_pic` `id_pic` `role[Enum('admin', 'user')]`
- Items `name` `description` `item_image` `stutus[Enum("available", "rented", "under maintenance")]` `price` `duration` `lender_id`
- Item_images `item_id` `image`
- Item_specifications `item_id` `key` `value`
- Rentals `borrower_id` `lender_id` `item_id` `start_date` `end_date` `price` `status[Enum("requested", "approved", "active", "returned")]`
- Messages `sender_id` `reciver_id` `content` `time`
- reviews `reviewer_id` `reviewed_id` `rating` `comment`
- social_accounts `user_id` `provider` `provider_id`

## Relations

- Users One-To-Many Items

- Users One-To-Many Reviews

- Users One-To-Many Messages

- Users Many-To-Many Items

- Users Many-To-Many Rentals

## System Users

`**Admin**` | `**Leander**` | `**Borrower**`

## Usage Scenarios

Borrowing: Need a power drill for a weekend project? Post an announcement on Rentel and get offers from nearby users within a 6km radius.

Lending: Have a motorcycle? List it on Rental and get notified when someone nearby needs it.

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

## Full Script :

Createing admin account requires approvel from the development team.

- The process goes here
  - Send a formal email via our website or our email
  - Review the personal data informations.
  - Interview the applicant for this role and feedback him/her.

Admins responsibles

- approve or deny posts.
- Remove comments.
- Ban users.
- activate or deactivate users.
- Review reports and complaints.
- Refund process when necessary.

- Lender Responsibilities

  - Offer Items for rent.
  - Respond to Borrow Requests.
  - Manage Item Availability.
  - Message Borrowers.
  - Review Borrowers.

- Borrower Responsibilities
  - Post a Request for Items.
  - Specify Borrowing Duration.
  - Message Lenders.
  - Review Lenders.
  - Manage Requests.
