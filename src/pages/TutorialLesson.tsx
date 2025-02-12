import React from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function TutorialLesson() {
  const { id } = useParams();

  // This would come from your database in a real app
  const tutorial = {
    title: "Build a Full Stack App with Next.js 13",
    description: "Learn how to build a modern full-stack application using Next.js 13",
    duration: "2 hours",
    currentLesson: 1,
    totalLessons: 5,
    content: `
# Introduction to Next.js 13

Next.js is a powerful framework for building React applications. In this tutorial, we'll cover:

## What you'll learn

- Server and Client Components
- App Router
- Data Fetching
- Server Actions
- Optimizations

## Prerequisites

- Basic knowledge of React
- Understanding of JavaScript/TypeScript
- Node.js installed on your machine

## Getting Started

First, let's create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --typescript
\`\`\`

## Project Structure

Let's understand the key files and directories in a Next.js project:

- \`app/\`: Contains your application routes and logic
- \`public/\`: Static assets
- \`components/\`: Reusable UI components
`,
    lessons: [
      "Introduction to Next.js",
      "Setting Up Your Development Environment",
      "Creating Your First Page",
      "Working with Data",
      "Deployment"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tutorial Header */}
      <div className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
          <p className="text-xl text-blue-100 mb-4">{tutorial.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Lesson {tutorial.currentLesson} of {tutorial.totalLessons}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{tutorial.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Course Content</h3>
            <div className="space-y-3">
              {tutorial.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    index + 1 === tutorial.currentLesson
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {index + 1 < tutorial.currentLesson ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                  )}
                  <span className="text-sm">{lesson}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="prose max-w-none">
                <ReactMarkdown>{tutorial.content}</ReactMarkdown>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={tutorial.currentLesson === 1}
              >
                <ChevronLeft className="h-5 w-5" />
                Previous Lesson
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={tutorial.currentLesson === tutorial.totalLessons}
              >
                Next Lesson
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}