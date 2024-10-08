import { RankingCardItem } from "../../components/shared/RankingCard";
import { Category } from "../../models/Category";
import { Post } from "../../models/Post";
import { User } from "../../models/User";

const users: User[] = [
  {
    id: '1',
    email: "john.doe@example.com",
    name: "John Doe",
    createdAt: "2024-01-01T09:00:00Z",
    cpf: "123.123.123-12",
    phone: "49123456789",
    role: "CITIZEN"
  },
  {
    id: '2',
    email: "jane.smith@example.com",
    name: "Jane Smith",
    createdAt: "2024-01-05T09:00:00Z",
    cpf: "123.123.123-43",
    phone: "12312312312",
    role: "CITIZEN"
  },
  {
    id: '3',
    email: "michael.brown@example.com",
    name: "Michael Brown",
    createdAt: "2024-02-10T09:00:00Z",
    cpf: "123.123.123-43",
    phone: "12312312312",
    role: "CITIZEN"
  },
  {
    id: '4',
    email: "emily.white@example.com",
    name: "Emily White",
    createdAt: "2024-03-15T09:00:00Z",
    cpf: "123.123.123-85",
    phone: "12312312312",
    role: "CITIZEN"
  },
  {
    id: '5',
    email: "daniel.jones@example.com",
    name: "Daniel Jones",
    createdAt: "2024-04-20T09:00:00Z",
    cpf: "123.123.123-85",
    phone: "12312312312",
    role: "CITIZEN"
  },
  {
    id: '6',
    email: "zjefersound@example.com",
    name: "Jeferson Souza",
    createdAt: "2024-04-20T09:00:00Z",
    cpf: "123.123.123-85",
    phone: "12312312312",
    role: "CITIZEN"
  },
];

const categories: Category[] = [
  {
    id: '1',
    name: "Issue",
  },
];

export const mockedPosts: Post[] = [
  {
    id: 1,
    title: "Understanding TypeScript types vs interfaces",
    content:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-08-02T10:00:00Z",
    categoryId: 1,
    userId: 1,
    category: categories[0],
    user: users[5],
    totalUpvotes: 4,
    voted: false,
    favoriteCommentId: 1,
    comments: [
      {
        id: 1,
        content: "Great post! Really helped me understand TypeScript better.",
        createdAt: "2024-08-01T11:00:00Z",
        updatedAt: "2024-08-01T11:00:00Z",
        postId: 1,
        userId: 2,
        user: users[1],
        totalUpvotes: 4,
        voted: false,
      },
      {
        id: 3,
        content: "Also you should create a blog about it.",
        createdAt: "2024-08-01T11:00:00Z",
        updatedAt: "2024-08-01T11:00:00Z",
        postId: 1,
        userId: 2,
        user: users[4],
        parentCommentId: 1,
        totalUpvotes: 4,
        voted: true,
      },
      {
        id: 4,
        content: "Thank you guys. Check it out on my YouTube",
        createdAt: "2024-08-01T11:00:00Z",
        updatedAt: "2024-08-01T11:00:00Z",
        postId: 1,
        userId: 2,
        user: users[5],
        parentCommentId: 1,
        parentComment: {
          id: 1,
          content: "Great post! Really helped me understand TypeScript better.",
          createdAt: "2024-08-01T11:00:00Z",
          updatedAt: "2024-08-01T11:00:00Z",
          postId: 1,
          userId: 2,
          user: users[1],
          totalUpvotes: 4,
          voted: false,
        },
        totalUpvotes: 4,
        voted: true,
      },
    ],
  },
  {
    id: 2,
    title: "Introduction to React",
    content: "React is a JavaScript library for building user interfaces.",
    createdAt: "2024-08-05T12:00:00Z",
    updatedAt: "2024-08-06T12:00:00Z",
    categoryId: 1,
    userId: 2,
    category: categories[0],
    user: users[1],
    totalUpvotes: 24,
    voted: false,
    comments: [
      {
        id: 2,
        content: "React makes building UI components a breeze!",
        createdAt: "2024-08-05T13:00:00Z",
        updatedAt: "2024-08-05T13:00:00Z",
        postId: 2,
        userId: 1,
        user: users[0],
        totalUpvotes: 6,
        voted: false,
      },
    ],
  },
  {
    id: 3,
    title: "Getting Started with Node.js",
    content: [
      "# Getting Started with Node.js",
      "`test code`",
      "test code",
      "# Getting Started with Node.js",
      "```js",
      "const abc = 123;",
      "```",
      "test code",
    ].join("\n"),
    createdAt: "2024-08-10T14:00:00Z",
    updatedAt: "2024-08-11T14:00:00Z",
    categoryId: 1,
    userId: 1,
    category: categories[0],
    user: users[0],
    comments: [],
    totalUpvotes: 97,
    voted: false,
  },
  {
    id: 4,
    title: "Deep Dive into JavaScript Engines",
    content:
      "JavaScript engines are the heart of modern web development. They convert your high-level code into machine code that the browser can execute.\n\nEngines like Google's V8, Mozilla's SpiderMonkey, and Apple's JavaScriptCore have optimized techniques for just-in-time (JIT) compilation, garbage collection, and inline caching, which significantly boost performance. Understanding how these engines work can help developers write more efficient code, debug complex performance issues, and take full advantage of the language's capabilities. This article explores the internal workings of these engines, the trade-offs they make, and how developers can leverage them for optimized web applications. We will also touch on the latest advancements in WebAssembly and its interplay with JavaScript engines, offering unprecedented performance gains for web applications.",
    createdAt: "2024-08-15T10:00:00Z",
    updatedAt: "2024-08-15T12:00:00Z",
    categoryId: 1,
    userId: 2,
    category: categories[0],
    user: users[1],
    comments: [],
    totalUpvotes: 12,
    voted: true,
  },
];

export const rankingCardItems: RankingCardItem[] = [
  {
    position: 1,
    user: users[0], // john_doe
    totalUpvotes: 120,
  },
  {
    position: 2,
    user: users[1], // jane_smith
    totalUpvotes: 110,
  },
  {
    position: 3,
    user: users[2], // michael_brown
    totalUpvotes: 95,
  },
  {
    position: 4,
    user: users[3], // emily_white
    totalUpvotes: 85,
  },
  {
    position: 5,
    user: users[4], // daniel_jones
    totalUpvotes: 75,
  },
];
