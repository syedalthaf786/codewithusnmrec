import { createClient } from '@supabase/supabase-js';

const supabaseUrl ="https://mxzopqqluyqlbfvwsovr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14em9wcXFsdXlxbGJmdndzb3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NTc0MjEsImV4cCI6MjA1NDUzMzQyMX0.7wrZCkgpGDmBgmiMd4il2UPZVrYHm-xTQbwoKk5H3DI";

export const supabase = createClient(supabaseUrl, supabaseKey);