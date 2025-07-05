import express from 'express';
import supabase from '../client.js';
// const express = require('express');
// const supabase = require('../client.js');


const members_router = express.Router();

//all member info
members_router.get('/',async (req,res) => {
    const {data, error} = await supabase
        .from('Members')
        .select('*');

    if(error){
        return res.status(500).json({ message: 'Failed to fetch members.' });
    }
    return res.status(200).json(data);
    });

//member info by id
members_router.get('/:id',async (req,res) => {
    const{id} = req.params;
    const {data, error} = await supabase
        .from('Members')
        .select()
        .eq('id',id);

    if(error){
        return res.status(500).json({ message: 'Failed to fetch member.' });
    }
    return res.status(200).json(data);
    });

members_router.post('/',async (req,res) => {
    const{first_name,last_name,gender,birthdate} = req.body;

    const {data, error} = await supabase
        .from('Members')
        .insert([{first_name,last_name,gender,birthdate}])
        .select(); // to show new row

    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to insert member.' });
    }
    else{
        return res.status(200).json(data);
    }
    });

members_router.put('/:id',async (req,res) => {
    const{id} = req.params;
    const{first_name,last_name,gender,birthdate} = req.body;

    const updates = {};
    if (first_name) updates.first_name = first_name;
    if (last_name) updates.last_name = last_name;
    if (gender) updates.gender = gender;
    if (birthdate) updates.birthdate = birthdate;

    const {data, error} = await supabase
        .from('Members')
        .update(updates)
        .eq('id',id)
        .select(); // to show updated row

    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to update member.' });
    }
    else{
        return res.status(200).json(data);
    }
    });

members_router.delete('/:id',async (req,res) => {
    const{id} = req.params;

    const {data, error} = await supabase
    .from('Members')
    .delete()
    .eq('id',id)
    .select(); //show deleted row


    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to delete member.' });
    }
    else{
        return res.status(200).json(data);
    }
    });


export default members_router;