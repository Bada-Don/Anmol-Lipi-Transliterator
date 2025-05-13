import React from 'react';

// Simple Icon components for list items - you can replace with actual SVGs or FontAwesome
const ListItemIcon = ({ children, className = "text-cyan-400" }) => (
    <span className={`mr-3 inline-block ${className}`}>{children}</span>
);

const Section = ({ title, children, titleIcon }) => (
    <section className="mb-8 p-6 glass-effect rounded-lg border border-cyan-500/15 shadow-lg">
        <h2 className="text-2xl font-orbitron font-semibold text-cyan-300 mb-4 flex items-center">
            {titleIcon && <span className="mr-3 text-3xl">{titleIcon}</span>}
            {title}
        </h2>
        <div className="space-y-3 text-gray-300 leading-relaxed prose prose-invert prose-sm sm:prose-base max-w-none 
                        prose-headings:text-cyan-400 prose-strong:text-cyan-200 prose-a:text-purple-400 hover:prose-a:text-purple-300
                        prose-code:bg-gray-700/50 prose-code:p-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                        prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic">
            {children}
        </div>
    </section>
);


function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-gray-200">
            <header className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-orbitron font-bold text-cyan-300 mb-3">
                    <ListItemIcon>🌐</ListItemIcon> Anmol Transliterator
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    A simple yet powerful tool that converts Roman text into custom-language fonts like
                    <strong className="text-cyan-200"> Anmol Lipi</strong>,
                    <strong className="text-cyan-200"> Gurbani</strong>,
                    <strong className="text-cyan-200"> Prabhki</strong>, and
                    <strong className="text-cyan-200"> GurbaniHindi</strong> using an intelligent backend logic.
                    It is designed to assist designers, typists, and everyday users in efficiently typing in Hindi, Punjabi, and other regional languages without the need to memorize complex key mappings.
                </p>
            </header>

            <hr className="my-8 border-cyan-500/20" />

            <Section title="Motivation" titleIcon="🚀">
                <p>
                    During the <strong>Google Solution Challenge Workshop</strong> held at <strong>CGC Landran</strong>, one of the speakers encouraged us to start solving real-world problems around us—those affecting our friends, family, and ourselves—before trying to tackle global-scale issues.
                </p>
                <p>
                    That’s when I remembered something my father once mentioned:
                </p>
                <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-4">
                    “Typing long Hindi or Punjabi content is time-consuming and frustrating, especially when you're short on time.”
                </blockquote>
                <p>
                    This small yet significant problem sparked the idea of building a tool that makes typing in regional fonts faster and easier.
                </p>
            </Section>

            <Section title="Problem Statement" titleIcon="❗">
                <p>
                    You’ve probably seen <strong>banners, signboards, and pamphlets</strong> written in regional languages like <strong>Punjabi, Hindi, or Urdu</strong>. But have you ever wondered <strong>how</strong> they are typed?
                </p>
                <p>
                    Designers don’t usually use native language keyboards. Instead, they rely on <strong>special fonts</strong> (e.g., <em>Anmol Lipi</em>, <em>Gurbani</em>, <em>Prabhki</em>) that map Roman keyboard keystrokes to characters of regional scripts.
                    This requires memorizing unintuitive key mappings, which can be tedious and time-consuming—even for experienced users.
                </p>
            </Section>

            <Section title="The Solution" titleIcon="💡">
                <p>
                    To solve this, I built <strong>Anmol Transliterator</strong>, which automates and simplifies the transliteration process:
                </p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li><ListItemIcon>🔡</ListItemIcon>Created a detailed <strong>character map</strong> for the chosen fonts.</li>
                    <li><ListItemIcon>📡</ListItemIcon>Set up an <strong>API call</strong> to a Large Language Model (LLM) to handle transliteration based on the input language.</li>
                    <li><ListItemIcon>📥</ListItemIcon>The LLM returns a <strong>Python list</strong> representing the transliterated characters.</li>
                    <li><ListItemIcon>⚙️</ListItemIcon>This list is passed to a <strong>mapping engine</strong> that converts it into a string based on the logic of the target font.</li>
                    <li><ListItemIcon>📤</ListItemIcon>The final <strong>output string</strong> is returned, ready for use in design software or content creation tools.</li>
                </ol>
            </Section>

            <Section title="How to Use" titleIcon="📘">
                <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li><ListItemIcon>🔤</ListItemIcon><strong>Enter</strong> the text you want to transliterate (e.g., <code>"sat sri akaal"</code>).</li>
                    <li><ListItemIcon>📤</ListItemIcon>Click the <strong>Send</strong> button.</li>
                    <li><ListItemIcon>⏳</ListItemIcon>Wait a moment while the response is processed.</li>
                    <li><ListItemIcon>📋</ListItemIcon>Once the output appears, (e.g. <code>sq sRI Akwl</code>) click the <strong>Copy</strong> button to use it anywhere!</li>
                </ol>
            </Section>

            <Section title="Tech Stack" titleIcon="🧠">
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><ListItemIcon>💻</ListItemIcon><strong>Frontend</strong>: ReactJs, Tailwind CSS</li>
                    <li><ListItemIcon>⚙️</ListItemIcon><strong>Backend</strong>: Python, Flask</li>
                    <li><ListItemIcon>🤖</ListItemIcon><strong>AI/LLM Integration</strong>: Gemini 2.0 Flash</li>
                    <li><ListItemIcon>🖋️</ListItemIcon><strong>Font Mapping</strong>: Custom logic to match fonts like Anmol Lipi</li>
                </ul>
            </Section>

            <Section title="Future Improvements" titleIcon="🙌">
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><ListItemIcon>🔁</ListItemIcon>Add support for more fonts and languages.</li>
                    <li><ListItemIcon>🔤</ListItemIcon>Enable reverse transliteration (Font → Roman).</li>
                    <li><ListItemIcon>💡</ListItemIcon>Improve AI accuracy using feedback loops.</li>
                </ul>
            </Section>

            <Section title="Acknowledgements" titleIcon="📣">
                <p>
                    Special thanks to <strong>my father</strong> for inspiring this project. Also, gratitude to everyone who faces typing frustration daily—you inspired this solution.
                </p>
            </Section>

            <Section title="Status" titleIcon="✅">
                <p className="text-green-400 font-semibold"><ListItemIcon>✅</ListItemIcon>Working Prototype Available</p>
                <p className="text-yellow-400"><ListItemIcon>🚧</ListItemIcon>Currently under production and testing for accuracy.</p>
            </Section>

        </div>
    );
}

export default AboutPage;