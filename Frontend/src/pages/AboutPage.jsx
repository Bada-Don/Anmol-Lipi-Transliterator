import { Sprout, Puzzle, Sparkles, Hammer, Telescope } from 'lucide-react';

// Simple Icon components for list items - you can replace with actual SVGs or FontAwesome
const Section = ({ title, children, titleIcon: Icon }) => (
    <section className="mb-12 p-8 bg-white dark:bg-dark-surface rounded-featured border border-border-cream dark:border-border-dark shadow-whisper transition-colors duration-300">
        <h2 className="text-3xl font-serif font-medium text-anthropic-black dark:text-ivory mb-6 flex items-center">
            {Icon && <Icon className="mr-4 w-8 h-8 text-terracotta" />}
            {title}
        </h2>
        <div className="space-y-4 text-olive-gray dark:text-warm-silver leading-relaxed max-w-none transition-colors duration-300">
            {children}
        </div>
    </section>
);


function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 text-anthropic-black dark:text-warm-silver transition-colors duration-300">
            <header className="text-center mb-16">
                <h1 className="text-5xl sm:text-6xl font-serif font-medium text-anthropic-black dark:text-ivory mb-6 transition-colors">
                    Boliyan
                </h1>
                <p className="text-xl text-olive-gray dark:text-warm-silver max-w-3xl mx-auto leading-relaxed transition-colors">
                    A thoughtful transliteration tool designed to bridge the gap between Roman text and regional scripts. 
                    Convert your thoughts into <span className="text-terracotta font-medium">Anmol Lipi</span>, 
                    <span className="text-terracotta font-medium"> Gurbani</span>, 
                    <span className="text-terracotta font-medium"> Prabhki</span>, and 
                    <span className="text-terracotta font-medium"> Gurbani Hindi</span> with ease.
                </p>
            </header>

            <Section title="The Motivation" titleIcon={Sprout}>
                <p>
                    During the <strong>Google Solution Challenge Workshop</strong>, I was inspired to look closer at the problems around me.
                    I realized that many people, including my father, struggle with the unintuitive nature of typing in regional fonts.
                </p>
                <blockquote className="border-l-4 border-terracotta pl-6 py-2 italic text-stone-gray dark:text-warm-silver my-6 text-lg">
                    “Typing long Hindi or Punjabi content is time-consuming and frustrating, especially when you're short on time.”
                </blockquote>
                <p>
                    This insight led to the creation of <strong>Boliyan</strong>—a tool built to make regional typing as natural as speaking.
                </p>
            </Section>

            <Section title="The Problem" titleIcon={Puzzle}>
                <p>
                    Most regional script fonts used by designers (like <em>Anmol Lipi</em> or <em>Prabhki</em>) don't follow a standard phonetic layout. Instead, they map Roman characters to script symbols in a way that requires extensive memorization.
                </p>
                <p>
                    This creates a barrier for anyone who wants to create content in their mother tongue but doesn't have the time to master a new keyboard layout.
                </p>
            </Section>

            <Section title="Our Solution" titleIcon={Sparkles}>
                <p>
                    <strong>Boliyan</strong> automates this complex mapping through an intelligent pipeline:
                </p>
                <ul className="space-y-4 mt-6">
                    <li className="flex items-start">
                        <span className="mr-4 bg-parchment dark:bg-anthropic-black p-2 rounded-full text-terracotta">1</span>
                        <p>We use large language models to understand the phonetic intent of your Romanized input.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-4 bg-parchment dark:bg-anthropic-black p-2 rounded-full text-terracotta">2</span>
                        <p>The system generates a precise sequence of characters for the target font.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-4 bg-parchment dark:bg-anthropic-black p-2 rounded-full text-terracotta">3</span>
                        <p>Our mapping engine ensures the output string is perfectly compatible with the legacy font logic.</p>
                    </li>
                </ul>
            </Section>

            <Section title="Technology" titleIcon={Hammer}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-parchment dark:bg-anthropic-black rounded-generous border border-border-warm dark:border-border-dark transition-colors">
                        <h4 className="font-serif font-medium text-xl mb-2 text-anthropic-black dark:text-ivory">Frontend</h4>
                        <p className="text-sm">React, Tailwind CSS, Claude Design System</p>
                    </div>
                    <div className="p-6 bg-parchment dark:bg-anthropic-black rounded-generous border border-border-warm dark:border-border-dark transition-colors">
                        <h4 className="font-serif font-medium text-xl mb-2 text-anthropic-black dark:text-ivory">Intelligence</h4>
                        <p className="text-sm">Gemini 2.5 Flash via Flask API</p>
                    </div>
                </div>
            </Section>

            <Section title="Future Vision" titleIcon={Telescope}>
                <p>
                    We're working on expanding support for more languages and fonts, as well as building reverse-transliteration features to help digitize existing physical documents.
                </p>
            </Section>

            <footer className="text-center py-12 border-t border-border-cream dark:border-border-dark mt-12 transition-colors">
                <p className="text-stone-gray dark:text-warm-silver text-sm">
                    Boliyan — Built with care for the regional language community.
                </p>
            </footer>
        </div>
    );
}



export default AboutPage;