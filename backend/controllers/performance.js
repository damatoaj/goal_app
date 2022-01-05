//load in the dependency
const Outcome = require('../models/outcome');
//define the functions
const create = async (req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) res.status(404).send();
        outcome.performanceGoals.push(req.body);
        console.log(outcome)
        outcome.save();
        res.send(outcome);
    } catch(e) {
        res.status(500).send();
    }
};

const edit = (req,res) => {
    console.log('edit performance goal')
    res.send('edit performance goal')
};

const update = (req, res) => {
    console.log('update performance goal')
    res.send('update performance goal')
};

const deletePerf = (req, res) => {
    console.log('delete performance goal')
    res.send('delete performance goal')
}
//export the functions
module.exports = {
    create,
    edit,
    update,
    delete: deletePerf
};