import { createClient } from '@supabase/supabase-js';
import config from './config.js';

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export async function searchUsers(filters = {}) {
    let query = supabase.from('users').select('*');
    
    if (filters.role) {
        query = query.eq('role', filters.role);
    }
    
    if (filters.skills?.length) {
        query = query.contains('skills', filters.skills);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function createConnectionRequest(menteeId, mentorId) {
    const { data, error } = await supabase
        .from('connections')
        .insert([{
            mentee_id: menteeId,
            mentor_id: mentorId,
            status: 'pending'
        }]);

    if (error) throw error;
    return data;
}
