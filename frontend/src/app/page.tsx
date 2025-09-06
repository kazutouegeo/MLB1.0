import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Header */}
      <header className="w-full max-w-4xl">
        <nav role="navigation" aria-label="Main navigation">
          <h1 className="sr-only">MLB 1.0 - Baseball Analytics Platform</h1>
          <div className="flex justify-center">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="MLB 1.0 Baseball Analytics Platform Logo"
              width={180}
              height={38}
              priority
            />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex flex-col gap-8 items-center sm:items-start max-w-4xl w-full" role="main">
        <section className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Welcome to MLB 1.0
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Your premier destination for advanced baseball analytics and performance tracking. 
            Dive into comprehensive statistics, player insights, and team performance data.
          </p>
        </section>

        <section aria-labelledby="getting-started" className="w-full">
          <h3 id="getting-started" className="text-2xl font-semibold mb-4">Getting Started</h3>
          <ol className="font-mono list-inside list-decimal text-sm/6 space-y-2 bg-muted p-4 rounded-lg">
            <li className="tracking-[-.01em]">
              Explore real-time baseball statistics and analytics
            </li>
            <li className="tracking-[-.01em]">
              Track player performance across multiple seasons
            </li>
            <li className="tracking-[-.01em]">
              Compare team strategies and game outcomes
            </li>
          </ol>
        </section>

        {/* Action Buttons */}
        <section aria-labelledby="actions" className="flex gap-4 items-center flex-col sm:flex-row w-full">
          <h3 id="actions" className="sr-only">Quick Actions</h3>
          
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/analytics"
            aria-describedby="analytics-description"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 3v18h18v-2H5V3H3zm14 14V9h2v8h-2zm-4-4v4H9v-4h4zm-6-2v6H5V11h2z"/>
            </svg>
            View Analytics
          </Link>
          <p id="analytics-description" className="sr-only">
            Access comprehensive baseball analytics and statistics dashboard
          </p>

          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/players"
            aria-describedby="players-description"
          >
            Player Stats
          </Link>
          <p id="players-description" className="sr-only">
            Browse detailed player statistics and performance metrics
          </p>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features" className="w-full">
          <h3 id="features" className="text-2xl font-semibold mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-card-foreground">Real-time Analytics</h4>
              <p className="text-muted-foreground">
                Access live game data and statistics as they happen
              </p>
            </article>
            <article className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-card-foreground">Player Tracking</h4>
              <p className="text-muted-foreground">
                Comprehensive player performance metrics and history
              </p>
            </article>
            <article className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-2 text-card-foreground">Team Insights</h4>
              <p className="text-muted-foreground">
                Deep dive into team strategies and performance patterns
              </p>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl" role="contentinfo">
        <div className="flex gap-6 flex-wrap items-center justify-center border-t pt-8">
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
            href="/about"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            About MLB 1.0
          </Link>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
            href="/documentation"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
            </svg>
            Documentation
          </Link>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
            href="/contact"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
            </svg>
            Contact Support
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>&copy; 2024 MLB 1.0. All rights reserved. | Built with accessibility and performance in mind.</p>
        </div>
      </footer>
    </div>
  );
}
