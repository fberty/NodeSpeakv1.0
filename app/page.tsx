import { MatrixRain } from '@/components/MatrixRain';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { WalletConnect } from '@/components/WalletConnect';
import { TopicsDropdown } from '@/components/TopicsDropdown';
import { SystemStatus } from '@/components/SystemStatus';
import { UserPosts } from '@/components/UserPosts';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <MatrixRain />
      
      <div className="container mx-auto p-4 relative z-10">
        <header className="mb-8">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-mono">Node Speak Terminal v1.0</h1>
            <div className="flex flex-col items-end space-y-2">
              <WalletConnect />
              <SystemStatus />
            </div>
          </div>
        </header>

        <main className="space-y-6">
          <div className="terminal-window">
            <UserPosts />
          </div>

          <TopicsDropdown />

          <div className="terminal-window">
            <TerminalPrompt />
          </div>
        </main>
      </div>
    </div>
  );
}