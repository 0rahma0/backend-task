import express from 'express';
import supabase from '../client.js';
// const express = require('express');
// const supabase = require('../client.js');


const sports_router = express.Router();

//all sports info
sports_router.get('/',async (req,res) => {
    const {data, error} = await supabase
        .from('Sports')
        .select('*');

    if(error){
        return res.status(500).json({ message: 'Failed to fetch sports.' });
    }
    return res.status(200).json(data);
    });

//sport info by id
sports_router.get('/:id',async (req,res) => {
    const{id} = req.params;
    const {data, error} = await supabase
        .from('Sports')
        .select()
        .eq('id',id);

    if(error){
        return res.status(500).json({ message: 'Failed to fetch sport.' });
    }
    return res.status(200).json(data);
    });


sports_router.post('/',async (req,res) => {
    const{name,subscription_price,allowed_gender} = req.body;

    const {data, error} = await supabase
        .from('Sports')
        .insert([{name,subscription_price,allowed_gender}])
        .select(); // to show new row

    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to insert sport.' });
    }
    else{
        return res.status(200).json(data);
    }
    });

sports_router.put('/:id',async (req,res) => {
    const{id} = req.params;
    const{name,subscription_price,allowed_gender} = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (subscription_price) updates.subscription_price = subscription_price;
    if (allowed_gender) updates.allowed_gender = allowed_gender;

    const {data, error} = await supabase
        .from('Sports')
        .update(updates)
        .eq('id',id)
        .select(); // to show updated row

    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to delete sport.' });
    }
    else{
        return res.status(200).json(data);
    }
    });

sports_router.delete('/:id',async (req,res) => {
    const{id} = req.params;

    const {data, error} = await supabase
    .from('Sports')
    .delete()
    .eq('id',id)
    .select(); //show deleted row


    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to fetch sports.' });
    }
    else{
        return res.status(200).json(data);
    }
    });


export default sports_router;