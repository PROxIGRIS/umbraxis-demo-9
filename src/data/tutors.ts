export interface TutorData {
  name: string;
  subject: string;
  experience: string;
  rating: number;
  students: number;
  education: string;
  specialties: string[];
  image: string;
}

export const allTutors: TutorData[] = [
  {
    name: "Dr. Sarah Mitchell",
    subject: "Mathematics & Physics",
    experience: "12+ years",
    rating: 4.9,
    students: 500,
    education: "PhD in Mathematics, MIT",
    specialties: ["Calculus", "Linear Algebra", "Quantum Physics"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Prof. James Chen",
    subject: "Computer Science",
    experience: "10+ years",
    rating: 5.0,
    students: 450,
    education: "MS Computer Science, Stanford",
    specialties: ["Python", "Data Structures", "AI/ML"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Emma Rodriguez",
    subject: "English & Literature",
    experience: "8+ years",
    rating: 4.8,
    students: 380,
    education: "MA English Literature, Oxford",
    specialties: ["Essay Writing", "Shakespeare", "Poetry"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    name: "Dr. Michael Park",
    subject: "Chemistry & Biology",
    experience: "15+ years",
    rating: 4.9,
    students: 520,
    education: "PhD in Biochemistry, Harvard",
    specialties: ["Organic Chemistry", "Cell Biology", "Genetics"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Sophie Laurent",
    subject: "Languages",
    experience: "7+ years",
    rating: 4.7,
    students: 320,
    education: "MA Linguistics, Sorbonne",
    specialties: ["French", "Spanish", "Grammar"],
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
  },
  {
    name: "Alex Thompson",
    subject: "History & Social Studies",
    experience: "9+ years",
    rating: 4.8,
    students: 410,
    education: "MA History, Cambridge",
    specialties: ["World History", "Politics", "Economics"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  }
];
