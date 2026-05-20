exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('templates').del();
  await knex('templates').insert([
    {
      id: 1,
      name: 'Modern E-Commerce',
      description: 'A fully responsive e-commerce template with a sleek dark mode and optimized checkout flow.',
      thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      category: 'E-commerce'
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      description: 'Showcase your work with stunning micro-animations and a glassmorphism UI design.',
      thumbnail_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      category: 'Portfolio'
    },
    {
      id: 3,
      name: 'Admin Dashboard Pro',
      description: 'A data-rich admin dashboard template with multiple chart types, tables, and analytics widgets.',
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'Dashboard'
    },
    {
      id: 4,
      name: 'SaaS Landing Page',
      description: 'High-converting landing page with pricing tables, testimonials, and feature highlights.',
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      category: 'Landing Page'
    },
    {
      id: 5,
      name: 'Tech Blog Theme',
      description: 'Clean and readable blog template focused on typography, SEO, and fast load times.',
      thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
      category: 'Blog'
    },
    {
      id: 6,
      name: 'Agency Startup',
      description: 'Perfect for creative agencies. Includes team profiles, service cards, and a contact form.',
      thumbnail_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      category: 'Landing Page'
    }
  ]);
};
