const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

const getCustomer = async (req, res, next) => {
	let customer;

	try {
		customer = await Customer.findById(req.params.id);

		if (customer == null) {
			return res.status(404).json({ message: 'Customer not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}

	res.customer = customer;
	next();
};

// Get all
router.get('/', async (req, res) => {
	try {
		const customers = await Customer.find();
		res.json(customers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get one
router.get('/:id', getCustomer, (req, res) => {
	res.json(res.customer);
});

// Create one
router.post('/', async (req, res) => {
	const customer = new Customer({
		name: req.body.name,
		isRepeatCustomer: req.body.isRepeatCustomer,
	});

	try {
		const newCustomer = await customer.save();
		res.status(201).json(newCustomer);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update one
router.patch('/:id', getCustomer, async (req, res) => {
	if (req.body.name != null) {
		res.customer.name = req.body.name;
	}

	if (req.body.isRepeatCustomer != null) {
		res.customer.isRepeatCustomer = req.body.isRepeatCustomer;
	}

	try {
		const updatedCustomer = await res.customer.save();
		res.json(updatedCustomer);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Delete one
router.delete('/:id', getCustomer, async (req, res) => {
	try {
		await res.customer.deleteOne();
		res.json({ message: 'Deleted customer' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
