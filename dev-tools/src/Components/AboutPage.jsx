import React from "react";
import NavigationBar from "./NavigationBar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#10002b] text-[#f7ebff] font-sans pt-15">
      <NavigationBar />

      <div className="px-16 py-16 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-[#00c8a0]">About Last Bench Tools</h1>

        <p className="text-lg mb-6 leading-relaxed">
          <strong>Last Bench Tools</strong> is your one-stop digital toolkit, crafted for developers, students, and curious minds who love building cool things. Whether you're debugging APIs, picking the perfect color, generating CSS gradients, or just formatting JSON data — we’ve got you covered.
        </p>

        <p className="text-lg mb-6 leading-relaxed">
          Born out of a developer's daydream on the last bench, this project blends utility with creativity. We believe tools should be <span className="text-[#00c8a0] font-semibold">simple, beautiful, and helpful</span>. No clutter. No nonsense. Just click, use, done.
        </p>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-[#f7ebff]">What We Offer</h2>
        <p className="text-lg mb-6 leading-relaxed text-[#e7d3ff]">
          From crafting smooth user interfaces to debugging backend APIs — we offer a growing collection of <span className="text-[#00c8a0] font-semibold">developer-first tools</span> that simplify everyday tasks. 
          Whether you're designing, developing, testing, or just experimenting, our toolkit has something for you. And yes — we're adding more tools regularly, so you'll always have something new to explore!
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-4 text-[#f7ebff]">Key Features</h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-[#e7d3ff]">
          <li>🚀 <strong>Instant Access:</strong> No sign-ups or paywalls — just open a tool and get started.</li>
          <li>🛠️ <strong>Developer-Focused:</strong> Built with utility and speed in mind, for real-world coding needs.</li>
          <li>🎨 <strong>Clean & Consistent UI:</strong> A unified aesthetic across all tools to keep you in flow.</li>
          <li>📱 <strong>Responsive Design:</strong> Use it on desktop, tablet, or mobile with ease.</li>
          <li>🌐 <strong>All-in-One Hub:</strong> Access all your favorite dev tools in one place — say goodbye to cluttered bookmarks.</li>
          <li>✨ <strong>Constantly Growing:</strong> New tools are being added regularly based on developer needs and feedback.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-[#f7ebff]">Who Is It For?</h2>
        <p className="text-lg mb-6 leading-relaxed">
          Whether you’re a student, indie hacker, frontend wizard, or just someone tired of copy-pasting into random online tools, this platform is for <span className="text-[#00c8a0] font-semibold">you</span>. Fast, focused, and freely accessible.
        </p>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-[#f7ebff]">Our Vision</h2>
        <p className="text-lg mb-6 leading-relaxed">
          To build a complete <span className="text-[#00c8a0] font-semibold">developer ecosystem</span> from the last bench — a collection of micro tools that can supercharge your workflow. Coming soon: Drawing board, Blog writer, Chat app, and a whole lot more!
        </p>

        <p className="text-lg italic text-[#bfa8ff]">“Because even the last benchers can build the next big thing.”</p>
      </div>
    </div>
  );
};

export default AboutPage;
