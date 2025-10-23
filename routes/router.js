const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");

// require("../db/conn");
const HPcrud = require("../models/userSchema");



// register data okdone

router.post("/register", async (req, res) => {
    console.log(req.body.name);

    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !age || !email || !mobile || !work || !add || !desc) {
        res.status(404).json("plz provides all the details");
        console.log("missing");
    }

    try {

        const preuser = await HPcrud.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
            res.status(404).send("this user is already present");
            console.log("already present");
        } else {

            const adduser = await HPcrud({
                name, email, age, mobile, work, add, desc
            });

            await adduser.save();
            console.log(adduser);
            res.status(201).json(adduser);

        }

    } catch (error) {
        res.status(404).send("bad request");
    }
});


// get the data
router.get("/getdata", async (req, res) => {

    const ITEM_PER_PAGE = 3;
    const page = req.query.page || 1;
    const search = req.query.search || ""
    console.log(search);

    // put all query params here
    const query = {
        name: { $regex: search }
    } // here we add multiple quer

    try {

        const skip = (page - 1) * ITEM_PER_PAGE // 1 * 20
        
        const count = await HPcrud.estimatedDocumentCount(query);
        // const count = await HPcrud.find(query).count(); aa method deprycat thai che
        console.log(count)

        const getdata = await HPcrud.find(query).limit(ITEM_PER_PAGE).skip(skip);
        console.log(getdata)

        const pageCount =  Math.ceil(count / ITEM_PER_PAGE);   // 8 / 3

        console.log(pageCount)



        res.status(201).json({
            pagination: {
                count, pageCount
            }, getdata
        });

    } catch (error) {
        console.log(error + "error get");
        res.status(404).send("no data found")
    }
});


// get individual data
router.get("/getdata/:id", async (req, res) => {
    try {

        console.log(req.params);
        const { id } = req.params;

        const user = await HPcrud.findById({ _id: id });
        console.log(user);
        res.status(201).json(user);

    } catch (error) {
        console.log(error + "error get");
        res.status(404).send("no data found")
    }
});


// update the data
router.patch("/edit/:id", async (req, res) => {

    try {

        console.log(req.params);
        const _id = req.params.id;

        const updateuser = await HPcrud.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
    } catch (error) {
        console.log(error + "error update");
        res.status(404).send("no data update");
    }

});


// delete the data

router.delete("/:id", async (req, res) => {
    try {

        console.log(req.params);
        const _id = req.params.id;

        const dltuser = await HPcrud.findByIdAndDelete(_id);

        console.log(dltuser);
        res.status(404).send(dltuser);

    } catch (error) {
        console.log(error + "data delete error");
        res.status(404).send("no data delete");
    }
});



module.exports = router;
