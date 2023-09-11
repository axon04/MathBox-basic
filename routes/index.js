const router = require('express').Router();
const Doc = require('../models/doc');

/***************************
 *      Home route
 * *************************
 */
router.route('/')
    .get((req, res)=>{
        async function fetch(){
            const docs = await Doc.find({});
            if(docs.length === 0){
                return res.render('home', {message: 'No problems to display.', docs: []});
            }else {
                return res.render('home', {message:'', docs: docs});
            }
        }

        try{
            fetch();
        }catch(err){
            console.log(err);
        }
    })
    .post((req, res)=>{
        async function saveDoc(){
            
            const tags = req.body.tags.split(',');
            const newDoc = new Doc({
                content: req.body.content,
                tags: tags
            });
            await newDoc.save();
            return res.redirect('/');
        }
        try{
            if(req.body.content === ''){
                return res.send('No content. Cannot save.');
            }else {
                saveDoc();
            }
        }catch(err){
            console.log(err);
        }
    });

/**************************
 *      Edit route
 * ************************
 */
router.post('/edit', (req, res)=>{
    async function updateDoc(){
        const oldDoc = await Doc.findById({_id: req.body.problem});
        oldDoc.content = req.body.content;
        await oldDoc.save();
         res.redirect('/');
    }
    try{
        updateDoc();
    }catch(err){
        console.log(err);
    }
});

/**************************
 *      Delete route
 * ************************
 */
router.post('/delete', (req, res)=>{
    async function deleteDoc(){
        await Doc.deleteOne({_id: req.body.problem});
        res.redirect('/');
    }
    try{
         deleteDoc();
    }catch(err){
        console.log(err);
    }
});
    
module.exports = router;