<!DOCTYPE html>
<html>
<head>
    <title>Rental Approved</title>
</head>
<body>
    <h1>Your Rental Request has been Approved!</h1>
    <p>Hello {{ $rental->borrower->name }},</p>
    <p>Your rental request for the item <strong>{{ $rental->item->name }}</strong> has been approved by the owner {{ $owner->name }}.</p>
    <p>Here are the details of your rental:</p>
    <ul>
        <li>Item: {{ $rental->item->name }}</li>
        <li>Owner: {{ $owner->name }} ({{ $owner->email }})</li>
        <li>Start Date: {{ $rental->start_date }}</li>
        <li>End Date: {{ $rental->end_date }}</li>
        <li>Price: ${{ $rental->rental_price }}</li>
    </ul>
    <p>Thank you for using our service!</p>
</body>
</html>
