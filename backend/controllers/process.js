//load in the dependency
const Outcome = require('../models/outcome');

//define the functions
const create = async(req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.o_id);
        if(!outcome) res.status(404).send();
        const performance = await outcome.performanceGoals.find(goal => goal._id.toString() == req.params.p_id);
        if(!performance) res.status(404).send9();
        performance.processGoals.push(req.body);
        outcome.save();
        res.send(outcome);
    } catch(e) {
        res.status(500).send();
    }
};

const edit = (req, res) => {
    console.log('edit process')
    res.send('edit process')
};

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const object = await Outcome.findOne({"performanceGoals.processGoals._id":req.params.id})
        if (!object) return res.status(404).send();
        const performanceGoal = object.performanceGoals.filter(performance => {
            return performance.processGoals.find(process => {
                return process._id.toString() === req.params.id;
            })
        });
        performanceGoal[0].processGoals.forEach(goal => {
            if(goal._id.toString() === req.params.id) {
                updates.forEach((update)=> goal[update] = req.body[update])
            }
        });
        res.send(object)
    } catch (e) {
        res.status(500).send();
    }
};

const deletePro = (req, res) => {
    console.log('delete process')
    res.send('delete process')
};

//export the functions

module.exports = {
    create,
    edit,
    update,
    delete: deletePro
};