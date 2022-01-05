const Outcome = require('../models/outcome');


const index = async (req,res) => {
    try {
        const outcomes = await Outcome.find({});
        res.send(outcomes);
    } catch(e) {
        res.status(500).send();
    }
};

const show = async (req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) res.status(404).send();
        res.send(outcome);
    } catch(e) {
        res.status(500).send();
    }
};

const getNew = (req, res) => {
    console.log('get new outcome')
    res.send('getNew function')
};

const createOutcome = async (req, res) => {
    const outcome = new Outcome(req.body);
    try {
        await outcome.save();
        res.status(201).send(outcome);
    } catch (e) {
        res.status(400).send(e);
    };
};

const updateOutcome = (req, res) => {
    console.log('update outcome')
    res.send('updateOutcome function')
};

const deleteOutcome = async (req, res) => {
    try {
        const outcome = await Outcome.findByIdAndDelete(req.params.id);
        if(!outcome) res.status(404).send();
        res.send(outcome);
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = {
    index,
    show,
    new: getNew,
    create:createOutcome,
    update:updateOutcome,
    delete:deleteOutcome
}