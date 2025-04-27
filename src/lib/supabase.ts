import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmeuyhbuhpqgiftssvcw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZXV5aGJ1aHBxZ2lmdHNzdmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3ODcwMTAsImV4cCI6MjA2MTM2MzAxMH0.Q4uEM1HzBO6DCOmq8eA4x_UMlmLhLTFat79TM5IrSqk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 