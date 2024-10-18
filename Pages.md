### User Interface Pages

#### 1. **Landing Page** <ins>[ In progress ]</ins>

- Overview of Rentel
- Slogan: "Rent Smart, Borrow Easy"
- Call-to-action buttons: Sign Up / Log In
- Featured Items for Rent

#### 2. **User Authentication** <ins>[ Maintenance ]</ins>

- **Sign Up Page**
  - Input fields: First Name, Last Name, Username, Email, Phone, Password
  - Role selection: Lender / Borrower
  - Verification process
- **Login Page**
  - Input fields: Username/Email and Password
- **Forgot Password Page** <ins>**[ Required ]**</ins> --> J
  - Input field for email
  - Password reset instructions

#### 3. **User Dashboard** <ins>[ Required ]</ins> --> J

- Overview of user activities
- Quick links: Post Item, Browse Items, Rental History, Messages

#### 4. **Item Management Pages ** <ins>[ In progress ]</ins>

- **Post Item** <ins>[ Maintenance ]</ins>
  - Input fields: Item Name, Description, Price, Duration, Item Images
  - Location services integration (latitude/longitude)
- **My Items** <ins>[ Required ]</ins>
  - List of items posted by the user with options to edit or delete
  - Status indicators: Available, Rented, Under Maintenance

#### 5. **Rental Request Page** <ins>[ Maintenance ]</ins>

- Browse available items within a 6km radius
- Advanced Search Filters (by category, price, duration)
- Wishlist & Favorites options
- Post a request for an item
- View offers made by lenders

#### 6. **Rental Details Page** <ins>[ Maintenance ]</ins>

- Details of a specific item
- Option to request rental
- View lender profile
- Chat & Call Integration

#### 7. **Transaction History** <ins>[ Required ]</ins>

- Overview of past rentals (borrowed and lent)
- Status of each transaction (requested, approved, active, returned)
- Option to leave reviews for lenders/borrowers

#### 8. **Review System** <ins>[ Required ]</ins> --> A

- Leave a review for an item or user
- Display user ratings and comments

#### 9. **Messaging System** <ins>[ Required ]</ins> --> A

- Inbox for direct messages
- Chat interface for real-time communication

#### 10. **Admin Panel** <ins>[ Required ]</ins> --> M

- **User Management**
  - View all users with options to ban or activate/deactivate accounts
- **Rental Requests Management**
  - Approve or deny rental requests
  - View all active and past rentals
- **Content Moderation**
  - Review and approve/deny item postings and comments
- **Reports & Complaints**
  - View user-reported issues and complaints
  - Generate reports on user activities and transactions

#### 11. **Profile Management** <ins>[ Required ]</ins> --> J

- **User Profile Page**
  - View and edit personal information
  - Upload ID pictures and profile pictures
- **Account Settings**
  - Change password
  - Notification settings
  - Manage linked social accounts

### Additional Considerations

- **Mobile Responsiveness**

  - Ensure that all pages are optimized for mobile devices.

get additionalImages(): FormArray {
return this.imageForm.get('additionalImages') as FormArray;
}

addImage() {
this.additionalImages.push(this.fb.control('', Validators.required));
}

removeImage(index: number) {
this.additionalImages.removeAt(index);
}

// Submit Handler
onSubmit() {
if (this.itemForm.valid && this.imageForm.valid && this.specForm.valid) {
const formData = {
itemDetails: this.itemForm.value,
images: this.imageForm.value.additionalImages,
specifications: this.specForm.value.specifications
};

      console.log('Form Data: ', formData);
      // Send formData to your service or API
    }

}
}
