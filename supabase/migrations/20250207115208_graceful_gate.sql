/*
  # Initial Schema Setup

  1. Tables
    - users (handled by Supabase Auth)
    - courses
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - image_url (text)
      - price (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    - blog_posts
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - image_url (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for courses
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert courses"
  ON courses
  FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for blog posts
CREATE POLICY "Anyone can view blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');