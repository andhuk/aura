# AURA - Modern Clothing Store

A Next.js based e-commerce boilerplate for a premium clothing brand. This project provides a complete starting point for building a modern online clothing store with authentication and product management.

## Features

- Clean, minimalist design
- Next.js 14+ with App Router
- TypeScript for type safety
- Responsive layout
- Supabase integration for:
  - Authentication (login, register)
  - Database (products, user profiles)
  - Storage (product images)
- Role-based access control (Admin/Customer)
- Product gallery and store
- Admin dashboard
- Vercel deployment ready

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, set up your Supabase project:

1. Create a project on [Supabase](https://supabase.com/)
2. Create the following tables:
   - `products`: For storing product information
   - `profiles`: For storing user roles and profile data
3. Set up storage buckets for product images

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── admin/          # Admin dashboard
│   ├── login/          # Authentication pages
│   ├── register/
│   └── store/          # Store and product pages
├── components/         # Reusable components
├── contexts/           # React contexts
├── lib/                # Utility libraries
├── services/           # API services
└── types/              # TypeScript types
```

## Authentication

The project includes a complete authentication system:

- User registration
- User login
- Role-based access (admin/customer)
- Protected routes

## Product Management

Admins can:

- Add new products
- Edit existing products
- Delete products
- Upload product images to Supabase storage

## Roadmap

- [x] Authentication system
- [x] Product gallery
- [x] Admin dashboard
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Payment integration
- [ ] Order management
- [ ] User profiles

## Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/).

## License

MIT
