const { Booking, Customer } = require('../models');

const createBooking = async (req, res) => {
    try {
        const { customerDetails, checkInDate, checkOutDate, amount, status,isBreakfastIncluded, breakfastCost } = req.body;

        // Check if customer already exists
        let customer = await Customer.findOne({ where: { email: customerDetails.email } });
        if (!customer) {
            // Save customer details
            customer = await Customer.create(customerDetails);
        }

        // Create booking
        const booking = await Booking.create({
            customerId: customer.id,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            amount: amount,
            status: status,
            breakfast: isBreakfastIncluded ? `Included - ₹${breakfastCost}` : 'N/A',
        });

        res.status(201).json({ message: 'Booking created successfully', bookingId: booking.id });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Error creating booking' });
    }
};

module.exports = { createBooking };
