const SUPABASE_URL = 'https://romupelafyylrhrzqeyo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbXVwZWxhZnlleWxycHJ6cXlleW8iLCJpYXQiOjE3MDE1MjYyNjYsImV4cCI6MjAwNzA5MjI2Nn0.9751389b84830096012489886149c23011316032';

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

export { SUPABASE_URL, HEADERS };
