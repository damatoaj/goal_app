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
        res.status(201).send(outcome);
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
        const outcome = await Outcome.findOne({"performanceGoals.processGoals._id":req.params.id})
        if (!outcome) return res.status(404).send();
        const performanceGoal = outcome.performanceGoals.filter(performance => {
            return performance.processGoals.find(process => {
                return process._id.toString() === req.params.id;
            })
        });
        performanceGoal[0].processGoals.forEach(goal => {
            if(goal._id.toString() === req.params.id) {
                updates.forEach((update)=> goal[update] = req.body[update])
            }
        });
        outcome.save();
        res.send(outcome);
    } catch (e) {
        res.status(500).send();
    }
};

const deletePro = async (req, res) => {
    try {
        const outcome = await Outcome.findOne({"performanceGoals.processGoals._id" : req.params.id});
        if (!outcome) return res.status(404).send();
        const performanceGoal = await outcome.performanceGoals.filter(performance => {
            return performance.processGoals.find(process => {
                return process._id.toString() === req.params.id;
            })
        });
        const pg = await outcome.performanceGoals.indexOf(performanceGoal[0]);
        outcome.performanceGoals[pg].processGoals.forEach((goal, i)=> {
            if(goal._id.toString() === req.params.id) {
                outcome.performanceGoals[pg].processGoals.splice(i, 1);
            }
        });
        await outcome.save();
        res.send(outcome);
    } catch (e) {
        res.status(500).send();
    }
};

//export the functions

module.exports = {
    create,
    edit,
    update,
    delete: deletePro
};