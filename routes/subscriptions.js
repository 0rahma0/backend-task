import express from 'express';
import supabase from '../client.js';


const subs_router = express.Router();

subs_router.get('/',async (req,res) => {
    const {data, error} = await supabase
        .from('Subscriptions')
        .select('*');

    if(error){
        return res.status(500).json({ message: 'Failed to fetch subscriptions.' });
    }
    return res.status(200).json(data);
    });

//subscribe a member
subs_router.post('/',async (req,res) => {
    const{sport_id,member_id} = req.body;

    //check if already exists
    const{data: dup_data, error: dup_error} = await supabase
        .from('Subscriptions')
        .select()
        .eq('sport_id',sport_id)
        .eq('member_id',member_id);

    if(dup_data != null && dup_data.length > 0){
        return res.status(409).json({ message: 'member already subscribed' });
    }

    const {data, error} = await supabase
        .from('Subscriptions')
        .insert([{sport_id,member_id}])
        .select(); // to show new row

    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to insert subscription.' });
    }
    else{
        return res.status(200).json(data);
    }
    });

// unsubscribe a member    
subs_router.delete('/:id',async (req,res) => {
    const{id} = req.params;

    const {data, error} = await supabase
    .from('Subscriptions')
    .delete()
    .eq('id',id)
    .select(); //show deleted row


    if(error){
        console.log(error)
        return res.status(500).json({ message: 'Failed to delete subscription.' });
    }
    else{
        return res.status(200).json(data);
    }
    });


export default subs_router;