import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mjbjyduebrhkbmzhdkon.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYmp5ZHVlYnJoa2Jtemhka29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxOTUxMTYsImV4cCI6MjA4NTc3MTExNn0.AsN3KMdd6Hk_eX-k4HHeDC9kJnVYQN2zAaCa_hHeFto`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
