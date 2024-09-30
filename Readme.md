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

- Users `first_name` `last_name` `username` `email` `phone` `address` `profile_pic` `id_pic` `role[Enum('admin', 'user')]` `latitude` `longitude`
- Items `name` `description` `item_image` `stutus[Enum("available", "rented", "under maintenance")]` `price` `duration` `lender_id` `latitude` `longitude`
- Item_images `item_id` `image`
- Item_specifications `item_id` `key` `value`
- Rentals `borrower_id` `item_id` `start_date` `end_date` `status[Enum("requested", "approved", "active", "returned")]`
- reviews `reviewer_id` `reviewed_id` `rating` `comment`
- Messages `sender_id` `reciver_id` `content` `time`
- social_accounts `user_id` `provider` `provider_id`
  <!--  Updated -->

## Relations

- One-To-Many Relationships

  - Users → Items `One User can offer many Items.`
  - Users → Reviews: `One User can write or receive many Reviews.`
  - Users → Messages: `One User can send or receive many Messages.`
  - Items → Rentals: `One item can rented more than one time`

-Polymorphic

- _Users ↔ Reviews_ (One-to-Many Polymorphic)
- One User can review another User or an Item. Reviews will track the type (user or item).

- Many-To-Many Relationships :

  - Users ↔ Rentals: `Many Users can rent many Items through Rentals.`

  - Users ↔ Items (As Borrowers and Lenders):`Many Users can rent many Items (either as Borrowers or Lenders).`

# Workflow Example (Rental Process)

<p>A user (lender) offers an item for rent.
Another user (borrower) requests to rent that item, creating a new entry in the Rentals table with a requested status.
The lender approves the request, changing the status to approved.
Once the rental starts, the status changes to active.
After the item is returned, the status is updated to returned.
Both the lender and borrower can leave reviews for each other after the rental is completed.
This system allows for flexibility, where users can seamlessly act as both lenders and borrowers, with detailed tracking of items, rentals, and interactions through reviews and messages.
</p>
## System Users

`**Admin**` | `**Lender**` | `**Borrower**`

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
