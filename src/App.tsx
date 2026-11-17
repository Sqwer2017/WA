import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { EntrySplash } from './components/EntrySplash';
import { TriParticleCanvas } from './components/TriParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecsBento } from './components/SpecsBento';
import { BlueprintExplorer } from './components/BlueprintExplorer';
import { FutureCases } from './components/FutureCases';
import { KitConfigurator } from './components/KitConfigurator';
import { ConceptGallery } from './components/ConceptGallery';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PreorderModal } from './components/PreorderModal';
import { ThanksPage } from './components/ThanksPage';
import { NotFoundPage } from './components/NotFoundPage';
import type { RobotEdition } from './data/robotData';

function AppShell() {
  const { route } = useApp();
  const [showSplash, setShowSplash] = useState(() => route === 'home');
  const [selectedEdition, setSelectedEdition] = useState<RobotEdition['id']>('pro');
  const [selectedFinish, setSelectedFinish] = useState<string>('obsidian');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [preorderOpen, setPreorderOpen] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="relative min-h-screen bg-tech-grid">
      {showSplash && <EntrySplash onDone={() => setShowSplash(false)} />}

      <TriParticleCanvas />
      <Navbar onOpenPreorder={() => setPreorderOpen(true)} />

      {route === 'thanks' ? (
        <ThanksPage />
      ) : route === '404' ? (
        <NotFoundPage />
      ) : (
        <main>
          <Hero
            onOpenPreorder={() => setPreorderOpen(true)}
            selectedFinish={selectedFinish}
          />
          <SpecsBento />
          <BlueprintExplorer />
          <FutureCases />
          <KitConfigurator
            selectedEdition={selectedEdition}
            onSelectEdition={setSelectedEdition}
            selectedFinish={selectedFinish}
            onSelectFinish={setSelectedFinish}
            selectedAddons={selectedAddons}
            onToggleAddon={toggleAddon}
            onProceedOrder={() => setPreorderOpen(true)}
          />
          <ConceptGallery />
          <FaqSection />
        </main>
      )}

      <Footer onOpenPreorder={() => setPreorderOpen(true)} />

      <PreorderModal
        open={preorderOpen}
        onClose={() => setPreorderOpen(false)}
        selectedEdition={selectedEdition}
        selectedFinish={selectedFinish}
        selectedAddons={selectedAddons}
      />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
