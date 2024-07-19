import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bhetwjbecwccxdtznmmk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZXR3amJlY3djY3hkdHpubW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5NzYzMTcsImV4cCI6MjAzNjU1MjMxN30.k-p5mTKazViPFcpF1Ik7ji-snEWmHWVb2zcDceLpEGg'
const supabase = createClient(supabaseUrl, supabaseKey);


export async function insertTask(taskData) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert(taskData);

        if (error) {
            throw error;
        }

        console.log('Task created successfully:', data); 
        return data;
    } catch (error) {
        console.error('Error creating task:', error.message);
        return null;
    }
}