import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://opfumvzbqervpzrhwxbe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wZnVtdnpicWVydnB6cmh3eGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxODk3NDAsImV4cCI6MjEwMzc2NTc0MH0.GssvjLpWRBBnlMAInd4x0pY1GTrA3JxiTsxSeUyayTU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)