import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log(SUPABASE_ANON_KEY);
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};
