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

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const object = await Outcome.findOne({"performanceGoals._id" : req.params.id});
        if (!object) return res.status(404).send();
        object.performanceGoals.forEach((goal,i) => {
            if(goal._id.toString() === req.params.id) {
                console.log(goal, i, 'found it')
                updates.forEach((update)=> goal[update] = req.body[update]);
            }
        });
        object.save();
        res.send(object);
    } catch (e) {
        res.status(500).send();
    }
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