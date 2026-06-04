import {
    ShieldCheck,
    FileText,
    SquarePen,
    Trash2,
    Image,
    LayoutDashboard,
    Smartphone,
    BellRing,
    Code2,
    ExternalLink
} from 'lucide-react'
import { Container } from '../components'

export default function About() {
    const features = [
        {
            icon: ShieldCheck,
            title: 'Secure Authentication',
            description: 'Create an account, log in securely and access features available only to authenticated users.'
        },
        {
            icon: FileText,
            title: 'Create Posts',
            description: 'Write and publish blog posts using a rich text editor.'
        },
        {
            icon: SquarePen,
            title: 'Edit Posts',
            description: 'Update published posts at any time without creating a new post.'
        },
        {
            icon: Trash2,
            title: 'Delete Posts',
            description: 'Remove posts permanently whenever they are no longer required.'
        },
        {
            icon: Image,
            title: 'Featured Images',
            description: 'Add attractive featured images to make articles more engaging.'
        },
        {
            icon: LayoutDashboard,
            title: 'Personal Dashboard',
            description: 'Manage and view all of your posts from a dedicated page.'
        },
        {
            icon: Smartphone,
            title: 'Responsive Design',
            description: 'Designed to work smoothly across desktop, tablet and mobile devices.'
        },
        {
            icon: BellRing,
            title: 'Notifications',
            description: 'Loading states and toast notifications provide clear user feedback.'
        }
    ]

    const techStack = [
    {
        name: 'React',
        role: 'Frontend',
        url: 'https://react.dev'
    },
    {
        name: 'React Router',
        role: 'Routing',
        url: 'https://reactrouter.com'
    },
    {
        name: 'Redux Toolkit',
        role: 'State',
        url: 'https://redux-toolkit.js.org'
    },
    {
        name: 'Appwrite',
        role: 'Backend',
        url: 'https://appwrite.io'
    },
    {
        name: 'TinyMCE',
        role: 'RTE',
        url: 'https://www.tiny.cloud'
    },
    {
        name: 'Tailwind CSS',
        role: 'Styling',
        url: 'https://tailwindcss.com'
    },
    {
        name: 'React Hook Form',
        role: 'Forms',
        url: 'https://react-hook-form.com'
    },
    {
        name: 'React Toastify',
        role: 'Notifications',
        url: 'https://fkhadra.github.io/react-toastify'
    },
    {
        name: 'Lucide React',
        role: 'Icons',
        url: 'https://lucide.dev'
    },
    {
        name: 'Vite',
        role: 'Build Tool',
        url: 'https://vite.dev'
    },
    {
        name: 'Bun',
        role: 'Package Manager',
        url: 'https://bun.sh'
    }
]

    return (
        <Container>
            <div className='w-[95%] md:w-[90%] xl:w-[75%] mx-auto py-10 select-text'>

                {/* hero */}
                <section className='text-center mb-16'>
                    <h1 className='text-4xl md:text-5xl font-black text-white selection:bg-[#E05C2A] selection:text-white mb-4'>
                        About <span className='text-[#E05C2A]'>Mega Blog</span>
                    </h1>

                    <p className='mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto selection:bg-white selection:text-black'>
                        A modern full-stack blogging platform built with React and Appwrite,
                        designed to provide a simple and beginner-friendly content creation experience.
                    </p>

                    <div className='w-24 h-1 bg-[#E05C2A] mx-auto rounded-full mt-6' />
                </section>

                {/* what is mega blog */}
                <section className='mb-14'>
                    <div className='bg-[#0E0D09] border border-[#383733] rounded-lg p-6 md:p-8'>
                        <h2 className='text-2xl md:text-3xl font-bold text-[#E05C2A] mb-4 selection:bg-[#E05C2A] selection:text-white'>
                            What is Mega Blog?
                        </h2>

                        <p className='text-gray-400 leading-8 selection:bg-white selection:text-black'>
                            Mega Blog is a full-stack blogging application built to provide a simple
                            and beginner-friendly blogging experience. After creating an account,
                            users can publish their own articles, update them whenever needed and
                            remove them if they are no longer required.
                        </p>

                        <p className='text-gray-400 leading-8 mt-4 selection:bg-white selection:text-black'>
                            The application focuses on keeping the writing experience simple while
                            also providing features commonly found in modern blogging platforms.
                            Users can write rich content using a powerful editor, upload featured
                            images and manage all of their posts through a dedicated dashboard.
                        </p>

                        <p className='text-gray-400 leading-8 mt-4 selection:bg-white selection:text-black'>
                            Whether you want to share knowledge, write tutorials or simply practice
                            content creation, Mega Blog provides the tools needed to manage your
                            content from a single place.
                        </p>
                    </div>
                </section>

                {/* features */}
                <section className='mb-14'>
                    <h2 className='text-3xl font-bold text-white selection:bg-white selection:text-black text-center mb-8'>
                        Features
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {features.map((feature) => {
                            const Icon = feature.icon

                            return (
                                <div
                                    key={feature.title}
                                    className='bg-[#0E0D09] border border-[#383733] rounded-lg p-6 hover:border-[#E05C2A] duration-300'
                                >
                                    <Icon
                                        size={32}
                                        className='text-[#E05C2A] mb-4'
                                    />

                                    <h3 className='text-lg font-bold selection:bg-white selection:text-black text-white mb-2'>
                                        {feature.title}
                                    </h3>

                                    <p className='text-gray-400 selection:bg-white selection:text-black'>
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* tech stack */}
<section className='mb-14'>
    <h2 className='text-3xl font-bold text-white text-center mb-8'>
        Tech Stack
    </h2>

    <div className='flex flex-wrap justify-center gap-3 max-w-5xl mx-auto'>
        {techStack.map((tech) => (
            <a
                key={tech.name}
                href={tech.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group px-3 py-2 bg-[#DB9258] font-bold inline-flex items-center justify-center gap-2 rounded-md hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] duration-300 hover:-translate-y-0.5 text-black text-base'
            >
                <span>{tech.name}</span>

                <span className='opacity-60'>•</span>

                <span className='font-medium'>
                    {tech.role}
                </span>

                <ExternalLink
                    size={14}
                    strokeWidth={3}
                    className='transition-transform duration-300 group-hover:translate-x-0.5'
                />
            </a>
        ))}
    </div>
</section>

                {/* developers */}
                <section className='mb-14'>
                    <div className='bg-[#0E0D09] border border-[#383733] rounded-lg p-6 md:p-8'>
                        <div className='flex items-center gap-3 mb-5'>
                            <Code2
                                size={28}
                                className='text-[#E05C2A]'
                            />

                            <h2 className='text-2xl md:text-3xl font-bold text-white selection:bg-white selection:text-black'>
                                For Developers
                            </h2>
                        </div>

                        <p className='text-gray-400 leading-8 selection:bg-white selection:text-black'>
                            If you are interested in understanding how this project works internally,
                            you can explore the project structure on GitHub.
                        </p>

                        <a
                            href='https://github.com/faridhussain/Mega-Blog'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='relative overflow-hidden group mt-4 px-6 py-2 bg-[#0E0D09] border border-[#383733] rounded-md text-gray-300 font-bold hover:border-[#db935864] hover:shadow-[0_0_25px_rgba(219,146,88,0.4)] hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2'
                        >
                            <span className="absolute top-0 -left-full h-full w-1/3 skew-x-12 bg-linear-to-r from-transparent via-[#DB9258]/50 to-transparent transition-all duration-700 group-hover:left-[130%]" />

                            <span className='relative z-10 flex items-center gap-2'>
                                View Source Code on GitHub
                                <ExternalLink size={16} />
                            </span>
                        </a>

                        <div className='mt-6 space-y-3 text-gray-300 selection:bg-white selection:text-black'>
                            <p>✓ what the file does</p>
                            <p>✓ why it exists</p>
                            <p>✓ how the functionality works</p>
                            <p>✓ how different parts of the application communicate with each other</p>
                        </div>

                        <p className='text-gray-400 leading-8 mt-6 selection:bg-white selection:text-black'>
                            The comments were written in a beginner-friendly way so that new developers
                            can easily follow the codebase and understand the implementation without
                            getting lost.
                        </p>
                    </div>
                </section>

                {/* thank you */}
                <section className='text-center'>
                    <div className='w-24 h-1 bg-[#E05C2A] mx-auto rounded-full mb-6' />

                    <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 selection:bg-white selection:text-black'>
                        Thank You
                    </h2>

                    <p className='text-gray-400 leading-8 max-w-3xl mx-auto selection:bg-white selection:text-black'>
                        Thank you for taking the time to explore Mega Blog.
                        This project was built as a learning journey to practice modern web
                        development concepts including authentication, state management,
                        routing, database integration, file uploads, responsive design and
                        user experience improvements.
                    </p>

                    <p className='text-gray-400 leading-8 max-w-3xl mx-auto mt-4 selection:bg-white selection:text-black'>
                        I hope you find the project useful, easy to understand and enjoyable to explore.
                    </p>
                </section>
            </div>
        </Container>
    )
}